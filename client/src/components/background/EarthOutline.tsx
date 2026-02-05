import React from 'react';

interface EarthOutlineProps {
  className?: string;
}

const EarthOutline: React.FC<EarthOutlineProps> = ({ className = '' }) => {
  return (
    <div className={`${className}`}>
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Outer glow effect */}
        <defs>
          <radialGradient id="earthGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.08" />
            <stop offset="70%" stopColor="white" stopOpacity="0.02" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Glow circle */}
        <circle
          cx="200"
          cy="200"
          r="190"
          fill="url(#earthGlow)"
        />

        {/* Main Earth circle */}
        <circle
          cx="200"
          cy="200"
          r="150"
          stroke="white"
          strokeWidth="1"
          strokeOpacity="0.3"
          fill="none"
        />

        {/* Equator */}
        <ellipse
          cx="200"
          cy="200"
          rx="150"
          ry="30"
          stroke="white"
          strokeWidth="0.5"
          strokeOpacity="0.2"
          fill="none"
        />

        {/* Latitude lines */}
        <ellipse
          cx="200"
          cy="130"
          rx="115"
          ry="18"
          stroke="white"
          strokeWidth="0.5"
          strokeOpacity="0.12"
          fill="none"
        />
        <ellipse
          cx="200"
          cy="270"
          rx="115"
          ry="18"
          stroke="white"
          strokeWidth="0.5"
          strokeOpacity="0.12"
          fill="none"
        />

        {/* Longitude lines (meridians) */}
        <ellipse
          cx="200"
          cy="200"
          rx="30"
          ry="150"
          stroke="white"
          strokeWidth="0.5"
          strokeOpacity="0.15"
          fill="none"
        />
        <ellipse
          cx="200"
          cy="200"
          rx="90"
          ry="150"
          stroke="white"
          strokeWidth="0.5"
          strokeOpacity="0.12"
          fill="none"
        />

        {/* Center vertical line */}
        <line
          x1="200"
          y1="50"
          x2="200"
          y2="350"
          stroke="white"
          strokeWidth="0.5"
          strokeOpacity="0.15"
        />
      </svg>
    </div>
  );
};

export default EarthOutline;