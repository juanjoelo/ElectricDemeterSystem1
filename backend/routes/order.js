const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Ruta para crear un nuevo pedido
router.post("/", async (req, res) => {
  const { userId, items, total } = req.body;

  try {
    const newOrder = new Order({ user: userId, items, total });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    console.error("Error al crear pedido:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta para obtener todos los pedidos
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "username email");
    res.status(200).json(orders);
  } catch (err) {
    console.error("Error al obtener pedidos:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
