const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");
require("express-async-errors");

const register = async (req, res, next) => {
    //POST DATA
    const name = 'SSC';
    const email = "def@gmail.com";
    const password = "1267";


    const createdUser = await User.create({
        name,
        email,
        password,
    });
    res
    .status(200)
    .json({
        success: true,
        data: createdUser,

    });
};

const errorTest = (req, res, next) => {
    return next(new TypeError("TypeErr"));
};

module.exports = {
    register,
    errorTest,

};