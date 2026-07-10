import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  category: string;
  difficulty: string;
  durationMinutes: number;
  equipment: string[];
}

const workoutSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  difficulty: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  equipment: [{ type: String }],
});

export const Workout = mongoose.model('Workout', workoutSchema);
