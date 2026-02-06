import React from 'react';
import type { FlightRecommendation as FlightRecommendationType } from '../../../../server/shared/types/flight.types';
import type { FlightError } from '../../types/FlightError';

interface FlightRecommendationProps {
  recommendation: FlightRecommendationType | null;
  isLoading: boolean;
  error: Error | null;
}

const FlightRecommendation: React.FC<FlightRecommendationProps> = ({
  recommendation,
  isLoading,
  error,
}) => {
  // Loading
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-14 h-14 border-2 border-white/10 border-t-white/60 rounded-full animate-spin mb-6" />
        <p className="text-text-secondary font-display font-medium text-lg">
          Analyzing your flight...
        </p>
        <p className="text-text-muted font-display text-sm mt-2">
          Checking weather, landmarks, and sun position
        </p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
        <h3 className="text-red-400 font-display font-semibold text-lg mb-1">
          Unable to analyze flight
        </h3>
        <p className="text-red-400/70 font-display text-sm">{error.message}</p>
      </div>
    );
  }

  // Empty state
  if (!recommendation) {
    return (
      <div className="text-center py-12">
        <p className="text-text-muted font-display">
          Enter your flight details to get a personalized seat recommendation.
        </p>
      </div>
    );
  }

  const { flight, recommendation: seatRec } = recommendation;

  const formatTime = (isoString: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const weatherLabel = {
    high: { text: 'Weather data available', color: 'bg-emerald-400', textColor: 'text-emerald-400' },
    partial: { text: 'Partial weather data', color: 'bg-amber-400', textColor: 'text-amber-400' },
    unavailable: { text: 'Weather forecast unavailable', color: 'bg-orange-400', textColor: 'text-orange-400' },
  };

  return (
    <div className="space-y-6 font-display">
      {/* Flight Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h2 className="font-bold text-2xl sm:text-3xl text-white tracking-tight">
            {flight.originCity} → {flight.destinationCity}
          </h2>
          <p className="text-text-tertiary text-sm mt-1">
            {flight.route} · {flight.distanceMiles.toLocaleString()} miles ·{' '}
            {Math.floor(flight.durationMinutes / 60)}h {flight.durationMinutes % 60}m
          </p>
        </div>
        <div className="text-sm text-text-tertiary text-right shrink-0">
          <p>{new Date(flight.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
          <p className="text-text-muted">{flight.departureTime} departure</p>
        </div>
      </div>

      <div className="h-px bg-white/6" />

      {/* Seat Recommendation Hero */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Recommended</p>
          <h3 className="font-bold text-3xl text-white">
            {seatRec.recommendedSeat === 'left' ? 'Left' : 'Right'} Side
          </h3>
          <p className="text-text-tertiary text-sm mt-0.5">Window seat</p>
        </div>

        {/* Confidence badge */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-text-muted text-xs">Confidence</p>
            <p className="text-white font-bold text-xl">{seatRec.confidence}/10</p>
          </div>
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-space-700 to-space-600 border border-white/10 flex items-center justify-center">
            <span className="text-white font-bold text-lg">{seatRec.confidence}</span>
          </div>
        </div>
      </div>

      {/* Simple airplane diagram */}
      <div className="flex items-center justify-center py-4">
        <div className="flex items-center space-x-6">
          {/* Left side indicator */}
          <div
            className={`px-5 py-3 rounded-lg border text-center transition-all ${
              seatRec.recommendedSeat === 'left'
                ? 'bg-white/5 border-white/20 text-white'
                : 'bg-transparent border-white/5 text-text-muted'
            }`}
          >
            <p className="text-xs uppercase tracking-wider mb-0.5">Left</p>
            <p className="font-semibold text-sm">
              {seatRec.landmarks.filter(() => seatRec.recommendedSeat === 'left').length > 0
                ? `${seatRec.landmarks.length} landmarks`
                : 'Window A/B/C'}
            </p>
          </div>

          {/* Plane body */}
          <div className="w-12 h-24 bg-space-800/80 border border-white/10 rounded-lg relative">
            <div className="absolute top-2 left-1 right-1 h-0.5 bg-white/20 rounded" />
            <div
              className={`absolute top-5 w-2.5 h-2.5 rounded-sm ${
                seatRec.recommendedSeat === 'left'
                  ? 'left-1.5 bg-white/60'
                  : 'right-1.5 bg-white/60'
              }`}
            />
            <div
              className={`absolute top-5 w-2.5 h-2.5 rounded-sm border border-white/20 ${
                seatRec.recommendedSeat === 'left' ? 'right-1.5' : 'left-1.5'
              }`}
            />
          </div>

          {/* Right side indicator */}
          <div
            className={`px-5 py-3 rounded-lg border text-center transition-all ${
              seatRec.recommendedSeat === 'right'
                ? 'bg-white/5 border-white/20 text-white'
                : 'bg-transparent border-white/5 text-text-muted'
            }`}
          >
            <p className="text-xs uppercase tracking-wider mb-0.5">Right</p>
            <p className="font-semibold text-sm">
              {seatRec.recommendedSeat === 'right'
                ? `${seatRec.landmarks.length} landmarks`
                : 'Window D/E/F'}
            </p>
          </div>
        </div>
      </div>

      <div className="h-px bg-white/6" />

      {/* Reasoning */}
      <div>
        <h4 className="font-semibold text-base text-white mb-2">Why this seat?</h4>
        <p className="text-text-secondary text-sm leading-relaxed">{seatRec.reasoning}</p>
      </div>

      {/* Landmarks */}
      {seatRec.landmarks.length > 0 && (
        <div>
          <h4 className="font-semibold text-base text-white mb-3">
            Landmarks You'll See
            <span className="text-text-muted font-normal ml-2 text-sm">
              ({seatRec.landmarks.length})
            </span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {seatRec.landmarks.map((landmark, index) => (
              <div key={index} className="landmark-item">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-space-700 to-space-600 border border-white/10 flex items-center justify-center shrink-0">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <span className="text-white text-sm font-medium block">
                        {landmark.name}
                      </span>
                      <span className="text-text-muted text-xs">
                        {formatTime(landmark.estimatedTime)} · {landmark.distanceFromOrigin} mi
                      </span>
                    </div>
                  </div>
                  {landmark.cloudCover !== undefined && (
                    <span className="text-text-muted text-xs shrink-0 ml-2">
                      {landmark.cloudCover}% ☁
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weather confidence footer */}
      <div className="pt-2">
        <div className="flex items-center space-x-2">
          <div className={`w-1.5 h-1.5 rounded-full ${weatherLabel[seatRec.weatherConfidence].color}`} />
          <span className={`text-xs font-display ${weatherLabel[seatRec.weatherConfidence].textColor}`}>
            {weatherLabel[seatRec.weatherConfidence].text}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FlightRecommendation;