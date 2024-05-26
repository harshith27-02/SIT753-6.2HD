const mongoose = require("mongoose");
const rateSchema = new mongoose.Schema({
    rateName: {
        type: String,
        required: [true, "rate name required"]

    },
    rateCode: {
        type: String,
        required: [true, "rate code required"],
        unique: true

    },
    category: {
        type: Array
    },
    type: {
        type: Array
    },
    rate: {
        type: Number
    },

    isActive: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Rates", rateSchema);