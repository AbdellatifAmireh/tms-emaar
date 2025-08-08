import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { z } from "zod";
import { connectDB } from "./db.js";
import Task from "./models/Task.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Validation
const CreateTask = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().optional(),
});

const UpdateTask = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});

// Routes
app.get("/tasks", async (_req, res) => {
  const tasks = await Task.find().sort({ created_at: -1 });
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  const parsed = CreateTask.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  const task = await Task.create(parsed.data);
  res.status(201).json(task);
});

app.put("/tasks/:id", async (req, res) => {
  const parsed = UpdateTask.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  const task = await Task.findByIdAndUpdate(req.params.id, parsed.data, { new: true });
  if (!task) return res.status(404).json({ error: "not found" });
  res.json(task);
});

app.delete("/tasks/:id", async (req, res) => {
  const del = await Task.findByIdAndDelete(req.params.id);
  if (!del) return res.status(404).json({ error: "not found" });
  res.status(204).send();
});

const PORT = Number(process.env.PORT) || 4000;
connectDB().then(() => app.listen(PORT, () => console.log(`API http://localhost:${PORT}`)));
