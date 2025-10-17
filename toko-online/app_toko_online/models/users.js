const mongoose = require("mongoose");

// Buat skema User
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username harus diisi"],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email harus diisi"],
        unique: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, "Format email tidak valid"] // validasi format email
    },
    password: {
        type: String,
        required: [true, "Password harus diisi"],
        minlength: [6, "Password minimal 6 karakter"]
    },
    address: {
        type: String,
        required: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

// Buat model dari Schema
const User = mongoose.model('User', UserSchema);

module.exports = User;
