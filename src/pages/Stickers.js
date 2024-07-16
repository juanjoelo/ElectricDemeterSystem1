import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import stickersData from "../components/stickers.json";
import { CartContext } from "../context/CartContext"; // Importar CartContext
import "./home.css"; // Importar estilos de Home.css

const Stickers = () => {
  const { type } = useParams();
  const decodedType = decodeURIComponent(type);
  const filteredStickers = stickersData.filter(
    (sticker) => sticker.type === decodedType
  );

  const { addToCart } = useContext(CartContext); // Usar el contexto del carrito

  const handleAddToCart = (sticker) => {
    addToCart(sticker);
    //alert(`${sticker.name} added to cart!`); // Añadir mensaje de confirmación opcional
  };

  return (
    <div className="home-container">
      <div className="stickers-container">
        {filteredStickers.length > 0 ? (
          filteredStickers.map((sticker) => (
            <div key={sticker.id} className="sticker-card">
              <img
                src={sticker.image}
                alt={sticker.name}
                className="sticker-image"
              />
              <h3>{sticker.name}</h3>
              <p>{sticker.type}</p>
              <p>{"$" + sticker.price}</p>
              <button onClick={() => handleAddToCart(sticker)}>
                Agregar al carrito
              </button>
            </div>
          ))
        ) : (
          <p>No stickers found for {decodedType}</p>
        )}
      </div>
    </div>
  );
};

export default Stickers;
