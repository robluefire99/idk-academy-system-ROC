const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role = 'student', gender, lecturer } = req.body;
    const user = await User.create({ name, email, password, role, gender, lecturer, isVerified: true });
    console.log('User created:', user);
    // Auto-login after registration
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({
      success: true,
      message: 'Registration successful.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ success: false, message: 'Registration failed', error: err.message });
  }
};

exports.verify = async (req, res) => {
  const { token } = req.params;
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  await User.findByIdAndUpdate(id, { isVerified: true });
  res.redirect(`${process.env.CLIENT_URL}/login`);
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', email, password);
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(400).json({ success: false, error: { code: 400, message: 'Invalid credentials' } });
    }
    if (user.password !== password) {
      console.log('Password mismatch for:', email, 'Expected:', user.password, 'Got:', password);
      return res.status(400).json({ success: false, error: { code: 400, message: 'Invalid credentials' } });
    }
    if (!user.isVerified) {
      console.log('User not verified:', email);
      return res.status(403).json({ success: false, error: { code: 403, message: 'Please verify your email first' } });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, error: { code: 500, message: 'Server error', details: err.message } });
  }
};