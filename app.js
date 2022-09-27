/* пакетные модули */
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const moviesRouter = require('./routes/movie');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/moviesdb');

app.use('/user', auth, userRouter);
app.use('/movies', auth, moviesRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
