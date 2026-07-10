const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function run() {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
  const db = mongoose.connection.db;
  const collections = await db.listCollections().toArray();
  console.log('Collections:', collections.map(c => c.name));
  const users = await db.collection('users').find({}).toArray();
  console.log('Users count:', users.length);
  const teams = await db.collection('teams').find({}).toArray();
  console.log('Teams count:', teams.length);
  await mongoose.disconnect();
}

run().catch(err=>{console.error(err); process.exit(1);});
