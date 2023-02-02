const express = require('express');
const {getAccessToRoute, getAdminRights} = require("../middlewares/authorization/auth");
const {banUser, deleteUser, deleteQuestionWithAdminRights} = require("../controllers/admin");
const {checkUserExists, checkQuestionExists, } = require("../middlewares/database/dbErrorHelpers");
const router = express.Router();
router.use([getAccessToRoute, getAdminRights]);

router.put("/ban/:id", checkUserExists, banUser);
router.delete("/delete/:id", checkUserExists, deleteUser);
router.delete("/:id/delete", checkQuestionExists, deleteQuestionWithAdminRights);

module.exports = router;