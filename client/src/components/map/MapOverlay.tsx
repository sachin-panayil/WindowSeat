import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FlightRecommendation } from '@windowseat/shared';
import FlightPathMap from './FlightPathMap';

interface MapOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  recommendation: FlightRecommendation | null;
}

const MapOverlay: React.FC<MapOverlayProps> = ({ isOpen, onClose, recommendation }) => {
  const mapData = recommendation?.mapData;
  const flight = recommendation?.flight;
  const side = recommendation?.recommendation?.recommendedSeat;

  return (
    <AnimatePresence>
      {isOpen && mapData && flight && side && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Full-screen map */}
          <FlightPathMap mapData={mapData} recommendedSide={side} />

          {/* Top bar — back button + flight info in one row */}
          <div
            className="absolute inset-x-0 top-0 z-[200] flex items-start gap-2 px-3 sm:px-4"
            style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top, 0.75rem))' }}
          >
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-space-900/80 backdrop-blur-xl border border-white/10 text-white font-display text-sm font-medium hover:bg-space-900 transition-colors shrink-0"
              style={{ minHeight: '44px', touchAction: 'manipulation' }}
            >
              <span className="text-base leading-none">&larr;</span>
              Back
            </button>

            <div
              className="flex items-center min-w-0 flex-1 px-3 sm:px-4 py-2.5 rounded-xl bg-space-900/80 backdrop-blur-xl border border-white/10 font-display text-sm"
              style={{ minHeight: '44px' }}
            >
              <span className="text-white font-semibold truncate">{flight.route}</span>
              <span className="mx-2 text-white/30 shrink-0">|</span>
              <span className="text-amber-glow-400 font-semibold shrink-0">
                {side === 'left' ? 'Left' : 'Right'} side
              </span>
            </div>
          </div>

          {/* Legend */}
          <div
            className="absolute left-3 sm:left-4 z-[200] px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-space-900/80 backdrop-blur-xl border border-white/10 font-display text-xs space-y-1.5"
            style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
          >
            <div className="flex items-center gap-2">
              <span className="w-5 h-0.5 border-t-2 border-dashed border-amber-400 shrink-0" />
              <span className="text-white/70">Flight path</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shrink-0" />
              <span className="text-white/70">Origin</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 border-2 border-white shrink-0" />
              <span className="text-white/70">Destination</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded border-2 border-amber-400/80 bg-amber-400/15 shrink-0" />
              <span className="text-white/70 hidden sm:inline">Recommended side</span>
              <span className="text-white/70 sm:hidden">Rec. side</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded border-2 border-white/30 bg-white/5 shrink-0" />
              <span className="text-white/70">Other side</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MapOverlay;
