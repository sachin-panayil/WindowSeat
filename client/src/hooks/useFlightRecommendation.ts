import { useState } from 'react';
import { flightAPI } from '../services/flightAPI';
import type { FlightSearchParams, FlightRecommendation } from '../../../shared/types/flight.types';

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
      const recommendation = await flightAPI.getRecommendation(params)
      setRecommendation(recommendation);
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