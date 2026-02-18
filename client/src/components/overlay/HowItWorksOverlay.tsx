import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HowItWorksOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const HowItWorksOverlay: React.FC<HowItWorksOverlayProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />

          {/* Card */}
          <motion.div
            className="glass-card relative z-10 w-full max-w-md p-6 max-h-[80vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-text-tertiary hover:text-white transition-colors text-xl leading-none"
            >
              &times;
            </button>

            <h3 className="text-white font-display font-semibold text-lg mb-3">
              How It Works
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              We calculate the great circle route between your two airports
              and scan it against 200 notable U.S. landmarks to see which ones fall within
              viewing range from cruising altitude. We then layer in real time cloud cover forecasts
              and sun glare calculations based on your flight date and time. All of this gets
              fed to an AI that weighs landmarks, visibility, and glare to recommend a side
              with a confidence score.
            </p>

            <h3 className="text-white font-display font-semibold text-lg mb-3">
              Limitations
            </h3>
            <ul className="text-text-secondary text-sm space-y-3">
              <li>
                <span className="text-white font-medium">Estimated flight path</span> — We
                use the shortest geographic route between airports, not your actual flight
                path. Air traffic routing, weather diversions, and restricted airspace can
                cause your real path to differ.
              </li>
              <li>
                <span className="text-white font-medium">Weather forecast window</span> — Cloud
                cover data is only available for flights within ~16 days. Beyond that, the
                recommendation relies on landmarks and sun position alone.
              </li>
              <li>
                <span className="text-white font-medium">U.S. landmarks only</span> — Our
                database currently covers notable U.S. locations. International routes will
                have fewer landmarks to work with.
              </li>
              <li>
                <span className="text-white font-medium">Confidence ≠ certainty</span> — A
                high score means the data strongly favors one side, not a guarantee of what
                you'll see. Flight path plays a big role in what you will see.
              </li>
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HowItWorksOverlay;
