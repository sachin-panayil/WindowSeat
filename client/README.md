# WindowSeat — Client

React frontend for WindowSeat, a tool that recommends which side of the plane to sit on based on landmarks, sun position, and weather along your flight path.

## Stack

- **React 19** with React Router for page routing
- **TanStack React Query** for server state and request caching
- **Tailwind CSS** with a custom dark/space theme and Space Grotesk font
- **Framer Motion** for animations
- **MapLibre GL** for interactive flight path map rendering
- **Fuse.js** for fuzzy airport search autocomplete
- **React Hook Form** for form state management
- **Vite** as the build tool

## Getting Started

```bash
npm install
npm run dev       # http://localhost:5173
```

Requires a `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | TypeScript check + Vite production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── pages/
│   └── SearchPage.tsx          # Main search and results page
├── components/
│   ├── forms/
│   │   ├── FlightSearchForm.tsx    # Date, time, origin/destination inputs
│   │   └── AirportAutocomplete.tsx # Fuzzy search autocomplete for airports
│   ├── results/
│   │   ├── FlightRecommendation.tsx # Seat side recommendation card
│   │   └── SearchStatus.tsx         # Loading and error states
│   ├── map/
│   │   ├── FlightPathMap.tsx    # MapLibre GL map with flight path + landmarks
│   │   └── MapOverlay.tsx       # Legend and overlay UI on the map
│   ├── background/
│   │   ├── Stars.tsx            # Animated star field background
│   │   └── EarthOutline.tsx     # Decorative SVG earth graphic
│   └── overlay/
│       └── HowItWorksOverlay.tsx  # Explainer modal
├── services/
│   └── flightAPI.ts            # Axios client for the backend API
└── App.tsx                     # Router setup and query client provider
```
