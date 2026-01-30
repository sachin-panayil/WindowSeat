import express from 'express';
import type { 
    FlightSearchParams, 
    FlightRecommendation,
    FlightData,
    LandmarkSummary
} from '../../../shared/types/flight.types';

import { getAirport } from '../services/airportService';
import { calculatePath, findLandmarksAlongPath } from '../utils/geoHelper';
import { getSunPositions } from '../utils/sunHelper';
import { getRouteWeather } from '../services/weatherService';
import { generateRecommendation } from '../services/LLMService';

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

        if (!originAirport) {
            return res.status(400).json({ error: `Airport not found: ${params.origin}` });
        }
        if (!destAirport) {
            return res.status(400).json({ error: `Airport not found: ${params.destination}` });
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

        // 9. Assemble response
        const response: FlightRecommendation = {
            flight: flightData,
            recommendation
        };

        console.log('Recommendation:', recommendation.recommendedSeat, 'side with confidence', recommendation.confidence);
        res.json(response);

    } catch (error) {
        console.error('Recommendation error:', error);
        res.status(500).json({ 
            error: 'Failed to generate recommendation',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
