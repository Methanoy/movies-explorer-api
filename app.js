require('dotenv').config();
/* пакетные модули */
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
/* роутеры */
const router = require('./routes/index');
/* миддлвары */
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

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

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
