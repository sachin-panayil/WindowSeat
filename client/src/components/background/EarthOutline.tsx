import React from 'react';

interface EarthOutlineProps {
  className?: string;
}

// 6 flight routes — mix of long-haul, regional, and edge-hugging paths
// All coordinates within the r=188 globe clip
const FLIGHT_ROUTES = [
  {
    id: 'f1',
    label: 'Transatlantic',
    path: 'M 85,130 Q 150,50 220,80',
    dur: '12s',
    initialDelay: '0s',
    waitAfter: '25s',
  },
  {
    id: 'f2',
    label: 'Transpac north',
    path: 'M 60,105 Q 190,18 355,78',
    dur: '16s',
    initialDelay: '5s',
    waitAfter: '20s',
  },
  {
    id: 'f3',
    label: 'Europe to Asia',
    path: 'M 228,88 Q 290,52 352,85',
    dur: '10s',
    initialDelay: '12s',
    waitAfter: '32s',
  },
  {
    id: 'f4',
    label: 'South Atlantic',
    path: 'M 128,265 Q 172,215 218,165',
    dur: '11s',
    initialDelay: '3s',
    waitAfter: '28s',
  },
  {
    id: 'f5',
    label: 'Edge route — southern rim',
    // Hugs the bottom edge of the globe
    path: 'M 55,280 Q 200,360 345,280',
    dur: '14s',
    initialDelay: '18s',
    waitAfter: '22s',
  },
  {
    id: 'f6',
    label: 'Edge route — Asia to Australia',
    path: 'M 340,135 Q 370,200 348,270',
    dur: '9s',
    initialDelay: '8s',
    waitAfter: '35s',
  },
];

const EarthOutline: React.FC<EarthOutlineProps> = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 40px rgba(255,255,255,0.05))' }}
      >
        {/* Globe circle */}
        <circle
          cx="200" cy="200" r="190"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1.5"
        />

        {/* Grid lines - longitude */}
        <ellipse cx="200" cy="200" rx="60" ry="190" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />
        <ellipse cx="200" cy="200" rx="120" ry="190" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />
        <ellipse cx="200" cy="200" rx="160" ry="190" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />

        {/* Grid lines - latitude */}
        <ellipse cx="200" cy="200" rx="190" ry="60" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />
        <ellipse cx="200" cy="200" rx="190" ry="120" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />

        {/* Equator */}
        <line x1="10" y1="200" x2="390" y2="200" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />

        <defs>
          <clipPath id="globe-clip">
            <circle cx="200" cy="200" r="188" />
          </clipPath>

          {/* Route paths referenced by animateMotion */}
          {FLIGHT_ROUTES.map(r => (
            <path key={r.id} id={r.id} d={r.path} />
          ))}
        </defs>

        {/* Continents */}
        <g clipPath="url(#globe-clip)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" fill="rgba(255,255,255,0.03)">
          <path d="M 80,80 L 95,75 L 115,78 L 130,72 L 145,80 L 155,95 L 150,110 L 160,120 L 165,135 L 155,145 L 140,140 L 130,150 L 125,165 L 115,175 L 100,180 L 90,170 L 85,155 L 75,150 L 65,135 L 60,120 L 55,105 L 60,90 Z" />
          <path d="M 100,180 L 105,190 L 110,200 L 108,210 L 102,215 L 98,210 L 95,200 L 92,190 Z" />
          <path d="M 115,225 L 125,220 L 140,225 L 150,240 L 155,260 L 150,280 L 145,300 L 135,320 L 125,335 L 118,340 L 112,330 L 108,310 L 105,290 L 102,270 L 105,250 L 110,235 Z" />
          <path d="M 200,75 L 215,70 L 230,75 L 240,85 L 235,100 L 225,110 L 215,115 L 205,110 L 195,105 L 190,95 L 195,85 Z" />
          <path d="M 185,78 L 192,75 L 195,80 L 190,85 L 185,82 Z" />
          <path d="M 210,130 L 225,125 L 245,130 L 260,145 L 265,165 L 260,190 L 255,215 L 245,240 L 235,255 L 225,260 L 215,255 L 210,240 L 205,220 L 200,200 L 195,180 L 195,160 L 200,145 Z" />
          <path d="M 268,225 L 272,220 L 275,230 L 272,240 L 268,235 Z" />
          <path d="M 245,70 L 270,60 L 300,55 L 330,60 L 350,70 L 360,85 L 355,100 L 340,110 L 330,125 L 315,135 L 300,140 L 285,145 L 270,140 L 260,130 L 255,115 L 250,100 L 245,85 Z" />
          <path d="M 290,145 L 300,140 L 310,150 L 305,170 L 295,180 L 285,175 L 280,160 L 285,150 Z" />
          <path d="M 320,140 L 335,135 L 345,145 L 340,155 L 330,160 L 320,155 Z" />
          <path d="M 330,165 L 340,162 L 350,168 L 345,175 L 335,172 Z" />
          <path d="M 310,240 L 335,235 L 355,245 L 365,260 L 360,280 L 345,290 L 325,288 L 310,278 L 305,260 L 308,248 Z" />
          <path d="M 370,290 L 375,285 L 378,295 L 375,305 L 370,300 Z" />
          <path d="M 350,85 L 355,80 L 360,88 L 358,98 L 352,95 Z" />
          <path d="M 140,40 L 165,35 L 180,42 L 178,58 L 168,65 L 150,62 L 140,52 Z" />
          <path d="M 100,370 L 150,365 L 200,362 L 250,365 L 300,370" strokeWidth="0.8" fill="none" />
        </g>

        {/* ========== ANIMATED FLIGHTS ========== */}
        <g clipPath="url(#globe-clip)">
          {FLIGHT_ROUTES.map(route => {
            // begin pattern: start at initialDelay, then restart waitAfter seconds after each end
            const beginValue = `${route.initialDelay};${route.id}-motion.end+${route.waitAfter}`;

            return (
              <g key={`plane-${route.id}`}>
                {/* Plane group — starts invisible, fades in/out with each flight */}
                <g opacity="0">
                  {/* Motion along the curved route */}
                  <animateMotion
                    id={`${route.id}-motion`}
                    dur={route.dur}
                    begin={beginValue}
                    fill="remove"
                    rotate="auto"
                  >
                    <mpath href={`#${route.id}`} />
                  </animateMotion>

                  {/* Fade in → hold → fade out, synced to motion */}
                  <animate
                    attributeName="opacity"
                    dur={route.dur}
                    begin={beginValue}
                    values="0;0.8;0.8;0.8;0"
                    keyTimes="0;0.08;0.5;0.92;1"
                    fill="remove"
                  />

                  {/* ✈ Airplane silhouette — top-down view, nose pointing right (+x)
                      animateMotion rotate="auto" orients it along the path */}
                  <g transform="scale(0.9)">
                    {/* Fuselage */}
                    <path
                      d="M -6,0 C -5,-0.8 -2,-1 0,-1 L 5,-0.6 L 7,0 L 5,0.6 L 0,1 C -2,1 -5,0.8 -6,0 Z"
                      fill="white"
                    />
                    {/* Wings — swept back */}
                    <path
                      d="M -1,-0.8 L -3,-5 L -2,-5.2 L 2,-0.6 Z"
                      fill="white"
                    />
                    <path
                      d="M -1,0.8 L -3,5 L -2,5.2 L 2,0.6 Z"
                      fill="white"
                    />
                    {/* Tail fin */}
                    <path
                      d="M -5,-0.3 L -7,-2.5 L -6.2,-2.6 L -4.5,0 Z"
                      fill="white"
                    />
                    <path
                      d="M -5,0.3 L -7,2.5 L -6.2,2.6 L -4.5,0 Z"
                      fill="white"
                    />
                  </g>
                </g>
              </g>
            );
          })}
        </g>

        {/* Atmospheric glow - inner */}
        <circle cx="200" cy="200" r="190" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
        {/* Atmospheric glow - outer */}
        <circle cx="200" cy="200" r="195" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="6" />
      </svg>
    </div>
  );
};

export default EarthOutline;