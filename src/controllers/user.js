"use strict";
const { CustomError } = require("../errors/customError");

const User = require("../models/user");

module.exports = {
  create: async (req, res) => {
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
        req?.body?.password
      )
    )
      throw new CustomError(
        "Şifre en az 8 karakter uzunluğunda olmalı ve en az bir özel karakter ile en az bir büyük harf içermelidir.",
        401
      );
    const data = await User.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },
};
//sonra silinecek