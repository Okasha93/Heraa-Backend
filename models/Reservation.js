const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    date: String,
    time: String,
    description: String,
    status: { type: String, default: 'pending' }
});

module.exports = mongoose.model('Reservation', reservationSchema);
