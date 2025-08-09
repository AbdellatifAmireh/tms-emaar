import { Router } from 'express';
import { getTasks, addTask, updateTask, deleteTask } from '../controllers/tasks.controller.js';

const router = Router();

router.get('/', getTasks);
router.post('/', addTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
