import React, { useMemo } from 'react';

interface StarsProps {
  count?: number;
  className?: string;
}

const Stars: React.FC<StarsProps> = ({ count = 150, className = '' }) => {
  // Generate stars with random positions and properties
  const stars = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1, // 1-3px
      opacity: Math.random() * 0.5 + 0.3, // 0.3-0.8
      animationDelay: `${Math.random() * 3}s`,
      shouldTwinkle: Math.random() > 0.7, // 30% of stars twinkle
    }));
  }, [count]);

  return (
    <div className={`fixed inset-0 pointer-events-none ${className}`}>
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full bg-white ${
            star.shouldTwinkle ? 'animate-twinkle' : ''
          }`}
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: star.animationDelay,
          }}
        />
      ))}
    </div>
  );
};

export default Stars;