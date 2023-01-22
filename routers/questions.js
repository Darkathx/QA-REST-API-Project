const express = require("express");
const {getAllQuestions} = require("../controllers/questions.js");
const router = express.Router();

router.post("/", getAllQuestions);


module.exports = router;