// printLecturers.js
// Run: node backend/scripts/printLecturers.js

const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config({ path: '../.env' });

async function printLecturers() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/idk_academy');
  const lecturers = await User.find({ role: 'lecturer' });
  console.log('Lecturers and their subject fields:');
  lecturers.forEach(l => {
    console.log(`Name: ${l.name}, Email: ${l.email}, Subject: ${l.subject || '(none)'}`);
  });
  process.exit();
}

printLecturers();
