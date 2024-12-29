"use strict";

const router = require("express").Router();

const photogallery = require("../controllers/photoGallery");

const multer = require("multer");

const { isAdmin } = require("../middlewares/permissions");

const path = require("node:path");

const upload=require('../middlewares/upload')

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: "./upload",
//     filename: function (req, file, returnCallback) {
//       returnCallback(null, Date.now() + "_" + file.originalname);
//     },
//   }),
//   fileFilter: function (req, file, returnCallback) {
//     const allowedExtensions = [".jpg", ".jpeg", ".png"];
//     const fileExtension = path.extname(file.originalname).toLowerCase();

//     if (allowedExtensions.includes(fileExtension)) {
//       returnCallback(null, true);
//     } else {
//       returnCallback(
//         new Error("Sadece .jpg, .jpeg ve .png dosyaları yüklenebilir!"),
//         false
//       );
//     }
//   },
// });

router
  .route("/")
  .get(photogallery.list)
  .post(isAdmin, upload.single("images"), photogallery.create);

router
  .route("/:id")
  .get(photogallery.read)
  .put(isAdmin, upload.single("images"), photogallery.update)
  .patch(isAdmin, upload.single("images"), photogallery.update)
  .delete(isAdmin, photogallery.delete);

module.exports = router;
