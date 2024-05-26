// // // const mongoose = require('mongoose');

// // // // Define the schema for a parking entry
// // // const parkingEntrySchema = new mongoose.Schema({
// // //   plateNumber: {
// // //     type: String,
// // //     required: true
// // //   },
// // //   entryTime: {
// // //     type: Date,
// // //     default: Date.now
// // //   },
// // //   // You can add more fields as needed
// // // });

// // // // Create a model from the schema
// // // const ParkingEntry = mongoose.model('ParkingEntry', parkingEntrySchema);

// // // module.exports = ParkingEntry;
// // const mongoose = require('mongoose');

// // const parkingEntrySchema = new mongoose.Schema({
// //   plateNumber: {
// //     type: String,
// //     required: true
// //   },
// //   category: {
// //     type: String,
// //     required: true
// //   },
// //   rateCode: {
// //     type: String,
// //     required: true
// //   },
// //   checkinTime: {
// //     type: Date,
// //     required: true
// //   },
// //   checkoutTime: {
// //     type: Date,
// //     required: true
// //   },
// //   totalHours: {
// //     type: Number,
// //     required: true
// //   },
// //   totalAmount: {
// //     type: Number,
// //     required: true
// //   },
// //   paidStatus: {
// //     type: String,
// //     required: true
// //   },
// //   paymentMode: {
// //     type: String,
// //     required: true
// //   }
// // });

// // module.exports = mongoose.model('ParkingEntry', parkingEntrySchema);
// const mongoose = require('mongoose');

// const ParkingEntrySchema = new mongoose.Schema({
//   plateNumber: { type: String, required: true },
//   category: { type: String, required: true },
//   rateCode: { type: String, required: true },
//   rate: { type: Number, required: true },
//   checkinTime: { type: Date, required: true },
//   checkoutTime: { type: Date, required: true },
//   totalHours: { type: Number, required: true },
//   totalAmount: { type: Number, required: true },
//   paidStatus: {
//     type: Boolean,
//     required: true,
//     // Custom setter function to convert string value to boolean
//     set: function (value) {
//       return value === 'Paid'; // Convert 'Paid' to true, everything else to false
//     }
//   },
//   paymentMode: { type: String, required: true }
// });

// module.exports = mongoose.model('ParkingEntry', ParkingEntrySchema);
const mongoose = require('mongoose');

const ParkingEntrySchema = new mongoose.Schema({
    plateNumber: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    rateCode: {
        type: String,
        required: true
    },
    checkinTime: {
        type: Date,
        required: true
    },
    checkoutTime: {
        type: Date,
        required: true
    },
    totalHours: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paidStatus: {
        type: String,
        required: true
    },
    paymentMode: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ParkingEntry', ParkingEntrySchema);
