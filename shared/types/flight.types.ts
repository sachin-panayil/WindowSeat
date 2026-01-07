export interface FlightSearchParams {
    flightNumber: string;
    date: string;
}

export interface FlightData {
    flightNumber: string;
    route: string;
    origin: string;
    destination: string;
    departure_time: string;
    arrival_time: string;
    aircraft: string;
    airline: string;
    duration: number;
    date: string;
}

export interface SeatRecommendation {
    recommendedSeat: 'left' | 'right';
    seatType: 'window' | 'aisle';
    confidence: number;
    reasoning: string;
    expectedViews: string[];
    bestViewingTimes: string;
    weatherImpact: string;
}

export interface FlightRecommendation {
    flight: FlightData;
    recommendation: SeatRecommendation;
}

export interface WeatherCondition {
    location: string;
    condition: string;
    visibility: number;
    temperature: number;
}