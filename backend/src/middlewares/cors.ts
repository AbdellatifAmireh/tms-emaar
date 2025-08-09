import cors from 'cors';
import { ALLOWED_ORIGINS } from '../config/env.js';

// This middleware handles CORS (Cross-Origin Resource Sharing) settings
// It allows requests from specified origins and sets allowed methods and headers

const allowlist = new Set(ALLOWED_ORIGINS);

export const corsMiddleware = cors({
  origin: (origin, cb) => {
    if (!origin || allowlist.has(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
