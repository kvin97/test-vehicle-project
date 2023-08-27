import React from "react";
import VehicleCard from "./VehicleCard";

const VehicleCardList = ({ vehicles, selectVehicle }) => (
  <div className="card-container">
    {vehicles.map((vehicle) => (
      <VehicleCard
        className="card"
        vehicle={vehicle}
        selectVehicle={selectVehicle}
      />
    ))}
  </div>
);

export default VehicleCardList;
