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
  isLoading 
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
      departureTime: ''
    }
  });

  const onSubmit = (data: FlightSearchFormData) => {
    console.log('Form submitted with data:', data);
    
    const searchParams: FlightSearchParams = {
      origin: data.origin.toUpperCase().trim(),
      destination: data.destination.toUpperCase().trim(),
      date: data.date,
      departureTime: data.departureTime
    };
    
    onSearch(searchParams);
  };

  // Validate IATA airport code format (3 letters)
  const validateIataCode = (value: string) => {
    const cleaned = value.toUpperCase().trim();
    const iataPattern = /^[A-Z]{3}$/;
    
    if (!iataPattern.test(cleaned)) {
      return 'Please enter a valid 3-letter airport code';
    }
    
    return true;
  };

  // Validate that origin and destination are different
  const validateDifferentAirports = (value: string, formValues: FlightSearchFormData) => {
    const origin = formValues.origin.toUpperCase().trim();
    const destination = value.toUpperCase().trim();
    
    if (origin && destination && origin === destination) {
      return 'Destination must be different from origin';
    }
    
    return true;
  };

  // Get input state classes
  const getInputClasses = (fieldName: keyof FlightSearchFormData) => {
    const baseClasses = `
      w-full px-4 py-4 text-lg 
      bg-space-950 border rounded-xl 
      text-white placeholder-text-muted 
      font-display
      focus:outline-none focus:ring-2 
      transition-all duration-300
    `;

    if (errors[fieldName]) {
      return `${baseClasses} border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20`;
    }
    
    if (touchedFields[fieldName] && !errors[fieldName]) {
      return `${baseClasses} border-green-500/50 focus:border-green-500/50 focus:ring-green-500/20`;
    }
    
    return `${baseClasses} border-white/10 focus:border-white/20 focus:ring-white/15`;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Origin Airport */}
      <div>
        <label htmlFor="origin" className="form-label">
          From (Origin Airport)
        </label>
        <input
          id="origin"
          type="text"
          placeholder="LAX"
          maxLength={3}
          autoComplete="off"
          {...register('origin', {
            required: 'Origin airport is required',
            validate: {
              validFormat: validateIataCode
            }
          })}
          className={`${getInputClasses('origin')} uppercase`}
        />
        {errors.origin && (
          <p className="form-error">{errors.origin.message}</p>
        )}
        <p className="form-helper">
          3-letter airport code (e.g., LAX, SFO, ORD)
        </p>
      </div>

      {/* Destination Airport */}
      <div>
        <label htmlFor="destination" className="form-label">
          To (Destination Airport)
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
              differentFromOrigin: validateDifferentAirports
            }
          })}
          className={`${getInputClasses('destination')} uppercase`}
        />
        {errors.destination && (
          <p className="form-error">{errors.destination.message}</p>
        )}
        <p className="form-helper">
          3-letter airport code (e.g., JFK, MIA, SEA)
        </p>
      </div>

      {/* Flight Date */}
      <div>
        <label htmlFor="date" className="form-label">
          Flight Date
        </label>
        <input
          id="date"
          type="date"
          {...register('date', {
            required: 'Flight date is required',
            validate: {
              notPastDate: (value) => {
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return selectedDate >= today || 'Flight date cannot be in the past';
              },
              notTooFarFuture: (value) => {
                const selectedDate = new Date(value);
                const oneYearFromNow = new Date();
                oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
                return selectedDate <= oneYearFromNow || 'Please select a date within the next year';
              }
            }
          })}
          className={getInputClasses('date')}
        />
        {errors.date && (
          <p className="form-error">{errors.date.message}</p>
        )}
      </div>

      {/* Departure Time */}
      <div>
        <label htmlFor="departureTime" className="form-label">
          Departure Time
        </label>
        <input
          id="departureTime"
          type="time"
          {...register('departureTime', {
            required: 'Departure time is required'
          })}
          className={getInputClasses('departureTime')}
        />
        {errors.departureTime && (
          <p className="form-error">{errors.departureTime.message}</p>
        )}
        <p className="form-helper">
          Local departure time at origin airport
        </p>
      </div>

      {/* Form Actions */}
      <div className="space-y-3 pt-2">
        <button
          type="submit"
          disabled={!isValid || isLoading}
          className="btn-primary"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing your flight...
            </span>
          ) : (
            'Get My Seat Recommendation'
          )}
        </button>

        <button
          type="button"
          onClick={() => reset()}
          className="btn-secondary"
        >
          Clear Form
        </button>
      </div>

      {/* Form Status Indicator */}
      <div className="text-center pt-2">
        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-display transition-all duration-300 ${
          isValid 
            ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
            : 'bg-white/5 text-text-muted border border-white/10'
        }`}>
          <div className={`w-2 h-2 rounded-full transition-colors ${isValid ? 'bg-green-400' : 'bg-text-muted'}`}></div>
          <span>{isValid ? 'Ready to analyze your flight' : 'Please complete all fields'}</span>
        </div>
      </div>
    </form>
  );
};

export default FlightSearchForm;