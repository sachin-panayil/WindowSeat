# WindowSeat — Server

Express backend for WindowSeat. Processes flight routes through a geospatial and AI pipeline to recommend which side of the plane offers the best views.

## Stack

- **Express.js** with TypeScript
- **OpenAI API** (GPT-4o-mini) for seat recommendations
- **OpenWeather API** for cloud cover data along the route
- **suncalc** for solar position and glare calculations
- **express-rate-limit** — 10 requests per minute per IP in production

## Getting Started

```bash
npm install
npm run dev       # http://localhost:5000
```

Requires a `.env` file:

```env
PORT=5000
NODE_ENV=development
OPENAI_API_KEY=your_key_here
CLIENT_URL=http://localhost:5173
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with nodemon |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled production build |

## Project Structure

```
src/
├── app.ts                      # Express setup, CORS, rate limiting, error handling
├── routes/
│   └── recommendations.ts      # POST /api/recommendations — main pipeline orchestration
├── services/
│   ├── LLMService.ts           # OpenAI integration, prompt building, JSON response parsing
│   ├── weatherService.ts       # Fetches cloud cover for route waypoints
│   └── analyticsService.ts     # PostHog event tracking
├── utils/
│   ├── geoHelper.ts            # Great circle path, landmark detection, left/right side logic
│   ├── sunHelper.ts            # Solar azimuth and glare calculation per waypoint
│   └── timeHelper.ts           # Timezone-aware time utilities
├── helper/
│   ├── classifyError.ts        # Maps errors to structured API error codes
│   └── validateEnv.ts          # Validates required environment variables on startup
├── data/
│   ├── landmarks.ts            # ~150 hardcoded US landmarks with coordinates and viewing ranges
│   └── prompt.ts               # System prompt for the OpenAI recommendation call
└── types/                      # TypeScript interfaces (Coordinates, Landmark, Weather, etc.)
```

## Recommendation Pipeline

`POST /api/recommendations` runs these steps in order:

1. **Fetch airports** — resolve origin and destination IATA codes to coordinates and timezones via AviationStack.
2. **Calculate flight path** — generate great circle waypoints every 200 miles using the haversine formula.
3. **Find landmarks** — check which of ~150 US landmarks fall within viewing range (150–230 miles) of any waypoint; use cross product to determine left vs. right side.
4. **Sun positions** — compute solar azimuth at each waypoint relative to flight heading to determine which side experiences glare.
5. **Weather** — fetch cloud cover percentage at waypoints via OpenWeather; coverage is marked as `high`, `partial`, or `unavailable`.
6. **AI recommendation** — send landmark counts, glare percentages, and cloud cover to GPT-4o-mini. Returns seat side, confidence (1–10), reasoning, and top landmarks to watch for.

## Error Handling

All errors are returned as structured JSON:

```json
{
  "code": "AIRPORT_NOT_FOUND",
  "message": "Could not find airport with code XYZ",
  "retryable": false
}
```
