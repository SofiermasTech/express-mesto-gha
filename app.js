const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

// Защита сервера
const helmet = require('helmet');
const auth = require('./middlewares/auth');
const errorsHandler = require('./utils/errorsHandler');
const {
  validationSignup, validationSignin,
} = require('./utils/validation');
const { NotFoundError } = require('./utils/NotFoundError');
const { createUser, login } = require('./controllers/users');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();

// подключаемся к серверу mongo
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
app.use(helmet());

app.post('/signup', validationSignup, createUser);
app.post('/signin', validationSignin, login);

// авторизация
app.use(auth);

app.use('/users', auth, userRouter);
app.use('/card', auth, cardRouter);

app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не найдена'));
});

app.use(errors());
app.use(errorsHandler);

app.listen(PORT);
