import React, { useMemo } from 'react';

interface StarsProps {
  count?: number;
}

const Stars: React.FC<StarsProps> = ({ count = 150 }) => {
  const stars = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const warm = Math.random() > 0.88;
      const baseOpacity = Math.random() * 0.5 + 0.2;
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1,
        opacity: warm ? baseOpacity * 0.7 : baseOpacity,
        warm,
        twinkle: Math.random() > 0.7,
        animationDelay: `${Math.random() * 5}s`,
      };
    });
  }, [count]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full ${star.warm ? 'bg-amber-200' : 'bg-white'} ${star.twinkle ? 'animate-twinkle' : ''}`}
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