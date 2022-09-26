/* пакетные модули */
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const moviesRouter = require('./routes/movie');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/moviesdb');

app.use('/user', userRouter);
app.use('/movies', moviesRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
