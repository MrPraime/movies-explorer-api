const router = require('express').Router();
const { createMoviesValidation, moviesValidation } = require('../middlewares/validation');

const {
  getSavedMovies,
  delMovie,
  createMovies,
} = require('../controllers/movies');

router.get('/', getSavedMovies);
router.post('/', createMoviesValidation, createMovies);
router.delete('/:id', moviesValidation, delMovie);

module.exports = router;
