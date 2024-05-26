const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Import routes
const vehicleRoutes = require('./routes/vehicles');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://127.0.0.1:5500'
}));
app.use(helmet()); // Helmet for security headers
app.use(morgan('dev')); // Morgan for request logging

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vehicleParking', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve Parking.html from the pages folder
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'parking.html'));
});

// Use routes
app.use('/api/vehicles', vehicleRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));