"use strict";

const router = require("express").Router();

const about = require("../controllers/about");

const { isAdmin } = require("../middlewares/permissions");

router.route("/").get(about.list).post(isAdmin, about.create);

router
  .route("/:id")
  .get(about.read)
  .put(isAdmin, about.update)
  .patch(isAdmin, about.update)
  .delete(isAdmin, about.delete);

module.exports = router;
