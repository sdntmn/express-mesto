const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");

// Схема user преобразуем схему в модель и перадаем её в контроллер
// там обрабатываем введенные данные
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Жак-Ив Кусто",
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: "Исследователь",
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        // eslint-disable-next-line no-useless-escape
        return /https?:\/\/\S+(www)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/.test(
          v
        );
      },
      message: (props) => {
        return `${props.value} Неправильный формат ссылки`;
      },
    },
    default:
      "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return /.+@.+\..+/.test(v);
      },
      message: (props) => {
        return `${props.value} Неправильный формат почты`;
      },
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      console.log("1");
      if (!user) {
        return Promise.reject(new Error("Неправильные почта или пароль"));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Неправильные почта или пароль"));
        }

        return user; // теперь user доступен
      });
    });
};

// Преобразуем схему в модель и экспортируем ===============================
module.exports = mongoose.model("user", userSchema);
