"use strict";

const router = require("express").Router();

const homeCard = require("../controllers/homeCard");

const { isAdmin } = require("../middlewares/permissions");

router.route("/").get(homeCard.list).post(isAdmin, homeCard.create);

router
  .route("/:id")
  .get(isAdmin, homeCard.read)
  .put(isAdmin, homeCard.update)
  .patch(isAdmin, homeCard.update)
  .delete(isAdmin, homeCard.delete);

module.exports = router;
