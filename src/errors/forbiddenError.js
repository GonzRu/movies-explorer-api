const { ACCESS_FORBIDEN_ERROR } = require('../consts/errors');

class ForbiddenError extends Error {
  constructor(message = ACCESS_FORBIDEN_ERROR) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
