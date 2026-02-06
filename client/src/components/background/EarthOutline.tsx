import React from 'react';

interface EarthOutlineProps {
  className?: string;
}

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
          cx="200"
          cy="200"
          r="190"
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

        {/* Clipping mask for continents */}
        <defs>
          <clipPath id="globe-clip">
            <circle cx="200" cy="200" r="188" />
          </clipPath>
        </defs>

        <g clipPath="url(#globe-clip)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" fill="rgba(255,255,255,0.03)">
          {/* North America */}
          <path d="
            M 80,80 L 95,75 L 115,78 L 130,72 L 145,80 L 155,95 L 150,110
            L 160,120 L 165,135 L 155,145 L 140,140 L 130,150 L 125,165
            L 115,175 L 100,180 L 90,170 L 85,155 L 75,150 L 65,135
            L 60,120 L 55,105 L 60,90 Z
          " />

          {/* Central America / Mexico */}
          <path d="
            M 100,180 L 105,190 L 110,200 L 108,210 L 102,215
            L 98,210 L 95,200 L 92,190 Z
          " />

          {/* South America */}
          <path d="
            M 115,225 L 125,220 L 140,225 L 150,240 L 155,260
            L 150,280 L 145,300 L 135,320 L 125,335 L 118,340
            L 112,330 L 108,310 L 105,290 L 102,270 L 105,250
            L 110,235 Z
          " />

          {/* Europe */}
          <path d="
            M 200,75 L 215,70 L 230,75 L 240,85 L 235,100
            L 225,110 L 215,115 L 205,110 L 195,105 L 190,95
            L 195,85 Z
          " />

          {/* British Isles */}
          <path d="
            M 185,78 L 192,75 L 195,80 L 190,85 L 185,82 Z
          " />

          {/* Africa */}
          <path d="
            M 210,130 L 225,125 L 245,130 L 260,145 L 265,165
            L 260,190 L 255,215 L 245,240 L 235,255 L 225,260
            L 215,255 L 210,240 L 205,220 L 200,200 L 195,180
            L 195,160 L 200,145 Z
          " />

          {/* Madagascar */}
          <path d="
            M 268,225 L 272,220 L 275,230 L 272,240 L 268,235 Z
          " />

          {/* Asia (simplified) */}
          <path d="
            M 245,70 L 270,60 L 300,55 L 330,60 L 350,70
            L 360,85 L 355,100 L 340,110 L 330,125 L 315,135
            L 300,140 L 285,145 L 270,140 L 260,130 L 255,115
            L 250,100 L 245,85 Z
          " />

          {/* India */}
          <path d="
            M 290,145 L 300,140 L 310,150 L 305,170 L 295,180
            L 285,175 L 280,160 L 285,150 Z
          " />

          {/* Southeast Asia / Indonesia */}
          <path d="
            M 320,140 L 335,135 L 345,145 L 340,155 L 330,160 L 320,155 Z
          " />
          <path d="
            M 330,165 L 340,162 L 350,168 L 345,175 L 335,172 Z
          " />

          {/* Australia */}
          <path d="
            M 310,240 L 335,235 L 355,245 L 365,260 L 360,280
            L 345,290 L 325,288 L 310,278 L 305,260 L 308,248 Z
          " />

          {/* New Zealand */}
          <path d="
            M 370,290 L 375,285 L 378,295 L 375,305 L 370,300 Z
          " />

          {/* Japan */}
          <path d="
            M 350,85 L 355,80 L 360,88 L 358,98 L 352,95 Z
          " />

          {/* Greenland */}
          <path d="
            M 140,40 L 165,35 L 180,42 L 178,58 L 168,65
            L 150,62 L 140,52 Z
          " />

          {/* Antarctica hint */}
          <path d="
            M 100,370 L 150,365 L 200,362 L 250,365 L 300,370
          " strokeWidth="0.8" fill="none" />
        </g>

        {/* Atmospheric glow - inner */}
        <circle
          cx="200"
          cy="200"
          r="190"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="3"
        />

        {/* Atmospheric glow - outer */}
        <circle
          cx="200"
          cy="200"
          r="195"
          fill="none"
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="6"
        />
      </svg>
    </div>
  );
};

export default EarthOutline;