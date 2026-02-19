import React from 'react';
import type { FlightSearchParams } from '@windowseat/shared';

interface SearchStatusProps {
  searchParams: FlightSearchParams;
  onClearSearch: () => void;
}

const SearchStatus: React.FC<SearchStatusProps> = ({ searchParams, onClearSearch }) => {
  return (
    <div className="max-w-3xl mx-auto font-display">
      <div className="bg-space-900/60 backdrop-blur-xl border border-white/10 rounded-2xl px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white truncate">
            {searchParams.origin.name} → {searchParams.destination.name}
          </p>
          <p className="text-xs text-text-tertiary mt-0.5">
            {new Date(searchParams.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            <span className="text-text-muted mx-1.5">·</span>
            {searchParams.departureTime}
          </p>
        </div>
        <button
          onClick={onClearSearch}
          className="text-sm text-text-muted hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5 shrink-0"
          style={{ minHeight: '44px', touchAction: 'manipulation' }}
        >
          ← New search
        </button>
      </div>
    </div>
  );
};

export default SearchStatus;