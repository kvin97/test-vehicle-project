import React, { useState } from "react";
import { Button, Card, Input } from "antd";
import { useDispatch } from "react-redux";
import { addBidding } from "../store/actions";

const { Meta } = Card;

const VehicleCard = ({ className, vehicle, selectVehicle }) => {
  const { name, details } = vehicle;
  const { description, image, manufactureYear, brand, price } = details || {};

  const title = `${brand} ${name} ${manufactureYear}`;
  const minimumBid = price;

  const [bidValue, setBidValue] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setBidValue(inputValue);

    if (!/^\d*$/.test(inputValue)) {
      setErrorMessage("Please enter only positive integers.");
    } else if (inputValue !== "" && parseInt(inputValue) <= minimumBid) {
      setErrorMessage(`Bid should be more than ${minimumBid} LKR.`);
    } else {
      setBidValue(parseInt(inputValue));
      setErrorMessage(null);
    }
  };

  const submitBid = (event) => {
    event.preventDefault();
    dispatch(
      addBidding({
        bidValue,
        title,
        image,
      })
    );
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
        <img alt="vehicle" src={image} onClick={() => selectVehicle(vehicle)} />
      }
    >
      <div onClick={() => selectVehicle(vehicle)}>
        <Meta title={title} description={description} />
      </div>
      <Input
        value={bidValue}
        onChange={handleInputChange}
        style={{ marginTop: "10px" }}
        placeholder="amount"
      />
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <Button disabled={!!errorMessage || !bidValue} onClick={submitBid}>
        Submit
      </Button>
    </Card>
  );
};
export default VehicleCard;
