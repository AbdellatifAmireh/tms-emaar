import 'dotenv/config';

// Read environment variables from .env file
export const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

export const PORT = Number(process.env.PORT) || 4000;
export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/tms-emaar-db";;
