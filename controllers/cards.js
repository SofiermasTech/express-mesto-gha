const Card = require('../models/card');
const { ERROR_BAD_REQUEST, ERROR_NOT_FOUND, ERROR_DEFAULT } = require('../utils/errors');

module.exports.createCard = (req, res) => {
  console.log(req.user._id); // _id станет доступен
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Некорректные данные.' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: err.message });
      }
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      if (cards.length === 0) {
        res.status(ERROR_NOT_FOUND).send({ message: 'Карточки не найдены.' });
        return;
      }
      res.status(200).send(cards);
    })
    .catch((err) => res.status(ERROR_DEFAULT).send({ message: err.message }));
};

module.exports.deleteCard = (req, res) => {
  const owner = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndRemove({ owner, _id: cardId })
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        res.status(ERROR_NOT_FOUND).send({ message: 'Card not found' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Некорректные данные.' });
  } else {
    res.status(ERROR_DEFAULT).send({ message: err.message });
  }
  });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        res.status(ERROR_NOT_FOUND).send({ message: 'Card not found' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Некорректные данные.' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: err.message });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        res.status(ERROR_NOT_FOUND).send({ message: 'Card not found' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Некорректные данные.' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: err.message });
      }
    });
};