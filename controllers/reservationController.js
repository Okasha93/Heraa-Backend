const Reservation = require('../models/Reservation');

exports.createReservation = async (req, res) => {
    const reservation = await Reservation.create({
        ...req.body,
        user: req.user.id,
    });
    res.json(reservation);
};

exports.getReservations = async (req, res) => {
    const reservations = await Reservation.find({ user: req.user.id }).populate('service').populate('user', 'name phoneNumber apartment');;
    res.json(reservations);
};

exports.updateReservationStatus = async (req, res) => {
    try {
        const reservationId = req.params.id;
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({ message: '`status` is required in the body.' });
        }

        const updated = await Reservation.findByIdAndUpdate(
            reservationId,
            { status },
            { new: true }
        ).populate('service');

        res.json(updated);
    } catch (error) {
        console.error('Error updating reservation status:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};

// —— List any user’s reservations (admin only) ——
exports.getUserReservations = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const reservations = await Reservation
            .find({ user: userId })
            .populate('service', 'name description price')
            .populate('user', 'name phoneNumber apartment');
        res.status(200).json({ status: 'success', results: reservations.length, data: reservations });
    } catch (err) {
        next(err);
    }
};