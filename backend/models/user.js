const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    default: 'Жак-Ив Кусто',
    type: String,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: ({ length }) => length >= 2 && length <= 30,
      message: 'Имя пользователя должно быть длиной от 2 до 30 символов',
    },
  },
  about: {
    default: 'Исследователь',
    type: String,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: ({ length }) => length >= 2 && length <= 30,
      message: 'Имя пользователя должно быть длиной от 2 до 30 символов',
    },
  },
  avatar: {
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    type: String,

    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Неправильный формат ссылки',
    },
  },
  email: {
    type: String,
    required: [true, 'Поле email должо быть заполнено'],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Неверный формат email',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле password должо быть заполнено'],
    selecet: false,
  },
}, { versionKey: false });

// eslint-disable-next-line func-names
userSchema.methods.toJSON = function password() {
  const user = this.toObject();
  delete user.password;
  return user;
};
module.exports = mongoose.model('user', userSchema);
