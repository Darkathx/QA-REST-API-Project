const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const Question = require("./Question");


const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter a name!"],

    },
    email: {
        type: String,
        required: [true, "Please enter an email!"],
        unique: true,
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

    },
    resetPasswordToken: {
        type: String,

    },
    resetPasswordExpire: {
        type: Date,

    },



});

userSchema.methods.getResetPasswordTokenFromUser = function() {
    const randomHexString = crypto.randomBytes(15).toString("hex");
    const resetPasswordToken = crypto
    .createHash("SHA256")
    .update(randomHexString)
    .digest("hex");

    this.resetPasswordToken = resetPasswordToken;
    this.resetPasswordExpire = new Date(Date.now() + parseInt(process.env.RESET_PASSWORD_EXPIRE));

    return this.resetPasswordToken;

};

userSchema.methods.generateJWTFromUser = function() {
    const {JWT_KEY, JWT_EXPIRE} = process.env;
    const payload = {
        id: this.id,
        name: this.name,
        
    };
    const token = jwt.sign(payload, JWT_KEY, {expiresIn: JWT_EXPIRE});
    return token;
};

userSchema.pre("save", function(next) {
    //If PW didn't change
    if(!this.isModified("password")) {
        next();
    }
    const saltRounds = 12;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) next(err);
        bcrypt.hash(this.password, salt, function(err, hash) {
            if(err) next(err);
            this.password = hash;
            next();
        }.bind(this));
    }.bind(this));
});

userSchema.post("deleteOne", async function() {
    await Question.deleteMany({user: this._id});
});

module.exports = mongoose.model("User", userSchema);