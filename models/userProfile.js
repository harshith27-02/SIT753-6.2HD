const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "name required"],
        unique: true
    },
    mobile: {
        type: Number,
        required: [true, "Mobile number is required"]
    },
    dateOfJoining: {
        type: String

    },
    address: {
        type: String,
        maxLength: [50, "cannot be more than 50 characters"]
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Roles"

    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: 6
        },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    identityProof: {
        type: String,
        // required: true
    },
    isProfileCompleted: {
        type: Boolean,
        default: false

    },

    isActive: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id, name: this.userName}, process.env.JWT_SECRET, 
        {
            expiresIn: process.env.JWT_EXPIRE
        }
    )
}

userSchema.methods.comparePassword = async function (formPassword) {
    return await bcrypt.compare(formPassword, this.password)
}

module.exports = mongoose.model("UserProfile", userSchema);