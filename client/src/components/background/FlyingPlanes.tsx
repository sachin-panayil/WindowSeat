import React, { useEffect, useState, useMemo } from 'react';

interface FlyingPlanesProps {
  enabled?: boolean;
  planeCount?: number;
}

const FlyingPlanes: React.FC<FlyingPlanesProps> = ({
  enabled = true,
  planeCount = 3,
}) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const planes = useMemo(() => {
    return Array.from({ length: Math.min(planeCount, 5) }, (_, i) => {
      const leftToRight = i % 2 === 0;
      const duration = 18 + i * 5;
      const delay = i * 4;
      const top = 10 + i * 22; // spread across viewport height %

      return { id: i, leftToRight, duration, delay, top };
    });
  }, [planeCount]);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {planes.map((plane) => (
        <div
          key={plane.id}
          className="absolute text-xl text-white"
          style={{
            top: `${plane.top}%`,
            opacity: ready ? undefined : 0,
            ...(ready
              ? {
                  [plane.leftToRight ? 'left' : 'right']: '-60px',
                  animation: `${plane.leftToRight ? 'flyLeft' : 'flyRight'} ${plane.duration}s linear infinite`,
                  animationDelay: `${plane.delay}s`,
                }
              : {
                  [plane.leftToRight ? 'left' : 'right']: '-60px',
                }),
          }}
        >
          <span
            className="inline-block opacity-40"
            style={{
              transform: plane.leftToRight ? 'rotate(45deg)' : 'rotate(-135deg)',
              fontSize: '1.2rem',
            }}
          >
            ✈
          </span>
        </div>
      ))}
    </div>
  );
};

export default FlyingPlanes;