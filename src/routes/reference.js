"use strict";

const router = require("express").Router();

const reference = require("../controllers/reference");

const { isAdmin } = require("../middlewares/permissions");

router.route("/").get(reference.list).post(isAdmin, reference.create);

router
  .route("/:id")
  .get(isAdmin, reference.read)
  .put(isAdmin, reference.update)
  .patch(isAdmin, reference.update)
  .delete(isAdmin, reference.delete);

module.exports = router;
