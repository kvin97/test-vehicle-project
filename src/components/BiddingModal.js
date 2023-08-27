import { Card, Modal } from "antd";

const BiddingModal = ({ visible, onClose, biddings = [] }) => {
  const total = biddings.reduce(
    (accumulator, bidding) => accumulator + bidding.bidValue,
    0
  );

  return (
    <Modal
      title="Card Modal"
      visible={visible}
      onCancel={onClose}
      footer={null}
      bodyStyle={{ overflowY: "auto", maxHeight: "70vh", paddingRight: "20px" }}
    >
      {biddings.map((bidding) => {
        const { bidValue, title, image } = bidding;

        return (
          <Card className="bidding-card" bordered key={title}>
            <div className="bidding-card-image">
              <img src={image} alt={title} />
            </div>
            <div className="bidding-card-content">
              <h3>{title}</h3>
              <p>Bid Value: {bidValue} LKR</p>
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
