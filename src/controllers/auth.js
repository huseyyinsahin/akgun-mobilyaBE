"use strict";

const User = require("../models/user");
const Token = require("../models/token");
const passwordEncrypt = require("../helpers/passwordEncrypt");
const {
  UnauthorizedError,
  BadRequestError,
  NotFoundError,
} = require("../errors/customError");

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;

    if (!(username && password))
      throw new BadRequestError("username and password are required");

    const user = await User.findOne({ username });

    if (!user) throw new NotFoundError("username is not found");

    if (!user.isAdmin) throw new UnauthorizedError("Admin değilsiniz");

    if (user.password !== passwordEncrypt(password))
      throw new UnauthorizedError("incorrect password");

    let tokenData = await Token.findOne({ userId: user._id });

    if (!tokenData) {
      const tokenKey = passwordEncrypt(user._id + Date.now());
      tokenData = await Token.create({ userId: user._id, token: tokenKey });
    }

    res.status(200).send({
      error: false,
      token: tokenData.token,
      user,
    });
  },

  logout: async (req, res) => {
    const auth = req.headers?.authorization || null;
    const tokenKey = auth ? auth.split(" ") : null;

    if (tokenKey[0] == "Token") {
      const data = await Token.deleteOne({ token: tokenKey[1] });
      if (data.deletedCount) {
        res.send({
          error: false,
          message: "Token deleted. Logout was OK.",
          result,
        });
      } else {
        throw new Error("Çıkış yapamazsınız");
      }
    } else {
      throw new Error("Çıkış yapamazsınız");
    }
  },
};
