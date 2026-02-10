export interface FlightSearchParams {
    origin: string;           // IATA code
    destination: string;      // IATA code
    date: string;             // YYYY-MM-DD
    departureTime: string;    // HH:MM
}

export interface FlightData {
    route: string;            // "LAX → JFK"
    origin: string;           // IATA code
    destination: string;      // IATA code
    originCity: string;       // "Los Angeles"
    destinationCity: string;  // "New York"
    departureTime: string;    // from user input
    date: string;             // from user input
    distanceMiles: number;    // calculated from path
    durationMinutes: number;  // estimated from distance
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
    confidence: number;       // 1-10 score
    reasoning: string;        // explanation
    landmarks: LandmarkSummary[];
    leftSide: SideResult;
    rightSide: SideResult;
    weatherConfidence: 'high' | 'partial' | 'unavailable';
}

export interface FlightRecommendation {
    flight: FlightData;
    recommendation: SeatRecommendation;
}
