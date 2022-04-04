const mongoose = require('mongoose');
const { urlPattern } = require('../utils/patterns');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
  },
  director: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
    maxLength: 4,
  },
  description: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 1000,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (link) => urlPattern.test(link),
      message: 'Неправильный формат ссылки ',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (link) => urlPattern.test(link),
      message: 'Неправильный формат ссылки ',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (link) => urlPattern.test(link),
      message: 'Неправильный формат ссылки ',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  nameEN: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
});
module.exports = mongoose.model('movie', movieSchema);
