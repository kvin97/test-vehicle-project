import { Card, Modal } from "antd";
import defaultVehicleImage from "../styles/images/default-vehicle.jpg";

const BiddingModal = ({ visible, onClose, biddings = [] }) => {
  const total = biddings.reduce(
    (accumulator, bidding) => accumulator + bidding.bidValue,
    0
  );

  return (
    <Modal
      title="Biddings"
      visible={visible}
      onCancel={onClose}
      footer={null}
      bodyStyle={{ overflowY: "auto", maxHeight: "70vh", paddingRight: "20px" }}
    >
      {biddings.map((bidding) => {
        const { bidValue, title, image } = bidding;
        const viewImage = image ? image : defaultVehicleImage;

        return (
          <Card className="bidding-card" bordered key={title}>
            <div className="bidding-card-image">
              <img src={viewImage} alt={title} />
            </div>
            <div className="bidding-card-content">
              <h3>{title}</h3>
              <p>{bidValue} LKR</p>
            </div>
          </Card>
        );
      })}
      <div>
        <span style={{ fontWeight: "bold" }}>{`Total: `}</span>
        {total}
      </div>
    </Modal>
  );
};

export default BiddingModal;
