const router = require('express').Router();
const { errors: celebrateErrorMiddleware } = require('celebrate');
const authRouter = require('./auth');
const userRouter = require('./users');
const moviesRouter = require('./movies');
const authMiddleware = require('../midlewares/auth');
const notFoundMiddleware = require('../midlewares/notFound');
const { requestLoggerMiddleware, errorLoggerMiddleware } = require('../midlewares/logger');
const errorHandlerMiddleware = require('../midlewares/errors');
const rateLimitMiddleware = require('../midlewares/rateLimit');

router.use(rateLimitMiddleware);
router.use(requestLoggerMiddleware);
router.use(authRouter);
router.use(authMiddleware);
router.use(userRouter);
router.use(moviesRouter);
router.use(notFoundMiddleware);
router.use(errorLoggerMiddleware);
router.use(celebrateErrorMiddleware());
router.use(errorHandlerMiddleware);

module.exports = router;
