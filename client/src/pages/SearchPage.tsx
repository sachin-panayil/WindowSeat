import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FlightSearchForm from '../components/forms/FlightSearchForm';
import FlightRecommendation from '../components/results/FlightRecommendation';
import SearchStatus from '../components/results/SearchStatus';
import Stars from '../components/background/Stars';
import EarthOutline from '../components/background/EarthOutline';
import { useFlightRecommendation } from '../hooks/useFlightRecommendation';
import type { FlightSearchParams, FlightRecommendation as FlightRecType } from '../../../shared/types/flight.types';

// ============================================
// MOCK DATA — remove before production
// ============================================
const MOCK_SEARCH_PARAMS: FlightSearchParams = {
  origin: 'LAX',
  destination: 'JFK',
  date: '2026-02-15',
  departureTime: '10:30',
};

const MOCK_RECOMMENDATION: FlightRecType = {
  flight: {
    route: 'LAX → JFK',
    origin: 'LAX',
    destination: 'JFK',
    originCity: 'Los Angeles',
    destinationCity: 'New York',
    departureTime: '10:30',
    date: '2026-02-15',
    distanceMiles: 2475,
    durationMinutes: 297,
  },
  recommendation: {
    recommendedSeat: 'left',
    confidence: 8,
    reasoning:
      "On your flight from LAX to JFK, the left side offers a remarkable array of scenic views. Shortly after takeoff, you'll glide over the stunning Sierra Nevada range, though partly obscured by clouds. As you continue, around 1 hour into the flight, the majestic Rocky Mountains will come into view with only 7% cloud cover, providing a clear perspective. You'll also catch views of Pikes Peak and the dramatic landscapes of Death Valley. Approaching New York, the Catskill Mountains will be visible. With no sun glare on the left side, you'll enjoy uninterrupted views throughout the flight.",
    landmarks: [
      { name: 'Pikes Peak', side: 'left', distanceFromOrigin: 820, estimatedTime: '2026-02-15T19:08:00.000Z', cloudCover: 7 },
      { name: 'Death Valley', side: 'left', distanceFromOrigin: 195, estimatedTime: '2026-02-15T17:53:24.000Z', cloudCover: 100 },
      { name: 'Rocky Mountains (Colorado)', side: 'left', distanceFromOrigin: 850, estimatedTime: '2026-02-15T19:11:36.000Z', cloudCover: 7 },
      { name: 'Sierra Nevada (South)', side: 'left', distanceFromOrigin: 180, estimatedTime: '2026-02-15T17:51:36.000Z', cloudCover: 45 },
      { name: 'Catskill Mountains', side: 'left', distanceFromOrigin: 2280, estimatedTime: '2026-02-15T22:02:24.000Z', cloudCover: 92 },
      { name: 'Sangre de Cristo Mountains', side: 'left', distanceFromOrigin: 760, estimatedTime: '2026-02-15T19:01:12.000Z', cloudCover: 12 },
      { name: 'San Juan Mountains', side: 'left', distanceFromOrigin: 700, estimatedTime: '2026-02-15T18:54:00.000Z', cloudCover: 15 },
      { name: 'Appalachian Blue Ridge', side: 'left', distanceFromOrigin: 2100, estimatedTime: '2026-02-15T21:40:48.000Z', cloudCover: 68 },
    ],
    weatherConfidence: 'high',
  },
};

// Animation duration for the transition
const TRANSITION = { duration: 1.2, ease: [0.4, 0, 0.2, 1] };

// ============================================
// PAGE COMPONENT
// ============================================
const SearchPage: React.FC = () => {
  // View state: 'form' or 'results'
  const [view, setView] = useState<'form' | 'results'>('form');

  // Real hook for actual API calls
  const {
    recommendation: realRecommendation,
    isLoading: realLoading,
    error: realError,
    searchFlight,
    clearSearch: realClearSearch,
    searchParams: realSearchParams,
  } = useFlightRecommendation();

  // Test mode state
  const [testMode, setTestMode] = useState(false);
  const [testSearchParams, setTestSearchParams] = useState<FlightSearchParams | null>(null);
  const [testRecommendation, setTestRecommendation] = useState<FlightRecType | null>(null);
  const [testLoading, setTestLoading] = useState(false);

  // Merge real + test state
  const searchParams = testMode ? testSearchParams : realSearchParams;
  const recommendation = testMode ? testRecommendation : realRecommendation;
  const isLoading = testMode ? testLoading : realLoading;
  const error = testMode ? null : realError;

  const showResults = view === 'results';

  // Handle real search
  const handleSearch = useCallback(
    (params: FlightSearchParams) => {
      setTestMode(false);
      searchFlight(params);
      setView('results');
    },
    [searchFlight]
  );

  // Handle test flight
  const handleTestFlight = useCallback(() => {
    setTestMode(true);
    setTestLoading(true);
    setTestRecommendation(null);
    setTestSearchParams(MOCK_SEARCH_PARAMS);
    setView('results');

    setTimeout(() => {
      setTestRecommendation(MOCK_RECOMMENDATION);
      setTestLoading(false);
    }, 1500);
  }, []);

  // Handle clear → back to form
  const handleClear = useCallback(() => {
    setView('form');
    // Delay clearing data so it doesn't vanish mid-animation
    setTimeout(() => {
      if (testMode) {
        setTestSearchParams(null);
        setTestRecommendation(null);
        setTestLoading(false);
        setTestMode(false);
      } else {
        realClearSearch();
      }
    }, 600);
  }, [testMode, realClearSearch]);

  return (
    <div className="relative h-screen bg-space-black overflow-hidden">
      {/* ============================================
          DEBUG TOOLBAR — remove before production
          ============================================ */}
      <div className="fixed bottom-4 left-4 right-4 z-50 bg-space-900/95 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 flex items-center justify-center space-x-3">
        <span className="text-text-muted text-xs font-display whitespace-nowrap">
          View: {view}
        </span>
        <button
          onClick={handleTestFlight}
          className="px-3 py-1.5 bg-space-700 hover:bg-space-600 border border-white/10 rounded-lg text-white text-xs font-display font-medium transition-colors whitespace-nowrap"
        >
          ▶ Test Flight
        </button>
        <button
          onClick={handleClear}
          className="px-3 py-1.5 bg-space-800 hover:bg-space-700 border border-white/10 rounded-lg text-text-muted text-xs font-display transition-colors whitespace-nowrap"
        >
          ✕ Reset
        </button>
      </div>

      {/* Fixed background */}
      <Stars count={150} />

      {/* Full-screen viewport */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">

        {/* Earth — animates between form and results positions */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{
            rotateX: 75,
            y: '35%',
            scale: 1.3,
          }}
          animate={{
            rotateX: showResults ? 0 : 75,
            y: showResults ? '0%' : '35%',
            scale: showResults ? 1.15 : 1.3,
          }}
          transition={TRANSITION}
          style={{
            transformPerspective: 1200,
            transformStyle: 'preserve-3d',
          }}
        >
          <EarthOutline className="opacity-50 w-[130vmin] h-[130vmin]" />
        </motion.div>

        {/* ---- FORM LAYER ---- */}
        <AnimatePresence mode="wait">
          {!showResults && (
            <motion.div
              key="form"
              className="relative z-10 w-full max-w-md mx-auto px-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -60 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Title */}
              <div className="text-center mb-8">
                <h1 className="font-display font-bold text-6xl sm:text-7xl text-white tracking-tight mb-3">
                  WindowSeat
                </h1>
                <p className="font-display font-medium text-lg sm:text-xl text-text-secondary">
                  AI-powered seat recommendations
                </p>
              </div>

              {/* Form Card */}
              <div className="glass-card p-8">
                <FlightSearchForm
                  onSearch={handleSearch}
                  isLoading={isLoading}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---- RESULTS LAYER ---- */}
        <AnimatePresence mode="wait">
          {showResults && (
            <motion.div
              key="results"
              className="absolute inset-0 flex items-start justify-center overflow-y-auto pt-8 pb-20 px-4 z-10"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
            >
              <div className="w-full max-w-3xl">
                {searchParams && (
                  <>
                    <SearchStatus
                      searchParams={searchParams}
                      onClearSearch={handleClear}
                    />
                    <div className="mt-6 results-card">
                      <FlightRecommendation
                        recommendation={recommendation}
                        isLoading={isLoading}
                        error={error}
                      />
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchPage;