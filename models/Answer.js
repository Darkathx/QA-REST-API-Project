const mongoose = require('mongoose');
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

module.exports = mongoose.model("Answer", AnswerSchema);