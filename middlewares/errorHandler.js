const { SERV_ERR_CODE, SERV_ERR_HNDLR_MESSG } = require('../utils/errorConstants');

module.exports = (err, req, res, next) => {
  const { statusCode = SERV_ERR_CODE, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === SERV_ERR_CODE
        ? SERV_ERR_HNDLR_MESSG
        : message,
    });

  next();
};
