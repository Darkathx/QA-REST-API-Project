const User = require("../../models/User");
const Question = require("../../models/Question");
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

const checkQuestionExists = async (req, res, next) => {
    const id = req.params.id;
    const question = await Question.findById(id);
    if(!question) {
        return next(new CustomError("There is no such question with that id", 404));
    }
    req.data = question;
    next();
};

module.exports = {checkUserExists, checkQuestionExists, };