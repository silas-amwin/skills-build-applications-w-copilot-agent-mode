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

// Compute Codespaces-aware API base URL and expose it on the app
const codespaceName = process.env.CODESPACE_NAME;
const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.locals.API_BASE_URL = API_BASE_URL;
app.get('/api/config', (_req, res) => {
  res.json({ apiBaseUrl: API_BASE_URL });
});

app.use(cors());

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
