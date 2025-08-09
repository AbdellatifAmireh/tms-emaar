import { http } from '@shared/api_url';
import { z } from 'zod';
import { TaskSchema, CreateTaskSchema, UpdateTaskSchema, type Task } from '../schemas/task';

// Get all tasks
export async function getTasks(): Promise<Task[]> {
  const res = await http.get('/tasks');
  return z.array(TaskSchema).parse(res.data);
}

// Create a new task
export async function createTask(input: unknown): Promise<Task> {
  const data = CreateTaskSchema.parse(input);
  const res = await http.post('/tasks', data);
  return TaskSchema.parse(res.data);
}

// Update an existing task
export async function updateTask(id: string, input: unknown): Promise<Task> {
  const data = UpdateTaskSchema.parse(input);
  const res = await http.put(`/tasks/${id}`, data);
  return TaskSchema.parse(res.data);
}

// Delete a task
export async function deleteTask(id: string): Promise<void> {
  await http.delete(`/tasks/${id}`);
}
