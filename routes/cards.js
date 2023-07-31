const router = require('express').Router();

const {
  validationCreateCard,
  validationCardId,
} = require('../utils/validation');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', validationCreateCard, createCard);

router.delete('/cards/:cardId', validationCardId, deleteCard);
router.put('/cards/:cardId/likes', validationCardId, likeCard);
router.delete('/cards/:cardId/likes', validationCardId, dislikeCard);

module.exports = router;
