const Question = require("../models/Question");
const CustomError = require("../helpers/error/CustomError");
require("express-async-errors");

const askNewQuestion = async (req, res, next) => {
    const info = req.body;
    const question = await Question.create({
        ...info,
        user: req.user.id,

    });
    
    res
    .status(200)
    .json({
        success: true,
        data: question,
        
    });
};

const getAllQuestions = async (req, res, next) => {
    return res
    .status(200)
    .json(res.queryResults);
};

const getSingleQuestion = async (req, res, next) => {
    return res
    .status(200)
    .json(res.queryResults);
};

const editQuestion = async (req, res, next) => {
    const questionId = req.params.id;
    const {title, content} = req.body;
    let question = await Question.findById(questionId);
    question.title = title;
    question.content = content;
    question = await question.save();

    return res
    .status(200)
    .json({
        success: true,
        data: question,

    });
};

const deleteQuestion = async (req, res, next) => {
    const id = req.params.id;
    await Question.findByIdAndDelete(id);

    return res
    .status(200)
    .json({
        success: true,
        message: "Question Successfully Deleted",

    });
};

const likeQuestion = async (req, res, next) => {
    const id = req.params.id;
    let question = await Question.findById(id);
    if(question.likes.includes(req.user.id)) {
        // return next(new CustomError("You already liked this question", 400));
        const index = question.likes.indexOf(req.user.id);
        question.likes.splice(index, 1);
        question.likeCount = question.likes.length;
        question = await question.save();

        return res
        .status(200)
        .json({
            success: true,
            data: question,
            operation: "unlike",

        });
    }
    question.likes.push(req.user.id);
    question.likeCount = question.likes.length;
    question = await question.save();

    return res
    .status(200)
    .json({
        success: true,
        data: question,
        operation: "like",

    });
};

module.exports = {
    askNewQuestion,
    getAllQuestions,
    getSingleQuestion,
    editQuestion,
    deleteQuestion,
    likeQuestion,
    
};