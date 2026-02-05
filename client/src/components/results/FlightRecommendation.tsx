import React from 'react';
import type { FlightRecommendation as FlightRecommendationType } from '../../../../shared/types/flight.types';

interface FlightRecommendationProps {
  recommendation: FlightRecommendationType | null;
  isLoading: boolean;
  error: Error | null;
}

const FlightRecommendation: React.FC<FlightRecommendationProps> = ({ 
  recommendation, 
  isLoading, 
  error 
}) => {
  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-16 h-16 border-2 border-white/10 border-t-white/60 rounded-full animate-spin mb-6"></div>
        <p className="text-text-secondary text-lg font-display">Analyzing your flight...</p>
        <p className="text-text-muted text-sm mt-2 font-display">Getting weather data and landmark information</p>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
        <h3 className="text-red-400 font-display font-semibold text-lg mb-2">Unable to analyze flight</h3>
        <p className="text-red-400/80 text-sm font-display">{error.message}</p>
      </div>
    );
  }

  // Handle no recommendation
  if (!recommendation) {
    return (
      <div className="text-center py-12 text-text-muted font-display">
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
    high: { text: 'Weather data available', dotClass: 'status-dot--success' },
    partial: { text: 'Partial weather data', dotClass: 'status-dot--warning' },
    unavailable: { text: 'Weather forecast not yet available', dotClass: 'status-dot--error' }
  };

  // Confidence color based on score
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 8) return 'text-green-400';
    if (confidence >= 5) return 'text-yellow-400';
    return 'text-orange-400';
  };

  return (
    <div className="space-y-6">
      {/* Flight Details Header */}
      <div className="bg-space-950/60 border border-white/5 rounded-xl p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-display font-bold text-white mb-1">
              {flight.originCity} → {flight.destinationCity}
            </h2>
            <p className="text-text-tertiary text-lg font-display">
              {flight.route}
            </p>
          </div>
          <div className="text-right text-sm text-text-muted font-display">
            <p>{new Date(flight.date).toLocaleDateString()}</p>
            <p>{flight.distanceMiles.toLocaleString()} miles</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="block font-display font-medium text-text-secondary">Departure</span>
            <span className="text-text-tertiary font-display">{flight.departureTime}</span>
          </div>
          <div>
            <span className="block font-display font-medium text-text-secondary">Duration</span>
            <span className="text-text-tertiary font-display">
              {Math.floor(flight.durationMinutes / 60)}h {flight.durationMinutes % 60}m
            </span>
          </div>
        </div>
      </div>

      {/* Seat Recommendation */}
      <div className="bg-space-950/60 border border-white/5 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-display font-semibold text-white">
            Recommended Seat
          </h3>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-xs text-text-muted font-display uppercase tracking-wide">Confidence</div>
              <div className={`text-2xl font-display font-bold ${getConfidenceColor(seatRec.confidence)}`}>
                {seatRec.confidence}/10
              </div>
            </div>
          </div>
        </div>

        {/* Seat Side Display */}
        <div className="flex items-center space-x-6 mb-8">
          <div className="flex-1">
            <div className="bg-gradient-to-br from-space-800 to-space-900 border border-white/10 rounded-xl p-6 text-center">
              <div className="text-3xl font-display font-bold text-white mb-2">
                {seatRec.recommendedSeat === 'left' ? 'Left Side' : 'Right Side'}
              </div>
              <div className="text-text-tertiary text-sm font-display">
                Window Seat Recommended
              </div>
            </div>
          </div>
          
          {/* Simple airplane seat diagram */}
          <div className="flex-shrink-0">
            <div className="w-24 h-36 bg-space-900 border border-white/10 rounded-xl relative overflow-hidden">
              {/* Cockpit indicator */}
              <div className="absolute top-2 left-2 right-2 h-1 bg-white/20 rounded-full"></div>
              
              {/* Wing indicators */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-8 bg-white/10 rounded-r"></div>
              <div className="absolute top-1/2 -translate-y-1/2 right-0 w-2 h-8 bg-white/10 rounded-l"></div>
              
              {/* Seat indicators */}
              <div className="absolute top-8 left-2 right-2 flex justify-between px-1">
                {/* Left seats */}
                <div className={`w-4 h-4 rounded-sm transition-all ${
                  seatRec.recommendedSeat === 'left' 
                    ? 'bg-green-500 shadow-lg shadow-green-500/50' 
                    : 'bg-white/20'
                }`}></div>
                {/* Right seats */}
                <div className={`w-4 h-4 rounded-sm transition-all ${
                  seatRec.recommendedSeat === 'right' 
                    ? 'bg-green-500 shadow-lg shadow-green-500/50' 
                    : 'bg-white/20'
                }`}></div>
              </div>
              
              {/* Labels */}
              <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[10px] font-display text-text-muted">
                <span>L</span>
                <span>R</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reasoning */}
        <div className="mb-6">
          <h4 className="font-display font-medium text-text-secondary mb-3">Why this seat?</h4>
          <p className="text-text-tertiary leading-relaxed font-display">{seatRec.reasoning}</p>
        </div>

        {/* Divider */}
        <div className="divider my-6"></div>

        {/* Landmarks */}
        {seatRec.landmarks.length > 0 && (
          <div className="mb-6">
            <h4 className="font-display font-medium text-text-secondary mb-4">
              Landmarks You'll See ({seatRec.landmarks.length})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {seatRec.landmarks.map((landmark, index) => (
                <div key={index} className="landmark-card">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="badge">
                        <span className="text-white text-sm font-display font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <span className="text-white text-sm font-display font-medium block">
                          {landmark.name}
                        </span>
                        <span className="text-text-muted text-xs font-display">
                          {formatTime(landmark.estimatedTime)} • {landmark.distanceFromOrigin} mi
                        </span>
                      </div>
                    </div>
                    {landmark.cloudCover !== undefined && (
                      <div className="text-xs text-text-muted font-display">
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
        <div className="pt-4">
          <div className="flex items-center space-x-2">
            <div className={`status-dot ${weatherConfidenceDisplay[seatRec.weatherConfidence].dotClass}`}></div>
            <span className="text-sm text-text-muted font-display">
              {weatherConfidenceDisplay[seatRec.weatherConfidence].text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightRecommendation;