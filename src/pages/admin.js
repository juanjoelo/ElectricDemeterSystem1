import React, { useContext } from "react";
import { OrdersContext } from "../context/OrderContext"; // Asegúrate de tener este contexto creado

const AdminPage = () => {
  const { orders } = useContext(OrdersContext);

  return (
    <div className="admin-page">
      <h1>Pedidos</h1>
      {orders.length === 0 ? (
        <div className="no-orders">
          <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGdsNHIxank4c2M4bnhpbm4xc2htZmZwbHlrMGR4dmczMHlsMjl2ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7erBV7JsTvPuU/giphy.webp" alt="No hay pedidos" />
          <p>No hay pedidos pendientes.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order, index) => (
            <div key={index} className="order-item">
              <p>Pedido #{order.id}</p>
              <p>Cliente: {order.customerName}</p>
              <p>Total: ${order.total}</p>
              {/* Agrega más detalles según sea necesario */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
