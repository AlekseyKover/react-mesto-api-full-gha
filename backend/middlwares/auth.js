/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');
const TokenError = require('../errors/TokenError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let playload;
  if (!token) {
    next(new TokenError('Необходима авторизация'));
    return;
  }

  try {
    playload = jwt.verify(token, 'SECRET');
  } catch (err) {
    next(err);
  }
  req.user = playload;
  next();
};
module.exports = auth;
