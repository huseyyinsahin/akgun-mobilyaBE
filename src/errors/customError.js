const { StatusCodes } = require("http-status-codes");

class CustomError extends Error {
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  constructor(message, status) {
    super(message);
    this.statusCode = status;
  }
}

module.exports = {
  CustomError,
};
