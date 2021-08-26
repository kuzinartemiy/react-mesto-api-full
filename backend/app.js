require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const validator = require('validator');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { Joi, celebrate, errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const { auth } = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/errorHandler');
const { cors } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { login, createUser } = require('./controllers/users');
const { NotFoundError, BadRequestError } = require('./errors/errors');

const { PORT = 3000 } = process.env;

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(cors);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(limiter);
app.use(helmet());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((link) => {
      if (validator.isURL(link, { require_protocol: true })) {
        return link;
      }
      throw new BadRequestError('Невалидный URL');
    }),
  }),
}), createUser);

app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.use(() => {
  throw new NotFoundError('404 Error');
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`I'm running on ${PORT}`);
});
