const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  console.log(req.user._id); // _id станет доступен

  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      if (cards.length === 0) {
        res.status(400).send({ message: 'Карточки не найдены.' });
        return;
      }
      res.send(cards);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Card not found' });
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => res.status(200).send(card))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => res.status(200).send(card))
    .catch((err) => res.status(500).send({ message: err.message }));
};