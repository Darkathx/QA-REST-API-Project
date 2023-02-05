const express = require('express');
const User = require("../models/User");
const {getSingleUser, getAllUsers, } = require("../controllers/user");
const {checkUserExists, } = require("../middlewares/database/dbErrorHelpers");
const {userQueryMiddleware, } = require("../middlewares/query/userQueryMiddleware");
const router = express.Router();

router.get("/", userQueryMiddleware(User), getAllUsers);
router.get("/:id", checkUserExists, getSingleUser);

module.exports = router;