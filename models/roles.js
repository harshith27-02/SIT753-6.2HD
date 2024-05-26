const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema({
    roleName: {
        type: String,
        required: [true, "name required"],
        unique: true
    },
    description: {
        type: String,
        maxLength: [50, "description not more than 50 characters"]
    },
    isActive: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Roles", roleSchema);