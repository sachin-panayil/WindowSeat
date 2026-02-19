# Contributing

Thanks for your interest in contributing to WindowSeat!

## Stack

**Frontend:** React 19, TanStack Query, Tailwind CSS, MapLibre GL, Framer Motion
**Backend:** Express, TypeScript, OpenAI API, OpenWeather API, AviationStack API

## Getting Started

1. Fork and clone the repo
2. Install dependencies

```bash
cd client && npm install
cd ../server && npm install
```

3. Create `server/.env`:

```env
PORT=5000
NODE_ENV=development
AVIATION_STACK_API_KEY=your_key_here
OPENWEATHER_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
CLIENT_URL=http://localhost:5173
```

4. Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000
```

## Running Locally

```bash
# Terminal 1 — Backend (http://localhost:5000)
cd server && npm run dev

# Terminal 2 — Frontend (http://localhost:5173)
cd client && npm run dev
```

## Project Structure

```
WindowSeat/
├── client/          # React + Vite frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       └── services/
├── server/          # Express backend
│   └── src/
│       ├── data/        # Landmarks DB and AI prompt
│       ├── routes/
│       ├── services/
│       └── utils/       # Geo and sun helpers
└── shared/          # Shared TypeScript types
    └── src/
        └── types/
```

## Workflow

1. Create a feature branch off `main`
2. Make your changes with focused, small commits
3. Open a pull request against `main`
4. Wait for review

## Issues

When filing a bug, please include:
- What you expected to happen
- What actually happened
- Steps to reproduce

## Notes

- Landmarks are hardcoded in `server/src/data/landmarks.ts` — add new ones there
- Rate limit: 10 requests/minute per IP in production
