const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routerUser = require("./routes/usersRoutes");
const routerCard = require("./routes/cardsRoutes");
const { createUser, login } = require("./controllers/usersController");
const auth = require("./middlewares/auth");

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
