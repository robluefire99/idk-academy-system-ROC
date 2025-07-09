// addScoreToAllLecturers.js
// Run: node backend/scripts/addScoreToAllLecturers.js

const mongoose = require('mongoose');
const User = require('../models/User');
const Score = require('../models/Score');
require('dotenv').config({ path: '../.env' });

async function addScoreToAllLecturers() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/idk_academy');
  const lecturers = await User.find({ role: 'lecturer' });
  const students = await User.find({ role: 'student' });

  for (const lecturer of lecturers) {
    // Find students assigned to this lecturer
    const myStudents = students.filter(s => s.lecturer && s.lecturer.equals(lecturer._id));
    for (const student of myStudents) {
      // Add a score of 100 for the lecturer's subject
      await Score.create({
        student: student._id,
        subject: lecturer.subject,
        score: 100,
        max_score: 100,
        feedback: 'Perfect score by Kim Jong-un',
        lecturer: lecturer._id
      });
      console.log(`Added score 100 for student ${student.name} in subject ${lecturer.subject} by lecturer ${lecturer.name}`);
    }
  }
  console.log('Done adding scores.');
  process.exit();
}

addScoreToAllLecturers();
