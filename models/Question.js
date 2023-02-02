const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
        minlength: [10, "Please enter a title that is longer than 10 characters"],
        maxlength: [99, "Please enter a title that is shorter than 99 characters"],
        unique: true,


    },
    content: {
        type: String,
        required: [true, "Please provide a content"],
        minlength: [20, "Please enter a content that is longer than 20 characters"],

    },
    slug: {
        type: String,

    },
    createdAt: {
        type: Date,
        default: Date.now(),
        
    },
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User",

    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",

        }
    ],
    answers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Answer",
            
        }
    ],


});

QuestionSchema.pre("save", function(next) {
    if(!this.isModified("title")) {
        next();
    }
    this.slug = this.makeSlug();
    next();
});

QuestionSchema.methods.makeSlug = function() {
    return slugify(this.title, {
        replacement: "-",
        remove: /[*+~.()'"!:@]/g,
        lower: true,

    });
};

module.exports = mongoose.model("Question", QuestionSchema);