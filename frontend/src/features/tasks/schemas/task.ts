import { z } from 'zod';

export const TaskSchema = z.object({
  _id: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  completed: z.boolean().optional().default(false),
  created_at: z.string().or(z.date())
});

export const CreateTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional()
});

export const UpdateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  completed: z.boolean().optional()
}).refine(v => Object.keys(v).length > 0, { message: 'No fields to update' });

export type Task = z.infer<typeof TaskSchema>;
