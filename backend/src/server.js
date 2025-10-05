require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const dbConnect = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const fileRoutes = require('./routes/fileUploadRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
dbConnect();

// Middleware
app.use(cors()); // in production restrict origin
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static serve uploads (if using local storage)
const uploadDir = process.env.UPLOAD_DIR || 'uploads';
app.use('/uploads', express.static(path.join(__dirname, '..', uploadDir)));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/files', fileRoutes);

// Health
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
