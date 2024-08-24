// src/components/FarmCard.js
import React from "react";
import "./FarmCard.css";

const FarmCard = ({ farm, onClick }) => {
  return (
    <div className="farm-card" onClick={() => onClick(farm)}>
      <img src={`/image/${farm.image}`} alt={farm.name} className="farm-image" />
      <h3>{farm.name}</h3>
    </div>
  );
};

export default FarmCard;
