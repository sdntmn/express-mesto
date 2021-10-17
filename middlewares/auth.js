// импортируем модуль jsonwebtoken
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Необходима авторизация" });
  }
  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, "some-secret-key");
  } catch (err) {
    return res.status(404).send({ message: "NotFound" });
  }

  req.user = payload;
  console.log(`${req.user} '22'`);
  return next(); // пробрасываем запрос дальше
};
