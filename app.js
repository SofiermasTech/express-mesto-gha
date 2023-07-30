const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Защита сервера
const helmet = require('helmet');
const auth = require('./middlewares/auth');
const {
  validationSignup, validationSignin,
} = require('./utils/validation');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();

// const { ERROR_NOT_FOUND } = require('./utils/errors');
const { NotFoundError } = require('./utils/NotFoundError');
const { createUser, login } = require('./controllers/users');

// подключаемся к серверу mongo
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(helmet());

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.post('/signin', validationSignin, login);
app.post('/signup', validationSignup, createUser);

// авторизация
app.use(auth);

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не найдена'));
});

app.listen(PORT);
