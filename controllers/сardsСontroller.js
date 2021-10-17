// Импортируем модель user из ../models/user
const Card = require("../models/cardModel");

// Обрабатываем запрос на получение данных всех Cards ======================
module.exports.getCards = (req, res) => {
  return Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })

    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      res.status(500).send({ message: "Ошибка!!!" });
    });
};

// +Обрабатываем запрос на удаление Card ===================================
module.exports.deleteCard = (req, res) => {
  const userId = req.params.cardId;
  const ownerUserId = req.user._id;
  const cardId = req.user._id;

  return Card.findByIdAndRemove({ _id: cardId, owner: ownerUserId })
    .then((card) => {
      if (userId !== ownerUserId) {
        return res.status(423).send({
          message:
            " Вы не тот за кого себя выдаете, сервер отказывается Вам повиноваться",
        });
      }
      if (!card) {
        return res
          .status(404)
          .send({ message: "Карточка с указанным _id не найдена." });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        console.log(`Ошибка: ${err}`);
        res.status(400).send({
          message: "Запрос к серверу содержит синтаксическую ошибку",
        });
      }
      if (res) {
        console.log(`Ошибка: ${err}`);
        res.status(500).send({ message: "Ошибка!!!" });
      }
    });
};

// Обрабатываем запрос на создание Card=====================================
module.exports.createCard = (req, res) => {
  return Card.create({ ...req.body, owner: req.user._id })
    .then((card) => {
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .send(`Переданы некорректные данные при создании карточки: ${err}`);
      }
      console.log(`Ошибка: ${err}`);
      return res.status(500).send(`Ошибка: ${err}`);
    });
};

// Обрабатываем запрос на добавление Лайк Card==============================
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $addToSet: { likes: req.user._id },
  })
    .then((data) => {
      // console.log(data);
      if (!data) {
        return res
          .status(404)
          .send({ message: "Передан несуществующий _id карточки." });
      }
      return res.status(200).send(data);
    })
    .catch((err) => {
      // console.log(err);
      if (err.name === "CastError") {
        console.log(`Ошибка: ${err}`);
        res
          .status(400)
          .send({ message: "Запрос к серверу содержит синтаксическую ошибку" });
      }
      if (res) {
        console.log(`Ошибка: ${err}`);
        res.send({ message: "Ошибка !!!" });
      }
    });
};

// Обрабатываем запрос на удаление Лайк Card================================
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((data) => {
      // console.log(data);
      if (!data) {
        return res
          .status(404)
          .send({ message: "Передан несуществующий _id карточки." });
      }
      return res.status(200).send(data);
    })
    .catch((err) => {
      // console.log(err);
      if (err.name === "CastError") {
        console.log(`Ошибка: ${err}`);
        res
          .status(400)
          .send({ message: "Запрос к серверу содержит синтаксическую ошибку" });
      }
      if (res) {
        console.log(`Ошибка: ${err}`);
        res.send({ message: "Ошибка !!!" });
      }
    });
};
