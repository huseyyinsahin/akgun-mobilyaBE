"use strict";

const PhotoGallery = require("../models/photoGallery");
const fs = require("node:fs");

const { CustomError } = require("../errors/customError");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(PhotoGallery);

    res.status(200).send({
      error: false,
      data,
      details: await res.getModelListDetails(PhotoGallery),
    });
  },

  create: async (req, res) => {
    req.body.image = "";
    if (req.file) {
      req.body.image = req.file.path;
    }

    const data = await PhotoGallery.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    const data = await PhotoGallery.findOne({ _id: req.params.id });

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

      const { image } = req.body;
      if (image) {
        const deleteImage = await PhotoGallery.findOne({ _id: req.params.id });

        if (deleteImage && deleteImage.image) {
          const oldImagePath = `${deleteImage.image}`;

          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        } else {
          throw new CustomError("Veri bulunamadı!", 404);
        }
      } else {
        throw new CustomError("Veri doğru formatta gönderilmedi!", 400);
      }
    }
    const data = await PhotoGallery.updateOne(
      { _id: req.params.id },
      req.body,
      {
        runValidators: true,
      }
    );

    res.status(202).send({
      error: false,
      data,
      new: await PhotoGallery.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    const deleteImage = await PhotoGallery.findOne({ _id: req.params.id });

    if (deleteImage && deleteImage.image) {
      const imagePath = `${deleteImage.image}`;

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    } else {
      throw new CustomError("Böyle bir kayıt yok!", 404);
    }

    const data = await PhotoGallery.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
