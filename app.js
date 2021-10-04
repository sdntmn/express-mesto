const express = require("express");
const path = require("path");
const routerUser = require("./routes/routesUsers");
const routerCard = require("./routes/routesСards");
const mongoose = require("mongoose");

// Слушаем 3000 порт
const PORT = 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: "61598c4c1835b4285da6518c", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

// обращаемся к объекту APP используя метод use (добавляет новый мидлваре)
app.use("/", routerUser);
app.use("/", routerCard);

// подключаемся к серверу mongo
mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//запуск сервера
app.listen(PORT, () => {
  console.log("Сервер работает и готов к получению данных...");
});

//mongodb+srv://admin:111213@cluster0.utnmd.mongodb.net/mestodb
