"use strict";

const router = require("express").Router();

const photogallery = require("../controllers/photoGallery");

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

//multer ayarları detaylandırılıcak

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
