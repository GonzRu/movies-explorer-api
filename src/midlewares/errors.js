const { SERVER_ERROR } = require('../consts/errors');

const { NODE_ENV } = process.env;

module.exports = (err, req, res, nextIgnored) => {
  const { statusCode = 500, message } = err;

  const response = {
    message: statusCode === 500
      ? SERVER_ERROR
      : message,
  };

  if (NODE_ENV === 'development') {
    response.description = err.message;
  }

  res
    .status(statusCode)
    .send(response);
};
