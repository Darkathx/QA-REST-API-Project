const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter a name!"],

    },
    email: {
        type: String,
        required: [true, "Please enter an email!"],
        unique: [true, "Please try a different email!"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/, 'Please provide a valid email address'],

    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin", "guest"],

    },
    password: {
        type: String,
        minlength: [6, "Please provide a password with at least 6 characters!"],
        maxlength: 99,
        required: [true, "Please provide a valid password!"],
        select: false,

    },
    createdAt: {
        type: Date,
        default: Date.now(),

    },
    title: {
        type: String,

    },
    about: {
        type: String,

    },
    place: {
        type: String,
    },
    website: {
        type: String,
    },
    profile_image: {
        type: String,
        default: "default.jpg",

    },
    banned: {
        type: Boolean,
        default: false,

    }


});

module.exports = mongoose.model("User", userSchema);