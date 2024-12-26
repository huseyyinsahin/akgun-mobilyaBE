"use strict";

const { mongoose } = require("../configs/dbConnection");

const ReferenceSchema = new mongoose.Schema(
  {
    reference: {
      type: String,
      trim: true,
      unique: [true, "Bu referansı daha önce kullanmışsınız."],
      required: [true, "Referans alanı zorunludur."],
      maxlength: [18, "Referans en fazla 18 karakter olabilir."],
    },
  },
  {
    collection: "references",
    timestamps: true,
  }
);

module.exports = mongoose.model("Reference", ReferenceSchema);
//unique
