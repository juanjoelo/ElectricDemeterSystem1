const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');

const app = express();
const port = 5000;

// Conexión a la base de datos MongoDB
mongoose.connect("mongodb://localhost:27017/sticker-shop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Conexión exitosa a MongoDB"))
.catch((error) => console.error("Error al conectar a MongoDB:", error));

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Modelo de Sticker
const stickerSchema = new mongoose.Schema({
  name: String,
  price: Number,
  imageUrl: String,
});

const Sticker = mongoose.model("Sticker", stickerSchema);

// Ruta para obtener los stickers
app.get("/api/stickers", async (req, res) => {
  const stickers = await Sticker.find();
  res.json(stickers);
});

// Ruta para la URL base
app.get("/", (req, res) => {
  res.send("Bienvenido a la API de Sticker Shop");
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
