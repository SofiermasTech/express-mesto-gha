const router = require('express').Router();
const auth = require('../middlewares/auth');

const userRouter = require('./users');
const cardRouter = require('./cards');
const { NotFoundError } = require('../utils/NotFoundError');

// авторизация
router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не найдена'));
});
