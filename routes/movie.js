const moviesRouter = require('express').Router();
const { createMovie, deleteMovie, getAllMovies } = require('../controllers/movie');

moviesRouter.post('/', createMovie);
moviesRouter.get('/', getAllMovies);
moviesRouter.delete('/:_id', deleteMovie);

module.exports = moviesRouter;
