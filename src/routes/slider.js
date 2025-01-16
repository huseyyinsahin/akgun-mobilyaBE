"use strict";

const router = require("express").Router();

const slider = require("../controllers/slider");

const { isAdmin } = require("../middlewares/permissions");

const upload = require("../middlewares/upload");

router
  .route("/")
  .get(slider.list)
  .post(isAdmin, upload.single("images"), slider.create);

router
  .route("/:id")
  .get(slider.read)
  .put(isAdmin, upload.single("images"), slider.update)
  .patch(isAdmin, upload.single("images"), slider.update)
  .delete(isAdmin, slider.delete);

module.exports = router;
