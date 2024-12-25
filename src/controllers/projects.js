"use strict";

const Projects = require("../models/projects");
const fs = require("node:fs");

const { CustomError } = require("../errors/customError");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Projects);

    res.status(200).send({
      error: false,
      data,
      details: await res.getModelListDetails(Projects),
    });
  },

  create: async (req, res) => {
    req.body.images = [];
    if (req.files) {
      for (let file of req.files) {
        req.body.images.push(file.path);
      }
    }

    const data = await Projects.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    const data = await Projects.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    if (!req.body.images) {
      req.body.images = [];
    }
    if (req.files) {
      for (let file of req.files) {
        req.body.images.push(file.path);
      }
    }

    const { title, images, text } = req.body;

    if (title && title.length < 50 && images && text) {
      const project = await Projects.findOne({ _id: req.params.id });

      if (project && project.images) {
        const imagesToDelete = project.images.filter(
          (deleteImagePath) => !req.body.images.includes(deleteImagePath)
        );

        imagesToDelete.forEach((imagePath) => {
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        });
      }
    } else {
      throw new CustomError("Veri doğru formatta gönderilmedi!", 400);
    }

    const data = await Projects.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await Projects.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    const deleteImage = await Projects.findOne({ _id: req.params.id });

    if (deleteImage && deleteImage.image) {
      deleteImage.image.forEach((item) => {
        if (fs.existsSync(item)) {
          fs.unlinkSync(item);
        }
      });
    }

    const data = await Projects.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
