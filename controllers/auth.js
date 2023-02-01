const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");
const {sendJwtToClient, } = require('../helpers/authorization/tokenHelpers');
const {validateUserInput, comparePasswords, } = require("../helpers/input/inputHelpers");
const {sendEmail} = require("../helpers/libraries/sendEmail");
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

const forgotPassword = async (req, res, next) => {
    const resetEmail = req.body.email;
    const user = await User.findOne({email: resetEmail});
    if(!user) {
        return next(new CustomError("There is no user with that email!", 400));
    }
    const resetPasswordToken = user.getResetPasswordTokenFromUser();

    await user.save();
    const resetPasswordUrl = `http://localhost:${process.env.PORT}/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`;
    const emailTemplate = `
    <h3>Reset your password</h3>
    <p>This <a href = '${resetPasswordUrl}' target = '_blank'>link</a> will expire in 1h.</p>
    `;

    try {
        await sendEmail({
            from: process.env.SMTP_USER,
            to: resetEmail,
            subject: "Reset Your Password",
            html : emailTemplate,

        });

        return res
        .status(200)
        .json({
            success: true,
            message: "Token sent to your email",

        });
    }
    catch (err) {
        user.resetPasswordToken = null;
        user.resetPasswordExpire = null;
        await user.save();
        return next(new CustomError("Email couldn't be sent", 500));
    }

    

};

const resetPassword = async (req, res, next) => {
    const {resetPasswordToken} = req.query;
    const {Old_pw, New_pw, New_pw_again} = req.body;
    if(!resetPasswordToken) {
        next(new CustomError("Invalid token", 400));
    }
    let user = await User.findOne({
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpire : {$gt : Date.now()},

    }).select("+password");

    if(!user) {
        next(new CustomError("Reset session expired or invalid token", 404));
    }
    if(!comparePasswords(Old_pw, user.password)) {
        next(new CustomError("Old password area do not match with your current password", 400));
    }
    if(New_pw != New_pw_again) {
        next(new CustomError("New passwords do not match", 400));
    }
    user.password = New_pw;
    user.resetPasswordExpire = null;
    user.resetPasswordToken = null;
    await user.save();

    return res
    .status(200)
    .json({
        success: true,
        message: "Password reset is successful",

    });
}

const editExtraFields = async (req, res, next) => {
    const editInformation = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, editInformation, {
        new: true,
        runValidators: true,

    });

    return res
    .status(200)
    .json({
        success: true,
        data: user,

    });
};


module.exports = {
    register,
    getUser,
    login,
    logout,
    imageUpload,
    forgotPassword,
    resetPassword,
    editExtraFields,

};