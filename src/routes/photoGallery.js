"use strict";

const router = require("express").Router();

const photogallery = require("../controllers/photoGallery");

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
  .get(photogallery.list)
  .post(isAdmin, upload.single("image"), photogallery.create);

router
  .route("/:id")
  .get(isAdmin, photogallery.read)
  .put(isAdmin, upload.single("image"), photogallery.update)
  .patch(isAdmin, upload.single("image"), photogallery.update)
  .delete(isAdmin, photogallery.delete);

module.exports = router;
