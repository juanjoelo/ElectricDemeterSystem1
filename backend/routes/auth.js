// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../src/models/User"); // La ruta correcta a tu modelo de Usuario

// Ruta para registrar un nuevo usuario
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verifica si ya existe un usuario con el mismo nombre de usuario o correo electrónico
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
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
  const { username, password } = req.body;

  try {
    // Busca el usuario en la base de datos por nombre de usuario
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ error: "Nombre de usuario o contraseña incorrectos" });
    }

    // Verifica la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(404)
        .json({ error: "Nombre de usuario o contraseña incorrectos" });
    }

    // Devuelve el usuario encontrado
    res.status(200).json(user);
  } catch (err) {
    console.error("Error al iniciar sesión:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
