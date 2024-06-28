// src/components/Cart.js
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext.js";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, incrementProduct, decrementProduct, removeFromCart } =
    useContext(CartContext);
  const navigate = useNavigate();

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-container">
    <h2 className="cart-title">Carrito</h2>
    {cart.length === 0 ? (
      <div className="img-container">
        <p className="empty-cart">¡Empezá un carrito de stickers!</p>
        <img
          src="images/bolsadecompras.png"
          alt="Bolsa de compras vacía"
          className="empty-cart-image"
        />
      </div>
              ) : (
        <div className="cart-items">
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-price">${item.price}</p>
                <div className="cart-item-quantity">
                  <button onClick={() => decrementProduct(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => incrementProduct(item.id)}>+</button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="remove-button"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total Price: ${getTotalPrice().toFixed(2)}</h3>
            <button onClick={handleCheckout} className="checkout-button">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
