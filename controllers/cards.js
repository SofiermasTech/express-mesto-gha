const Card = require('../models/card');

const { SUCCESS_RES } = require('../utils/response-status');
const NotFoundError = require('../utils/NotFoundError');
const BadRequestError = require('../utils/BadRequestError');
const ForbiddenError = require('../utils/ForbiddenError');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(SUCCESS_RES).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные.'));
      } else {
        next(err);
      }
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((error) => next(error));
};

module.exports.deleteCard = (req, res, next) => {
  // const owner = req.user._id;
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Card not found');
      }
      if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError('Невозможно удалить чужую карточку.');
      } else {
        Card.findByIdAndRemove(cardId)
          .orFail(() => new NotFoundError('Card not found'))
          .then(() => res.status(200).send({ message: 'Карточка удалена.' }));
        // .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        next(new NotFoundError('Card not found'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        next(new NotFoundError('Card not found'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные карточки'));
      } else {
        next(err);
      }
    });
};
