const User = require('../models/User');

exports.getMe = async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json(user);
};

exports.updateProfile = async (req, res) => {
    const data = { ...req.body };
    if (req.file) {
        data.profileImage = req.file.filename;
    }
    const user = await User.findByIdAndUpdate(req.user.id, data, { new: true });
    res.json(user);
};

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// controllers/userController.js
exports.getUsers = async (req, res) => {
    try {
        // if (req.user.role !== 'admin') {
        //     return res.status(403).json({ message: 'Forbidden: Admins only' });
        // }

        // Only include these fields:
        const users = await User.find()
            .select('name phoneNumber apartment profileImage role');

        res.json(users);
    } catch (error) {
        console.error('Error listing users:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};
