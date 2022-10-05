const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  BAD_REQ_CRT_MESSG, NOT_FND_DEL_MESSG, FRBDN_ERR_DEL_MESSG, BAD_REQ_DEL_MESSG,
} = require('../utils/errorConstants');
const { OK, CREATED } = require('../utils/successResConstants');

const createMovie = (req, res, next) => {
  Movie
    .create({ ...req.body, owner: req.user._id })
    .then((movie) => res.status(CREATED).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQ_CRT_MESSG));
      } else {
        next(err);
      }
    });
};

const getAllMovies = (req, res, next) => {
  Movie
    .find({ owner: req.user._id })
    .then((movies) => res.status(OK).send(movies))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { id } = req.params;
  Movie
    .findById(id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(NOT_FND_DEL_MESSG);
      } else if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(FRBDN_ERR_DEL_MESSG);
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
        next(new BadRequestError(BAD_REQ_DEL_MESSG));
      } else {
        next(err);
      }
    });
};

module.exports = { createMovie, getAllMovies, deleteMovie };
