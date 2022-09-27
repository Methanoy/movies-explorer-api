const bcrypt = require('bcryptjs');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

const createUser = (req, res, next) => {
  const {
    name, password, email,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User
      .create({
        name, password: hash, email,
      }))
    .then((user) => res.status(201).send(
      {
        data: {
          name: user.name,
          email: user.email,
        },
      },
    ))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с аналогичным email уже зарегистрирован.'));
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
      } else {
        next(err);
      }
    });
};

const getCurrentUserData = (req, res, next) => {
  User
    .findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      } else {
        res.status(200).send(user);
      }
    })
    .catch(next);
};

const updateUserProfile = (req, res, next) => {
  const { name, email } = req.body;
  User
    .findByIdAndUpdate(req.user._id, { name, email }, {
      new: true, runValidators: true,
    })
    .then((userData) => {
      if (!userData) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      } else {
        res.status(200).send(userData);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при обновлени профиля пользователя.'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  updateUserProfile,
  getCurrentUserData,
};
