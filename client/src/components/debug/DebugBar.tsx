import React, { useCallback } from 'react';
import type { FlightSearchParams, FlightRecommendation } from '@windowseat/shared';

const MOCK_SEARCH_PARAMS: FlightSearchParams = {
  origin: {
    name: 'Los Angeles, CA, United States',
    latitude: 33.9425,
    longitude: -118.4081,
    timezone: 'America/Los_Angeles',
  },
  destination: {
    name: 'New York, NY, United States',
    latitude: 40.7128,
    longitude: -74.006,
    timezone: 'America/New_York',
  },
  date: '2026-02-15',
  departureTime: '10:30',
};

const MOCK_RECOMMENDATION: FlightRecommendation = {
  flight: {
    route: 'Los Angeles, CA, United States → New York, NY, United States',
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
    leftSide: {
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
      glarePercent: 0,
      averageCloudCover: 44,
    },
    rightSide: {
      landmarks: [
        { name: 'Great Salt Lake', side: 'right', distanceFromOrigin: 600, estimatedTime: '2026-02-15T18:42:00.000Z', cloudCover: 20 },
        { name: 'Niagara Falls', side: 'right', distanceFromOrigin: 2050, estimatedTime: '2026-02-15T21:34:48.000Z', cloudCover: 55 },
      ],
      glarePercent: 34,
      averageCloudCover: 38,
    },
    weatherConfidence: 'high',
  },
  mapData: {
    origin: { latitude: 33.9425, longitude: -118.4081, name: 'Los Angeles, CA, United States' },
    destination: { latitude: 40.7128, longitude: -74.006, name: 'New York, NY, United States' },
    path: [
      { latitude: 33.9425, longitude: -118.4081 },
      { latitude: 34.60, longitude: -115.50 },
      { latitude: 35.20, longitude: -112.60 },
      { latitude: 35.75, longitude: -109.70 },
      { latitude: 36.25, longitude: -106.80 },
      { latitude: 36.70, longitude: -103.90 },
      { latitude: 37.10, longitude: -101.00 },
      { latitude: 37.45, longitude: -98.10 },
      { latitude: 37.75, longitude: -95.20 },
      { latitude: 38.00, longitude: -92.30 },
      { latitude: 38.25, longitude: -89.40 },
      { latitude: 38.50, longitude: -86.50 },
      { latitude: 38.80, longitude: -83.60 },
      { latitude: 39.15, longitude: -80.70 },
      { latitude: 39.55, longitude: -77.80 },
      { latitude: 40.00, longitude: -74.90 },
      { latitude: 40.7128, longitude: -74.006 },
    ],
    landmarks: [
      { name: 'Death Valley', latitude: 36.5323, longitude: -116.9325, side: 'left', type: 'desert', distanceFromOrigin: 195, estimatedTime: '2026-02-15T17:53:24.000Z', cloudCover: 100 },
      { name: 'Sierra Nevada (South)', latitude: 36.5785, longitude: -118.2923, side: 'left', type: 'mountain', distanceFromOrigin: 180, estimatedTime: '2026-02-15T17:51:36.000Z', cloudCover: 45 },
      { name: 'Great Salt Lake', latitude: 41.1000, longitude: -112.5000, side: 'right', type: 'lake', distanceFromOrigin: 600, estimatedTime: '2026-02-15T18:42:00.000Z', cloudCover: 20 },
      { name: 'San Juan Mountains', latitude: 37.8150, longitude: -107.6594, side: 'left', type: 'mountain', distanceFromOrigin: 700, estimatedTime: '2026-02-15T18:54:00.000Z', cloudCover: 15 },
      { name: 'Sangre de Cristo Mountains', latitude: 37.5500, longitude: -105.5000, side: 'left', type: 'mountain', distanceFromOrigin: 760, estimatedTime: '2026-02-15T19:01:12.000Z', cloudCover: 12 },
      { name: 'Pikes Peak', latitude: 38.8409, longitude: -105.0423, side: 'left', type: 'mountain', distanceFromOrigin: 820, estimatedTime: '2026-02-15T19:08:00.000Z', cloudCover: 7 },
      { name: 'Rocky Mountains (Colorado)', latitude: 39.1178, longitude: -106.4453, side: 'left', type: 'mountain', distanceFromOrigin: 850, estimatedTime: '2026-02-15T19:11:36.000Z', cloudCover: 7 },
      { name: 'Niagara Falls', latitude: 43.0962, longitude: -79.0377, side: 'right', type: 'river', distanceFromOrigin: 2050, estimatedTime: '2026-02-15T21:34:48.000Z', cloudCover: 55 },
      { name: 'Appalachian Blue Ridge', latitude: 37.5500, longitude: -79.5000, side: 'left', type: 'mountain', distanceFromOrigin: 2100, estimatedTime: '2026-02-15T21:40:48.000Z', cloudCover: 68 },
      { name: 'Catskill Mountains', latitude: 42.0840, longitude: -74.2510, side: 'left', type: 'mountain', distanceFromOrigin: 2280, estimatedTime: '2026-02-15T22:02:24.000Z', cloudCover: 92 },
    ],
  },
};

interface DebugBarProps {
  view: 'form' | 'results';
  onInjectTest: (params: FlightSearchParams, recommendation: FlightRecommendation) => void;
  onReset: () => void;
}

const DebugBar: React.FC<DebugBarProps> = ({ view, onInjectTest, onReset }) => {
  if (import.meta.env.PROD) return null;

  const handleTest = useCallback(() => {
    onInjectTest(MOCK_SEARCH_PARAMS, MOCK_RECOMMENDATION);
  }, [onInjectTest]);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-space-900/95 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 flex items-center space-x-2">
      <span className="text-text-muted text-[10px] font-display font-medium uppercase tracking-wider">
        {view}
      </span>
      <div className="w-px h-3 bg-white/10" />
      <button
        onClick={handleTest}
        className="px-2 py-1 bg-space-700 hover:bg-space-600 border border-white/10 rounded text-white text-[11px] font-display font-medium transition-colors"
      >
        ▶ Test
      </button>
      <button
        onClick={onReset}
        className="px-2 py-1 bg-space-800 hover:bg-space-700 border border-white/10 rounded text-text-muted text-[11px] font-display transition-colors"
      >
        ✕
      </button>
    </div>
  );
};

export default DebugBar;