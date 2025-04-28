const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const {
    getUsers,
    getMe,
    updateProfile,
    deleteUser
} = require('../controllers/userController');

const router = express.Router();

// List all users (admin only)
router.get('/usersList', authMiddleware, getUsers);

// Get current user
router.get('/me', authMiddleware, getMe);

// Update current user (name, apartment, and profileImage)
router.put(
    '/me',
    authMiddleware,
    upload.single('profileImage'),
    updateProfile
);

// Delete a user (admin only)
router.delete('/:id', authMiddleware, deleteUser);

module.exports = router;
