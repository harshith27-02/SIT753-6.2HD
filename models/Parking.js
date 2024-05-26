const mongoose = require('mongoose');

const ParkingSchema = new mongoose.Schema({
    vehicleNo: { type: String, required: true },
    category: { type: String, required: true },
    rateCode: { type: String, required: true },
    rate: { type: Number, required: true },
    checkinTime: { type: Date, required: true },
    checkoutTime: { type: Date },
    totalHours: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    paidStatus: { type: String, required: true },
    paymentMode: { type: String, required: true }
});

module.exports = mongoose.model('Parking', ParkingSchema);
