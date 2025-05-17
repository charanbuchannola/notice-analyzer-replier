require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const noticeRoutes = require('./routes/noticeRoutes');
// const path = require('path'); // No longer needed for static serving of uploads

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increase JSON payload limit if needed for other things
app.use(express.urlencoded({ extended: false, limit: '50mb' })); // For URL-encoded bodies

// Serve uploaded files statically (REMOVED as files are on Cloudinary)
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define Routes
app.use('/api/notices', noticeRoutes);

app.get('/', (req, res) => res.send('Notice Analyzer API Running'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));