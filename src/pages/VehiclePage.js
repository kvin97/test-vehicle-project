import { Button, Card, Col, Row } from "antd";
import defaultVehicleImage from "../styles/images/default-vehicle.jpg";

const VehiclePage = ({ vehicle, selectVehicle }) => {
  const { name, details } = vehicle;
  const { description, image, manufactureYear, brand, color } = details || {};

  const title = `${brand} ${name} ${manufactureYear}`;
  const viewImage = image ? image : defaultVehicleImage;

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
        </div>
      </Card>
    </>
  );
};

export default VehiclePage;
