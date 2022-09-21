const mongoose = require('mongoose');

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
    // validate: [validator.isEmail, 'Поле "Почта" должно содержать email'],
  },
});

module.exports = mongoose.model('User', userSchema);
