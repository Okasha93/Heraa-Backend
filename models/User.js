const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    apartment: { type: String, required: true },
    name: { type: String, required: true },
    profileImage: { type: String, default: '' }
});

module.exports = mongoose.model('User', userSchema);