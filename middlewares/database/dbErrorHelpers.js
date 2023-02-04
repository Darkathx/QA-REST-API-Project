const User = require("../../models/User");
const Question = require("../../models/Question");
const CustomError = require("../../helpers/error/CustomError");
const Answer = require("../../models/Answer");
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
    const question_id = req.params.id || req.params.question_id;
    const question = await Question.findById(question_id);
    if(!question) {
        return next(new CustomError("There is no such question with that id", 404));
    }
    req.question = question;
    next();
};

const checkAnswerExists = async (req, res, next) => {
    const question = req.question;
    const check = question.answers.includes(req.params.answer_id);
    if(!check) {
        return next(new CustomError("There is no such answer with that id", 404));
    }

    req.answer = await Answer.findById(req.params.answer_id);
    next();
};

module.exports = {checkUserExists, checkQuestionExists, checkAnswerExists, };