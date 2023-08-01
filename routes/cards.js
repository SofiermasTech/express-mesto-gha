const cardRouter = require('express').Router();

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

cardRouter.get('/', getCards);
cardRouter.post('/', validationCreateCard, createCard);

cardRouter.delete('/:cardId', validationCardId, deleteCard);
cardRouter.put('/:cardId/likes', validationCardId, likeCard);
cardRouter.delete('/:cardId/likes', validationCardId, dislikeCard);

module.exports = cardRouter;
