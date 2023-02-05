const express = require('express');
const {getAccessToRoute, getAdminRights} = require("../middlewares/authorization/auth");
const {banUser, deleteUser, deleteQuestionWithAdminRights, deleteAnswerWithAdminRights} = require("../controllers/admin");
const {checkUserExists, checkQuestionExists, checkAnswerExists} = require("../middlewares/database/dbErrorHelpers");
const router = express.Router();
router.use([getAccessToRoute, getAdminRights]);

router.put("/ban/:id", checkUserExists, banUser);
router.delete("/delete/:id", checkUserExists, deleteUser);
router.delete("/:id/delete", checkQuestionExists, deleteQuestionWithAdminRights);
router.delete("/:question_id/:answer_id/delete", [checkQuestionExists, checkAnswerExists], deleteAnswerWithAdminRights);

module.exports = router;