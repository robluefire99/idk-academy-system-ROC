// printSampleScores.js
// Run: node backend/scripts/printSampleScores.js

const mongoose = require('mongoose');
const Score = require('../models/Score');
require('dotenv').config({ path: '../.env' });

async function printSampleScores() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/idk_academy');
  const subjects = ['JavaScript', 'Cybersecurity', 'AI Ethics & Security'];
  for (const subject of subjects) {
    const scores = await Score.find({ subject }).limit(5);
    console.log(`\nSample scores for subject: ${subject}`);
    scores.forEach(s => {
      console.log(JSON.stringify(s, null, 2));
    });
  }
  process.exit();
}

printSampleScores();
