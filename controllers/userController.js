const User = require('../models/User');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select('name phoneNumber apartment profileImage role');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
};

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select('name phoneNumber apartment profileImage role');
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        // start with whatever fields came in
        const data = { ...req.body };
        // multer-storage-cloudinary attaches `req.file.path` as the full URL
        if (req.file && req.file.path) {
            data.profileImage = req.file.path;
        }
        const user = await User.findByIdAndUpdate(
            req.user.id,
            data,
            { new: true, runValidators: true }
        );
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
