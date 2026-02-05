import React, { useMemo } from 'react';

interface FlyingPlanesProps {
  enabled?: boolean;
  planeCount?: number;
  className?: string;
}

interface PlaneConfig {
  id: number;
  direction: 'left' | 'right';
  top: string;
  duration: number;
  delay: number;
  opacity: number;
  size: string;
}

const FlyingPlanes: React.FC<FlyingPlanesProps> = ({ 
  enabled = true, 
  planeCount = 3,
  className = ''
}) => {
  // Generate plane configurations
  const planes = useMemo<PlaneConfig[]>(() => {
    return Array.from({ length: Math.min(planeCount, 6) }, (_, index) => ({
      id: index,
      direction: index % 2 === 0 ? 'left' : 'right',
      top: `${15 + (index * 20)}%`, // Spread vertically
      duration: 18 + (index * 4), // 18-38 seconds
      delay: index * 5, // Stagger start times
      opacity: 0.4 + (Math.random() * 0.2), // 0.4-0.6
      size: index === 0 ? 'text-2xl' : 'text-xl', // Vary sizes slightly
    }));
  }, [planeCount]);

  if (!enabled) {
    return null;
  }

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      {planes.map((plane) => (
        <div
          key={plane.id}
          className={`absolute ${plane.size} select-none`}
          style={{
            top: plane.top,
            left: plane.direction === 'left' ? '-50px' : 'auto',
            right: plane.direction === 'right' ? '-50px' : 'auto',
            opacity: 0,
            animation: `${plane.direction === 'left' ? 'plane-left' : 'plane-right'} ${plane.duration}s linear infinite`,
            animationDelay: `${plane.delay}s`,
          }}
        >
          <span 
            className="inline-block"
            style={{
              filter: 'grayscale(100%) brightness(2)',
              opacity: plane.opacity,
            }}
          >
            ✈️
          </span>
        </div>
      ))}
    </div>
  );
};

export default FlyingPlanes;