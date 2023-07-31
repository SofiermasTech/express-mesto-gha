const errorsHandler = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send({ message: `Произошла ошибка: ${err.message}` });
    return next();
  }
  return next();
};

module.exports = errorsHandler;
