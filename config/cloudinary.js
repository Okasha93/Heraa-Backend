const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const profileStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'profiles',
        allowed_formats: ['jpg', 'jpeg', 'png'],
        transformation: [{ width: 150, height: 150, crop: 'fill' }],
    },
});

module.exports = { cloudinary, profileStorage };
