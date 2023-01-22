const express = require('express');
const router = express.Router();
const questions = require('./questions');
const auth = require('./auth');
//api

router.use("/questions", questions);
router.use("/auth", auth);

module.exports = router;