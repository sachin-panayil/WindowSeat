import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv'
import { router } from './routes/recommendations';
import { validateEnv } from './helper/validateEnv';

dotenv.config()
validateEnv()

const app: Application = express()
const PORT = process.env.PORT || 5000
const isProduction = process.env.NODE_ENV === 'production';

const recommendationsLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10,
    message: {
        error: 'Too many requests',
        message: 'Please wait before searching again.',
        retryAfter: 60
    },
    standardHeaders: true,
    legacyHeaders: false
})

const allowedOrigins = isProduction
    ? [process.env.CLIENT_URL].filter(Boolean) as string[]
    : ['http://localhost:5173'];

const strictCors = cors({
  origin: (origin, callback) => {
    if (!origin) {
      return callback(new Error('Not allowed by CORS'));
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true
});

const openCors = cors({
  origin: true
});

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use((req: Request, res: Response, next: NextFunction) => {
    if (isProduction) {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    } else {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`, 
            req.method === 'POST' ? JSON.stringify(req.body) : '');
    }
    next()
})

app.use('/api/recommendations', strictCors, recommendationsLimiter, router);

app.get('/api/health', openCors, (req: Request, res: Response) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        message: 'WindowSeat API is running'
    })
})

app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path,
    method: req.method
  });
});
  
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', isProduction ? err.message : err);

  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Origin not allowed'
    });
  }
  
  res.status(500).json({
    error: 'Internal server error',
    code: 'INTERNAL_ERROR',
    message: isProduction ? 'Something went wrong. Please try again later.' : err.message,
    retryable: false
  });
});
  
app.listen(PORT, () => {
  console.log(`WindowSeat Backend Server Started!`);
  console.log(`Port: ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Health Check: http://localhost:${PORT}/api/health`);
});
  
export default app;