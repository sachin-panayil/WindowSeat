import React from 'react';
import type { FlightRecommendation as FlightRecommendationType } from '../../../../server/shared/types/flight.types';
import type { FlightError } from '../../types/FlightError';

interface FlightRecommendationProps {
  recommendation: FlightRecommendationType | null;
  isLoading: boolean;
  error: FlightError | null;
  onRetry?: () => void;
}

const errorTitles: Record<string, string> = {
  AIRPORT_NOT_FOUND: 'Invalid Airport Code',
  TIMEOUT: 'Request Timed Out',
  AI_UNAVAILABLE: 'AI Service Unavailable',
  SERVICE_ERROR: 'Service Temporarily Unavailable',
  RATE_LIMITED: 'Too Many Requests',
  NETWORK_ERROR: 'Connection Error',
  INTERNAL_ERROR: 'Something Went Wrong',
  UNKNOWN_ERROR: 'Unexpected Error'
};

const FlightRecommendation: React.FC<FlightRecommendationProps> = ({ 
  recommendation, 
  isLoading, 
  error,
  onRetry
}) => {
  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-16 h-16 border-4 border-[#722f37]/30 border-t-[#9d4851] rounded-full animate-spin mb-6"></div>
        <p className="text-[#dbb8bd] text-lg">Analyzing your flight...</p>
        <p className="text-[#dbb8bd]/60 text-sm mt-2">Getting weather data and landmark information</p>
      </div>
    );
  }

  // Handle error state
  if (error) {
    const title = errorTitles[error.code] || 'Unable to analyze flight';
    
    return (
      <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          {/* Error icon */}
          <div className="flex-shrink-0 w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <div className="flex-1">
            <h3 className="text-red-300 font-medium text-lg mb-1">{title}</h3>
            <p className="text-red-400/80 text-sm mb-4">{error.message}</p>
            
            {error.retryable && onRetry && (
              <button
                onClick={onRetry}
                className="inline-flex items-center px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 rounded-lg text-red-300 text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try Again
              </button>
            )}
            
            {!error.retryable && (
              <p className="text-red-400/60 text-xs">
                Please check your input and try a new search.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Handle no recommendation
  if (!recommendation) {
    return (
      <div className="text-center py-8 text-[#dbb8bd]">
        Enter your flight details above to get a personalized seat recommendation.
      </div>
    );
  }

  const { flight, recommendation: seatRec } = recommendation;

  // Format estimated time for display
  const formatTime = (isoString: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  // Weather confidence display
  const weatherConfidenceDisplay = {
    high: { text: 'Weather data available', color: 'text-green-400' },
    partial: { text: 'Partial weather data', color: 'text-yellow-400' },
    unavailable: { text: 'Weather forecast not yet available', color: 'text-orange-400' }
  };

  return (
    <div className="space-y-6">
      {/* Flight Details Header */}
      <div className="bg-[#190a0f]/60 border border-[#722f37]/20 rounded-xl p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-[#f4e6e8] mb-1">
              {flight.originCity} → {flight.destinationCity}
            </h2>
            <p className="text-[#dbb8bd] text-lg">
              {flight.route}
            </p>
          </div>
          <div className="text-right text-sm text-[#dbb8bd]">
            <p>{new Date(flight.date).toLocaleDateString()}</p>
            <p>{flight.distanceMiles.toLocaleString()} miles</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="block font-medium text-[#f4e6e8]">Departure</span>
            <span className="text-[#dbb8bd]">{flight.departureTime}</span>
          </div>
          <div>
            <span className="block font-medium text-[#f4e6e8]">Duration</span>
            <span className="text-[#dbb8bd]">
              {Math.floor(flight.durationMinutes / 60)}h {flight.durationMinutes % 60}m
            </span>
          </div>
        </div>
      </div>

      {/* Seat Recommendation */}
      <div className="bg-[#190a0f]/60 border border-[#722f37]/20 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-[#f4e6e8]">
            Recommended Seat
          </h3>
          <div className="flex items-center space-x-2">
            <div className="text-right">
              <div className="text-sm text-[#dbb8bd]">Confidence</div>
              <div className="text-lg font-bold text-[#f4e6e8]">{seatRec.confidence}/10</div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-[#722f37] to-[#9d4851] rounded-full flex items-center justify-center">
              <span className="text-white font-bold">{seatRec.confidence}</span>
            </div>
          </div>
        </div>

        {/* Seat Visualization */}
        <div className="flex items-center space-x-6 mb-6">
          <div className="flex-1">
            <div className="bg-[#722f37]/20 border border-[#722f37]/40 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#f4e6e8] mb-1">
                {seatRec.recommendedSeat === 'left' ? 'Left Side' : 'Right Side'}
              </div>
              <div className="text-[#dbb8bd] text-sm">
                Window Seat
              </div>
            </div>
          </div>
          
          {/* Simple airplane seat diagram */}
          <div className="flex-shrink-0">
            <div className="w-20 h-32 bg-[#371e23]/80 border border-[#722f37]/30 rounded-lg relative">
              <div className="absolute top-2 left-1 right-1 h-1 bg-[#722f37]/60 rounded"></div>
              <div className={`absolute top-6 w-3 h-3 rounded ${
                seatRec.recommendedSeat === 'left' ? 'left-1 bg-[#9d4851]' : 'right-1 bg-[#9d4851]'
              }`}></div>
              <div className={`absolute top-6 w-3 h-3 rounded border border-[#722f37]/40 ${
                seatRec.recommendedSeat === 'left' ? 'right-1' : 'left-1'
              }`}></div>
            </div>
          </div>
        </div>

        {/* Reasoning */}
        <div className="mb-6">
          <h4 className="font-medium text-[#f4e6e8] mb-2">Why this seat?</h4>
          <p className="text-[#dbb8bd] leading-relaxed">{seatRec.reasoning}</p>
        </div>

        {/* Landmarks */}
        {seatRec.landmarks.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium text-[#f4e6e8] mb-3">
              Landmarks You'll See ({seatRec.landmarks.length})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {seatRec.landmarks.map((landmark, index) => (
                <div 
                  key={index}
                  className="bg-[#722f37]/10 border border-[#722f37]/20 rounded-lg p-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#722f37] to-[#9d4851] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <span className="text-[#f4e6e8] text-sm font-medium block">{landmark.name}</span>
                        <span className="text-[#dbb8bd]/60 text-xs">
                          {formatTime(landmark.estimatedTime)} • {landmark.distanceFromOrigin} mi
                        </span>
                      </div>
                    </div>
                    {landmark.cloudCover !== undefined && (
                      <div className="text-xs text-[#dbb8bd]/60">
                        {landmark.cloudCover}% clouds
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Weather Confidence */}
        <div className="border-t border-[#722f37]/20 pt-4">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              seatRec.weatherConfidence === 'high' ? 'bg-green-400' :
              seatRec.weatherConfidence === 'partial' ? 'bg-yellow-400' : 'bg-orange-400'
            }`}></div>
            <span className={`text-sm ${weatherConfidenceDisplay[seatRec.weatherConfidence].color}`}>
              {weatherConfidenceDisplay[seatRec.weatherConfidence].text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightRecommendation;