# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WindowSeat is a full-stack TypeScript application that recommends optimal flight seats for viewing landmarks. It combines geospatial calculations, weather data, sun position analysis, and AI-powered recommendations to suggest whether passengers should sit on the left or right side of the aircraft.

## Development Commands

### Frontend (client/)
```bash
cd client
npm install          # Install dependencies
npm run dev          # Start dev server on http://localhost:5173
npm run build        # TypeScript compile + Vite build
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

### Backend (server/)
```bash
cd server
npm install          # Install dependencies
npm run dev          # Start dev server with nodemon on http://localhost:5000
npm run build        # Compile TypeScript to dist/
npm start            # Run compiled production build
```

### Environment Setup
The server requires a `.env` file with:
```env
PORT=5000
NODE_ENV=development
AVIATION_STACK_API_KEY=your_key_here
OPENWEATHER_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
CLIENT_URL=http://localhost:5173
```

The frontend requires `.env` or `.env.local` with:
```env
VITE_API_URL=http://localhost:5000
```

## Architecture

### Monorepo Structure
- `client/` - React + Vite frontend with TypeScript
- `server/` - Express backend with TypeScript
- `shared/` - Shared TypeScript types (currently exists but empty; types duplicated in each workspace)

### Technology Stack

**Frontend:**
- React 19 with React Router for routing
- TanStack React Query for server state management
- Tailwind CSS with custom Space Grotesk font and dark theme
- Framer Motion for animations
- MapLibre GL for map visualization
- Vite as build tool

**Backend:**
- Express.js with TypeScript
- OpenAI API (GPT-4o-mini) for seat recommendations
- Weather data from OpenWeather API
- Airport data from AviationStack API
- Rate limiting with express-rate-limit (10 requests/minute)
- CORS configured for production/development origins

### Key Data Flow

1. **User Input** → Client sends `FlightSearchParams` (origin, destination, date, departure time) to `/api/recommendations`

2. **Server Processing Pipeline** (server/src/routes/recommendations.ts):
   - Fetch airport data (coordinates, timezone) via `airportService`
   - Calculate great circle flight path with 200-mile intervals via `geoHelper.calculatePath()`
   - Find landmarks within viewing range along path via `geoHelper.findLandmarksAlongPath()`
   - Calculate sun positions at each path point via `sunHelper.getSunPositions()` (uses suncalc library)
   - Fetch weather/cloud cover data via `weatherService.getRouteWeather()`
   - Generate AI recommendation via `LLMService.generateRecommendation()`

3. **AI Recommendation** (server/src/services/LLMService.ts):
   - Builds structured prompt with left/right landmark counts, sun glare percentages, cloud cover
   - Calls OpenAI with JSON mode and system prompt from `server/src/data/prompt.ts`
   - Returns seat side (left/right), confidence (1-10), reasoning, and top landmarks

4. **Response** → Client receives `FlightRecommendation` with flight data and recommendation

### Important Files

**Server:**
- `server/src/app.ts` - Express app setup, CORS, rate limiting, error handling
- `server/src/routes/recommendations.ts` - Main recommendation endpoint orchestration
- `server/src/services/LLMService.ts` - OpenAI integration with structured prompts
- `server/src/utils/geoHelper.ts` - Great circle path calculation, landmark detection
- `server/src/utils/sunHelper.ts` - Sun position and glare calculation (using suncalc)
- `server/src/services/weatherService.ts` - Weather/cloud cover API integration
- `server/src/data/landmarks.ts` - Hardcoded US landmark database (~150 landmarks with coordinates and viewing ranges)
- `server/src/data/prompt.ts` - System prompt for OpenAI
- `server/src/helper/classifyError.ts` - Error classification for API responses
- `server/src/helper/validateEnv.ts` - Environment variable validation

**Client:**
- `client/src/pages/SearchPage.tsx` - Main search interface
- `client/src/services/flightAPI.ts` - API client with axios
- `client/src/components/forms/` - Search form components
- `client/src/components/results/` - Results display components
- `client/src/components/background/` - Animated background elements
- `client/tailwind.config.js` - Custom design system with space theme colors

### Type System

Types are currently duplicated between client and server:
- Server types in `server/src/types/` (Coordinates, GeoPoint, Landmark, Airport, Weather, etc.)
- Shared flight types referenced from `server/shared/types/flight.types` (both client and server import from server's shared directory)
- The `shared/` directory exists at root but is currently unused

### Geospatial Algorithm

The flight path estimation uses:
- **Great circle distance** (haversine formula) for accurate Earth-surface distances
- **Spherical interpolation** to generate path waypoints every 200 miles
- **Landmark detection** checks if landmarks fall within viewing range (typically 150-230 miles) of any waypoint
- **Side determination** uses cross product to determine if landmark is left/right of flight vector
- **Sun glare calculation** uses solar azimuth relative to flight heading to determine which side experiences glare

### Error Handling

Server uses structured error responses with:
- `code` - Machine-readable error code (e.g., 'AIRPORT_NOT_FOUND', 'RATE_LIMITED')
- `message` - User-friendly error message
- `retryable` - Boolean indicating if request should be retried
- Production mode hides stack traces

Client's `APIError` class parses these structured errors and handles rate limiting (429), timeouts, and network errors.

## Development Notes

- The app uses a 500 MPH cruise speed assumption for flight duration estimates
- Landmarks are hardcoded in `server/src/data/landmarks.ts` - add new ones there
- Weather API coverage is partial (not all points have weather data); confidence is marked as 'high', 'partial', or 'unavailable'
- Rate limiting is strict: 10 requests per minute per IP in production
- CORS is environment-aware: strict in production (checks CLIENT_URL), permissive in development
- The AI uses `seed: 67` for deterministic responses during development
- Frontend uses React Query with 5-minute stale time and 3 retry attempts
