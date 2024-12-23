const { StatusCodes } = require("http-status-codes");

module.exports = {
  CustomError: class CustomError extends Error {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    constructor(message, status) {
      super(message);
      this.statusCode = status;
    }
  },
};
