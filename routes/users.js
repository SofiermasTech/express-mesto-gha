const userRouter = require('express').Router();
// const { celebrate, Joi } = require('celebrate');

const {
  validationUserId,
  validationUserUpdate,
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
userRouter.get('/:userId', validationUserId, getUserById);
userRouter.patch('/me', validationUserUpdate, updateUser);
userRouter.patch('/me/avatar', validationUserAvatar, updateAvatar);

module.exports = userRouter;
