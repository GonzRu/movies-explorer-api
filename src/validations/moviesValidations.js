const { celebrate, Joi } = require('celebrate');
const { linkValidator } = require('../utils/validators');

module.exports.createMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(linkValidator),
    trailerLink: Joi.string().required().custom(linkValidator),
    thumbnail: Joi.string().required().custom(linkValidator),
    movieId: Joi.number().required().greater(0),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.deleteMovieValidator = celebrate({
  params: {
    id: Joi.string().hex().length(24),
  },
});
