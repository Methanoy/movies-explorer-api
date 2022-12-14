const router = require('express').Router();
/* роутеры */
const userRouter = require('./user');
const moviesRouter = require('./movie');
/* миддлвары */
const auth = require('../middlewares/auth');
const { validateLogin, validateCreateUser } = require('../middlewares/inputDataValidation');
/* контроллеры */
const { createUser, login, logout } = require('../controllers/user');
/* ошибки */
const NotFoundError = require('../errors/NotFoundError');
const { NOT_FND_ROUTE_MESSG } = require('../utils/errorConstants');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);
router.get('/signout', auth, logout);

router.use('/users', auth, userRouter);
router.use('/movies', auth, moviesRouter);
router.use(auth, () => {
  throw new NotFoundError(NOT_FND_ROUTE_MESSG);
});

module.exports = router;
