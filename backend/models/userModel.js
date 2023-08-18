const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/
    },
    password: {
        type: String,
    },
    googleId: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: new Date().toUTCString(),
    }
});

const UserModel  = mongoose.model('users', userSchema);

module.exports = UserModel;