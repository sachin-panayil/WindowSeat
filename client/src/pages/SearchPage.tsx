import React, { useEffect, useRef } from 'react';
import FlightSearchForm from '../components/forms/FlightSearchForm';
import FlightRecommendation from '../components/results/FlightRecommendation';
import SearchStatus from '../components/results/SearchStatus';
import FlyingPlanes from '../components/common/FlyingPlanes';
import { useFlightRecommendation } from '../hooks/useFlightRecommendation';

const SearchPage: React.FC = () => {
  const resultsRef = useRef<HTMLDivElement>(null);
  
  // Updated hook for flight recommendations instead of flight search
  const {
    recommendation,
    isLoading,
    error,
    searchFlight,
    clearSearch,
    searchParams
  } = useFlightRecommendation();

  // Scroll to results when search starts - form goes out of view
  useEffect(() => {
    if (searchParams && resultsRef.current) {
      resultsRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#722f37] to-[#2a1419] relative overflow-hidden">
      {/* Animated airplanes */}
      <FlyingPlanes enabled={true} planeCount={3} />

      {/* Main Content */}
      <div className="relative z-10 w-full py-8">
        {/* Header Section */}
        <div className="max-w-lg mx-auto px-4 pb-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#722f37] to-[#9d4851] rounded-2xl shadow-lg shadow-[#722f37]/40 flex items-center justify-center text-3xl mx-auto mb-6">
            ✈️
          </div>
          <h1 className="text-3xl font-bold text-[#f8fafc] mb-3 tracking-tight">
            WindowSeat
          </h1>
          <p className="text-[#dbb8bd] text-lg">
            AI-powered airplane seat recommendations to give you the best view!
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-lg mx-auto px-4 mb-8">
          <div className="bg-[#371e23]/80 backdrop-blur-xl border border-[#722f37]/40 rounded-3xl p-8 shadow-2xl">
            <FlightSearchForm 
              onSearch={searchFlight}
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Conditional gap - only appears after form submission to push results down */}
        {searchParams && <div className="h-32"></div>}

        {/* Results Section - positioned at top when visible */}
        {searchParams && (
          <div ref={resultsRef} className="max-w-5xl mx-auto px-4 pb-8 min-h-screen pt-8">
            {/* Search Status - always at top */}
            <SearchStatus 
              searchParams={searchParams}
              onClearSearch={clearSearch}
            />
            
            {/* Recommendation Results - directly below search status */}
            <div className="bg-[#371e23]/60 backdrop-blur-xl border border-[#722f37]/30 rounded-3xl p-6">
              <FlightRecommendation 
                recommendation={recommendation}
                isLoading={isLoading}
                error={error}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;