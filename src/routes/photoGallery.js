"use strict";

const router = require("express").Router();

const photogallery = require("../controllers/photoGallery");

const { isAdmin } = require("../middlewares/permissions");

const upload = require("../middlewares/upload");

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
