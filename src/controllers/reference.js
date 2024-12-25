"use strict";

const Reference = require("../models/reference");

module.exports = {
  list: async (req, res) => {
    const data = await Reference.find();

    res.status(200).send({
      error: false,
      data,
    });
  },

  create: async (req, res) => {
    const data = await Reference.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    const data = await Reference.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    const data = await Reference.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await Reference.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    const data = await Reference.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
