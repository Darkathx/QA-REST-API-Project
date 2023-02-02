const express = require('express');


const router = express.Router({
    mergeParams: true,
gi});

router.get("/", (req, res, next) => {
    res.send("Answer Route");
});

module.exports = router;