"use strict";

const Slider = require("../models/slider");
const fs = require("node:fs");

const { CustomError } = require("../errors/customError");

module.exports = {
  list: async (req, res) => {
    const data = await Slider.find();

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

    const data = await Slider.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    const data = await Slider.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    if (!req.body.image) {
      // req.body.image varsa resim silinmemiş demektir ve herhangi bir işleme gerek yoktur ama eğer gönderilmemişse yeni resim gelmiş demektir.
      req.body.image = "";
      if (req.file) {
        req.body.image = req.file.path;
      }

      const { title, image } = req.body;
      if (title && image && title.length < 60) {
        const deleteImage = await Slider.findOne({ _id: req.params.id });

        if (deleteImage && deleteImage.image) {
          const oldImagePath = `${deleteImage.image}`;

          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
      } else {
        throw new CustomError("Veri doğru formatta gönderilmedi!", 400);
      }
    }

    const data = await Slider.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await Slider.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    const deleteImage = await Slider.findOne({ _id: req.params.id });
    if (deleteImage && deleteImage.image) {
      const imagePath = `${deleteImage.image}`;

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    const data = await Slider.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
