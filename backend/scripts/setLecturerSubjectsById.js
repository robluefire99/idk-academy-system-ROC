// setLecturerSubjectsById.js
// Run: node backend/scripts/setLecturerSubjectsById.js

const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config({ path: '../.env' });

const updates = [
  { _id: '686de53258b756c36ff42bf5', subject: 'JavaScript' },
  { _id: '686de53258b756c36ff42bf6', subject: 'Cybersecurity' },
  { _id: '686de53258b756c36ff42bf7', subject: 'AI Ethics & Security' }
];

async function setSubjects() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/idk_academy');
  for (const u of updates) {
    const result = await User.updateOne({ _id: new mongoose.Types.ObjectId(u._id) }, { $set: { subject: u.subject } });
    console.log(`Set subject for _id ${u._id}: ${u.subject} (${result.modifiedCount ? 'OK' : 'Not found or already set'})`);
  }
  process.exit();
}

setSubjects();
