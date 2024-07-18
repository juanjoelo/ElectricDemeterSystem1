import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import stickersData from "../components/stickers.json";
import { CartContext } from "../context/CartContext";
import "./StickerDetail.css";

const StickerDetail = () => {
  const { id } = useParams();
  const sticker = stickersData.find((sticker) => sticker.id === parseInt(id));

  const { addToCart } = useContext(CartContext);
  const [quantity] = useState(1);

  if (!sticker) {
    return <p>Sticker not found</p>;
  }

  const handleAddToCart = () => {
    addToCart({ ...sticker, quantity });
  };

 

  return (
    <div className="sticker-detail-container">
      <div className="sticker-detail-card">
        <div className="sticker-detail-content">
          <img
            src={sticker.image}
            alt={sticker.name}
            className="sticker-detail-image"
          />
          <div className="sticker-detail-info">
            <h3>{sticker.name}</h3>
            <p>{sticker.type}</p>
            <p>{"$" + sticker.price}</p>
          </div>
        </div>
        <div className="sticker-detail-actions">
          <button onClick={handleAddToCart}>Agregar al carrito</button>
          <div className="quantity-controls">
            <h1>Sticker PREMIUM de 6cm impreso en tintas UV resistentes a TODO! </h1>
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickerDetail;
