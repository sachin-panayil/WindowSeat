import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FlightSearchForm from '../components/forms/FlightSearchForm';
import FlightRecommendation from '../components/results/FlightRecommendation';
import SearchStatus from '../components/results/SearchStatus';
import Stars from '../components/background/Stars';
import EarthOutline from '../components/background/EarthOutline';
import DebugBar from '../components/debug/DebugBar';
import { useFlightRecommendation } from '../hooks/useFlightRecommendation';
import type { FlightSearchParams, FlightRecommendation as FlightRecType } from '../../../shared/types/flight.types';

const TRANSITION = { duration: 1.2, ease: [0.4, 0, 0.2, 1] as const };

const SearchPage: React.FC = () => {
  const [view, setView] = useState<'form' | 'results'>('form');

  const {
    recommendation: realRecommendation,
    isLoading: realLoading,
    error: realError,
    searchFlight,
    clearSearch: realClearSearch,
    searchParams: realSearchParams,
  } = useFlightRecommendation();

  const [testData, setTestData] = useState<{
    params: FlightSearchParams;
    recommendation: FlightRecType | null;
    loading: boolean;
  } | null>(null);

  const isTestMode = testData !== null;
  const searchParams = isTestMode ? testData.params : realSearchParams;
  const recommendation = isTestMode ? testData.recommendation : realRecommendation;
  const isLoading = isTestMode ? testData.loading : realLoading;
  const error = isTestMode ? null : (realError as Error | null);
  const showResults = view === 'results';

  const handleSearch = useCallback(
    (params: FlightSearchParams) => {
      setTestData(null);
      searchFlight(params);
      setView('results');
    },
    [searchFlight]
  );

  const handleInjectTest = useCallback(
    (params: FlightSearchParams, rec: FlightRecType) => {
      setTestData({ params, recommendation: null, loading: true });
      setView('results');
      setTimeout(() => {
        setTestData({ params, recommendation: rec, loading: false });
      }, 1500);
    },
    []
  );

  const handleClear = useCallback(() => {
    setView('form');
    setTimeout(() => {
      setTestData(null);
      realClearSearch();
    }, 600);
  }, [realClearSearch]);

  return (
    <div className="relative h-screen bg-space-black overflow-hidden">
      <DebugBar view={view} onInjectTest={handleInjectTest} onReset={handleClear} />
      <Stars count={150} />

      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Earth */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ rotateX: 75, y: '35%', scale: 1.3 }}
          animate={{
            rotateX: showResults ? 0 : 75,
            y: showResults ? '0%' : '35%',
            scale: showResults ? 1.15 : 1.3,
          }}
          transition={TRANSITION}
          style={{ transformPerspective: 1200, transformStyle: 'preserve-3d' }}
        >
          <EarthOutline className="opacity-50 w-[130vmin] h-[130vmin]" />
        </motion.div>

        {/* Form / Results */}
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="form"
              className="relative z-10 w-full max-w-md mx-auto px-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -60 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="text-center mb-8">
                <h1 className="font-display font-bold text-6xl sm:text-7xl text-white tracking-tight mb-3">
                  WindowSeat
                </h1>
                <p className="font-display font-medium text-lg sm:text-xl text-text-secondary">
                  AI-powered seat recommendations
                </p>
              </div>
              <div className="glass-card p-8">
                <FlightSearchForm onSearch={handleSearch} isLoading={isLoading} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              className="absolute inset-0 flex items-start justify-center overflow-y-auto pt-8 pb-20 px-4 z-10"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="w-full max-w-3xl">
                {searchParams && (
                  <>
                    <SearchStatus searchParams={searchParams} onClearSearch={handleClear} />
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