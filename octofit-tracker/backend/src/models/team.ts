import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  sport: string;
  members: string[];
  weeklyGoal: string;
}

const teamSchema = new Schema({
  name: { type: String, required: true },
  sport: { type: String, required: true },
  members: [{ type: String }],
  weeklyGoal: { type: String, required: true },
});

export const Team = mongoose.model('Team', teamSchema);
