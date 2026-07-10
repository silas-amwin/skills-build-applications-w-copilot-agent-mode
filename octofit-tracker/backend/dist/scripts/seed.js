"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            user_1.User.deleteMany({}),
            team_1.Team.deleteMany({}),
            activity_1.Activity.deleteMany({}),
            leaderboard_1.LeaderboardEntry.deleteMany({}),
            workout_1.Workout.deleteMany({}),
        ]);
        const usersData = [
            {
                name: 'Maya Chen',
                email: 'maya@example.com',
                fitnessGoal: 'Improve endurance',
                level: 'Intermediate',
            },
            {
                name: 'Liam Ortiz',
                email: 'liam@example.com',
                fitnessGoal: 'Build strength',
                level: 'Advanced',
            },
            {
                name: 'Sofia Alvarez',
                email: 'sofia@example.com',
                fitnessGoal: 'Increase flexibility',
                level: 'Beginner',
            },
        ];
        await user_1.User.insertMany(usersData);
        const users = await user_1.User.find({}).lean();
        await team_1.Team.insertMany([
            {
                name: 'River Runners',
                sport: 'Running',
                members: users.slice(0, 2).map((user) => user.name),
                weeklyGoal: 'Complete 4 group runs',
            },
            {
                name: 'Peak Performers',
                sport: 'CrossFit',
                members: [users[2].name],
                weeklyGoal: 'Hit 3 strength sessions',
            },
        ]);
        await activity_1.Activity.insertMany([
            {
                userId: users[0]._id.toString(),
                type: 'Run',
                durationMinutes: 35,
                caloriesBurned: 420,
                date: new Date('2026-07-01T06:00:00.000Z'),
            },
            {
                userId: users[1]._id.toString(),
                type: 'Strength',
                durationMinutes: 50,
                caloriesBurned: 620,
                date: new Date('2026-07-02T18:30:00.000Z'),
            },
            {
                userId: users[2]._id.toString(),
                type: 'Yoga',
                durationMinutes: 30,
                caloriesBurned: 180,
                date: new Date('2026-07-03T08:00:00.000Z'),
            },
        ]);
        await leaderboard_1.LeaderboardEntry.insertMany([
            { userId: users[0]._id.toString(), username: 'Maya Chen', score: 980, rank: 1 },
            { userId: users[1]._id.toString(), username: 'Liam Ortiz', score: 945, rank: 2 },
            { userId: users[2]._id.toString(), username: 'Sofia Alvarez', score: 890, rank: 3 },
        ]);
        await workout_1.Workout.insertMany([
            {
                name: 'Tempo Run',
                category: 'Cardio',
                difficulty: 'Intermediate',
                durationMinutes: 40,
                equipment: ['Shoes'],
            },
            {
                name: 'Upper Body Blast',
                category: 'Strength',
                difficulty: 'Advanced',
                durationMinutes: 45,
                equipment: ['Dumbbells', 'Bench'],
            },
            {
                name: 'Mobility Flow',
                category: 'Recovery',
                difficulty: 'Beginner',
                durationMinutes: 25,
                equipment: ['Yoga Mat'],
            },
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
