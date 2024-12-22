"use strict";

const { mongoose } = require("../configs/dbConnection");

const AboutSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      trim: true,
      required: [true, "Metin alanı zorunludur."],
    },
  },
  {
    collection: "abouts",
    timestamps: true,
  }
);

module.exports = mongoose.model("About", AboutSchema);
