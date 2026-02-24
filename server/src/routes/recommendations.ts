import express from 'express';
import { calculatePath, findLandmarksAlongPath } from '../utils/geoHelper';
import { getSunPositions } from '../utils/sunHelper';
import { getRouteWeather } from '../services/weatherService';
import { generateRecommendation } from '../services/LLMService';
import { captureEvent } from '../services/analyticsService';
import { classifyError } from '../helper/classifyError';
import { validateLocation } from '../helper/validateLocation';
import type {
    FlightSearchParams,
    FlightRecommendation,
    FlightData,
    LandmarkSummary,
    SideResult,
    MapData,
    MapLandmark
} from '@windowseat/shared';
import type { APIError } from '../helper/classifyError';

export const router = express.Router();

const CRUISE_SPEED_MPH = 500;
const isProduction = process.env.NODE_ENV === 'production';

router.post('/', async (req, res) => {
    try {
        const params: FlightSearchParams = req.body;
        if (!isProduction) {
            console.log('Received request:', params);
        }

        // 1. Validate input
        const originError = validateLocation(params.origin, 'Origin');
        if (originError) {
            return res.status(400).json({
                error: 'Invalid input',
                code: 'INVALID_INPUT',
                message: originError,
                retryable: false
            } as APIError);
        }

        const destError = validateLocation(params.destination, 'Destination');
        if (destError) {
            return res.status(400).json({
                error: 'Invalid input',
                code: 'INVALID_INPUT',
                message: destError,
                retryable: false
            } as APIError);
        }

        if (!isProduction) {
            console.log('Locations:', params.origin.name, '->', params.destination.name);
        }

        // 2. Calculate flight path
        const path = calculatePath(
            { latitude: params.origin.latitude, longitude: params.origin.longitude },
            { latitude: params.destination.latitude, longitude: params.destination.longitude }
        );

        if (!isProduction) {
            console.log(`Path calculated: ${path.length} points`);
        }

        // 3. Find landmarks along path
        const landmarkSightings = findLandmarksAlongPath(path);

        if (!isProduction) {
            console.log(`Landmarks found: ${landmarkSightings.length}`);
        }

        // 4. Get sun positions (pass origin timezone for proper time conversion)
        const pathWithSun = getSunPositions(
            path,
            params.date,
            params.departureTime,
            params.origin.timezone
        );

        // 5. Get weather data (pass origin timezone for proper time conversion)
        const weatherResult = await getRouteWeather(
            path,
            params.date,
            params.departureTime,
            params.origin.timezone
        );

        if (!isProduction) {
            console.log(`Weather coverage: ${Math.round(weatherResult.coverage * 100)}% (${weatherResult.reason})`);
        }

        // 6. Build flight data
        const totalDistance = path[path.length - 1].distanceFromOrigin ?? 0;
        const durationMinutes = Math.round((totalDistance / CRUISE_SPEED_MPH) * 60);

        const flightData: FlightData = {
            route: `${params.origin.name} → ${params.destination.name}`,
            originCity: params.origin.name,
            destinationCity: params.destination.name,
            departureTime: params.departureTime,
            date: params.date,
            distanceMiles: Math.round(totalDistance),
            durationMinutes
        };

        // 7. Build landmark summaries with weather data
        const landmarkSummaries: LandmarkSummary[] = landmarkSightings.map(sighting => {
            const closestPathPoint = weatherResult.path.find(
                p => Math.abs((p.distanceFromOrigin ?? 0) - sighting.distanceFromOrigin) < 100
            ) || weatherResult.path[0];

            return {
                name: sighting.landmark.name,
                side: sighting.side,
                distanceFromOrigin: Math.round(sighting.distanceFromOrigin),
                estimatedTime: closestPathPoint.estimatedTime ?? '',
                cloudCover: closestPathPoint.cloudCover
            };
        });

        // 8. Generate recommendation
        const recommendation = await generateRecommendation(landmarkSummaries, pathWithSun, weatherResult.reason, flightData);

        // 8.5 Compute per-side results
        const leftLandmarks = landmarkSummaries.filter(l => l.side === 'left');
        const rightLandmarks = landmarkSummaries.filter(l => l.side === 'right');

        const totalPoints = pathWithSun.length;
        const leftGlareCount = pathWithSun.filter(p => p.sunGlareSide === 'left').length;
        const rightGlareCount = pathWithSun.filter(p => p.sunGlareSide === 'right').length;

        const avgCloud = (landmarks: LandmarkSummary[]): number | null => {
            const covers = landmarks.map(l => l.cloudCover).filter((c): c is number => c !== undefined);
            return covers.length > 0 ? Math.round(covers.reduce((a, b) => a + b, 0) / covers.length) : null;
        };

        const leftSide: SideResult = {
            landmarks: leftLandmarks,
            glarePercent: totalPoints > 0 ? Math.round((leftGlareCount / totalPoints) * 100) : 0,
            averageCloudCover: avgCloud(leftLandmarks),
        };

        const rightSide: SideResult = {
            landmarks: rightLandmarks,
            glarePercent: totalPoints > 0 ? Math.round((rightGlareCount / totalPoints) * 100) : 0,
            averageCloudCover: avgCloud(rightLandmarks),
        };

        // 9. Build map data from existing path and landmark sightings
        const mapData: MapData = {
            path: path.map(p => ({ latitude: p.latitude, longitude: p.longitude })),
            landmarks: landmarkSightings.map((sighting): MapLandmark => {
                const closestPathPoint = weatherResult.path.find(
                    p => Math.abs((p.distanceFromOrigin ?? 0) - sighting.distanceFromOrigin) < 100
                ) || weatherResult.path[0];

                return {
                    name: sighting.landmark.name,
                    latitude: sighting.landmark.latitude,
                    longitude: sighting.landmark.longitude,
                    side: sighting.side,
                    type: sighting.landmark.type,
                    distanceFromOrigin: Math.round(sighting.distanceFromOrigin),
                    estimatedTime: closestPathPoint.estimatedTime ?? '',
                    cloudCover: closestPathPoint.cloudCover,
                };
            }),
            origin: { latitude: params.origin.latitude, longitude: params.origin.longitude, name: params.origin.name },
            destination: { latitude: params.destination.latitude, longitude: params.destination.longitude, name: params.destination.name },
        };

        // 10. Assemble response
        const response: FlightRecommendation = {
            flight: flightData,
            recommendation: { ...recommendation, leftSide, rightSide },
            mapData
        };

        if (!isProduction) {
            console.log('Recommendation:', recommendation.recommendedSeat, 'side with confidence', recommendation.confidence);
        }

        captureEvent('flight_search', {
            distinct_id: 'server',
            origin: params.origin.name,
            destination: params.destination.name,
            recommended_seat: recommendation.recommendedSeat,
            confidence: recommendation.confidence,
            landmark_count: landmarkSummaries.length,
            left_landmark_count: leftLandmarks.length,
            right_landmark_count: rightLandmarks.length,
            distance_miles: flightData.distanceMiles,
            duration_minutes: flightData.durationMinutes,
            weather_coverage: weatherResult.reason,
        });

        res.json(response);

    } catch (error) {
        console.error('Recommendation error:', error);

        const { status, body } = classifyError(error instanceof Error ? error : new Error('Unknown error'));
        res.status(status).json(body);
    }
});
