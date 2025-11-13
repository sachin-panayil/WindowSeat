import React, { useEffect, useState } from 'react';

interface FlyingPlanesProps {
  enabled?: boolean;
  planeIcon?: string;
  planeCount?: number;
}

const FlyingPlanes: React.FC<FlyingPlanesProps> = ({ 
  enabled = true, 
  planeIcon = '✈️',
  planeCount = 3 
}) => {
  const [isAnimationReady, setIsAnimationReady] = useState(false);

  if (!enabled) {
    return null;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimationReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const planes = Array.from({ length: Math.min(planeCount, 5) }, (_, index) => {
    const flyingLeftToRight = Math.random() > 0.5;
    const baseDelay = index * 3; 
    const duration = 8 + (index * 2); 

    const topPosition = 20 + (index * 58); 

    const initialStyle = {
      top: `${topPosition}px`,
      [flyingLeftToRight ? 'left' : 'right']: '-50px',
      opacity: 0,
      transform: flyingLeftToRight 
        ? 'rotate(45deg)' 
        : 'rotate(-135deg)', 
      transition: 'none' 
    };

    const animationStyle = {
      top: `${topPosition}px`,
      [flyingLeftToRight ? 'left' : 'right']: '-50px',
      opacity: 0.7,
      transform: flyingLeftToRight 
        ? 'rotate(45deg)' 
        : 'rotate(-135deg)', 
      animation: `${flyingLeftToRight ? 'flyLeft' : 'flyRight'} ${duration}s linear infinite`,
      animationDelay: `${baseDelay}s`
    };

    return (
      <div
        key={index}
        className="absolute text-2xl"
        style={isAnimationReady ? animationStyle : initialStyle}
      >
        {planeIcon}
      </div>
    );
  });

  return (
    <>
      {planes}
    </>
  );
};

export default FlyingPlanes;