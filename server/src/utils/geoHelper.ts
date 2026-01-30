import { GeoPoint } from "../types/GeoPoint";
import { Coordinates } from "../types/Coordinates";
import { LandmarkSighting } from "../types/LandmarkSighting";

import { LANDMARKS } from "../data/landmarks"

const INTERVAL = 200;
const R = 3959; // earth's radius in miles

export function calculatePath(origin: Coordinates, destination: Coordinates): GeoPoint[] {
    const mileMarkers: number[] = [];
    const totalDistance = haversineDistance(origin, destination);

    for (let d = 0; d <= totalDistance; d += INTERVAL) {
        mileMarkers.push(d);
    }

    if (mileMarkers[mileMarkers.length - 1] < totalDistance) {
        mileMarkers.push(totalDistance);
    }
    
    return mileMarkers.map(miles => {
        const fraction = miles / totalDistance;
        const coords = sphericalInterpolation(origin, destination, fraction);
        return {
            latitude: coords.latitude,
            longitude: coords.longitude,
            distanceFromOrigin: miles
        };
    });
}

export function findLandmarksAlongPath(path: GeoPoint[]): LandmarkSighting[] {
    const sightings: LandmarkSighting[] = [];

    for (const landmark of LANDMARKS) {
        let closestPointIndex = -1;
        let closestDistance = Infinity;

        // find closest path point to this landmark
        for (let i = 0; i < path.length; i++) {
            const distance = haversineDistance(path[i], landmark);
            if (distance <= landmark.viewingRange && distance < closestDistance) {
                closestDistance = distance;
                closestPointIndex = i;
            }
        }

        if (closestPointIndex !== -1) {
            const pathPoint = path[closestPointIndex];

            const nextPoint = closestPointIndex < path.length - 1
                ? path[closestPointIndex + 1]
                : path[closestPointIndex - 1];

            const side = closestPointIndex < path.length - 1
                ? getSide(pathPoint, nextPoint, landmark)
                : getSide(nextPoint, pathPoint, landmark); 

            sightings.push({
                landmark,
                side,
                distanceFromOrigin: pathPoint.distanceFromOrigin ?? 0,
                distanceFromPath: closestDistance
            });
        }
    }
    
    return sightings;
}

// calculates the distance between two points on a globe in miles
function haversineDistance(p1: Coordinates, p2: Coordinates): number {
    const toRad = (deg: number) => deg * Math.PI / 180;
    
    const dLat = toRad(p2.latitude - p1.latitude);
    const dLon = toRad(p2.longitude - p1.longitude);
    
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(toRad(p1.latitude)) * 
              Math.cos(toRad(p2.latitude)) * 
              Math.sin(dLon / 2) ** 2;
    
    return 2 * R * Math.asin(Math.sqrt(a));
}

// gets the coords of a mileMarker along the great circle path
function sphericalInterpolation(p1: Coordinates, p2: Coordinates, fraction: number): Coordinates {
    const toRad = (deg: number) => deg * Math.PI / 180;
    const toDeg = (rad: number) => rad * 180 / Math.PI;
    
    const lat1 = toRad(p1.latitude), lon1 = toRad(p1.longitude);
    const lat2 = toRad(p2.latitude), lon2 = toRad(p2.longitude);
    
    const d = haversineDistance(p1, p2) / 3959; 
    const a = Math.sin((1 - fraction) * d) / Math.sin(d);
    const b = Math.sin(fraction * d) / Math.sin(d);
    
    const x = a * Math.cos(lat1) * Math.cos(lon1) + b * Math.cos(lat2) * Math.cos(lon2);
    const y = a * Math.cos(lat1) * Math.sin(lon1) + b * Math.cos(lat2) * Math.sin(lon2);
    const z = a * Math.sin(lat1) + b * Math.sin(lat2);
    
    return {
        latitude: toDeg(Math.atan2(z, Math.sqrt(x ** 2 + y ** 2))),
        longitude: toDeg(Math.atan2(y, x))
    };
}

// determines if a landmark is on the right or left left of the plane
function getSide(
    pathPoint: Coordinates,
    nextPoint: Coordinates,
    landmark: Coordinates
): 'left' | 'right' {
    const cross = 
        (nextPoint.longitude - pathPoint.longitude) * (landmark.latitude - pathPoint.latitude) -
        (nextPoint.latitude - pathPoint.latitude) * (landmark.longitude - pathPoint.longitude);
    
    return cross > 0 ? 'left' : 'right';
}

// calculates the compass bearing from p1 to p2 (0-360°, clockwise from north)
export function calculateBearing(p1: Coordinates, p2: Coordinates): number {
    const toRad = (deg: number) => deg * Math.PI / 180;
    const toDeg = (rad: number) => rad * 180 / Math.PI;
    
    const lat1 = toRad(p1.latitude);
    const lat2 = toRad(p2.latitude);
    const dLon = toRad(p2.longitude - p1.longitude);
    
    const x = Math.sin(dLon) * Math.cos(lat2);
    const y = Math.cos(lat1) * Math.sin(lat2) - 
              Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    
    const bearing = toDeg(Math.atan2(x, y));
    return (bearing + 360) % 360; // normalize to 0-360
}