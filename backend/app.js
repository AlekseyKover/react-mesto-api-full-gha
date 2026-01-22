const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// eslint-disable-next-line import/no-extraneous-dependencies
const cookieParser = require('cookie-parser');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const cors = require('cors');
const auth = require('./middlwares/auth');
const { createUser, login } = require('./controllers/users');
const error = require('./middlwares/error');
const ErrorNotFound = require('./errors/ErrorNotFound');
const { links } = require('./utils/links');
const { requestLogger, errorLogger } = require('./middlwares/logger');

const { PORT = 3001 } = process.env;
const app = express();
app.use(cors({
  origin: ['https://alekskover.nomoreparties.co', 'http://localhost:3000'],
  credentials: true,
  maxAge: 30,
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connection.on('connected', () => {
  // eslint-disable-next-line no-console
  console.log('MongoDB connected');
});
mongoose.connection.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.error('MongoDB connection error:', err.message);
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});
app.use(requestLogger);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(links),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/card'));

app.use('*', (req, res, next) => {
  next(new ErrorNotFound('Нет такого роута'));
});
app.use(errorLogger);
app.use(errors());
app.use(error);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on port ${PORT}`);
});
