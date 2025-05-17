require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const noticeRoutes = require('./routes/noticeRoutes');


const app = express();


connectDB();

e
app.use(cors());
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ extended: false, limit: '50mb' })); 




app.use('/api/notices', noticeRoutes);

app.get('/', (req, res) => res.send('Notice Analyzer API Running'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));