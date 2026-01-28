// Подключаем .env в разработке, в продакшене (Render) переменные приходят из окружения
try {
  // eslint-disable-next-line global-require
  require('dotenv').config();
} catch (e) {
  // Если dotenv не установлен (например, на Render), просто игнорируем
}

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const auth = require('./middlwares/auth');
const { createUser, login } = require('./controllers/users');
const error = require('./middlwares/error');
const ErrorNotFound = require('./errors/ErrorNotFound');
const { links } = require('./utils/links');
const { requestLogger, errorLogger } = require('./middlwares/logger');

const {
  PORT = 3001,
  MONGO_PUBLIC_URL,
  MONGO_URL,
  NODE_ENV,
  CLIENT_ORIGIN,
} = process.env;

// В продакшене (Render) строка подключения к Mongo обязательна
const mongoFromEnv = MONGO_PUBLIC_URL || MONGO_URL;

if (NODE_ENV === 'production' && !mongoFromEnv) {
  // eslint-disable-next-line no-console
  console.error('❌ MONGO_PUBLIC_URL/MONGO_URL is not defined for production');
  process.exit(1);
}

// Локально можно использовать дефолтную базу
const mongoUrl = mongoFromEnv || 'mongodb://127.0.0.1:27017/mestodb';

// Подключение к MongoDB (Railway или локально)
mongoose.connect(mongoUrl)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('✅ MongoDB connected');
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

const app = express();

// Явная настройка CORS, в том числе для preflight OPTIONS
app.use((req, res, next) => {
  const origin = req.headers.origin || '*';
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  return next();
});

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);

// Публичный healthcheck (для Render/проверок)
app.get('/health', (req, res) => {
  res.status(200).send({ status: 'ok' });
});

// Роуты авторизации
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

// Защищённые роуты
app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/card'));

// Роут для всех остальных запросов
app.use('*', (req, res, next) => {
  next(new ErrorNotFound('Нет такого роута'));
});

app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
