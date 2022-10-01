const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Поле "Имя" должно содержать не менее 2 символов'],
    maxlength: [30, 'Поле "Имя" должно содержать не более 30 символов'],
    required: [true, 'Поле "Имя" является обязательным для заполнения'],
  },
  password: {
    type: String,
    required: [true, 'Поле "Пароль" является обязательным для заполнения'],
    select: false,
  },
  email: {
    type: String,
    required: [true, 'Поле "Почта" является обязательным для заполнения'],
    unique: [true, 'Пользователь с аналогичным email уже зарегистрирован'],
    validate: [validator.isEmail, 'Поле "Почта" должно содержать email'],
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильная почта или пароль.'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неправильная почта или пароль.'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('User', userSchema);
