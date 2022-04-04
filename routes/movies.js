const router = require('express').Router();
const { createMoviesValidation, moviesValidation } = require('../middlewares/validation');

const {
  getSavedMovies,
  delMovie,
  createMovies,
} = require('../controllers/movies');

router.get('/movies', getSavedMovies);
router.post('/movies', createMoviesValidation, createMovies);
router.delete('/movies/:id', moviesValidation, delMovie);

module.exports = router;
