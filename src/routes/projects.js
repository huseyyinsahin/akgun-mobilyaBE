"use strict";

const router = require("express").Router();

const projects = require("../controllers/projects");

const multer = require("multer");

const { isAdmin } = require("../middlewares/permissions");

const upload = multer({
  storage: multer.diskStorage({
    destination: "./upload",
    filename: function (req, file, returnCallback) {
      returnCallback(null, Date.now() + "_" + file.originalname);
    },
  }),
});

router
  .route("/")
  .get(projects.list)
  .post(isAdmin, upload.array("image"), projects.create);

router
  .route("/:id")
  .get(isAdmin, projects.read)
  .put(isAdmin, upload.array("image"), projects.update)
  .patch(isAdmin, upload.array("image"), projects.update)
  .delete(isAdmin, projects.delete);

module.exports = router;
