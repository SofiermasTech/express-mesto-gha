const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../utils/NotFoundError');

const {
  ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
  ERROR_DEFAULT,
  ERROR_UNAUTHORIZED,
} = require('../utils/errors');
const { SUCCESS_RES } = require('../utils/response-status');

const createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    }))
    .then((user) => {
      res.status(SUCCESS_RES).send({
        _id: user._id,
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Некорректные данные.' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: err.message });
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const userToken = jwt.sign(
        { _id: user._id },
        'super-strong-secret',
        { expiresIn: '7d' },
      );
      res.send({ userToken });
    })
    .catch(() => {
      // ошибка аутентификации
      res
        .status(ERROR_UNAUTHORIZED)
        .send({ message: 'Неавторизованный запрос' });
    });
};

const getProfile = (req, res, next) => User
  .findOne({ _id: req.params.userId })
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Нет пользователя с таким id');
    }

    res.send(user);
  })
  .catch(next); // добавили catch

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (users.length === 0) {
        res.status(ERROR_NOT_FOUND).send({ message: 'Users not found' });
        return;
      }
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(ERROR_DEFAULT).send({ message: err.message });
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(ERROR_NOT_FOUND).send({ message: 'User not found' });
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Некорректные данные.' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: err.message });
      }
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'User not found' });
      } else if (err.name === 'ValidationError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Некорректные данные.' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: err.message });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'User not found' });
      } else if (err.name === 'ValidationError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Некорректные данные.' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: err.message });
      }
    });
};

module.exports = {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  updateAvatar,
  login,
  getProfile,
};
