const express = require('express');
const {getAccessToRoute, getAdminRights} = require("../middlewares/authorization/auth");
const {banUser, deleteUser} = require("../controllers/admin");
const {checkUserExists, } = require("../middlewares/database/dbErrorHelpers");
const router = express.Router();
router.use([getAccessToRoute, getAdminRights]);
// router.use(checkUserExists);

router.put("/ban/:id", checkUserExists, banUser);
router.delete("/delete/:id", checkUserExists, deleteUser);

module.exports = router;