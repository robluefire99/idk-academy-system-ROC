// updateLecturerSubject.js
// Run: node backend/scripts/updateLecturerSubject.js

const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config({ path: '../.env' });

const lecturerSubjects = [
  { email: 'kimjongun@idk-lecturer.com', name: 'Kim Jong-un', subject: 'JavaScript' },
  { email: 'yimsiwan@idk-lecturer.com', name: 'Yim Si-wan', subject: 'Cybersecurity' },
  { email: 'leejungjae@idk-lecturer.com', name: 'Lee Jung-jae', subject: 'AI Ethics & Security' }
];

async function updateLecturers() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/idk_academy');
  for (const lec of lecturerSubjects) {
    const result = await User.updateOne(
      { email: lec.email, role: 'lecturer' },
      { $set: { name: lec.name, subject: lec.subject } }
    );
    console.log(`Updated lecturer ${lec.email}:`, result.modifiedCount ? 'OK' : 'Not found or already up to date');
  }
  console.log('Done updating lecturer info.');
  process.exit();
}

updateLecturers();
