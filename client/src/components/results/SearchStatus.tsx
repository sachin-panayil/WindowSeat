import React from 'react';
import type { FlightSearchParams } from '../../../../shared/types/flight.types';

interface SearchStatusProps {
  searchParams: FlightSearchParams;
  onClearSearch: () => void;
}

const SearchStatus: React.FC<SearchStatusProps> = ({ searchParams, onClearSearch }) => {
  return (
    <div className="max-w-3xl mx-auto font-display">
      <div className="bg-space-900/60 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-sm text-text-secondary">
            <span className="font-semibold text-white">
              {searchParams.origin} → {searchParams.destination}
            </span>
            <span className="text-text-muted mx-2">·</span>
            <span className="text-text-tertiary">
              {new Date(searchParams.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
            <span className="text-text-muted mx-2">·</span>
            <span className="text-text-tertiary">{searchParams.departureTime}</span>
          </div>
        </div>
        <button
          onClick={onClearSearch}
          className="text-sm text-text-muted hover:text-white transition-colors px-3 py-1 rounded-lg hover:bg-white/5"
        >
          ← New search
        </button>
      </div>
    </div>
  );
};

export default SearchStatus;