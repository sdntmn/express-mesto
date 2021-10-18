const { celebrate, Joi } = require("celebrate");

const router = require("express").Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/сardsСontroller");

router.get("/cards", getCards);

router.post(
  "/cards",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().min(2),
    }),
  }),
  createCard
);
// Удаление карточки =======================================================
router.delete(
  "/cards/:cardId",
  celebrate({
    // валидируем параметры
    params: Joi.object().keys({
      postId: Joi.string().alphanum().length(24),
    }),
    headers: Joi.object().keys({
      // валидируем заголовки
    }),
    query: Joi.object().keys({
      // валидируем query
    }),
  }),
  deleteCard
);
// Поставить лайк карточке =================================================
router.put("/cards/:cardId/likes", likeCard);
// Снять лайк карточки =====================================================
router.delete("/cards/:cardId/likes", dislikeCard);

module.exports = router;
