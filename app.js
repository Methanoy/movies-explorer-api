/* пакетные модули */
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
/* роутеры */
const userRouter = require('./routes/user');
const moviesRouter = require('./routes/movie');
/* миддлвары */
const cors = require('./middlewares/cors');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
/* контроллеры */
const createUser = require('./controllers/user');
const login = require('./controllers/user');

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
app.use(cors);

app.post('/signup', createUser);
app.post('/signin', login);
app.use('/user', auth, userRouter);
app.use('/movies', auth, moviesRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
