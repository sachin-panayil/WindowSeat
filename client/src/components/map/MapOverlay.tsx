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

          {/* Back button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 z-10 flex items-center gap-2 px-4 py-2 rounded-xl bg-space-900/80 backdrop-blur-xl border border-white/10 text-white font-display text-sm font-medium hover:bg-space-900 transition-colors"
          >
            <span className="text-lg leading-none">&larr;</span>
            Back
          </button>

          {/* Flight info pill */}
          <div className="absolute top-4 right-4 z-10 px-4 py-2 rounded-xl bg-space-900/80 backdrop-blur-xl border border-white/10 font-display text-sm">
            <span className="text-white font-semibold">{flight.route}</span>
            <span className="mx-2 text-white/30">|</span>
            <span className="text-amber-glow-400 font-semibold">
              {side === 'left' ? 'Left' : 'Right'} side
            </span>
          </div>

          {/* Legend */}
          <div className="absolute bottom-6 left-4 z-10 px-4 py-3 rounded-xl bg-space-900/80 backdrop-blur-xl border border-white/10 font-display text-xs space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-5 h-0.5 border-t-2 border-dashed border-amber-400" />
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
              <span className="text-white/70">Recommended side</span>
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
