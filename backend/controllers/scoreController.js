const Score = require('../models/Score');
const sendEmail = require('../utils/sendEmail');

exports.createScore = async (req, res) => {
  const score = await Score.create({ ...req.body });
  const html = `
    <p>New score for <strong>${score.subject}</strong>:</p>
    <p>Score: <strong>${score.score}</strong></p>
    <p>Feedback: ${score.feedback}</p>
  `;
  await sendEmail(req.body.studentEmail, 'New Score Uploaded', html);
  res.json(score);
};

exports.getScores = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const filter = req.user.role === 'student' ? { student: req.user._id } : {};
  const scores = await Score.find(filter).skip(skip).limit(limit);
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