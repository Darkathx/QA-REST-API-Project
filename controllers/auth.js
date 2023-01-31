const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");
const {sendJwtToClient, } = require('../helpers/authorization/tokenHelpers');
const {validateUserInput, comparePasswords, } = require("../helpers/input/inputHelpers");
require("express-async-errors");

const register = async (req, res, next) => {
    const {name, email, password, role} = req.body;
    const createdUser = await User.create({
        name,
        email,
        password,
        role,
    });
    sendJwtToClient(createdUser, res);

};

const getUser = async (req, res, next) => {

    res
    .json({
        success: true,
        data: {
            id: req.user.id,
            name: req.user.name,
            
        },
    });
};

const login = async (req, res, next) => {
    const {email, password} = req.body;
    if(!validateUserInput(email, password)) {
        return next(new CustomError("You didn't enter your email or password", 400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!comparePasswords(password, user.password)) {
        return next(new CustomError("Incorrect password", 400));
    }
    
    sendJwtToClient(user, res);

};

const logout = async (req, res, next) => {
    const {NODE_ENV} = process.env;
    return res
    .status(200)
    .cookie({
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: NODE_ENV === "development" ? false : true,

    })
    .json({
        success: true,
        message: "Goodbye!",

    });
};

const imageUpload = async (req, res, next) => {
    //Image Upload Success

    const user = await User.findByIdAndUpdate(req.user.id, {
        "profile_image": req.savedProfileImage,

    }, {
        new: true,
        runValidators: true,

    });
    res
    .status(200)
    .json({
        success: true,
        message: "Image Upload Successful",
        data: user,

    });
};

module.exports = {
    register,
    getUser,
    login,
    logout,
    imageUpload,

};