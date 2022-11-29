const NotFoundError = require('../errors/notFoundError');
const { ENDPOINT_NOT_FOUND_ERROR } = require('../consts/errors');

module.exports = (req, res, next) => {
  next(new NotFoundError(ENDPOINT_NOT_FOUND_ERROR));
};
