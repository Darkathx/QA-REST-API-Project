const User = require("../../models/User");
const CustomError = require("../../helpers/error/CustomError");
require("express-async-errors");

const checkUserExists = async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if(!user) {
        return next(new CustomError("There is no such user with that id", 404));
    }
    req.data = user;
    next();
};

module.exports = {checkUserExists, };