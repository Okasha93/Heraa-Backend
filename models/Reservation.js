const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    serviceName: String,
    time: String,
    text: String,
    serviceTime: String,
    status: { type: String, default: 'pending' },
    apartment: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Reservation', reservationSchema);
