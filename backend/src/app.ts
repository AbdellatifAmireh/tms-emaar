import express from 'express';
import routes from './routes/index.js';
import { corsMiddleware } from './middlewares/cors.js';
import { errorHandler } from './middlewares/error.js';

const app = express();

app.use(express.json());
app.use(corsMiddleware);
app.use('/', routes);
app.use(errorHandler);

export default app;
