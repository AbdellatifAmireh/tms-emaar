import app from './app.js';
import { PORT } from './config/env.js';
import { connectDB } from './db/connect.js';

connectDB()
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`API listening on http://localhost:${PORT}/tasks`);
    });
  })
  .catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
