const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const { NOT_FND_USER_MESSG, CNFL_ERR_USER_MESSG, BAD_REQ_USER_MESSG } = require('../utils/errorConstants');
const { DEV_SECRET } = require('../utils/constants');
const {
  OK, CREATED, AUTRZD_USER_MESSG, LOGOUT_USER_MESSG,
} = require('../utils/successResConstants');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const {
    name, password, email,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User
      .create({
        name, password: hash, email,
      }))
    .then((user) => res.status(CREATED).send(
      {
        data: {
          name: user.name,
          email: user.email,
        },
      },
    ))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(CNFL_ERR_USER_MESSG));
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(BAD_REQ_USER_MESSG));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET,
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        secure: NODE_ENV === 'production',
        httpOnly: true,
      })
        .send({ message: AUTRZD_USER_MESSG });
    })
    .catch(next);
};

const logout = (req, res, next) => {
  User
    .findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FND_USER_MESSG);
      } else {
        res.clearCookie('jwt').send({ message: LOGOUT_USER_MESSG });
      }
    })
    .catch(next);
};

const getCurrentUserData = (req, res, next) => {
  User
    .findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FND_USER_MESSG);
      } else {
        res.status(OK).send(user);
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
        throw new NotFoundError(NOT_FND_USER_MESSG);
      } else {
        res.status(OK).send(userData);
      }
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(CNFL_ERR_USER_MESSG));
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(BAD_REQ_USER_MESSG));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  login,
  logout,
  updateUserProfile,
  getCurrentUserData,
};
