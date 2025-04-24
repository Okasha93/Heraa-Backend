const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// 1) CORS & JSON parsing
app.use(cors());
app.use(express.json());

// 2) URL-encoded parsing (for multipart via multer)
app.use(express.urlencoded({ extended: true }));

// 3) Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 4) Your routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/reservations', require('./routes/reservationRoutes'));

// 5) 404 fallback
app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

module.exports = app;
