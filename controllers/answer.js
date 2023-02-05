const Question = require("../models/Question");
const Answer = require("../models/Answer");
const CustomError = require("../helpers/error/CustomError");
require("express-async-errors");

const addNewAnswerToQuestion = async (req, res, next) => {
    const question_id = req.params.question_id;
    const user_id = req.user.id;
    const answer = await Answer.create({
        ...req.body,
        question: question_id,
        user: user_id,

    });

    return res
    .status(200)
    .json({
        success: true,
        data: answer,

    });
};

const getAllAnswersFromThisQuestion = async (req, res, next) => {
    const answers = await Answer.find({question: req.params.question_id});
    if(!answers) {
        return next(new CustomError("An Error Occured", 500));
    }

    return res
    .status(200)
    .json({
        success: true,
        count: answers.length,
        data: answers,

    })
};

const getSingleAnswer = async (req, res, next) => {
    const answer = req.answer;
    // answer = await Answer.findById(answer._id).populate({
    //    path: "question",
    //    select: "title"
    //}).populate({
    //    path: "user",
    //    select : "name profile_image"
    //});

    return res
    .status(200)
    .json({
        success: true,
        data: answer,

    })
};

const editAnswer = async (req, res, next) => {
    let answer = req.answer;
    const info = req.body;
    answer.content = info.content;
    answer = await answer.save();

    return res
    .status(200)
    .json({
        success: true,
        data: answer,

    });
    
};

const deleteAnswer = async (req, res, next) => {
    let answer = req.answer;
    answer = await answer.remove();

    return res
    .status(200)
    .json({
        success: true,
        data: answer,

    });
};

const likeAnswer = async (req, res, next) => {
    let answer = req.answer;
    if(answer.likes.includes(req.user.id)) {
        const index = answer.likes.indexOf(req.user.id);
        answer.likes.splice(index, 1);
        answer = await answer.save();
        return res
        .status(200)
        .json({
            success: true,
            data: answer,

        });
    }
    answer.likes.push(req.user.id);
    answer = await answer.save();
    return res
    .status(200)
    .json({
        success: true,
        data: answer,

    });
};

module.exports = {
    addNewAnswerToQuestion,
    getAllAnswersFromThisQuestion,
    getSingleAnswer,
    editAnswer,
    deleteAnswer,
    likeAnswer,

};