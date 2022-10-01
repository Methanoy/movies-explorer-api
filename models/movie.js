const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле "Страна" является обязательным для заполнения'],
  },
  director: {
    type: String,
    required: [true, 'Поле "Режиссер" является обязательным для заполнения'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле "Хронометраж" является обязательным для заполнения'],
  },
  year: {
    type: String,
    required: [true, 'Поле "Год выпуска" является обязательным для заполнения'],
  },
  description: {
    type: String,
    required: [true, 'Поле "Описание" является обязательным для заполнения'],
  },
  image: {
    type: String,
    required: [true, 'Поле "Ссылка на постер" является обязательным для заполнения'],
    validation: [validator.isURL, 'Поле "Постер" должно содержать корректный URL'],
  },
  trailerLink: {
    type: String,
    required: [true, 'Поле "Ссылка на трейлер" является обязательным для заполнения'],
    validation: [validator.isURL, 'Поле "Постер" должно содержать корректный URL'],
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле "Миниатюрный постер" является обязательным для заполнения'],
    validation: [validator.isURL, 'Поле "Постер" должно содержать корректный URL'],
  },
  owner: {
    type: [mongoose.ObjectId],
    ref: 'user',
    required: [true, 'Поле "Миниатюрный постер" является обязательным для заполнения'],
  },
  movieId: {
    type: String,
    required: [true, 'Поле "ID фильма" является обязательным для заполнения'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле "Название фильма(RU)" является обязательным для заполнения'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле "Название фильма(EN)" является обязательным для заполнения'],
  },
});

module.exports = mongoose.model('Movie', movieSchema);
