const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
        enum: ["Hyderabad", "Banglore", "Chennai", "Pune", "Mumbai", "Madurai"]
    },
    // image: {
    //     type: String,
    // },
    bedRooms: {
        type: Number,
        required: true,
    },
    hallRooms: {
        type: Number,
        required: true,
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    typeOfProperty: {
        type: String,
        enum: ["Home", "Apartment", "Flat", "Villa"],
        required: [true, "Please provide a type of property"],
    }
}, {timestamps: true})

module.exports = mongoose.model("Property", propertySchema);