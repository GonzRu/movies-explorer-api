const mongoose = require('mongoose');
const Movie = require('../models/movie');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');
const ValidationError = require('../errors/validationError');

module.exports.getMovies = (req, res, next) => Movie.find({})
  .then((movies) => res.send(movies))
  .catch(next);

module.exports.createMovie = (req, res, next) => {
  const userId = req.user._id;
  const movie = { ...req.body, owner: userId };

  Movie.create(movie)
    .then((value) => res.send(value))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { id } = req.params;

  Movie.findById(id)
    .then((movie) => {
      if (!movie) throw new NotFoundError();
      if (movie.owner.toString() !== req.user._id) throw new ForbiddenError();

      return Movie
        .remove(movie)
        .then(() => movie);
    })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError(err.message));
      } else {
        next(err);
      }
    });
};
