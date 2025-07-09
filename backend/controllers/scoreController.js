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
  try {
    const { page = 1, limit = 100 } = req.query;
    const skip = (page - 1) * limit;
    let scores = [];

    if (req.user.role === 'student') {
      scores = await Score.find({ student: req.user._id }).skip(skip).limit(Number(limit));
    } else if (req.user.role === 'lecturer') {
      // Find all students assigned to this lecturer
      const students = await User.find({ lecturer: req.user._id, role: 'student' }, '_id');
      const studentIds = students.map(s => s._id);
      // Defensive: if no students, return empty array
      if (studentIds.length === 0) {
        return res.json([]);
      }
      // Find scores for these students and this lecturer's subject
      const lecturer = await User.findById(req.user._id);
      if (!lecturer || !lecturer.subject) {
        return res.status(400).json({ message: 'Lecturer subject not set' });
      }
      scores = await Score.find({ student: { $in: studentIds }, subject: lecturer.subject }).skip(skip).limit(Number(limit));
    }
    res.json(scores);
  } catch (err) {
    console.error('Error in getScores:', err);
    res.status(500).json({ message: 'Server error in getScores', error: err.message });
  }
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