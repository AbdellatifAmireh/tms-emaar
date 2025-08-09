import { z } from 'zod';
import type { Request, Response } from 'express';
import Task from '../models/task.model.js';

//Read tasks
export async function getTasks(_req: Request, res: Response) {
  const tasks = await Task.find().lean();
  res.json(tasks);
}

// ----- Create Task -----
// Zod schema for validation
const createTaskSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  description: z.string().min(5).optional(),
  completed: z.boolean().optional()
});

//Add a new task
export async function addTask(req: Request, res: Response) {
  const parseResult = createTaskSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ errors: parseResult.error.flatten().fieldErrors });
  }
  const newTask = await Task.create(parseResult.data);
  res.status(201).json(newTask);
}
// ----- Create Task END -----

//Update an existing task
export async function updateTask(req: Request, res: Response) {
  const { id } = req.params;
  const updated = await Task.findByIdAndUpdate(id, req.body, { new: true });
  if (!updated) return res.status(404).json({ error: 'Task not found' });
  res.json(updated);
}

//Delete a task
export async function deleteTask(req: Request, res: Response) {
  const { id } = req.params;
  const deleted = await Task.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: 'Task not found' });
  res.status(204).send();
}