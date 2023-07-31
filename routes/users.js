const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  // validationUserId,
  // validationUserUpdate,
  validationUserAvatar,
} = require('../utils/validation');

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getProfile,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/me', getProfile);
userRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
}), getUserById);
userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUser);
userRouter.patch('/me/avatar', validationUserAvatar, updateAvatar);

module.exports = userRouter;
