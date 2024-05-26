const mongoose = require("mongoose");

const slotNameSchema = mongoose.Schema({
    slotName: {
        type: String,
        unique: true
    },
    vehicleType: {
        type: String,
        required: [true, "veh is type is required"]
    },
    isAvailable: {
        type: Boolean,
        default: false
    },
    capacity: {
        type: Number,
    },


})



const slotSchema = new mongoose.Schema({
    floorName: {
        type: String,
        required: [true, "floor name required"]

    },
    wingName: {
        type: String,
        required: [true, "Wing name is required"]

    },
    slots: [slotNameSchema],

    isFullyOccupied: {
        type: Boolean,
        default: false
    },

    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Slots", slotSchema);