const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
  getInfoUser,
} = require('../controllers/users');
const { links } = require('../utils/links');

router.get('/', getUsers);
router.get('/me', getInfoUser);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
}), getUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(links),
    email: Joi.string().email(),
    password: Joi.string(),
  }),
}), updateUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(links),
  }),
}), updateUserAvatar);

module.exports = router;
