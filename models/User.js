const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    apartment: String,
    role: { type: String, default: 'user' },
    password: String,
    profileImageURL: String,
});

module.exports = mongoose.model('User', userSchema);
