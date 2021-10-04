// Импортируем модель user из ../models/user
const Card = require("../models/modelСard");

// Обрабатываем запрос на получение данных всех Cards ======================
module.exports.getCards = (req, res) => {
  return Card.find({})
    .then((cards) => res.status(200).send(cards))

    .catch((err) => {
      console.log("Ошибка:" + err);
      res.status(500).send({ message: "Ошибка!!!" });
    });
};

// Обрабатываем запрос на удаление Card ===========
module.exports.deleteCard = (req, res) => {
  return Card.findByIdAndRemove({ _id: req.body._id, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      console.log("Ошибка:" + err);
      res.status(500).send({ message: "Ошибка!!!" });
    });
};

// Обрабатываем запрос на создание Card=====================================
module.exports.createCard = (req, res) => {
  return Card.create({ ...req.body, owner: req.user._id })

    .then((card) => {
      console.log(card);
      return res.status(200).send(card);
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

// Обрабатываем запрос на добавление Лайк Card==============================
module.exports.likeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((data) => {
      console.log(data);
      return res.status(200).send(data);
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

// Обрабатываем запрос на удаление Лайк Card================================
module.exports.dislikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((data) => {
      console.log(data);
      return res.status(200).send(data);
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
