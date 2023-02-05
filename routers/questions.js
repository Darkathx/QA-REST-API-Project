const express = require("express");
const Question = require("../models/Question");
const {askNewQuestion, getAllQuestions, getSingleQuestion, editQuestion, deleteQuestion, likeQuestion} = require("../controllers/questions.js");
const {checkQuestionExists, } = require("../middlewares/database/dbErrorHelpers");
const {getAccessToRoute, getQuestionOwnerAccess, } = require("../middlewares/authorization/auth");
const questionQueryMW = require("../middlewares/query/questionQueryMiddleware");
const answerQueryMiddleware = require("../middlewares/query/answerQueryMiddleware");
const answer = require("./answer");

const router = express.Router();

router.post("/ask", getAccessToRoute, askNewQuestion);
router.get("/", questionQueryMW(Question,
    {
        population: {
            path: "user",
            select: "name profile_image",

        },
        
    }
), getAllQuestions);
router.get("/:id", checkQuestionExists, answerQueryMiddleware(Question, {
    population : [
        {
            path: "user",
            select : "name profile_image"
        },
        {
            path: "answers",
            select: "content"
        }
    ]
}), getSingleQuestion);
router.put("/:id/edit", [getAccessToRoute, checkQuestionExists, getQuestionOwnerAccess], editQuestion);
router.delete("/:id/delete", [getAccessToRoute, checkQuestionExists, getQuestionOwnerAccess], deleteQuestion);
router.get("/:id/like", [getAccessToRoute, checkQuestionExists], likeQuestion);
router.use("/:question_id/answers", checkQuestionExists, answer);


module.exports = router;