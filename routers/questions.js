const express = require("express");
const {askNewQuestion, getAllQuestions, getSingleQuestion, editQuestion, deleteQuestion, likeQuestion} = require("../controllers/questions.js");
const {checkQuestionExists, } = require("../middlewares/database/dbErrorHelpers");
const {getAccessToRoute, getQuestionOwnerAccess, } = require("../middlewares/authorization/auth");
const router = express.Router();

router.post("/ask", getAccessToRoute, askNewQuestion);
router.get("/", getAllQuestions);
router.get("/:id", checkQuestionExists, getSingleQuestion);
router.put("/:id/edit", [getAccessToRoute, checkQuestionExists, getQuestionOwnerAccess], editQuestion);
router.delete("/:id/delete", [getAccessToRoute, checkQuestionExists, getQuestionOwnerAccess], deleteQuestion);
router.get("/:id/like", [getAccessToRoute, checkQuestionExists], likeQuestion)

module.exports = router;