import React, { useMemo } from 'react';

interface StarsProps {
  count?: number;
}

const Stars: React.FC<StarsProps> = ({ count = 150 }) => {
  const stars = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      // Only some stars twinkle
      twinkle: Math.random() > 0.7,
      animationDelay: `${Math.random() * 5}s`,
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full bg-white ${star.twinkle ? 'animate-twinkle' : ''}`}
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: star.twinkle ? star.animationDelay : undefined,
          }}
        />
      ))}
    </div>
  );
};

export default Stars;