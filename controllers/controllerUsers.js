// Импортируем модель user из ../models/user
const User = require("../models/modelUser");

// Обрабатываем запрос на получение данных всех Users ======================
module.exports.getUsers = (req, res) => {
  return User.find({})
    .then((users) => res.status(200).send(users))

    .catch((err) => {
      console.log("Ошибка:" + err);
      res.status(500).send({ message: "Ошибка!!!" });
    });
};

// Обрабатываем запрос на получение данных конкретного User по id===========
module.exports.getUser = (req, res) => {
  const { _id } = req.params;
  return User.find(_id)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.log("Ошибка:" + err);
      res.status(500).send({ message: "Ошибка!!!" });
    });
};

// Обрабатываем запрос на создание User=====================================

module.exports.createUser = (req, res) => {
  return User.create({ ...req.body })

    .then((user) => {
      console.log(user);
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name == "ValidationError") {
        return res.status(400).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(", ")}`,
        });
      }
      console.log("Error:" + err);
      return res.status(500).send({ message: "Ошибка!!!" });
    });
};

// Обрабатываем запрос на обновление данных User ===========================
module.exports.updateUser = (req, res) => {
  return User.findByIdAndUpdate(req.user._id, { ...req.body }, { new: true })
    .then((user) => {
      console.log(user);
      return res.status(200).send(user);
    })
    .catch((err) => {
      console.log("Ошибка:" + err);
      res.status(500).send({ message: "Ошибка!!!" });
    });
};

// Обрабатываем запрос на обновление Avatar User ===========================
module.exports.updateUserAvatar = (req, res) => {
  return User.findByIdAndUpdate(req.user._id, { ...req.body }, { new: true })
    .then((user) => {
      console.log(user);
      return res.status(200).send(user);
    })

    .catch((err) => {
      console.log("Ошибка:" + err);
      res.status(500).send({ message: "Ошибка!!!" });
    });
};
