const express = require('express');
const { updateProfile, getMe, deleteUser, getUsers } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/usersList', authMiddleware, getUsers);
router.get('/me', authMiddleware, getMe);
router.put('/me', authMiddleware, upload.single('profileImage'), updateProfile);
router.delete('/:id', authMiddleware, deleteUser);;

module.exports = router;
