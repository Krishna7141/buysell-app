const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    properties: [{
        type: mongoose.Schema.ObjectId,
        ref: "Property",
    }]
}, {timestamps: true})

module.exports = mongoose.model("User", userSchema);