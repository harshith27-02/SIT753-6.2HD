// const express = require('express');
// const mongoose = require('mongoose');
// const path = require('path');
// const parkingRoutes = require('./routes/parkingRoutes');
// const vehicleRoutes = require('./routes/vehicles');
// const app = express();

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/parkingDB', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // Serve static files
// app.use(express.static(path.join(__dirname)));
// app.use(express.static(path.join(__dirname, 'public')));

// // Routes
// app.use('/api/parking', parkingRoutes);

// // app.use('/api/vehicles', vehicleRoutes);

// // Default Route
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'Parking.html'));
// });


// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const parkingRoutes = require('./routes/parkingRoutes');
const userRoutes = require('./routes/user'); // Assuming user routes are in this file

const parkingslots = require('./routes/slots');
const app = express();
const cors = require('cors');

// Connect to MongoDB
mongoose.connect('mongodb+srv://s223743838:password-123@cluster0.gpmpazp.mongodb.net/PMS?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname)));
// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
// Routes
app.use('/api/parking', parkingRoutes);
app.use('/api/users', userRoutes);
app.use('/PMS/v1/slots', parkingslots);

// Default Route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Parking.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));