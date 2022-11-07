const { OBJECT_NOT_FOUND_ERROR } = require('../consts/errors');

class NotFoundError extends Error {
  constructor(message = OBJECT_NOT_FOUND_ERROR) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
