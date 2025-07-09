const Score = require('../models/Score');
const sendEmail = require('../utils/sendEmail');
const User = require('../models/User');

exports.createScore = async (req, res) => {
  try {
    // Find student by name
    const student = await User.findOne({ name: req.body.studentName, role: 'student' });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Create score with student _id, email, and lecturer _id
    const score = await Score.create({
      ...req.body,
      student: student._id,
      studentEmail: student.email,
      lecturer: req.user._id // Attach lecturer's id
    });

    const html = `
      <p>New score for <strong>${score.subject}</strong>:</p>
      <p>Score: <strong>${score.score}</strong></p>
      <p>Feedback: ${score.feedback}</p>
    `;
    await sendEmail(student.email, 'New Score Uploaded', html);
    res.json(score);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getScores = async (req, res) => {
  const { page = 1, limit = 100 } = req.query; // Default to 100 for more students
  const skip = (page - 1) * limit;
  let filter = {};
  
  if (req.user.role === 'student') {
    filter = { student: req.user._id };
  } else if (req.user.role === 'lecturer') {
    filter = { lecturer: req.user._id };
  }
  const scores = await Score.find(filter).skip(skip).limit(Number(limit));
  res.json(scores);
};

exports.getScore = async (req, res) => {
  const score = await Score.findById(req.params.id);
  res.json(score);
};

exports.updateScore = async (req, res) => {
  const score = await Score.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(score);
};

exports.deleteScore = async (req, res) => {
  await Score.findByIdAndDelete(req.params.id);
  res.json({ message: 'Score deleted' });
};