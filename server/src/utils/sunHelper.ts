import SunCalc from 'suncalc';
import { GeoPoint } from "../types/GeoPoint";
import { parseLocalDepartureToUtc, estimateTimeAtPoint } from './timeHelper';
import { calculateBearing } from './geoHelper';

// calculates sun position for each point along the flight path
// returns the same path array with sunAzimuth and sunElevation data
export function getSunPositions(
    path: GeoPoint[],
    date: string,
    departureTime: string,
    originTimezone: string
): GeoPoint[] {
    const departureUtc = parseLocalDepartureToUtc(date, departureTime, originTimezone);
    
    return path.map((point, index) => {
        const estimatedTime = estimateTimeAtPoint(departureUtc, point.distanceFromOrigin ?? 0);
        
        const sunPosition = SunCalc.getPosition(
            estimatedTime,
            point.latitude,
            point.longitude
        );
        
        const azimuthDeg = ((sunPosition.azimuth * 180 / Math.PI) + 180) % 360;
        const elevationDeg = sunPosition.altitude * 180 / Math.PI;
        
        const nextPoint = index < path.length - 1 ? path[index + 1] : path[index - 1];
        const heading = index < path.length - 1 
            ? calculateBearing(point, nextPoint)
            : calculateBearing(path[index - 1], point); 

        const sunGlareSide = calculateGlareSide(azimuthDeg, elevationDeg, heading);
        
        return {
            ...point,
            estimatedTime: estimatedTime.toISOString(),
            sunAzimuth: Math.round(azimuthDeg * 10) / 10,
            sunElevation: Math.round(elevationDeg * 10) / 10,
            sunGlareSide
        };
    });
}

// determines which side of aircraft has sun glare
function calculateGlareSide(
    sunAzimuth: number, 
    sunElevation: number, 
    aircraftHeading: number
): 'left' | 'right' | 'none' {
    // no glare if sun is below horizon
    if (sunElevation <= 0) {
        return 'none';
    }
    
    // calculate relative angle of sun to aircraft heading
    // positive = sun on right, negative = sun on left
    let relativeAngle = sunAzimuth - aircraftHeading;
    
    if (relativeAngle > 180) relativeAngle -= 360;
    if (relativeAngle < -180) relativeAngle += 360;

    if (Math.abs(relativeAngle) < 30 || Math.abs(relativeAngle) > 150) {
        return 'none';
    }
    
    return relativeAngle > 0 ? 'right' : 'left';
}

