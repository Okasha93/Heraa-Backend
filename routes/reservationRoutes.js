const express = require('express');
const { createReservation, getReservations, updateReservationStatus } = require('../controllers/reservationController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);
router.route('/').get(getReservations).post(createReservation);
router.put('/:id/status', updateReservationStatus);

module.exports = router;
