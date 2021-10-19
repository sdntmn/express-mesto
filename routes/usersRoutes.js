const { celebrate, Joi } = require("celebrate");

const router = require("express").Router();

const {
  getUsers,
  getUser,
  updateUser,
  updateUserAvatar,
  getAuthUser,
} = require("../controllers/usersController");

// возвращает информацию о всех пользователях
router.get("/users", getUsers);

router.get("/users/me", getAuthUser);
// возвращает информацию о пользователе по id
router.get("/users/:id", getUser);

// обновление данных пользователя
router.patch(
  "/users/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2),
    }),
  }),
  updateUser
);
// обновление аватар
router.patch(
  "/users/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().min(2),
    }),
  }),
  updateUserAvatar
);

module.exports = router;
