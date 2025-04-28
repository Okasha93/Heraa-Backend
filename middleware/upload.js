const multer = require('multer');
const { profileStorage } = require('../config/cloudinary');

module.exports = multer({ storage: profileStorage });
