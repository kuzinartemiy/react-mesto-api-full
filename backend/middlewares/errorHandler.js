function errorHandler(err, req, res, next) {
  const status = err.statusCode || 500;
  const { message } = err;
  res.status(status).send({ message: message || 'Произошла ошибка на сервере.' });
  return next();
}

module.exports = {
  errorHandler,
};
