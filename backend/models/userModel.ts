import mongoose from "mongoose";

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
        default: ""
    },
    googleId: {
        type: String,
        default: ""
    },
    picture: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        enum: ['guest', 'user', 'admin'],
        default: 'user'
      },
    isActive: {
        type: Boolean,
        default: false,
    },
    tokenForResetPasswordAndExpiration: {
        token: {
          type: String,
        },
        expirationDate: {
          type: Date,
        }
      },
    createdAt: {
        type: Date,
        default: new Date().toUTCString(),
    }
});

const UserModel  = mongoose.model('users', userSchema);

module.exports = UserModel;