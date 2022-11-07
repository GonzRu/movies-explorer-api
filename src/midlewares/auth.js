const NotAuthorizedError = require('../errors/notAuthorizedError');
const { jwtVerify } = require('../utils/jwt');
const { NOT_AUTHORIZED_ERROR } = require('../consts/errors');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new NotAuthorizedError(NOT_AUTHORIZED_ERROR));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwtVerify(token);
  } catch (err) {
    next(new NotAuthorizedError(NOT_AUTHORIZED_ERROR));
    return;
  }

  req.user = payload;

  next();
};
