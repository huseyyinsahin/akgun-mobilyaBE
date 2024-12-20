"use strict";

const router = require("express").Router();

router.use("/auth", require("./auth"));

router.use("/user", require("./user.js"));

module.exports = router;
