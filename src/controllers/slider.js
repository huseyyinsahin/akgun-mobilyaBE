"use strict";

const slider = require("../models/slider");
const fs = require("node:fs");

const { CustomError } = require("../errors/customError");

module.exports = {
  list: async (req, res) => {
    const data = await slider.find();

    res.status(200).send({
      error: false,
      data,
    });
  },

  create: async (req, res) => {
    req.body.image = "";
    if (req.file) {
      req.body.image = req.file.path;
    }

    const data = await slider.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    const data = await slider.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    req.body.image = "";
    if (req.file) {
      req.body.image = req.file.path;
    }

    const { title, image } = req.body;
    if (title && image && title.length < 60) {
      const deleteImage = await slider.findOne({ _id: req.params.id });

      if (deleteImage && deleteImage.image) {
        const oldImagePath = `${deleteImage.image}`;

        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    } else {
      throw new CustomError("Veri doğru formatta gönderilmedi!", 400);
    }

    const data = await slider.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await slider.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    const deleteImage = await slider.findOne({ _id: req.params.id });
    if (deleteImage && deleteImage.image) {
      const imagePath = `${deleteImage.image}`;

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    const data = await slider.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};