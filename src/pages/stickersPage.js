import React, { useState, useEffect } from "react";
import stickersData from "./stickers.json";
import { useParams } from "react-router-dom";

const StickersPage = () => {
  const { type } = useParams();
  const [filteredStickers, setFilteredStickers] = useState([]);

  useEffect(() => {
    const filtered = stickersData.filter(sticker => sticker.type === type);
    setFilteredStickers(filtered);
  }, [type]);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">{type} Stickers</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredStickers.map(sticker => (
          <div key={sticker.id} className="border p-4 rounded shadow">
            <img src={sticker.image} alt={sticker.name} className="w-full h-40 object-cover mb-4"/>
            <h2 className="text-lg font-bold">{sticker.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StickersPage;
