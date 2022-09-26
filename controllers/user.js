const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

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
  updateUserProfile,
  getCurrentUserData,
};
