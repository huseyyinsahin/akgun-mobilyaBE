"use strict";

const { mongoose } = require("../configs/dbConnection");

const SliderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Başlık alanı zorunludur."],
      maxlength: [60, "Başlık en fazla 60 karakter olabilir."],
    },

    image: {
      type: String,
      required: [true, "Görsel alanı zorunludur."],
    },
  },
  {
    collection: "sliders",
    timestamps: true,
  }
);

module.exports = mongoose.model("Slider", SliderSchema);
