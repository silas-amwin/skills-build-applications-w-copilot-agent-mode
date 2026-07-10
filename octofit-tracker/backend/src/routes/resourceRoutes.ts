import { Router } from 'express';
import { Activity } from '../models/activity';
import { LeaderboardEntry } from '../models/leaderboard';
import { Team } from '../models/team';
import { User } from '../models/user';
import { Workout } from '../models/workout';
import { getApiUrl } from '../utils/apiUrl';

const router = Router();

const resources = [
  {
    name: 'users',
    path: '/api/users/',
    handler: async () => User.find({}).lean(),
  },
  {
    name: 'teams',
    path: '/api/teams/',
    handler: async () => Team.find({}).lean(),
  },
  {
    name: 'activities',
    path: '/api/activities/',
    handler: async () => Activity.find({}).lean(),
  },
  {
    name: 'leaderboard',
    path: '/api/leaderboard/',
    handler: async () => LeaderboardEntry.find({}).sort({ rank: 1 }).lean(),
  },
  {
    name: 'workouts',
    path: '/api/workouts/',
    handler: async () => Workout.find({}).lean(),
  },
] as const;

for (const resource of resources) {
  const aliases = [resource.path, resource.path.replace(/\/$/, '')];

  router.get(aliases, async (_req, res) => {
    try {
      const data = await resource.handler();
      res.json({
        resource: resource.name,
        endpoint: resource.path,
        apiUrl: getApiUrl(resource.path),
        count: Array.isArray(data) ? data.length : 0,
        data,
      });
    } catch (error) {
      res.status(500).json({ error: 'Unable to load data', details: String(error) });
    }
  });
}

export default router;
