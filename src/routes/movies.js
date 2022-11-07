const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { linkValidator } = require('../utils/validators');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/movies', getMovies);
router.post(
  '/movies',
  celebrate({
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
  }),
  createMovie,
);
router.delete(
  '/movies/:id',
  celebrate({
    params: {
      id: Joi.string().hex().length(24),
    },
  }),
  deleteMovie,
);

module.exports = router;
