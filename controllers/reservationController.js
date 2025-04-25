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

// exports.updateReservationStatus = async (req, res) => {
//     try {
//         const reservationId = req.params.id;
//         const { status } = req.body;
//         if (!status) {
//             return res.status(400).json({ message: '`status` is required in the body.' });
//         }

//         const updated = await Reservation.findByIdAndUpdate(
//             reservationId,
//             { status },
//             { new: true }
//         ).populate('service');

//         res.json(updated);
//     } catch (error) {
//         console.error('Error updating reservation status:', error);
//         res.status(500).json({ message: 'Server error.' });
//     }
// };


exports.updateReservationStatus = async (req, res) => {
    try {
        // 1) Admin check (assumes authMiddleware set req.user.role)
        // if (req.user.role !== 'admin') {
        //     return res
        //         .status(403)
        //         .json({ message: 'Forbidden: admins only can update status.' });
        // }

        const { id } = req.params;
        const { status } = req.body;

        // 2) Validate status
        const allowed = ['pending', 'confirmed', 'completed', 'cancelled'];
        if (!status || !allowed.includes(status)) {
            return res.status(400).json({
                message: `Invalid or missing status. Must be one of: ${allowed.join(', ')}`
            });
        }

        // 3) Perform the update
        const updated = await Reservation.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        )
            // 4) Populate both subdocs
            .populate('user', 'name phoneNumber apartment -_id')
            .populate('service', 'name price -_id');

        if (!updated) {
            return res.status(404).json({ message: 'Reservation not found.' });
        }

        // 5) Return the updated reservation
        res.json({
            status: 'success',
            data: updated
        });

    } catch (err) {
        console.error('Error updating reservation status:', err);
        res.status(500).json({ message: 'Server error.' });
    }
};

// —— List all user’s reservations (admin only) ——
exports.getAllReservations = async (req, res, next) => {
    try {
        // pull every reservation, populate user and service subdocs
        const reservations = await Reservation.find()
            .populate('user', 'name phoneNumber apartment -_id')
            .populate('service', 'name price -_id')
            .select('-_id date time description status'); // drop _id and __v on main doc

        res.status(200).json({
            status: 'success',
            results: reservations.length,
            data: reservations
        });
    } catch (err) {
        next(err);
    }
};