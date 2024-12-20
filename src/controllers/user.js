"use strict";
const { BadRequestError } = require("../errors/customError");

const User = require("../models/user");

module.exports = {
  create: async (req, res) => {
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
        req?.body?.password
      )
    )
      throw new BadRequestError(
        "Password must be at least 8 characters long and contain at least one special character and  at least one uppercase character"
      );
    const data = await User.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },
};
