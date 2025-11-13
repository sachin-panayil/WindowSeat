import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { nextTick } from 'process'

dotenv.config()

const app: Application = express()
const PORT = process.env.PORT || 5000

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${new Date().toISOString()} - ${req.method}/${req.path}`)
    next()
})

app.get('/api/health', (req: Request, res: Response) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString,
        environment: process.env.NODE_ENV,
        message: 'WindowSeat API is running'
    })
})

app.get('/api/test', (req: Request, res: Response) => {
    res.json({
      message: 'Backend is connected!',
      data: {
        server: 'Express with TypeScript',
        version: '1.0.0'
      }
    });
  });
  
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      error: 'Route not found',
      path: req.path,
      method: req.method
    });
  });
  
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err.message);
    res.status(500).json({
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
  });
  
  app.listen(PORT, () => {
    console.log(`WindowSeat Backend Server Started!`);
    console.log(`Port: ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`Health Check: http://localhost:${PORT}/api/health`);

  });
  
  export default app;