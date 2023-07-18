const User = require('../models/user');
const { ERROR_BAD_REQUEST, ERROR_NOT_FOUND, ERROR_DEFAULT } = require('../utils/errors');
const { SUCCESS_RES } = require('../utils/response-status');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(SUCCESS_RES).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Некорректные данные.' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: err.message });
      }
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (users.length === 0) {
        res.status(404).send({ message: 'Users not found' });
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
};
