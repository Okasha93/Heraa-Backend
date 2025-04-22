const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');

exports.register = async (req, res) => {
    const { phoneNumber, password, apartment, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ phoneNumber, password: hashedPassword, apartment, name });
    await user.save();

    res.status(201).json({ message: 'User registered successfully.' });
};

exports.login = async (req, res) => {
    const { phoneNumber, password } = req.body;
    const user = await User.findOne({ phoneNumber });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = generateToken(user._id);
    res.json({ token });
};
