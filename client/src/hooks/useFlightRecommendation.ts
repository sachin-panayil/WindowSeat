import { useState, useCallback } from 'react';
import { flightAPI } from '../services/flightAPI';
import { APIError } from '../services/flightAPI';
import type { FlightSearchParams, FlightRecommendation } from '../../../shared/types/flight.types';
import type { FlightError } from '../types/FlightError';

export const useFlightRecommendation = () => {
  const [recommendation, setRecommendation] = useState<FlightRecommendation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<FlightError | null>(null);
  const [searchParams, setSearchParams] = useState<FlightSearchParams | null>(null);

  const searchFlight = useCallback(async (params: FlightSearchParams) => {
    setIsLoading(true);
    setError(null);
    setSearchParams(params);
    setRecommendation(null);

    try {
      const result = await flightAPI.getRecommendation(params);
      setRecommendation(result);
    } catch (err) {
      if (err instanceof APIError) {
        setError({
          message: err.message,
          code: err.code,
          retryable: err.retryable
        });
      } else {
        setError({
          message: err instanceof Error ? err.message : 'An unexpected error occurred',
          code: 'UNKNOWN_ERROR',
          retryable: true
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Retry the last search
  const retry = useCallback(() => {
    if (searchParams) {
      searchFlight(searchParams);
    }
  }, [searchParams, searchFlight]);

  const clearSearch = useCallback(() => {
    setSearchParams(null);
    setRecommendation(null);
    setError(null);
  }, []);

  return {
    recommendation,
    isLoading,
    error,
    searchFlight,
    retry,
    clearSearch,
    searchParams
  };
};