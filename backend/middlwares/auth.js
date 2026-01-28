/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');
const TokenError = require('../errors/TokenError');

const { JWT_SECRET = 'dev-secret' } = process.env;

const auth = (req, res, next) => {
  let token = req.cookies.jwt;

  // Если токена нет в cookies, проверяем заголовок Authorization
  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
  }

  if (!token) {
    next(new TokenError('Необходима авторизация'));
    return;
  }

  let playload;
  try {
    playload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new TokenError('Неверный токен'));
    return;
  }
  req.user = playload;
  next();
};

module.exports = auth;
