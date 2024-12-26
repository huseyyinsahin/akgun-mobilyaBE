"use strict";

const router = require("express").Router();

const slider = require("../controllers/slider");

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
  .get(slider.list)
  .post(isAdmin, upload.single("images"), slider.create);

router
  .route("/:id")
  .get(slider.read)
  .put(isAdmin, upload.single("images"), slider.update)
  .patch(isAdmin, upload.single("images"), slider.update)
  .delete(isAdmin, slider.delete);

module.exports = router;
