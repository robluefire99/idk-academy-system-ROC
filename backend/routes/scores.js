const router     = require('express').Router();
const auth       = require('../middleware/auth');
const verifyEmail= require('../middleware/verifyEmail');
const ctrl       = require('../controllers/scoreController');

router.use(auth, verifyEmail);

router.post('/',     ctrl.createScore);
router.get ('/',     ctrl.getScores);
router.get ('/:id',  ctrl.getScore);
router.put ('/:id',  ctrl.updateScore);
router.delete('/:id',ctrl.deleteScore);

module.exports = router;