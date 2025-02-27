"use strict";

const { mongoose } = require("../configs/dbConnection");

const HomeCardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Başlık alanı zorunludur."],
      maxlength: [18, "Başlık en fazla 18 karakter olabilir."],
    },

    text: {
      type: String,
      trim: true,
      required: [true, "Açıklama alanı zorunludur."],
      maxlength: [350, "Açıklama en fazla 350 karakter olabilir."],
    },
  },
  {
    collection: "homeCards",
    timestamps: true,
  }
);

module.exports = mongoose.model("HomeCard", HomeCardSchema);
