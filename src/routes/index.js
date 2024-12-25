"use strict";

const router = require("express").Router();

router.use("/auth", require("./auth"));

router.use("/user", require("./user.js"));//kayıttan sonra silinecek

router.use("/slider", require("./slider.js"));

router.use("/homecard", require("./homeCard.js"));

router.use("/reference", require("./reference.js"));

router.use("/about", require("./about.js"));

router.use("/photogallery", require("./photoGallery.js"));

router.use("/projects", require("./projects.js"));

module.exports = router;
