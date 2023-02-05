const User = require("../models/User");
const CustomError = require('../helpers/error/CustomError');
require("express-async-errors");

const getSingleUser = async (req, res, next) => {
    const id = req.params.id;
    const user = req.data;

    return res
    .status(200)
    .json({
        success: true,
        data: user,

    });
};

const getAllUsers = async(req, res, next) => {
    return res
    .status(200)
    .json({
        success: true,
        data: res.query,

    });
};

module.exports = {getSingleUser, getAllUsers, };