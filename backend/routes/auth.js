// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.js"); // Asegúrate de que esta ruta sea correcta
// Ruta para registrar un nuevo usuario
// Ruta para registrar un nuevo usuario
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verifica si ya existe un usuario con el mismo nombre de usuario o correo electrónico
    const existingUser = await User.find({ $or: [{ username }, { email }] });
    if (existingUser.length > 0) {
      return res.status(400).json({
        error: "Nombre de usuario o correo electrónico ya está en uso",
      });
    }

    // Hash de la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea un nuevo usuario
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json(newUser); // Devuelve el usuario recién creado
  } catch (err) {
    console.error("Error al registrar usuario:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta para iniciar sesión
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Busca el usuario en la base de datos por email
    const user = await User.find({ email }).limit(1);
    if (user.length === 0) {
      return res.status(404).json({ error: "Email o contraseña incorrectos" });
    }

    // Verifica la contraseña
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return res
        .status(404)
        .json({ error: "Nombre de usuario o contraseña incorrectos" });
    }

    // Devuelve el usuario encontrado
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
