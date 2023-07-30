const router = require('express').Router();

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

router.get('/users', getUsers);
router.get('/users/:userId', validationUserId, getUserById);
router.patch('/users/me', validationUserUpdate, updateUser);
router.get('/users/me', getProfile);
router.patch('/users/me/avatar', validationUserAvatar, updateAvatar);

module.exports = router;
