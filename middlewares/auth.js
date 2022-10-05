const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { UNFRZ_ERR_AUTH_MESSG } = require('../utils/errorConstants');
const { DEV_SECRET } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET);
  } catch (err) {
    throw new UnauthorizedError(UNFRZ_ERR_AUTH_MESSG);
  }

  req.user = payload;
  return next();
};
