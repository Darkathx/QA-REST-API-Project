const express = require('express');
const {addNewAnswerToQuestion, getAllAnswersFromThisQuestion, getSingleAnswer} = require("../controllers/answer");
const {getAccessToRoute, } = require("../middlewares/authorization/auth");
const {checkAnswerExists, } = require("../middlewares/database/dbErrorHelpers");
const router = express.Router({
    mergeParams: true,
});

router.post("/", getAccessToRoute, addNewAnswerToQuestion);
router.get("/", getAllAnswersFromThisQuestion);
router.get("/:answer_id", checkAnswerExists, getSingleAnswer);

module.exports = router;