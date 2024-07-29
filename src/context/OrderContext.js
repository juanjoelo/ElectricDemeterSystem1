import React, { createContext, useState, useEffect } from "react";

export const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Aquí puedes cargar los pedidos desde una API o una fuente de datos
    const fetchOrders = async () => {
      // Simula una llamada a la API
      const response = await fetch("/api/orders");
      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <OrdersContext.Provider value={{ orders }}>
      {children}
    </OrdersContext.Provider>
  );
};
