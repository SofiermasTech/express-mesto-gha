const mainRouter = require('express').Router();
const auth = require('../middlewares/auth');

// const userRouter = require('./users');
// const cardRouter = require('./cards');
const NotFoundError = require('../utils/NotFoundError');
/*
// авторизация
mainRouter.use('/users', userRouter);
mainRouter.use('/cards', cardRouter);

mainRouter.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не найдена'));
});
*/

// авторизация
mainRouter.use(auth);

// роуты, которым авторизация нужна
mainRouter.use('/cards', require('./users'));
mainRouter.use('/cards', require('./cards'));

mainRouter.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не найдена'));
});

module.exports = mainRouter;
