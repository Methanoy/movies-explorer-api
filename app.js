require('dotenv').config();
/* пакетные модули */
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
/* роутеры */
const router = require('./routes/index');
/* миддлвары */
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/errorHandler');
const rateLimiter = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
/* константы */
const { MONGO_DEV } = require('./utils/constants');

const { PORT = 3000, NODE_ENV, MONGO_PROD } = process.env;

const app = express();

mongoose.connect(NODE_ENV === 'production' ? MONGO_PROD : MONGO_DEV);

app.use(requestLogger);
app.use(rateLimiter);
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(cors);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
