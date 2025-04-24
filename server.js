require('dotenv').config();

const mongoose = require('mongoose');
const app = require('./app');

// Pull PORT and MongoDB URI from environment (with sane defaults)
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌  Error: MONGODB_URI is not defined in .env');
    process.exit(1);
}

// Connect to MongoDB Atlas
mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('✅  MongoDB connected');

        // Start listening only after a successful DB connection
        app.listen(PORT, () => {
            console.log(`🚀  Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌  MongoDB connection error:', err);
        process.exit(1);
    });