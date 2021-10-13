const express = require("express");
const mongoose = require("mongoose");
const routerUser = require("./routes/usersRoutes");
const routerCard = require("./routes/cardsRoutes");
const {
  createUser,
  login,
} = require("./controllers/usersController");

// Слушаем 3000 порт
const PORT = 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: "61598c4c1835b4285da6518c",
  };

  next();
});

app.use("/", routerUser);
app.use("/", routerCard);

app.post('/signin', login);
app.post('/signup', createUser);

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
