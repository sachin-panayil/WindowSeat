export interface GeoPoint {
    latitude: number;
    longitude: number;
    distanceFromOrigin?: number;
    estimatedTime?: string;
    cloudCover?: number;        
    sunAzimuth?: number;        
    sunElevation?: number;
    sunGlareSide?: 'left' | 'right' | 'none';
}