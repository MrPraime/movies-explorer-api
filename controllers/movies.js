const Movies = require('../models/movie');

const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');

const getSavedMovies = (req, res, next) => {
  Movies.find({})
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

const createMovies = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  return Movies.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            'Переданы некорректные данные при создании Фильма',
          ),
        );
      } else next(err);
    });
};

const delMovie = (req, res, next) => {
  Movies.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError('Фильм не найден');
    })
    .then(async (movie) => {
      if (movie.owner.toString() !== req.user._id) {
        next(new ForbiddenError('Попытка удалить фильм'));
      } else {
        await Movies.findByIdAndRemove(req.params.id).then(() => {
          res.status(200).send(movie);
        });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else next(err);
    });
};

module.exports = {
  getSavedMovies,
  createMovies,
  delMovie,
};
