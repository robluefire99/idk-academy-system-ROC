// printFullLecturers.js
// Run: node backend/scripts/printFullLecturers.js

const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config({ path: '../.env' });

async function printFullLecturers() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/idk_academy');
  const lecturers = await User.find({ role: 'lecturer' });
  console.log('Full lecturer documents:');
  lecturers.forEach(l => {
    console.log(JSON.stringify(l, null, 2));
  });
  process.exit();
}

printFullLecturers();
