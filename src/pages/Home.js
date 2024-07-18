import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import stickersData from "../components/stickers.json";
import { CartContext } from "../context/CartContext.js";
import "./home.css";

const Home = () => {
  const [stickers, setStickers] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    setStickers(stickersData.slice(0, 4));
  }, []);

  return (
    <div className="home-container">
      <h1 className="titulo">Más comprados</h1>
      <div className="stickers-container">
        {stickers.map((sticker) => (
          <div key={sticker.id} className="sticker-card">
            <Link to={`/sticker/${sticker.id}`}>
              <img src={sticker.image} alt={sticker.name} />
              <h3>{sticker.name}</h3>
              <p>${sticker.price}</p>
            </Link>
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
