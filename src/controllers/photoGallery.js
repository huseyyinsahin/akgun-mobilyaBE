"use strict";

const photoGallery = require("../models/photoGallery");
const fs = require("node:fs");

const { CustomError } = require("../errors/customError");

module.exports = {
  list: async (req, res) => {
    const data = await photoGallery.find();

    res.status(200).send({
      error: false,
      data,
      details: await res.getModelListDetails(photoGallery),
    });
  },

  create: async (req, res) => {
    req.body.image = "";
    if (req.file) {
      req.body.image = req.file.path;
    }

    const data = await photoGallery.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    const data = await photoGallery.findOne({ _id: req.params.id });

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

    const { image } = req.body;
    if (image) {
      const deleteImage = await photoGallery.findOne({ _id: req.params.id });

      if (deleteImage && deleteImage.image) {
        const oldImagePath = `${deleteImage.image}`;

        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    } else {
      throw new CustomError("Veri doğru formatta gönderilmedi!", 400);
    }

    const data = await photoGallery.updateOne(
      { _id: req.params.id },
      req.body,
      {
        runValidators: true,
      }
    );

    res.status(202).send({
      error: false,
      data,
      new: await photoGallery.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    const deleteImage = await photoGallery.findOne({ _id: req.params.id });
    if (deleteImage && deleteImage.image) {
      const imagePath = `${deleteImage.image}`;

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    const data = await photoGallery.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
