import React, { useEffect, useState, useContext } from "react";
import stickersData from "./stickers.json";
import { CartContext } from "../context/CartContext"; // Asegúrate de importar CartContext

const Home = () => {
  const [stickers, setStickers] = useState([]);
  const { addToCart } = useContext(CartContext); // Usar el contexto del carrito

  useEffect(() => {
    setStickers(stickersData);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 text-center">StickerAtick</h2>
      <div className="flex overflow-x-auto space-x-4 py-4 max-w-5xl">
        {stickers.map((sticker) => (
          <div
            key={sticker.id}
            className="flex-shrink-0 border p-4 hover:shadow-lg transition-shadow duration-200 w-56 h-72 sticker-card"
          >
            <img
              src={sticker.image}
              alt={sticker.name}
              className="w-full h-40 object-cover mb-4"
            />
            <h3 className="text-lg font-bold text-center">{sticker.name}</h3>
            <p className="text-gray-700 text-center">${sticker.price}</p>
            <button
              onClick={() => addToCart(sticker)}
              className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
