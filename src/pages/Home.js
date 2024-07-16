import React, { useEffect, useState, useContext } from "react";
import stickersData from "../components/stickers.json";
import { CartContext } from "../context/CartContext.js"; // Importamos CartContext
import "./home.css"; // Importamos el archivo CSS

const Home = () => {
  const [stickers, setStickers] = useState([]);
  const { addToCart } = useContext(CartContext); // Usar el contexto del carrito

  useEffect(() => {
    setStickers(stickersData);
  }, []);

  return (
    <div className="home-container">
      <h1 className="titulo">Más comprados</h1>
      <div className="stickers-container">
        {stickers.map((sticker) => (
          <div key={sticker.id} className="sticker-card">
            <img src={sticker.image} alt={sticker.name} />
            <h3>{sticker.name}</h3>
            <p>${sticker.price}</p>
            <button onClick={() => addToCart(sticker)}>
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
