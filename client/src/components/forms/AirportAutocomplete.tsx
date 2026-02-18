import React, { useState, useRef, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';
import { US_AIRPORTS } from '../../types/Airport';
import type { Airport } from '../../types/Airport';
import type { Location } from '../../../../server/shared/types/flight.types';

interface AirportAutocompleteProps {
  label: string;
  placeholder?: string;
  onSelect: (location: Location | null) => void;
  resetKey?: number;
}

const SIZE_BOOST: Record<string, number> = { large: 0, medium: 0.15, small: 0.3 };

const fuse = new Fuse(US_AIRPORTS, {
  keys: [
    { name: 'iata', weight: 0.4 },
    { name: 'city', weight: 0.3 },
    { name: 'name', weight: 0.2 },
    { name: 'state', weight: 0.1 },
  ],
  threshold: 0.4,
  includeScore: true,
});

function toLocation(airport: Airport): Location {
  return {
    name: `${airport.iata} - ${airport.city}`,
    latitude: airport.latitude,
    longitude: airport.longitude,
    timezone: airport.timezone,
  };
}

const AirportAutocomplete: React.FC<AirportAutocompleteProps> = ({
  label,
  placeholder = 'Search by city, airport, or code...',
  onSelect,
  resetKey = 0,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selected, setSelected] = useState<Airport | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  const isFirstMount = useRef(true);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    setQuery('');
    setSelected(null);
    setIsOpen(false);
    setActiveIndex(-1);
    onSelectRef.current(null);
  }, [resetKey]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const results = useMemo(() => {
    if (query.length === 0) return [];
    return fuse
      .search(query, { limit: 20 })
      .sort((a, b) => {
        const scoreA = (a.score ?? 0) + SIZE_BOOST[a.item.size];
        const scoreB = (b.score ?? 0) + SIZE_BOOST[b.item.size];
        return scoreA - scoreB;
      })
      .slice(0, 8);
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(value.length > 0);
    setActiveIndex(-1);
    if (selected) {
      setSelected(null);
      onSelect(null);
    }
  };

  const handleSelect = (airport: Airport) => {
    setSelected(airport);
    setQuery(`${airport.iata} - ${airport.city}`);
    setIsOpen(false);
    setActiveIndex(-1);
    onSelect(toLocation(airport));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(i => (i < results.length - 1 ? i + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => (i > 0 ? i - 1 : results.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < results.length) {
        handleSelect(results[activeIndex].item);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const item = listRef.current.children[activeIndex] as HTMLElement | undefined;
      item?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex]);

  return (
    <div ref={containerRef} className="relative">
      <label className="block text-sm font-display font-normal text-text-tertiary mb-2">
        {label}
      </label>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => { if (query.length > 0 && !selected) setIsOpen(true); }}
        placeholder={placeholder}
        className="input-dark"
        role="combobox"
        aria-expanded={isOpen}
        aria-autocomplete="list"
        aria-activedescendant={activeIndex >= 0 ? `airport-option-${activeIndex}` : undefined}
      />

      {isOpen && results.length > 0 && (
        <ul
          ref={listRef}
          role="listbox"
          className="absolute z-50 w-full mt-1 bg-space-900 border border-white/10 rounded-xl overflow-hidden shadow-lg shadow-black/50 max-h-80 overflow-y-auto"
        >
          {results.map((result, index) => {
            const airport = result.item;
            return (
              <li
                key={airport.iata}
                id={`airport-option-${index}`}
                role="option"
                aria-selected={index === activeIndex}
                onMouseDown={() => handleSelect(airport)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`px-4 py-3 cursor-pointer font-display text-sm border-b border-white/5 last:border-b-0 transition-colors ${
                  index === activeIndex ? 'bg-white/5 text-white' : 'text-space-200'
                }`}
              >
                <span className="font-semibold text-amber-glow-400">{airport.iata}</span>
                <span className="text-text-muted mx-1.5">—</span>
                <span>{airport.name}</span>
                <span className="text-text-muted">, {airport.state}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AirportAutocomplete;
