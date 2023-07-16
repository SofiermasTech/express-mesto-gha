const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  console.log(req.user._id); // _id станет доступен

  const { name, link } = req.body;

  Card.create({ name, link })
    .then((card) => res.send(card))
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
      res.send(card);
    })
    .catch(() => res.status(500).send({ message: err.message }));
};