import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { connectDB } from '../src/config/db.js';
import { seedDatabaseIfNeeded } from '../src/seed/seedData.js';
import { errorHandler } from '../src/middleware/errorHandler.js';

// Route imports
import authRoutes from '../src/routes/authRoutes.js';
import noticeRoutes from '../src/routes/noticeRoutes.js';
import eventRoutes from '../src/routes/eventRoutes.js';
import facultyRoutes from '../src/routes/facultyRoutes.js';
import galleryRoutes from '../src/routes/galleryRoutes.js';
import admissionRoutes from '../src/routes/admissionRoutes.js';
import contactRoutes from '../src/routes/contactRoutes.js';
import settingRoutes from '../src/routes/settingRoutes.js';
import userRoutes from '../src/routes/userRoutes.js';
import statRoutes from '../src/routes/statRoutes.js';

dotenv.config();

const app = express();

// CORS — allow configured client URL in production, localhost in development
const allowedOrigins = process.env.CLIENT_URL
  ? [process.env.CLIENT_URL]
  : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:4173'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS: Origin '${origin}' is not allowed`));
    },
    credentials: true,
  })
);
app.use(express.json());
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'online',
    institution: 'XYZ School Portal API',
    timestamp: new Date().toISOString(),
  });
});

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/admissions', admissionRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stats', statRoutes);

app.use(errorHandler);

// Connect DB once (Vercel serverless: connection is cached across warm invocations)
let dbInitialised = false;
const initDB = async () => {
  if (!dbInitialised) {
    await connectDB();
    await seedDatabaseIfNeeded();
    dbInitialised = true;
  }
};

// Vercel serverless handler
export default async function handler(req, res) {
  await initDB();
  return app(req, res);
}
