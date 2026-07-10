import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRoutes from './routes/health';
import resourceRoutes from './routes/resourceRoutes';
import { connectToDatabase } from './config/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(healthRoutes);
app.use(resourceRoutes);

async function start() {
  try {
    await connectToDatabase();
  } catch (err) {
    console.error('Database connection failed. Server will still start but DB queries may fail.');
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

start();

export default app;
