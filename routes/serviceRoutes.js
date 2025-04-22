const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { createService, listServices } = require('../controllers/serviceController');

router.post('/', auth, createService);
router.get('/', auth, listServices);

module.exports = router;
