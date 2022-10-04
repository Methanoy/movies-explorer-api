const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const createMovie = (req, res, next) => {
  Movie
    .create({ ...req.body, owner: req.user._id })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки фильма.'));
      } else {
        next(err);
      }
    });
};

const getAllMovies = (req, res, next) => {
  Movie
    .find({ owner: req.user._id })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { id } = req.params;
  Movie
    .findById(id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Карточка фильма с указанным _id не найдена.');
      } else if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Вы не можете удалить чужую карточку фильма.');
      } else {
        Movie
          .findByIdAndRemove(id)
          .then((movieToDelete) => {
            res.send({ movieToDelete });
          })
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при удалении карточки фильма.'));
      } else {
        next(err);
      }
    });
};

module.exports = { createMovie, getAllMovies, deleteMovie };
