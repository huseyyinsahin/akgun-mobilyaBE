"use strict";

const router = require("express").Router();

const projects = require("../controllers/projects");

const multer = require("multer");

const { isAdmin } = require("../middlewares/permissions");

const path = require("node:path");

const upload = multer({
  storage: multer.diskStorage({
    destination: "./upload",
    filename: function (req, file, returnCallback) {
      returnCallback(null, Date.now() + "_" + file.originalname);
    },
  }),
  fileFilter: function (req, file, returnCallback) {
    const allowedExtensions = [".jpg", ".jpeg", ".png"];
    const fileExtension = path.extname(file.originalname).toLowerCase();

    if (allowedExtensions.includes(fileExtension)) {
      returnCallback(null, true);
    } else {
      returnCallback(
        new Error("Sadece .jpg, .jpeg ve .png dosyaları yüklenebilir!"),
        false
      );
    }
  },
});

router
  .route("/")
  .get(projects.list)
  .post(isAdmin, upload.array("images"), projects.create);

router
  .route("/:id")
  .get(projects.read)
  .put(isAdmin, upload.array("images"), projects.update)
  .patch(isAdmin, upload.array("images"), projects.update)
  .delete(isAdmin, projects.delete);

module.exports = router;
