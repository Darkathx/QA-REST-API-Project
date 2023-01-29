const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");
const {sendJwtToClient, } = require('../helpers/authorization/tokenHelpers');
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

const tokenTest = async (req, res, next) => {

    res
    .json({
        success: true,
        message: "Welcome",
    });
};

module.exports = {
    register,
    tokenTest,
};