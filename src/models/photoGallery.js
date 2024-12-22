"use strict";

const { mongoose } = require("../configs/dbConnection");

const PhotoGallerySchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "Görsel alanı zorunludur."],
    },
  },
  {
    collection: "photoGallerys",
    timestamps: true,
  }
);

module.exports = mongoose.model("PhotoGallery", PhotoGallerySchema);
