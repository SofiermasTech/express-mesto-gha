const mainRouter = require('express').Router();
const auth = require('../middlewares/auth');

const {
  validationSignup, validationSignin,
} = require('../utils/validation');
const { createUser, login } = require('../controllers/users');

const NotFoundError = require('../utils/NotFoundError');

mainRouter.post('/signup', validationSignup, createUser);
mainRouter.post('/signin', validationSignin, login);

// авторизация
mainRouter.use(auth);

// роуты, которым авторизация нужна
mainRouter.use('/users', require('./users'));
mainRouter.use('/cards', require('./cards'));

mainRouter.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не найдена'));
});

module.exports = mainRouter;
