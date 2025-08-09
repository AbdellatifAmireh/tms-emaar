import { Router } from 'express';
import tasksRoutes from './tasks.routes.js';

const router = Router();

router.use('/tasks', tasksRoutes);

export default router;
