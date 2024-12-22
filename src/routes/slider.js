"use strict";

const router = require("express").Router();

const slider = require("../controllers/slider");

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

router.route("/").get(slider.list).post(isAdmin,upload.single("image"), slider.create);

router
  .route("/:id")
  .get(isAdmin,slider.read)
  .put(isAdmin,upload.single("image"), slider.update)
  .patch(isAdmin,upload.single("image"), slider.update)
  .delete(isAdmin,slider.delete);

module.exports = router;
