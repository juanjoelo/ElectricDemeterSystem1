const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Asegúrate de que esta ruta es correcta

// Ruta para registrar un nuevo usuario
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.find({ $or: [{ username }, { email }] });
    if (existingUser.length > 0) {
      return res.status(400).json({
        error: "Nombre de usuario o correo electrónico ya está en uso",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error al registrar usuario:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta para iniciar sesión
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  try {
    const user = await User.find({ email }).limit(1);
    console.log(user);
    if (user.length === 0) {
      return res.status(404).json({ error: "Email o contraseña incorrectos" });
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return res
        .status(404)
        .json({ error: "Nombre de usuario o contraseña incorrectos" });
    }

    res.status(200).json(user[0]);
  } catch (err) {
    console.error("Error al iniciar sesión:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/prueba", async (req, res) => {
  res.send("Esta es una prueba técnica.");
});

module.exports = router;
