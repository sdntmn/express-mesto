const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { errors } = require("celebrate");
const routerUser = require("./routes/usersRoutes");
const routerCard = require("./routes/cardsRoutes");
const { createUser, login } = require("./controllers/usersController");
const auth = require("./middlewares/auth");
const NotFoundError = require("./errors/not-found-err");
const BadRequestError = require("./errors/bad-request-err");

// Слушаем 3000 порт
const PORT = 5000;

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// роуты без авторизации
app.post("/signin", login);
app.post("/signup", createUser);

// роуты с авторизацией
app.use("/", auth, routerUser);
app.use("/", auth, routerCard);

app.use(errors()); // обработчик ошибок celebrate

app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;
  console.log(err.name);
  if (err.name === "MongoServerError" && err.code === 11000) {
    res.status(409).send({ message: "Уже существует в базе email" });
  }
  if (err.name === "ValidationError") {
    throw new BadRequestError({
      message: "Переданы некорректные данные.",
    });
  }
  if (err.name === "CastError") {
    throw new NotFoundError({
      message: "Данные не найдены.",
    });
  }
  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
  next();
});

// подключаемся к серверу mongo
mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер работает и готов к получению данных на ${PORT} порте...`);
});

// mongodb+srv://admin:111213@cluster0.utnmd.mongodb.net/mestodb
