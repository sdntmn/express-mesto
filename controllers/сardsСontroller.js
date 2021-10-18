// Импортируем модель user из ../models/user
const Card = require("../models/cardModel");
const NotFoundError = require("../errors/not-found-err");

// Обрабатываем запрос на получение данных всех Cards ======================
module.exports.getCards = (req, res, next) => {
  return Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
};

// +Обрабатываем запрос на удаление Card ===================================
module.exports.deleteCard = (req, res, next) => {
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
        throw new NotFoundError({
          message: "Карточка с указанным _id не найдена.",
        });
      }
      return res.status(200).send(card);
    })
    .catch(next);
};

// Обрабатываем запрос на создание Card=====================================
module.exports.createCard = (req, res, next) => {
  return Card.create({ ...req.body, owner: req.user._id })
    .then((card) => {
      return res.status(200).send(card);
    })
    .catch(next);
};

// Обрабатываем запрос на добавление Лайк Card==============================
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $addToSet: { likes: req.user._id },
  })
    .then((data) => {
      if (!data) {
        throw new NotFoundError({
          message: "Передан несуществующий _id карточки.",
        });
      }
      return res.status(200).send(data);
    })
    .catch(next);
};

// Обрабатываем запрос на удаление Лайк Card================================
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        throw new NotFoundError({
          message: "Передан несуществующий _id карточки.",
        });
      }
      return res.status(200).send(data);
    })
    .catch(next);
};
