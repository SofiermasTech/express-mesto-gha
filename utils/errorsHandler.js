const errorsHandler = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: 'Произошла ошибка сервера' });
  } else {
    res.status(500).send({ message: 'Произошла ошибка сервера' });
  }
  return next();
};

module.exports = errorsHandler;
