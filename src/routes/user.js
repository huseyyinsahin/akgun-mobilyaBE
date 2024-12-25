"use strict";

const router = require("express").Router();

const user = require("../controllers/user");

router.route("/").post(user.create);

module.exports = router;
//kayıttan sonra silinecek