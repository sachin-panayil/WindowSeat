import { useForm } from 'react-hook-form';
import type { FlightSearchParams } from '../../types/flight.types';

// Updated Flight Search Form with React Hook Form and Full Validation
interface FlightSearchFormData {
  flightNumber: string;
  date: string;
}

interface FlightSearchFormProps {
  onSearch: (data: FlightSearchParams) => void;
  isLoading: boolean;
}

const FlightSearchForm: React.FC<FlightSearchFormProps> = ({ 
  onSearch, 
  isLoading 
}) => {
  // React Hook Form setup with TypeScript support
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    reset,
    watch
  } = useForm<FlightSearchFormData>({
    mode: 'onChange', // Validate as user types
    defaultValues: {
      flightNumber: '',
      date: ''
    }
  });

  // Watch form values for additional validation
  const watchedValues = watch();

  // Form submission handler with type safety
  const onSubmit = (data: FlightSearchFormData) => {
    console.log('Form submitted with data:', data);
    
    // Convert form data to API format
    const searchParams: FlightSearchParams = {
      flightNumber: data.flightNumber.toUpperCase().replace(/\s+/g, ''),
      date: data.date
    };
    
    onSearch(searchParams);
  };

  // Validate flight number format
  const validateFlightNumber = (value: string) => {
    const cleaned = value.toUpperCase().replace(/\s+/g, '');
    
    // Basic flight number patterns: AA1234, AAL1234, 1234, etc.
    const flightNumberPattern = /^([A-Z]{1,3})?[0-9]{1,4}[A-Z]?$/;
    
    if (!flightNumberPattern.test(cleaned)) {
      return 'Please enter a valid flight number (e.g., AA1234, DL567)';
    }
    
    return true;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Flight Number */}
      <div>
        <label htmlFor="flightNumber" className="block text-sm font-medium text-[#f4e6e8] mb-2">
          Flight Number
        </label>
        <input
          id="flightNumber"
          type="text"
          placeholder="AA1234"
          autoComplete="off"
          {...register('flightNumber', {
            required: 'Flight number is required',
            validate: {
              validFormat: validateFlightNumber,
              notEmpty: (value) => value.trim().length > 0 || 'Flight number is required'
            }
          })}
          className={`w-full px-4 py-4 text-lg bg-[#190a0f]/80 border rounded-xl text-[#f8fafc] placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
            errors.flightNumber 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
              : touchedFields.flightNumber && !errors.flightNumber
              ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20'
              : 'border-[#722f37]/40 focus:border-[#9d4851] focus:ring-[#722f37]/20'
          }`}
        />
        {errors.flightNumber && (
          <div className="mt-2 flex items-start space-x-2">
            <p className="text-sm text-red-400 leading-tight">{errors.flightNumber.message}</p>
          </div>
        )}
        <p className="mt-1 text-xs text-[#dbb8bd]">
          Examples: AA1234, DL567, UA2019, Southwest 1234
        </p>
      </div>

      {/* Flight Date */}
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-[#f4e6e8] mb-2">
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
          className={`w-full px-4 py-4 text-lg bg-[#190a0f]/80 border rounded-xl text-[#f8fafc] focus:outline-none focus:ring-2 transition-all duration-300 ${
            errors.date 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
              : touchedFields.date && !errors.date
              ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20'
              : 'border-[#722f37]/40 focus:border-[#9d4851] focus:ring-[#722f37]/20'
          }`}
        />
        {errors.date && (
          <div className="mt-2 flex items-start space-x-2">
            <p className="text-sm text-red-400 leading-tight">{errors.date.message}</p>
          </div>
        )}
      </div>

      {/* Form Actions */}
      <div className="space-y-3">
        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isValid || isLoading}
          className={`w-full py-5 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 ${
            !isValid || isLoading
              ? 'bg-gray-600 text-gray-300 cursor-not-allowed shadow-gray-600/20'
              : 'bg-gradient-to-r from-[#722f37] to-[#9d4851] text-white shadow-[#722f37]/40 hover:shadow-xl hover:shadow-[#722f37]/50 hover:-translate-y-0.5 active:translate-y-0'
          }`}
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

        {/* Reset Button */}
        <button
          type="button"
          onClick={() => reset()}
          className="w-full py-3 text-sm font-medium bg-transparent border border-[#722f37]/40 text-[#dbb8bd] rounded-xl hover:bg-[#722f37]/10 hover:border-[#722f37]/60 focus:outline-none focus:ring-2 focus:ring-[#722f37]/20 transition-all duration-300"
        >
          Clear Form
        </button>
      </div>

      {/* Form Status Indicator */}
      <div className="text-center">
        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs transition-all duration-300 ${
          isValid 
            ? 'bg-green-500/20 text-green-400' 
            : 'bg-yellow-500/20 text-yellow-400'
        }`}>
          <div className={`w-2 h-2 rounded-full ${isValid ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
          <span>{isValid ? 'Ready to analyze your flight' : 'Please enter flight number and date'}</span>
        </div>
      </div>
    </form>
  );
};

export default FlightSearchForm;