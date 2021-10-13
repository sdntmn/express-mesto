const mongoose = require("mongoose");

// Схема user преобразуем схему в модель и перадаем её в контроллер
// там обрабатываем введенные данные
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Жак-Ив Кусто",
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: "Исследователь",
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
});



// Преобразуем схему в модель и экспортируем ===============================
module.exports = mongoose.model("user", userSchema);
