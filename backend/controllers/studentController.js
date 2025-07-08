const Score = require('../models/Score');
const Notification = require('../models/Notification');

// GET /api/scores/me
exports.getMyScores = async (req, res) => {
  try {
    const scores = await Score.find({ student: req.user.id });
    res.json({ success: true, scores });
  } catch (err) {
    res.status(500).json({ success: false, error: { code: 500, message: err.message } });
  }
};

// GET /api/notifications/me
exports.getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ $or: [ { student: req.user.id }, { student: null } ] }).sort({ date: -1 });
    res.json({ success: true, notifications });
  } catch (err) {
    res.status(500).json({ success: false, error: { code: 500, message: err.message } });
  }
};
