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
router.patch("/users/me", updateUser);
// обновление аватар
router.patch("/users/me/avatar", updateUserAvatar);

module.exports = router;

// возвращает информацию о текущем пользователе
// router.get("/users/me", login);
// создание пользователя
// router.post("/users", createUser);
