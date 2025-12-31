# Getting Started

## Prerequisites
- Node.js 16+
- npm

## Setup

1. **Fork and clone the repository**

2. **Install dependencies**

Frontend:
```bash
cd client
npm install
```

Backend:
```bash
cd ../server
npm install
```

3. **Set up environment variables**

Create `server/.env`:
```env
PORT=5000
NODE_ENV=development

# API Keys (optional for basic development)
AVIATION_STACK_API_KEY=your_key_here
OPENWEATHER_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here

# Frontend URL
CLIENT_URL=http://localhost:5173
```

## Running the Application

You'll need two terminal windows:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
Frontend will run on `http://localhost:5173`

## Verify It's Working

1. Open `http://localhost:5173` in your browser
2. Open browser console (F12)
3. You should see the WindowSeat interface
4. Backend logs should show in Terminal 1

## Project Structure

```
WindowSeat/
├── client/          # React frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       └── services/
└── server/          # Express backend
    └── src/
        ├── routes/
        ├── services/
        └── middleware/
```