// updateLecturerField.js
// Run: node backend/scripts/updateLecturerField.js

const mongoose = require('mongoose');
const User = require('../models/User');
const Score = require('../models/Score');
require('dotenv').config({ path: '../.env' });

const subjects = [
  { name: 'JavaScript', lecturerEmail: 'kimjongun@idk-lecturer.com' },
  { name: 'Cybersecurity', lecturerEmail: 'yimsiwan@idk-lecturer.com' },
  { name: 'AI Ethics & Security', lecturerEmail: 'leejungjae@idk-lecturer.com' }
];

async function updateLecturerField() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/idk_academy');
  for (const subj of subjects) {
    const lecturer = await User.findOne({ email: subj.lecturerEmail, role: 'lecturer' });
    if (!lecturer) {
      console.log(`Lecturer not found for subject ${subj.name}`);
      continue;
    }
    const result = await Score.updateMany(
      { subject: subj.name },
      { $set: { lecturer: lecturer._id } }
    );
    console.log(`Updated ${result.modifiedCount} scores for subject ${subj.name}`);
  }
  console.log('Done updating lecturer field in scores.');
  process.exit();
}

updateLecturerField();
