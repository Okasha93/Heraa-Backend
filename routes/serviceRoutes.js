const express = require('express');
const { createService, getServices, deleteService } = require('../controllers/serviceController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(getServices).post(createService);
router.delete('/:id', authMiddleware, deleteService);

module.exports = router;
