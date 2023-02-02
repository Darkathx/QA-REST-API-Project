const express = require('express');
const User = require("../models/User");
const CustomError = require('../helpers/error/CustomError');
const Question = require('../models/Question');
require("express-async-errors");

const banUser = async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    user.banned = !user.banned;
    await user.save();
    return res
    .status(200)
    .json({
        success: true,
        message: "User successfully (un)banned",
        data: user,

    })
};

const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    const deletedCount = await User.deleteOne({_id: id});
    if(deletedCount.deletedCount != 1) {
        next(new CustomError("User could not been deleted", 500));
    }
    return res
    .status(200)
    .json({
        success: true,
        message: "User successfully deleted",
        
    });
};

const deleteQuestionWithAdminRights = async(req, res, next) => {
    const id = req.params.id;
    const deletedQuestion = await Question.findByIdAndDelete(id);
    if(!deletedQuestion) {
        return next(new CustomError("Question Could Not Been Deleted", 500));
    }

    return res
    .status(200)
    .json({
        success: true,
        message: "Question successfully deleted",

    })
}

module.exports = {banUser, deleteUser, deleteQuestionWithAdminRights, };