import { useState } from "react";
import { Button, Card, Col, Input, Row } from "antd";
import defaultVehicleImage from "../styles/images/default-vehicle.jpg";
import { useDispatch } from "react-redux";
import { addBidding } from "../store/actions";

const VehiclePage = ({ vehicle, selectVehicle }) => {
  const [bidValue, setBidValue] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const { name, details } = vehicle;
  const { description, image, manufactureYear, brand, color, price } =
    details || {};

  const title = `${brand} ${name} ${manufactureYear}`;
  const minimumBid = price;

  const viewImage = image ? image : defaultVehicleImage;

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
    <>
      <Button onClick={() => selectVehicle(null)}>Back</Button>
      <Card className="custom-card" bordered={true}>
        <div className="custom-card-image">
          <img src={viewImage} alt="vehicle" />
        </div>
        <div className="custom-card-content">
          <h3>{title}</h3>
          <h4>Description</h4>
          <p>{description}</p>
          <h4>Color</h4>
          <div className="color-dot" style={{ backgroundColor: color }}></div>
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
        </div>
      </Card>
    </>
  );
};

export default VehiclePage;
