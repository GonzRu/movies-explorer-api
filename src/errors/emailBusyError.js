const { EMAIL_BUSY_ERROR } = require('../consts/errors');

class EmailBusyError extends Error {
  constructor(message = EMAIL_BUSY_ERROR) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = EmailBusyError;
