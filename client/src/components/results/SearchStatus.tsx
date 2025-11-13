import React from 'react';
import type { FlightSearchParams } from '../../types/flight.types';

interface SearchStatusProps {
  searchParams: FlightSearchParams;
  onClearSearch: () => void;
}

const SearchStatus: React.FC<SearchStatusProps> = ({ searchParams, onClearSearch }) => {
  return (
    <div className="max-w-lg mx-auto px-4 mb-8">
      <div className="bg-[#371e23]/60 backdrop-blur-xl border border-[#722f37]/30 rounded-2xl p-4">
        <h3 className="font-medium text-[#f4e6e8] mb-2">Current Search:</h3>
        <div className="text-sm text-[#dbb8bd] space-y-1">
          <p><strong>Flight:</strong> {searchParams.flightNumber}</p>
          <p><strong>Date:</strong> {new Date(searchParams.date).toLocaleDateString()}</p>
        </div>
        <button
          onClick={onClearSearch}
          className="mt-3 text-sm text-[#9d4851] hover:text-[#722f37] underline transition-colors"
        >
          Clear search
        </button>
      </div>
    </div>
  );
};

export default SearchStatus;