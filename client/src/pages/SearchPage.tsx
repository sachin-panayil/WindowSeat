import React, { useEffect, useRef } from 'react';
import FlightSearchForm from '../components/forms/FlightSearchForm';
import FlightRecommendation from '../components/results/FlightRecommendation';
import SearchStatus from '../components/results/SearchStatus';
import { Stars, FlyingPlanes, EarthOutline } from '../components/background';
import { useFlightRecommendation } from '../hooks/useFlightRecommendation';

const SearchPage: React.FC = () => {
  const resultsRef = useRef<HTMLDivElement>(null);
  
  const {
    recommendation,
    isLoading,
    error,
    searchFlight,
    clearSearch,
    searchParams
  } = useFlightRecommendation();

  // Scroll to results when search completes
  useEffect(() => {
    if (recommendation && resultsRef.current) {
      resultsRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }, [recommendation]);

  return (
    <div className="min-h-screen bg-space-black relative overflow-x-hidden">
      {/* Background Elements - Fixed */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Stars */}
        <Stars count={120} />
        
        {/* Flying Planes */}
        <FlyingPlanes enabled={true} planeCount={3} />
        
        {/* Earth - positioned lower and larger, more subtle */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3">
          <EarthOutline className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-40" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section with Form */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-black text-white tracking-tight mb-4">
              WindowSeat
            </h1>
            <p className="text-lg md:text-xl text-text-secondary font-display font-medium max-w-md mx-auto">
              AI-powered seat recommendations for the best views
            </p>
          </div>

          {/* Form Card */}
          <div className="w-full max-w-md">
            <div className="glass-card p-6 md:p-8">
              <FlightSearchForm 
                onSearch={searchFlight}
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* Scroll hint - only show when no search */}
          {!searchParams && !isLoading && (
            <div className="mt-16 text-text-muted text-sm font-display text-center opacity-60">
              <p>Enter your flight details to get started</p>
            </div>
          )}
        </section>

        {/* Results Section */}
        {searchParams && (
          <section 
            ref={resultsRef} 
            className="min-h-screen px-4 py-12 pt-20"
          >
            {/* Back to top button */}
            <div className="max-w-3xl mx-auto mb-6">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-text-muted hover:text-white text-sm font-display transition-colors flex items-center space-x-2 group"
              >
                <svg 
                  className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <span>Back to search</span>
              </button>
            </div>

            {/* Search Status */}
            <SearchStatus 
              searchParams={searchParams}
              onClearSearch={() => {
                clearSearch();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            
            {/* Recommendation Results */}
            <div className="max-w-3xl mx-auto">
              <div className="glass-card p-5 md:p-8">
                <FlightRecommendation 
                  recommendation={recommendation}
                  isLoading={isLoading}
                  error={error}
                />
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default SearchPage;