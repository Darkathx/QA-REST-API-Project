const express = require('express');
const {addNewAnswerToQuestion, getAllAnswersFromThisQuestion, getSingleAnswer, editAnswer, deleteAnswer, likeAnswer, } = require("../controllers/answer");
const {getAccessToRoute, getAnswerOwnerAccess, } = require("../middlewares/authorization/auth");
const {checkAnswerExists, } = require("../middlewares/database/dbErrorHelpers");
const router = express.Router({
    mergeParams: true,
});

router.post("/", getAccessToRoute, addNewAnswerToQuestion);
router.get("/", getAllAnswersFromThisQuestion);
router.get("/:answer_id", checkAnswerExists, getSingleAnswer);
router.put("/:answer_id/edit", [checkAnswerExists, getAccessToRoute, getAnswerOwnerAccess], editAnswer);
router.delete("/:answer_id/delete", [checkAnswerExists, getAccessToRoute, getAnswerOwnerAccess], deleteAnswer);
router.get("/:answer_id/like", [checkAnswerExists, getAccessToRoute], likeAnswer);

module.exports = router;