const mongoose = require('mongoose');
const User = require('../models/User');
const Score = require('../models/Score');
require('dotenv').config({ path: '../.env' });

const students = [
  { name: 'Kim Min-jun', gender: 'M' },
  { name: 'Lee Ji-hoon', gender: 'M' },
  { name: 'Park Jae-hyun', gender: 'M' },
  { name: 'Choi Dong-hyun', gender: 'M' },
  { name: 'Jung Woo-jin', gender: 'M' },
  { name: 'Kang Hyun-woo', gender: 'M' },
  { name: 'Yoon Seok-jin', gender: 'M' },
  { name: 'Lim Tae-hyun', gender: 'M' },
  { name: 'Han Joon-seo', gender: 'M' },
  { name: 'Seo Min-seok', gender: 'M' },
  { name: 'Shin Dong-min', gender: 'M' },
  { name: 'Hwang Jun-ho', gender: 'M' },
  { name: 'Oh Seung-hyun', gender: 'M' },
  { name: 'Song Ji-ho', gender: 'M' },
  { name: 'Baek Sung-min', gender: 'M' },
  { name: 'Kim Seo-yeon', gender: 'F' },
  { name: 'Lee Ji-eun', gender: 'F' },
  { name: 'Park Soo-min', gender: 'F' },
  { name: 'Choi Eun-ji', gender: 'F' },
  { name: 'Jung Hye-jin', gender: 'F' },
  { name: 'Kang Min-ji', gender: 'F' },
  { name: 'Yoon Ha-eun', gender: 'F' },
  { name: 'Lim Da-hye', gender: 'F' },
  { name: 'Han Ji-won', gender: 'F' },
  { name: 'Seo Yeon-woo', gender: 'F' },
  { name: 'Shin Hye-soo', gender: 'F' },
  { name: 'Hwang Soo-yeon', gender: 'F' },
  { name: 'Oh Min-seo', gender: 'F' },
  { name: 'Song Hye-jin', gender: 'F' },
  { name: 'Baek Ji-woo', gender: 'F' }
];

const subjects = [
  { name: 'JavaScript', lecturer: { name: 'Mr. Kim Jong Un', email: 'kimjongun@idk-lecturer.com' } },
  { name: 'Cybersecurity', lecturer: { name: 'Mr. Yim Si-wan', email: 'yimsiwan@idk-lecturer.com' } },
  { name: 'AI Ethics & Security', lecturer: { name: 'Mr. Lee Jung-jae', email: 'leejungjae@idk-lecturer.com' } }
];

const years = ['2024-2025'];
const semesters = ['Semester 1', 'Semester 2'];

function makeStudentEmail(name) {
  return name.toLowerCase().replace(/[^a-z]/g, '') + '@idk-student.com';
}

async function seed() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/idk_academy');
  await User.deleteMany({ role: { $in: ['student', 'lecturer'] } });
  await Score.deleteMany({});

  // Insert lecturers
  const lecturerDocs = {};
  for (const subj of subjects) {
    const lecturer = await User.findOneAndUpdate(
      { email: subj.lecturer.email },
      { name: subj.lecturer.name, email: subj.lecturer.email, password: 'password123', role: 'lecturer', isVerified: true },
      { upsert: true, new: true }
    );
    lecturerDocs[subj.name] = lecturer;
  }

  // Insert students
  const studentDocs = [];
  const studentEmailList = [];
  for (let i = 0; i < students.length; i++) {
    const s = students[i];
    const email = makeStudentEmail(s.name);
    // Assign lecturer round-robin by subject
    const subjectIdx = i % subjects.length;
    const lecturer = lecturerDocs[subjects[subjectIdx].name];
    const student = await User.create({
      name: s.name,
      email,
      password: 'password123',
      role: 'student',
      isVerified: true,
      gender: s.gender,
      lecturer: lecturer._id
    });
    studentDocs.push(student);
    studentEmailList.push(email);
  }

  // Insert scores
  for (const student of studentDocs) {
    for (const subj of subjects) {
      for (const year of years) {
        for (const semester of semesters) {
          await Score.create({
            student: student._id,
            subject: subj.name,
            score: Math.floor(Math.random() * 60) + 40,
            max_score: 100,
            feedback: 'Auto-generated score',
            date: new Date(),
          });
        }
      }
    }
  }

  console.log('Dummy data seeded!');
  console.log('\nLecturer logins:');
  for (const subj of subjects) {
    console.log(`  ${subj.lecturer.email} / password123`);
  }
  console.log('\nStudent logins:');
  studentEmailList.forEach((email, i) => {
    console.log(`  ${email} / password123`);
  });
  process.exit();
}

seed();
