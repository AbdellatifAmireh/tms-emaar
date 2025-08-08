import mongoose from "mongoose";

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/tms-emaar-db";

export async function connectDB() {
  await mongoose.connect(uri);
  console.log("✅ MongoDB connected");
}