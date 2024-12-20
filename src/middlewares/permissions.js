"use strict";

module.exports = {
  isAdmin: (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error("Admin Değilsin");
    }
  },
};
