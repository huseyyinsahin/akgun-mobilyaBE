"use strict";

const router = require("express").Router();

const projects = require("../controllers/projects");

const { isAdmin } = require("../middlewares/permissions");

const upload = require("../middlewares/upload");

router
  .route("/")
  .get(projects.list)
  .post(isAdmin, upload.any(), projects.create);

router
  .route("/:id")
  .get(projects.read)
  .put(isAdmin, upload.any(), projects.update)
  .patch(isAdmin, upload.any(), projects.update)
  .delete(isAdmin, projects.delete);

module.exports = router;
