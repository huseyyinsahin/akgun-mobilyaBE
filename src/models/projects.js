"use strict";

const { mongoose } = require("../configs/dbConnection");

const ProjectsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Başlık alanı zorunludur."],
      maxlength: [50, "Başlık en fazla 50 karakter olabilir."],
    },

    image: {
      type: [String],
      required: [true, "Görsel alanı zorunludur."],
    },

    text: {
      type: String,
      required: [true, "Metin alanı zorunludur."],
      trim: true,
    },
  },
  {
    collection: "projects",
    timestamps: true,
  }
);

module.exports = mongoose.model("Projects", ProjectsSchema);
