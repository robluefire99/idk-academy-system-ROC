const express = require('express');
const router = express.Router();
const { getUsers, addUser, updateUser, deleteUser } = require('../controllers/userController');
const auth = require('../middleware/auth');

// All routes require authentication (can adjust for admin/lecturer only)
router.use(auth);

router.get('/', getUsers); // ?role=student or ?role=lecturer
router.post('/', addUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
