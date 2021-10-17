const router = require("express").Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/сardsСontroller");

router.get("/cards", getCards);

router.post("/cards", createCard);
// Удаление карточки =======================================================
router.delete("/cards/:cardId", deleteCard);
// Поставить лайк карточке =================================================
router.put("/cards/:cardId/likes", likeCard);
// Снять лайк карточки =====================================================
router.delete("/cards/:cardId/likes", dislikeCard);

module.exports = router;
