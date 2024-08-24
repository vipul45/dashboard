import React, { useState } from "react";
import FarmCard from "./FarmCard/";
import Modal from "./Modal/";
import { farms } from "../data/data"; // Adjusted path based on your structure

const FarmList = () => {
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (farm) => {
    setSelectedFarm(farm);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFarm(null);
  };

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {farms.map((farm, index) => (
          <FarmCard key={index} farm={farm} onClick={handleCardClick} />
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} farm={selectedFarm} />
    </div>
  );
};

export default FarmList;
