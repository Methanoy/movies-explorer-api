require('dotenv').config();
/* пакетные модули */
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
/* роутеры */
const userRouter = require('./routes/user');
const moviesRouter = require('./routes/movie');
/* ошибки */
const NotFoundError = require('./errors/NotFoundError');
/* миддлвары */
const cors = require('./middlewares/cors');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { validateLogin, validateCreateUser } = require('./middlewares/inputDataValidation');
/* контроллеры */
const { createUser, login, logout } = require('./controllers/user');

const { PORT = 3000 } = process.env;

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

mongoose.connect('mongodb://localhost:27017/moviesdb');

app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(requestLogger);
app.use(cors);

app.post('/signup', validateCreateUser, createUser);
app.post('/signin', validateLogin, login);
app.get('/signout', auth, logout);

app.use('/user', auth, userRouter);
app.use('/movies', auth, moviesRouter);
app.use(auth, () => {
  throw new NotFoundError('Указан неправильный путь.');
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
