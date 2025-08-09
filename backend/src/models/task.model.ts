import { Schema, model } from "mongoose";

//Task Model
const Task = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    completed: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export default model("Task", Task);
