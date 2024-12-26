"use strict";

const { CustomError } = require("../errors/customError");

const User = require("../models/user");

module.exports = {
  create: async (req, res) => {
    const data = await User.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },
};
//kayıttan sonra silinecek
