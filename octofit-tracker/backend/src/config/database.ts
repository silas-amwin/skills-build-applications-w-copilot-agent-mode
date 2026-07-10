import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const db = mongoose.connection;

export async function connectToDatabase() {
  return mongoose.connect(connectionString, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
      console.log('Connected to octofit_db');
      return mongoose.connection;
    })
    .catch((error) => {
      console.error('MongoDB connection unavailable:', error.message);
      throw error;
    });
}

db.on('error', console.error.bind(console, 'connection error:'));

export default db;
