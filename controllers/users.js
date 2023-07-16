const User = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch(() => res.status(500).send({ message: err.message }));
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (users.length === 0) {
        res.status(404).send({ message: 'Users not found' });
        return;
      }
      res.status(OK).send(users);
    })
    .catch(() => {
      res.status(500).send({ message: err.message });
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User not found' });
        return;
      }
      res.status(OK).send(user);
    })
    .catch(() => res.status(500).send({ message: err.message }));
};

module.exports = {
  createUser,
  getUserById,
  getUsers
 };