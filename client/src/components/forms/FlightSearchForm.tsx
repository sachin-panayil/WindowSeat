import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import AirportAutocomplete from './AirportAutocomplete';
import type { FlightSearchParams, Location } from '../../../../server/shared/types/flight.types';

interface FlightSearchFormProps {
  onSearch: (data: FlightSearchParams) => void;
  isLoading: boolean;
}

const FlightSearchForm: React.FC<FlightSearchFormProps> = ({
  onSearch,
  isLoading,
}) => {
  const [origin, setOrigin] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [sameLocationError, setSameLocationError] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid: formFieldsValid },
    reset: resetForm,
  } = useForm<Pick<FlightSearchParams, 'date' | 'departureTime'>>({
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
    // Compare by name (which includes IATA code)
    setSameLocationError(loc1.name === loc2.name);
  };

  const handleOriginSelect = (loc: Location | null) => {
    setOrigin(loc);
    checkSameLocation(loc, destination);
  };

  const handleDestinationSelect = (loc: Location | null) => {
    setDestination(loc);
    checkSameLocation(origin, loc);
  };

  const onSubmit = (data: Pick<FlightSearchParams, 'date' | 'departureTime'>) => {
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
    setResetKey((k) => k + 1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Origin */}
      <AirportAutocomplete
        label="Origin Airport"
        onSelect={handleOriginSelect}
        resetKey={resetKey}
      />

      {/* Destination */}
      <div>
        <AirportAutocomplete
          label="Destination Airport"
          onSelect={handleDestinationSelect}
          resetKey={resetKey}
        />
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
                  const [year, month, day] = value.split('-').map(Number);
                  const selected = new Date(year, month - 1, day);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return selected >= today || 'Date cannot be in the past';
                },
                notTooFar: (value) => {
                  const [year, month, day] = value.split('-').map(Number);
                  const selected = new Date(year, month - 1, day);
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
  );
};

export default FlightSearchForm;
