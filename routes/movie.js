const moviesRouter = require('express').Router();
const { createMovie, deleteMovie, getAllMovies } = require('../controllers/movie');
const { validateCreateMovie, validateId } = require('../middlewares/inputDataValidation');

moviesRouter.post('/', validateCreateMovie, createMovie);
moviesRouter.get('/', getAllMovies);
moviesRouter.delete('/:id', validateId, deleteMovie);

module.exports = moviesRouter;
