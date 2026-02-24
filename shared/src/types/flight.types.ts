export interface Location {
    name: string;
    latitude: number;
    longitude: number;
    timezone: string;
}

export interface FlightSearchParams {
    origin: Location;
    destination: Location;
    date: string;             // YYYY-MM-DD
    departureTime: string;    // HH:MM
}

export interface FlightData {
    route: string;
    originCity: string;
    destinationCity: string;
    departureTime: string;
    date: string;
    distanceMiles: number;
    durationMinutes: number;
}

export interface LandmarkSummary {
    name: string;
    side: 'left' | 'right';
    distanceFromOrigin: number;
    estimatedTime: string;
    cloudCover?: number;
}

export interface SideResult {
    landmarks: LandmarkSummary[];
    glarePercent: number;
    averageCloudCover: number | null;
}

export interface SeatRecommendation {
    recommendedSeat: 'left' | 'right';
    confidence: number; // 1-10 
    reasoning: string; 
    landmarks: LandmarkSummary[];
    leftSide: SideResult;
    rightSide: SideResult;
    weatherConfidence: 'high' | 'partial' | 'unavailable';
}

export interface MapLandmark {
    name: string;
    latitude: number;
    longitude: number;
    side: 'left' | 'right';
    type: string;
    distanceFromOrigin: number;
    estimatedTime: string;
    cloudCover?: number;
}

export interface MapData {
    path: { latitude: number; longitude: number }[];
    landmarks: MapLandmark[];
    origin: { latitude: number; longitude: number; name: string };
    destination: { latitude: number; longitude: number; name: string };
}

export interface FlightRecommendation {
    flight: FlightData;
    recommendation: SeatRecommendation;
    mapData?: MapData;
}
