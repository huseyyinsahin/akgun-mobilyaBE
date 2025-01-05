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

    const userControl = await User.findOne({ username });

    if (!userControl) throw new CustomError("Kullanıcı bulunamadı", 404);

    if (!userControl.isAdmin) throw new CustomError("Admin değilsiniz", 401);

    if (userControl.password !== passwordEncrypt(password))
      throw new CustomError("Şifre yanlış", 401);

    let tokenData = await Token.findOne({ userId: userControl._id });

    if (!tokenData) {
      const tokenKey = passwordEncrypt(userControl._id + Date.now());
      tokenData = await Token.create({
        userId: userControl._id,
        token: tokenKey,
      });
    }

    const user = await User.findOne({ username }, { password: 0 });

    res.status(200).send({
      error: false,
      token: tokenData.token,
      user,
    });
  },

  logout: async (req, res) => {
    const auth = req.headers?.authorization || null;
    const tokenKey = auth ? auth.split(" ") : null;
console.log(tokenKey);
    if (tokenKey[0] == "Token") {
      const data = await Token.deleteOne({ token: tokenKey[1] });
      if (data.deletedCount) {
        res.status(200).send({
          error: false,
          message: "Çıkış yapıldı",
        });
      } else {
        throw new CustomError("Çıkış yapamazsınız", 401);
      }
    } else {
      throw new CustomError("Çıkış yapamazsınız!", 401);
    }
  },
};
