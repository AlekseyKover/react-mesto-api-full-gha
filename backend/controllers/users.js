/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user');
const ErrorCode = require('../errors/ErrorCode');
const ErrorNotFound = require('../errors/ErrorNotFound');
const TokenError = require('../errors/TokenError');
const RegisterError = require('../errors/RegisterError');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => { res.send(users); })
    .catch((err) => {
      next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(String(password), 10)
    .then((hasHedPassword) => {
      User.create({
        name, about, avatar, email, password: hasHedPassword,
      })

        .then((user) => {
          res.send({ user });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new ErrorCode('Переданы некорректные данные при создании пользователя.'));
          }
          if (err.code === 11000) {
            next(new RegisterError('Такой пользователь уже есть'));
          }
          next(err);
        });
    })

    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .orFail(() => new TokenError('Пользователь не найден'))
    .then((user) => {
      bcrypt.compare(String(password), user.password)
        .then((isValidUser) => {
          if (isValidUser) {
            const jwt = jsonwebtoken.sign({
              _id: user._id,
            }, 'SECRET');
            res.cookie('jwt', jwt, {
              maxAge: 360000,
              httpOnly: true,
              sameSite: true,
            });
            res.send({ data: user.toJSON() });
          } else {
            res.status(403).send({ message: 'Неверные данные' });
          }
        });
    })
    .catch(next);
};

const getInfoUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new ErrorNotFound('Пользователь по указанному id не найден.'));
      }
      res.send(user);
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        next(new ErrorNotFound('Пользователь по указанному id не найден.'));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorCode('Данные введены некорректно'));
      } else {
        next(err);
      }
    });
};
const updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new ErrorNotFound('Пользователь по указанному id не найден.'));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorCode('Переданы некорректные данные при обновлении профиля.'));
      } else {
        next(err);
      }
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new ErrorNotFound('Пользователь по указанному id не найден.'));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorNotFound('Переданы некорректные данные при обновлении аватара.'));
      } else {
        next(err);
      }
    });
};
module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  updateUserAvatar,
  login,
  getInfoUser,
};
