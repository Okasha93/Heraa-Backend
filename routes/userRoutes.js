const router = require('express').Router();
const { getUserInfo } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

router.get('/me', auth, getUserInfo);

module.exports = router;
