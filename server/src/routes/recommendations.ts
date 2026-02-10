import express from 'express';
import { getAirport } from '../services/airportService';
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
} from '../../shared/types/flight.types';
import type { APIError } from '../helper/classifyError';

export const router = express.Router();

const CRUISE_SPEED_MPH = 500;

router.post('/', async (req, res) => {
    try {
        const params: FlightSearchParams = req.body;
        console.log('Received request:', params);

        // 1. Get airport data
        const [originAirport, destAirport] = await Promise.all([
            getAirport(params.origin),
            getAirport(params.destination)
        ]);

        if (!originAirport || !originAirport.city || !originAirport.timezone) {
            return res.status(400).json({
                error: 'Invalid airport',
                code: 'AIRPORT_NOT_FOUND',
                message: `Airport not found: ${params.origin}. Please enter a valid 3-letter airport code.`,
                retryable: false
            } as APIError);
        }
        
        if (!destAirport || !destAirport.city || !destAirport.timezone) {
            return res.status(400).json({
                error: 'Invalid airport',
                code: 'AIRPORT_NOT_FOUND',
                message: `Airport not found: ${params.destination}. Please enter a valid 3-letter airport code.`,
                retryable: false
            } as APIError);
        }

        console.log('Airports resolved:', originAirport.city, '→', destAirport.city);

        // 2. Calculate flight path
        const path = calculatePath(
            { latitude: originAirport.latitude, longitude: originAirport.longitude },
            { latitude: destAirport.latitude, longitude: destAirport.longitude }
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
            originAirport.timezone
        );

        // 5. Get weather data (pass origin timezone for proper time conversion)
        const weatherResult = await getRouteWeather(
            path, 
            params.date, 
            params.departureTime,
            originAirport.timezone
        );
        console.log(`Weather coverage: ${Math.round(weatherResult.coverage * 100)}% (${weatherResult.reason})`);

        // 6. Build flight data
        const totalDistance = path[path.length - 1].distanceFromOrigin ?? 0;
        const durationMinutes = Math.round((totalDistance / CRUISE_SPEED_MPH) * 60);

        const flightData: FlightData = {
            route: `${params.origin} → ${params.destination}`,
            origin: params.origin,
            destination: params.destination,
            originCity: originAirport.city,
            destinationCity: destAirport.city,
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