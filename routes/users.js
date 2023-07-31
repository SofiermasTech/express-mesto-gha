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

router.get('/', getUsers);
router.get('/me', getProfile);
router.get('/:userId', validationUserId, getUserById);
router.patch('/me', validationUserUpdate, updateUser);
router.patch('/me/avatar', validationUserAvatar, updateAvatar);

module.exports = router;
