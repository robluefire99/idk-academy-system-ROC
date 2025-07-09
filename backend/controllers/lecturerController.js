const User = require('../models/User');
const Score = require('../models/Score');
const Notification = require('../models/Notification');

// GET /api/lecturer/students
exports.getStudents = async (req, res) => {
  try {
    // Return all students assigned to this lecturer (no limit)
    const students = await User.find({ lecturer: req.user.id, role: 'student' });
    res.json({ success: true, students });
  } catch (err) {
    res.status(500).json({ success: false, error: { code: 500, message: err.message } });
  }
};

// GET /api/lecturer/student/:id/scores
exports.getStudentScores = async (req, res) => {
  try {
    const student = await User.findById(req.params.id);
    if (!student || student.role !== 'student') return res.status(404).json({ success: false, error: { code: 404, message: 'Student not found' } });
    // Only return scores for this lecturer's subject
    const lecturer = await User.findById(req.user.id);
    if (!lecturer || !lecturer.subject) return res.status(400).json({ success: false, error: { code: 400, message: 'Lecturer subject not set' } });
    const scores = await Score.find({ student: student._id, lecturer: req.user.id, subject: lecturer.subject });
    res.json({ success: true, student, scores });
  } catch (err) {
    res.status(500).json({ success: false, error: { code: 500, message: err.message } });
  }
};

// POST /api/lecturer/scores
exports.addScore = async (req, res) => {
  try {
    const { student_id, score, max_score, feedback } = req.body;
    // Get lecturer's subject
    const lecturer = await User.findById(req.user.id);
    if (!lecturer || !lecturer.subject) {
      return res.status(400).json({ success: false, error: { code: 400, message: 'Lecturer subject not set' } });
    }
    // Create score with forced subject and lecturer
    const newScore = await Score.create({
      student: student_id,
      subject: lecturer.subject,
      score,
      max_score,
      feedback,
      lecturer: req.user.id
    });
    res.json({ success: true, message: 'Score added successfully', score: newScore });
  } catch (err) {
    res.status(500).json({ success: false, error: { code: 500, message: err.message } });
  }
};

// PUT /api/lecturer/scores/:id
exports.updateScore = async (req, res) => {
  try {
    const { subject, score, max_score, feedback } = req.body;
    const updated = await Score.findByIdAndUpdate(
      req.params.id,
      { subject, score, max_score, feedback },
      { new: true }
    );
    res.json({ success: true, message: 'Score updated successfully', score: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: { code: 500, message: err.message } });
  }
};

// DELETE /api/lecturer/scores/:id
exports.deleteScore = async (req, res) => {
  try {
    await Score.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Score deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: { code: 500, message: err.message } });
  }
};

// POST /api/lecturer/notify
exports.sendNotification = async (req, res) => {
  try {
    const { student_id, message } = req.body;
    if (student_id) {
      await Notification.create({ student: student_id, message });
    } else {
      // Send to all students of this lecturer
      const students = await User.find({ lecturer: req.user.id, role: 'student' });
      await Promise.all(students.map(s => Notification.create({ student: s._id, message })));
    }
    res.json({ success: true, message: 'Notification sent successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: { code: 500, message: err.message } });
  }
};
