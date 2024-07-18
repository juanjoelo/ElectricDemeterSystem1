import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import stickersData from "../components/stickers.json";
import { CartContext } from "../context/CartContext"; // Importar CartContext
import "./home.css"; // Importar estilos de Home.css

const Stickers = () => {
  const { type } = useParams();
  const decodedType = decodeURIComponent(type);
  const filteredStickers = decodedType === 'all'
    ? stickersData
    : stickersData.filter((sticker) => sticker.type === decodedType);

  const { addToCart } = useContext(CartContext); // Usar el contexto del carrito

  const handleAddToCart = (sticker) => {
    addToCart(sticker);
  };

  return (
    <div className="home-container">
      <h3>{decodedType === 'all' ? 'Todos los Stickers' : `Stickers de ${decodedType}`}</h3>
      <div className="stickers-container">
        {filteredStickers.length > 0 ? (
          filteredStickers.map((sticker) => (
            <div key={sticker.id} className="sticker-card">
              <Link to={`/sticker/${sticker.id}`}>
                <img
                  src={sticker.image}
                  alt={sticker.name}
                  className="sticker-image"
                />
                <h3>{sticker.name}</h3>
                <p>{sticker.type}</p>
                <p>{"$" + sticker.price}</p>
              </Link>
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
