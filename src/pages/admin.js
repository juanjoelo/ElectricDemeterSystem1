import React, { useEffect, useState } from "react";

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/orders");
        if (!response.ok) {
          const errorMessage = await response.json();
          throw new Error(errorMessage.error || "Error en la solicitud");
        }
        const ordersData = await response.json();
        setOrders(ordersData);
      } catch (error) {
        console.error("Error:", error.message);
        setError(error.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Admin - Pedidos</h1>
      {error && <p>{error}</p>}
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            <p>Usuario: {order.user.username}</p>
            <p>Email: {order.user.email}</p>
            <p>Total: ${order.total}</p>
            <p>Status: {order.status}</p>
            <p>Fecha: {new Date(order.createdAt).toLocaleString()}</p>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.name} - ${item.price} x {item.quantity}
                </li>
              ))}
            </ul>
            {/* Agregar botones para cambiar el estado del pedido */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
