import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { FlightRecommendation as FlightRecommendationType } from '../../../../server/shared/types/flight.types';

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
  const seatRec = recommendation?.recommendation;

  const cleanupRef = useRef<(() => void) | null>(null);

  const carouselRef = useCallback((el: HTMLDivElement | null) => {
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
    if (!el) return;

    const handler = (e: WheelEvent) => {
      const canScroll = el.scrollWidth > el.clientWidth;
      if (!canScroll) return;
      e.preventDefault();
      const scrollAmount = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    el.addEventListener('wheel', handler, { passive: false });
    cleanupRef.current = () => el.removeEventListener('wheel', handler);
  }, []);

  const [activeTab, setActiveTab] = useState<'left' | 'right'>(seatRec?.recommendedSeat ?? 'left');

  const activeLandmarks = activeTab === 'left'
    ? seatRec?.leftSide?.landmarks ?? []
    : seatRec?.rightSide?.landmarks ?? [];

  // Loading
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-14 h-14 border-2 border-amber-glow-500/10 border-t-amber-glow-400/60 rounded-full animate-spin mb-6" />
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
  if (!recommendation || !seatRec) {
    return (
      <div className="text-center py-12">
        <p className="text-text-muted font-display">
          Enter your flight details to get a personalized seat recommendation.
        </p>
      </div>
    );
  }

  const { flight } = recommendation;

  const defaultSide = { landmarks: [], glarePercent: 0, averageCloudCover: null };
  const leftSide = seatRec.leftSide ?? defaultSide;
  const rightSide = seatRec.rightSide ?? defaultSide;

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
          <h3 className="font-bold text-3xl text-amber-glow-400">
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
          <div className="w-14 h-14 rounded-full bg-amber-glow-900 border border-amber-glow-500/20 flex items-center justify-center">
            <span className="text-white font-bold text-lg">{seatRec.confidence}</span>
          </div>
        </div>
      </div>

      {/* Side-by-side comparison */}
      <div className="flex items-stretch gap-3 py-2">
        {/* Left side card */}
        <div
          className={`flex-1 rounded-xl p-4 border transition-all ${
            seatRec.recommendedSeat === 'left'
              ? 'bg-white/5 border-amber-glow-500/30 text-white'
              : 'bg-transparent border-dashed border-white/10 text-text-muted'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs uppercase tracking-wider font-semibold">Left</p>
            {seatRec.recommendedSeat === 'left' && (
              <span className="text-[10px] uppercase tracking-wider font-bold bg-amber-glow-500/20 text-amber-glow-400 px-2 py-0.5 rounded-full">
                Recommended
              </span>
            )}
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-muted">Landmarks</span>
              <span className="font-medium">{leftSide.landmarks.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Sun glare</span>
              <span className="font-medium">{leftSide.glarePercent}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Cloud cover</span>
              <span className="font-medium">
                {leftSide.averageCloudCover !== null ? `${leftSide.averageCloudCover}%` : '—'}
              </span>
            </div>
          </div>
        </div>

        {/* Plane icon divider */}
        <div className="flex items-center px-1">
          <span className="text-text-muted text-xl">✈</span>
        </div>

        {/* Right side card */}
        <div
          className={`flex-1 rounded-xl p-4 border transition-all ${
            seatRec.recommendedSeat === 'right'
              ? 'bg-white/5 border-amber-glow-500/30 text-white'
              : 'bg-transparent border-dashed border-white/10 text-text-muted'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs uppercase tracking-wider font-semibold">Right</p>
            {seatRec.recommendedSeat === 'right' && (
              <span className="text-[10px] uppercase tracking-wider font-bold bg-amber-glow-500/20 text-amber-glow-400 px-2 py-0.5 rounded-full">
                Recommended
              </span>
            )}
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-muted">Landmarks</span>
              <span className="font-medium">{rightSide.landmarks.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Sun glare</span>
              <span className="font-medium">{rightSide.glarePercent}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Cloud cover</span>
              <span className="font-medium">
                {rightSide.averageCloudCover !== null ? `${rightSide.averageCloudCover}%` : '—'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-white/6" />

      {/* Reasoning */}
      <div>
        <h4 className="font-semibold text-base text-white mb-2">Why this seat?</h4>
        <p className="text-text-secondary text-sm leading-relaxed">{seatRec.reasoning}</p>
      </div>

      {/* Landmarks with side tabs */}
      {(leftSide.landmarks.length > 0 || rightSide.landmarks.length > 0) && (
        <div>
          <h4 className="font-semibold text-base text-white mb-3">
            Landmarks Along Route
          </h4>

          {/* Tab buttons */}
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setActiveTab('left')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'left'
                  ? seatRec.recommendedSeat === 'left'
                    ? 'bg-amber-glow-500/20 text-amber-glow-400 border border-amber-glow-500/30'
                    : 'bg-white/10 text-white border border-white/20'
                  : 'bg-transparent text-text-muted border border-white/5 hover:border-white/10'
              }`}
            >
              Left ({leftSide.landmarks.length})
            </button>
            <button
              onClick={() => setActiveTab('right')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'right'
                  ? seatRec.recommendedSeat === 'right'
                    ? 'bg-amber-glow-500/20 text-amber-glow-400 border border-amber-glow-500/30'
                    : 'bg-white/10 text-white border border-white/20'
                  : 'bg-transparent text-text-muted border border-white/5 hover:border-white/10'
              }`}
            >
              Right ({rightSide.landmarks.length})
            </button>
          </div>

          {/* Landmark carousel for active tab */}
          {activeLandmarks.length > 0 ? (
            <div
              ref={carouselRef}
              className="flex overflow-x-auto gap-3 pb-3 snap-x snap-mandatory scrollbar-thin -mx-1 px-1"
            >
              {activeLandmarks.map((landmark, index) => (
                <div
                  key={`${activeTab}-${index}`}
                  className="landmark-item min-w-[220px] max-w-[260px] shrink-0 snap-start rounded-xl bg-white/[0.03] border border-white/[0.06] p-4"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-7 h-7 rounded-full bg-amber-glow-900 border border-amber-glow-500/20 flex items-center justify-center shrink-0">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                    <span className="text-white text-sm font-medium">
                      {landmark.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-text-muted text-xs mt-1 pl-10">
                    <span>
                      {formatTime(landmark.estimatedTime)} · {landmark.distanceFromOrigin} mi
                    </span>
                    {landmark.cloudCover !== undefined && (
                      <span className="shrink-0 ml-2">
                        {landmark.cloudCover}% ☁
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-text-muted text-sm">No landmarks on this side.</p>
          )}
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