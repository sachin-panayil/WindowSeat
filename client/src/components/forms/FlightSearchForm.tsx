import React from 'react';
import { useForm } from 'react-hook-form';
import type { FlightSearchParams } from '../../../../shared/types/flight.types';
import type { FlightSearchFormData } from '../../types/FlightSearchFormData';

interface FlightSearchFormProps {
  onSearch: (data: FlightSearchParams) => void;
  isLoading: boolean;
}

const FlightSearchForm: React.FC<FlightSearchFormProps> = ({
  onSearch,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    reset,
  } = useForm<FlightSearchFormData>({
    mode: 'onChange',
    defaultValues: {
      origin: '',
      destination: '',
      date: '',
      departureTime: '',
    },
  });

  const onSubmit = (data: FlightSearchFormData) => {
    const searchParams: FlightSearchParams = {
      origin: data.origin.toUpperCase().trim(),
      destination: data.destination.toUpperCase().trim(),
      date: data.date,
      departureTime: data.departureTime,
    };
    onSearch(searchParams);
  };

  const validateIataCode = (value: string) => {
    const cleaned = value.toUpperCase().trim();
    if (!/^[A-Z]{3}$/.test(cleaned)) {
      return 'Enter a valid 3-letter airport code';
    }
    return true;
  };

  const validateDifferentAirports = (
    value: string,
    formValues: FlightSearchFormData
  ) => {
    const origin = formValues.origin.toUpperCase().trim();
    const destination = value.toUpperCase().trim();
    if (origin && destination && origin === destination) {
      return 'Destination must differ from origin';
    }
    return true;
  };

  // Dynamic input class based on field state
  const inputClass = (fieldName: keyof FlightSearchFormData) => {
    const base = 'input-dark uppercase';
    if (errors[fieldName]) return `${base} input-dark--error`;
    if (touchedFields[fieldName] && !errors[fieldName])
      return `${base} input-dark--success`;
    return base;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Origin */}
      <div>
        <label
          htmlFor="origin"
          className="block text-sm font-display font-normal text-text-tertiary mb-2"
        >
          Origin Airport
        </label>
        <input
          id="origin"
          type="text"
          placeholder="LAX"
          maxLength={3}
          autoComplete="off"
          {...register('origin', {
            required: 'Origin airport is required',
            validate: { validFormat: validateIataCode },
          })}
          className={inputClass('origin')}
        />
        {errors.origin && (
          <p className="mt-1.5 text-xs text-red-400 font-display">
            {errors.origin.message}
          </p>
        )}
      </div>

      {/* Destination */}
      <div>
        <label
          htmlFor="destination"
          className="block text-sm font-display font-normal text-text-tertiary mb-2"
        >
          Destination Airport
        </label>
        <input
          id="destination"
          type="text"
          placeholder="JFK"
          maxLength={3}
          autoComplete="off"
          {...register('destination', {
            required: 'Destination airport is required',
            validate: {
              validFormat: validateIataCode,
              differentFromOrigin: validateDifferentAirports,
            },
          })}
          className={inputClass('destination')}
        />
        {errors.destination && (
          <p className="mt-1.5 text-xs text-red-400 font-display">
            {errors.destination.message}
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
            className={inputClass('date')}
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
            className={inputClass('departureTime')}
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
        <button type="submit" disabled={!isValid || isLoading} className="btn-primary">
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
          onClick={() => reset()}
          className="text-sm font-display text-text-muted hover:text-text-tertiary transition-colors"
        >
          Clear form
        </button>

        <div
          className={`flex items-center space-x-1.5 text-xs font-display ${
            isValid ? 'text-emerald-400/70' : 'text-text-muted'
          }`}
        >
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              isValid ? 'bg-emerald-400' : 'bg-text-muted'
            }`}
          />
          <span>{isValid ? 'Ready' : 'Complete all fields'}</span>
        </div>
      </div>
    </form>
  );
};

export default FlightSearchForm;