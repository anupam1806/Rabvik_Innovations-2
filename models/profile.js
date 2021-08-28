const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    img: {
        data: Buffer,
        contentType: String
    },
    about: {
        type: String
    }
});

module.exports = mongoose.model('profile', profileSchema);