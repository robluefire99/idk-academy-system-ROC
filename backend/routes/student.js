const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getMyScores, getMyNotifications } = require('../controllers/studentController');

router.use(auth);

router.get('/scores/me', getMyScores);
router.get('/notifications/me', getMyNotifications);

module.exports = router;
