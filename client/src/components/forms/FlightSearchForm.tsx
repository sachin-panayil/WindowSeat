import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from '@geoapify/react-geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import type { FlightSearchParams, Location } from '../../../../server/shared/types/flight.types';
import type { FlightSearchFormData } from '../../types/FlightSearchFormData';

interface FlightSearchFormProps {
  onSearch: (data: FlightSearchParams) => void;
  isLoading: boolean;
}

const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY as string;

const FlightSearchForm: React.FC<FlightSearchFormProps> = ({
  onSearch,
  isLoading,
}) => {
  const [origin, setOrigin] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [sameLocationError, setSameLocationError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid: formFieldsValid },
    reset: resetForm,
  } = useForm<FlightSearchFormData>({
    mode: 'onChange',
    defaultValues: {
      date: '',
      departureTime: '',
    },
  });

  const allValid = formFieldsValid && origin !== null && destination !== null && !sameLocationError;

  const checkSameLocation = (loc1: Location | null, loc2: Location | null) => {
    if (!loc1 || !loc2) {
      setSameLocationError(false);
      return;
    }
    const same =
      Math.abs(loc1.latitude - loc2.latitude) < 0.01 &&
      Math.abs(loc1.longitude - loc2.longitude) < 0.01;
    setSameLocationError(same);
  };

  const extractLocation = (value: GeoJSON.Feature | null): Location | null => {
    if (!value || !value.properties) return null;
    const props = value.properties as Record<string, unknown>;
    const lat = props.lat as number | undefined;
    const lon = props.lon as number | undefined;
    const tz = (props.timezone as { name?: string } | undefined)?.name;
    const city = props.city as string | undefined;
    const state = props.state as string | undefined;

    if (lat == null || lon == null || !tz || !city) return null;

    const name = state ? `${city}, ${state}` : city;

    return {
      name,
      latitude: lat,
      longitude: lon,
      timezone: tz,
    };
  };

  const postprocessHook = (feature: GeoJSON.Feature): string => {
    const props = feature.properties as Record<string, unknown>;
    const city = props.city as string | undefined;
    const state = props.state as string | undefined;
    if (city && state) return `${city}, ${state}`;
    return city || (props.formatted as string) || '';
  };

  const handleOriginSelect = (value: GeoJSON.Feature | null) => {
    const loc = extractLocation(value);
    setOrigin(loc);
    checkSameLocation(loc, destination);
  };

  const handleDestinationSelect = (value: GeoJSON.Feature | null) => {
    const loc = extractLocation(value);
    setDestination(loc);
    checkSameLocation(origin, loc);
  };

  const onSubmit = (data: FlightSearchFormData) => {
    if (!origin || !destination) return;
    const searchParams: FlightSearchParams = {
      origin,
      destination,
      date: data.date,
      departureTime: data.departureTime,
    };
    onSearch(searchParams);
  };

  const handleClear = () => {
    setOrigin(null);
    setDestination(null);
    setSameLocationError(false);
    resetForm();
    // Clear Geoapify inputs by replacing the key (forces remount)
    setResetKey((k) => k + 1);
  };

  const [resetKey, setResetKey] = useState(0);

  return (
    <GeoapifyContext apiKey={GEOAPIFY_API_KEY}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Origin */}
        <div>
          <label className="block text-sm font-display font-normal text-text-tertiary mb-2">
            Origin City
          </label>
          <div className="geoapify-autocomplete-wrapper" key={`origin-${resetKey}`}>
            <GeoapifyGeocoderAutocomplete
              placeholder="Search for a city..."
              type="city"
              placeSelect={handleOriginSelect}
              postprocessHook={postprocessHook}
              suggestionsChange={() => {}}
            />
          </div>
        </div>

        {/* Destination */}
        <div>
          <label className="block text-sm font-display font-normal text-text-tertiary mb-2">
            Destination City
          </label>
          <div className="geoapify-autocomplete-wrapper" key={`dest-${resetKey}`}>
            <GeoapifyGeocoderAutocomplete
              placeholder="Search for a city..."
              type="city"
              placeSelect={handleDestinationSelect}
              postprocessHook={postprocessHook}
              suggestionsChange={() => {}}
            />
          </div>
          {sameLocationError && (
            <p className="mt-1.5 text-xs text-red-400 font-display">
              Destination must differ from origin
            </p>
          )}
        </div>

        {/* Date & Time row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-display font-normal text-text-tertiary mb-2"
            >
              Flight Date
            </label>
            <input
              id="date"
              type="date"
              {...register('date', {
                required: 'Date is required',
                validate: {
                  notPast: (value) => {
                    const selected = new Date(value);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return selected >= today || 'Date cannot be in the past';
                  },
                  notTooFar: (value) => {
                    const selected = new Date(value);
                    const limit = new Date();
                    limit.setFullYear(limit.getFullYear() + 1);
                    return selected <= limit || 'Within one year only';
                  },
                },
              })}
              className={`input-dark ${errors.date ? 'input-dark--error' : ''}`}
            />
            {errors.date && (
              <p className="mt-1.5 text-xs text-red-400 font-display">
                {errors.date.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="departureTime"
              className="block text-sm font-display font-normal text-text-tertiary mb-2"
            >
              Departure Time
            </label>
            <input
              id="departureTime"
              type="time"
              {...register('departureTime', {
                required: 'Time is required',
              })}
              className={`input-dark ${errors.departureTime ? 'input-dark--error' : ''}`}
            />
            {errors.departureTime && (
              <p className="mt-1.5 text-xs text-red-400 font-display">
                {errors.departureTime.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button type="submit" disabled={!allValid || isLoading} className="btn-primary">
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Analyzing your flight...
              </span>
            ) : (
              'Get My Seat Recommendation'
            )}
          </button>
        </div>

        {/* Clear + status */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleClear}
            className="text-sm font-display text-text-muted hover:text-text-tertiary transition-colors"
          >
            Clear form
          </button>

          <div
            className={`flex items-center space-x-1.5 text-xs font-display ${
              allValid ? 'text-emerald-400/70' : 'text-text-muted'
            }`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                allValid ? 'bg-emerald-400' : 'bg-text-muted'
              }`}
            />
            <span>{allValid ? 'Ready' : 'Complete all fields'}</span>
          </div>
        </div>
      </form>
    </GeoapifyContext>
  );
};

export default FlightSearchForm;
