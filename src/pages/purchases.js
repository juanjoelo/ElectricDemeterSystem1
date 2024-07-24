// src/pages/Purchases.js
//import React, { useContext } from "react";
import { useUser } from "../context/UserContext.js";
import "./purchases.css";

const Purchases = () => {
  const { purchases } = useUser();

  return (
    <div className="purchases-container">
      <h2 className="purchases-title">Compras</h2>
      {purchases.length === 0 ? (
        <p>No has realizado ninguna compra.</p>
      ) : (
        <ul className="purchases-list">
          {purchases.map((purchase, index) => (
            <li key={index} className="purchase-item">
              <h3>Compra #{index + 1}</h3>
              <p>Fecha: {purchase.date}</p>
              <p>Total: ${purchase.total}</p>
              <ul>
                {purchase.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="purchase-item-detail">
                    <p>{item.name}</p>
                    <p>Precio: ${item.price}</p>
                    <p>Cantidad: {item.quantity}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Purchases;
