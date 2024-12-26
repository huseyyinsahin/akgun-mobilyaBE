"use strict";

const { mongoose } = require("../configs/dbConnection");
const passwordEncrypt = require("../helpers/passwordEncrypt");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Kullanıcı adı zorunludur."],
      unique: true,
      validate: {
        validator: function (value) {
          const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
          return usernameRegex.test(value);
        },
        message:
          "Kullanıcı adı yalnızca harf ve rakamlardan oluşmalı ve 3-20 karakter uzunluğunda olmalıdır.",
      },
    },

    password: {
      type: String,
      trim: true,
      required: [true, "Şifre zorunludur."],
      set: passwordEncrypt,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
