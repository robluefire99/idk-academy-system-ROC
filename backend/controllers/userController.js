const User = require('../models/User');

// GET /api/users?role=student or role=lecturer
exports.getUsers = async (req, res) => {
  try {
    const filter = {};
    if (req.query.role) filter.role = req.query.role;
    const users = await User.find(filter).select('-password');
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// POST /api/users
exports.addUser = async (req, res) => {
  try {
    // Only allow admin to add users here
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Only admin can add users.' });
    }
    const { name, email, password, role, gender, lecturer } = req.body;
    const user = await User.create({ name, email, password, role, gender, lecturer, isVerified: true });
    res.json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// PUT /api/users/:id
exports.updateUser = async (req, res) => {
  try {
    const { name, email, role, gender, lecturer, password } = req.body;
    const updateFields = { name, email, role, gender, lecturer };
    if (password) updateFields.password = password;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    ).select('-password');
    res.json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// DELETE /api/users/:id
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
