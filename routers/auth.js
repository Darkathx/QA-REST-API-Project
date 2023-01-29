const express = require("express");
const {register, errorTest} = require("../controllers/auth.js");
const router = express.Router();

router.post("/register", register);
router.get("/error", errorTest);



module.exports = router;