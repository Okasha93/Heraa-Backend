const express = require('express');
const { createReservation, getReservations, updateReservationStatus, getAllReservations } = require('../controllers/reservationController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);
router.get('/', getAllReservations);
router.route('/me').get(getReservations).post(createReservation);
router.put('/:id/status', updateReservationStatus);

module.exports = router;
