const express = require('express');
const {getSingleUser, getAllUsers, } = require("../controllers/user");
const {checkUserExists, } = require("../middlewares/database/dbErrorHelpers");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", checkUserExists, getSingleUser);

module.exports = router;