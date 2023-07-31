const mainRouter = require('express').Router();
const auth = require('../middlewares/auth');

const userRouter = require('./users');
const cardRouter = require('./cards');
const { NotFoundError } = require('../utils/NotFoundError');

// авторизация
mainRouter.use('/users', auth, userRouter);
mainRouter.use('/cards', auth, cardRouter);

mainRouter.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не найдена'));
});

module.exports = mainRouter;
