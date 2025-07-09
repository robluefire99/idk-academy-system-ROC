// printAllLecturers.js
// Run: node backend/scripts/printAllLecturers.js

const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config({ path: '../.env' });

async function printAllLecturers() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/idk_academy');
  const lecturers = await User.find({ role: 'lecturer' });
  console.log('All users with role lecturer:');
  lecturers.forEach(l => {
    console.log(`_id: ${l._id}, Name: ${l.name}, Email: ${l.email}, Subject: ${l.subject || '(none)'}`);
  });
  process.exit();
}

printAllLecturers();
