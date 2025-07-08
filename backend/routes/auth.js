const router   = require('express').Router();
const passport = require('passport');
const jwt      = require('jsonwebtoken');
const { register, verify, login } = require('../controllers/authController');

router.post('/register', register);
router.get ('/verify/:token', verify);
router.post('/login',    login);

// Google OAuth
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile','email'] })
);
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: `${process.env.CLIENT_URL}/login` }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
  }
);

module.exports = router;