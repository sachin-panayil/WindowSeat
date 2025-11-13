import { useState } from 'react';
import type { FlightSearchParams, FlightRecommendation } from '../types/flight.types';

export const useFlightRecommendation = () => {
  const [recommendation, setRecommendation] = useState<FlightRecommendation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [searchParams, setSearchParams] = useState<FlightSearchParams | null>(null);

  const searchFlight = async (params: FlightSearchParams) => {
    setIsLoading(true);
    setError(null);
    setSearchParams(params);
    setRecommendation(null);

    try {
      // Mock API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock recommendation data
      const mockRecommendation: FlightRecommendation = {
        flight: {
          flightNumber: params.flightNumber,
          route: 'LAX → JFK',
          origin: 'LAX',
          destination: 'JFK',
          departure_time: '8:30 AM',
          arrival_time: '4:45 PM',
          aircraft: 'Boeing 737-800',
          airline: 'American Airlines',
          duration: 315, // 5h 15m
          date: params.date
        },
        recommendation: {
          recommendedSeat: 'left',
          seatType: 'window',
          confidence: 9,
          reasoning: 'Based on your flight path and departure time, the left side offers spectacular views of the Grand Canyon around 10:15 AM with excellent lighting conditions. Clear skies are forecasted for optimal visibility.',
          expectedViews: [
            'Grand Canyon National Park (10:15 AM - 10:25 AM)',
            'Rocky Mountains (11:30 AM - 12:00 PM)',
            'Great Lakes region (2:15 PM - 2:30 PM)',
            'Manhattan skyline approach (4:30 PM - 4:45 PM)'
          ],
          bestViewingTimes: 'Peak viewing from 10:15 AM - 12:00 PM for natural landmarks, city approach at 4:30 PM',
          weatherImpact: 'Clear skies expected along entire route. Excellent visibility conditions with minimal cloud cover.'
        }
      };

      setRecommendation(mockRecommendation);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to get recommendation'));
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchParams(null);
    setRecommendation(null);
    setError(null);
  };

  return {
    recommendation,
    isLoading,
    error,
    searchFlight,
    clearSearch,
    searchParams
  };
};