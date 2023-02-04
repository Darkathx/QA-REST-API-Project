const mongoose = require('mongoose');
const CustomError = require('../helpers/error/CustomError');
const Question = require('./Question');
const Schema = mongoose.Schema;
const AnswerSchema = new Schema({
    content : {
        type: String,
        required: [true, "Please provide a content"],
        minlength: [10, "Please provide a content that is longer than 10 characters"],

    },
    createdAt: {
        type: Date,
        default: new Date(Date.now()),

    },
    likes : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",

        }
    ],
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,

    },
    question : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,

    },
    
});

AnswerSchema.pre("save", async function(next) {
    if(!this.isModified("user")) {
        return next();
    }
    const question = await Question.findById(this.question);
    if(!question) {
        return next(new CustomError("There is no question with that id", 400));
    }
    question.answers.push(this._id);
    await question.save();
    return next();
});

module.exports = mongoose.model("Answer", AnswerSchema);