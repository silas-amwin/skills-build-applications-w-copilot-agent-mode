"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const team_1 = require("../models/team");
const user_1 = require("../models/user");
const workout_1 = require("../models/workout");
const apiUrl_1 = require("../utils/apiUrl");
const router = (0, express_1.Router)();
const resources = [
    {
        name: 'users',
        path: '/api/users/',
        handler: async () => user_1.User.find({}).lean(),
    },
    {
        name: 'teams',
        path: '/api/teams/',
        handler: async () => team_1.Team.find({}).lean(),
    },
    {
        name: 'activities',
        path: '/api/activities/',
        handler: async () => activity_1.Activity.find({}).lean(),
    },
    {
        name: 'leaderboard',
        path: '/api/leaderboard/',
        handler: async () => leaderboard_1.LeaderboardEntry.find({}).sort({ rank: 1 }).lean(),
    },
    {
        name: 'workouts',
        path: '/api/workouts/',
        handler: async () => workout_1.Workout.find({}).lean(),
    },
];
for (const resource of resources) {
    const aliases = [resource.path, resource.path.replace(/\/$/, '')];
    router.get(aliases, async (_req, res) => {
        try {
            const data = await resource.handler();
            res.json({
                resource: resource.name,
                endpoint: resource.path,
                apiUrl: (0, apiUrl_1.getApiUrl)(resource.path),
                count: Array.isArray(data) ? data.length : 0,
                data,
            });
        }
        catch (error) {
            res.status(500).json({ error: 'Unable to load data', details: String(error) });
        }
    });
}
exports.default = router;
