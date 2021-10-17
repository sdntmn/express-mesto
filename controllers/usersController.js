// Для хеширования пароля
const bcrypt = require("bcryptjs");
// импортируем модуль jsonwebtoken
const jwt = require("jsonwebtoken");
// Импортируем модель user из ../models/user
const User = require("../models/userModel");

// Обрабатываем запрос на получение данных всех Users ======================
module.exports.getUsers = (req, res) => {
  return User.find({})
    .then((user) => {
      return res.status(200).send(user);
    })

    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      res.status(500).send({ message: err });
    });
};

// Обрабатываем запрос на получение данных конкретного User по id===========
module.exports.getUser = (req, res) => {
  return User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: " Пользователь по указанному _id не найден" });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      // console.log(err);
      if (err.name === "CastError") {
        console.log(`Ошибка: ${err}`);
        res.status(400).send({ message: "Запрос ошибка 1" });
      }
      if (res) {
        console.log(`Ошибка: ${err}`);
        res.send({ message: "Ошибка !!!" });
      }
    });
};

// Обрабатываем запрос на создание User=====================================
module.exports.createUser = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      return User.create({
        name: req.body.name,
        about: req.body.about,
        avatar: req.body.avatar,
        email: req.body.email,
        password: hash,
      });
    })
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send(`message: ${err}`);
      }
      console.log(`Ошибка: ${err}`);
      return res.status(500).send(`Ошибка: ${err}`);
    });
};

// Обрабатываем запрос на обновление данных User ===========================
module.exports.updateUser = (req, res) => {
  return User.findByIdAndUpdate(
    req.user._id,
    { ...req.body },
    { new: true, runValidators: true }
  )
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        console.log(`Ошибка: ${err}`);
        res
          .status(400)
          .send({ message: "Пользователь с указанным _id не найден." });
      }
      if (err.name === "ValidationError") {
        console.log(`Ошибка: ${err}`);
        res.status(400).send({
          message: "Переданы некорректные данные при обновлении профиля.",
        });
      }
      console.log(`Ошибка: ${err}`);
      return res.status(500).send({ message: "Ошибка!!!" });
    });
};

// Обрабатываем запрос на обновление Avatar User ===========================
module.exports.updateUserAvatar = (req, res) => {
  return User.findByIdAndUpdate(
    req.user._id,
    { ...req.body },
    { new: true, runValidators: true }
  )
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        console.log(`Ошибка: ${err}`);
        res
          .status(404)
          .send({ message: "Пользователь с указанным _id не найден." });
      }
      if (err.name === "ValidationError") {
        console.log(`Ошибка: ${err}`);
        res.status(400).send({
          message: "Переданы некорректные данные при обновлении аватара.",
        });
      }
      console.log(`Ошибка: ${err}`);
      return res.status(500).send({ message: "Ошибка!!!" });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, "some-secret-key", {
        expiresIn: "7d",
      });
      console.log(token);
      if (!user) {
        return Promise.reject(new Error("Неправильные почта или пароль"));
      }
      return res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

// Обрабатываем запрос на получение данных авторизированного Usera =========
module.exports.getAuthUser = (req, res) => {
  const id = req.params.userId;
  return User.findById({ _id: id })
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      res.status(500).send({ message: err });
    });
};
