// src/components/FarmDetails.js
import React from "react";
import { useParams } from "react-router-dom";
import { farms } from "../data/farm";

const FarmDetails = () => {
  const { name } = useParams();
  const farm = farms.find(f => f.name === name);

  if (!farm) return <div>Farm not found</div>;

  return (
    <div>
      <h2>{farm.name}</h2>
      <img src={`/image/${farm.image}`} alt={farm.name} />
      <p>Details about {farm.name}</p>

    </div>
  );
};

export default FarmDetails;
