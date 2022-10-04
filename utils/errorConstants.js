/* коды статусов */
const BAD_REQ_ERR_CODE = 400;
const UNFRZ_ERR_CODE = 401;
const FRBDN_ERR_CODE = 403;
const NOT_FND_ERR_CODE = 404;
const CNFL_ERR_CODE = 409;
const SERV_ERR_CODE = 500;

/* сообщения */

/* models */
// user.js
const UNFRZ_ERR_SCHM_MESSG = 'Неправильная почта или пароль.';
/* routes */
// index.js
const NOT_FND_ROUTE_MESSG = 'Указанный путь не существует.';

/* controllers */
// user.js
const CNFL_ERR_USER_MESSG = 'Пользователь с аналогичным email уже зарегистрирован.';
const NOT_FND_USER_MESSG = 'Пользователь по указанному _id не найден.';
const BAD_REQ_USER_MESSG = 'Переданы некорректные данные при обновлени профиля пользователя.';
// movie.js
const BAD_REQ_CRT_MESSG = 'Переданы некорректные данные при создании карточки фильма.';
const NOT_FND_DEL_MESSG = 'Карточка фильма с указанным _id не найдена.';
const FRBDN_ERR_DEL_MESSG = 'Вы не можете удалить чужую карточку фильма.';
const BAD_REQ_DEL_MESSG = 'Переданы некорректные данные при удалении карточки фильма.';

/* middlewares */
// inputDataValidation.js
const BAD_REQ_URL_MESSG = 'Передан некорректный адрес URL';
// errorHandler.js
const SERV_ERR_HNDLR_MESSG = 'Упс, на сервере произошла ошибка. Простите :(';
// middlewares auth.js
const UNFRZ_ERR_AUTH_MESSG = 'Требуется авторизация.';

module.exports = {
  BAD_REQ_ERR_CODE,
  NOT_FND_ERR_CODE,
  SERV_ERR_CODE,
  FRBDN_ERR_CODE,
  CNFL_ERR_CODE,
  UNFRZ_ERR_CODE,

  NOT_FND_ROUTE_MESSG,
  UNFRZ_ERR_SCHM_MESSG,
  BAD_REQ_URL_MESSG,
  SERV_ERR_HNDLR_MESSG,
  UNFRZ_ERR_AUTH_MESSG,
  CNFL_ERR_USER_MESSG,
  NOT_FND_USER_MESSG,
  BAD_REQ_USER_MESSG,
  BAD_REQ_CRT_MESSG,
  NOT_FND_DEL_MESSG,
  FRBDN_ERR_DEL_MESSG,
  BAD_REQ_DEL_MESSG,
};
