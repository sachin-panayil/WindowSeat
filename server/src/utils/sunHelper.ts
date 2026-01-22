import SunCalc from 'suncalc';
import { GeoPoint } from "../types/GeoPoint";
import { parseLocalDepartureToUtc, estimateTimeAtPoint } from './timeHelper';

// calculates sun position for each point along the flight path
// returns the same path array with sunAzimuth and sunElevation data
export function getSunPositions(
    path: GeoPoint[],
    date: string,
    departureTime: string,
    originTimezone: string
): GeoPoint[] {
    const departureUtc = parseLocalDepartureToUtc(date, departureTime, originTimezone);
    
    return path.map(point => {
        const estimatedTime = estimateTimeAtPoint(departureUtc, point.distanceFromOrigin ?? 0);
        
        const sunPosition = SunCalc.getPosition(
            estimatedTime,
            point.latitude,
            point.longitude
        );
        
        const azimuthDeg = ((sunPosition.azimuth * 180 / Math.PI) + 180) % 360;
        const elevationDeg = sunPosition.altitude * 180 / Math.PI;
        
        return {
            ...point,
            estimatedTime: estimatedTime.toISOString(),
            sunAzimuth: Math.round(azimuthDeg * 10) / 10,
            sunElevation: Math.round(elevationDeg * 10) / 10
        };
    });
}


