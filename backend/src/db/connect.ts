import mongoose from 'mongoose';
import { MONGO_URI } from '../config/env.js';

// Connect to MongoDB
// This function connects to the MongoDB database using Mongoose
export async function connectDB() : Promise<void> {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}
