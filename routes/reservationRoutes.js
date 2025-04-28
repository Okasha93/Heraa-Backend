const express = require('express');
const { createReservation, getReservations, updateReservationStatus, getAllReservations, getReservationsByUser } = require('../controllers/reservationController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);
router.route('/all').get(getAllReservations);
router.route('/').get(getReservations).post(createReservation);
router.patch('/:id/status', updateReservationStatus);
router.get('/user/:userId', getReservationsByUser);

module.exports = router;
