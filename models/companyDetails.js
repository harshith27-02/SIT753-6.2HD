const mongoose = require("mongoose");
const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: [true, "comapany name required"]

    },
    mobile: {
        type: Number
    },
    email: {
        type: String
    },
    address: {
        type: String,
        maxLength: [50, "Address cannot be more than 50"]
    },
    gstNo: {
        type: String
    },
    ownerDetails: {
        ownerName: {
            type: String
        },
        mobile: {
            type: Number
        },
        email: {
            type: String
        },
        address: {
            type: String,
            maxLength: [50, "Address cannot be more than 50"]
        }

    },
    isActive: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Comapany details", companySchema);