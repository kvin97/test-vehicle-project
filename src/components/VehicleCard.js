import React, { useState } from "react";
import { Button, Card, Input } from "antd";
import { useDispatch } from "react-redux";
import { addBidding } from "../store/actions";
import defaultVehicleImage from "../styles/images/default-vehicle.jpg";

const { Meta } = Card;

const VehicleCard = ({ className, vehicle, selectVehicle }) => {
  const { name, details } = vehicle;
  const { description, image, manufactureYear, brand, price } = details || {};

  const title = `${brand} ${name} ${manufactureYear}`;
  const minimumBid = price;

  const viewImage = image ? image : defaultVehicleImage;

  const [bidValue, setBidValue] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setBidValue(inputValue);

    if (!/^\d*$/.test(inputValue)) {
      setErrorMessage("Please enter only positive integers.");
      return;
    } else if (inputValue !== "" && parseInt(inputValue) <= minimumBid) {
      setErrorMessage(`Bid should be more than ${minimumBid} LKR.`);
    } else {
      setErrorMessage(null);
    }
  };

  const submitBid = (event) => {
    event.preventDefault();

    if (!isNaN(bidValue) && bidValue !== "") {
      dispatch(
        addBidding({
          bidValue: parseInt(bidValue),
          title,
          image,
        })
      );
    }

    setBidValue(null);
  };

  return (
    <Card
      className={className}
      hoverable
      style={{
        width: 240,
      }}
      cover={
        <div className="vehicle-list-image-container">
          <img
            alt="vehicle"
            className="vehicle-list-image"
            src={viewImage}
            onClick={() => selectVehicle(vehicle)}
          />
        </div>
      }
    >
      <div onClick={() => selectVehicle(vehicle)}>
        <Meta title={title} description={description} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <Input
          value={bidValue}
          onChange={handleInputChange}
          placeholder="amount"
          style={{ marginRight: "0.3rem" }}
        />
        <span>LKR</span>
      </div>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <Button disabled={!!errorMessage || !bidValue} onClick={submitBid}>
        Submit
      </Button>
    </Card>
  );
};
export default VehicleCard;
