const express = require('express');
const router = express.Router();
const { getStudents, getStudentScores, addScore, updateScore, deleteScore, sendNotification } = require('../controllers/lecturerController');
const auth = require('../middleware/auth');

// All routes require lecturer authentication
router.use(auth);

router.get('/students', getStudents);
router.get('/student/:id/scores', getStudentScores);
router.post('/scores', addScore);
router.put('/scores/:id', updateScore);
router.delete('/scores/:id', deleteScore);
router.post('/notify', sendNotification);

module.exports = router;
