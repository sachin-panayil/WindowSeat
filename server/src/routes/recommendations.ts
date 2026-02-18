import express from 'express';
import { calculatePath, findLandmarksAlongPath } from '../utils/geoHelper';
import { getSunPositions } from '../utils/sunHelper';
import { getRouteWeather } from '../services/weatherService';
import { generateRecommendation } from '../services/LLMService';
import { classifyError } from '../helper/classifyError';
import type {
    FlightSearchParams,
    FlightRecommendation,
    FlightData,
    LandmarkSummary,
    SideResult
} from '@windowseat/shared';
import type { APIError } from '../helper/classifyError';

export const router = express.Router();

const CRUISE_SPEED_MPH = 500;

function validateLocation(loc: unknown, label: string): string | null {
    if (!loc || typeof loc !== 'object') return `${label} is required`;
    const l = loc as Record<string, unknown>;
    if (typeof l.name !== 'string' || l.name.trim() === '') return `${label} name is required`;
    if (typeof l.latitude !== 'number' || l.latitude < -90 || l.latitude > 90) return `${label} has invalid latitude`;
    if (typeof l.longitude !== 'number' || l.longitude < -180 || l.longitude > 180) return `${label} has invalid longitude`;
    if (typeof l.timezone !== 'string' || l.timezone.trim() === '') return `${label} timezone is required`;
    return null;
}

router.post('/', async (req, res) => {
    try {
        const params: FlightSearchParams = req.body;
        console.log('Received request:', params);

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

        console.log('Locations:', params.origin.name, '→', params.destination.name);

        // 2. Calculate flight path
        const path = calculatePath(
            { latitude: params.origin.latitude, longitude: params.origin.longitude },
            { latitude: params.destination.latitude, longitude: params.destination.longitude }
        );

        console.log(`Path calculated: ${path.length} points`);

        // 3. Find landmarks along path
        const landmarkSightings = findLandmarksAlongPath(path);
        console.log(`Landmarks found: ${landmarkSightings.length}`);

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
        console.log(`Weather coverage: ${Math.round(weatherResult.coverage * 100)}% (${weatherResult.reason})`);

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

        // 9. Assemble response
        const response: FlightRecommendation = {
            flight: flightData,
            recommendation: { ...recommendation, leftSide, rightSide }
        };

        console.log('Recommendation:', recommendation.recommendedSeat, 'side with confidence', recommendation.confidence);
        res.json(response);

    } catch (error) {
        console.error('Recommendation error:', error);

        const { status, body } = classifyError(error instanceof Error ? error : new Error('Unknown error'));
        res.status(status).json(body);
    }
});
