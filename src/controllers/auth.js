"use strict";

const User = require("../models/user");
const Token = require("../models/token");
const passwordEncrypt = require("../helpers/passwordEncrypt");
const { CustomError } = require("../errors/customError");

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;

    if (!(username && password))
      throw new CustomError("Kullanıcı adı ve şifre zorunludur!", 400);

    const user = await User.findOne({ username });

    if (!user) throw new CustomError("Kullanıcı bulunamadı", 404);

    if (!user.isAdmin) throw new CustomError("Admin değilsiniz", 401);

    if (user.password !== passwordEncrypt(password))
      throw new CustomError("Şifre yanlış", 401);

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
          message: "Çıkış yapıldı",
          result,
        });
      } else {
        throw new CustomError("Çıkış yapamazsınız", 401);
      }
    } else {
      throw new CustomError("Çıkış yapamazsınız", 401);
    }
  },
};
