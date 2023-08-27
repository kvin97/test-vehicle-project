import { useQuery } from "react-query";
import fetchVehicles from "../Utils/queryUtils";
import { Button, Pagination, Spin } from "antd";
import VehicleCardList from "../components/VehicleCardList";
import DropDownSelection from "../components/DropDownSelection";
import { useState } from "react";
import VehiclePage from "./VehiclePage";
import VEHICLE_LOAD_PAGE_SIZE from "../constants/systemConstants";
import BiddingModal from "../components/BiddingModal";
import { useSelector } from "react-redux";

const VehiclesPage = () => {
  const [selectedPage, setSelectedPage] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { data: vehicles, isFetching: isVehiclesFetching } = useQuery(
    ["vehicles", selectedPage, VEHICLE_LOAD_PAGE_SIZE, selectedBrand],
    fetchVehicles
  );

  // get biddings from redux store
  const biddings = useSelector((state) => state.biddings);

  const vehiclesData = vehicles ? vehicles.data : [];

  const selectBrand = ({ key }) => {
    setSelectedBrand(key);
    setSelectedPage(1);
  };

  const selectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const changePage = (page) => {
    setSelectedPage(page);
  };

  const showBiddings = () => {
    setModalVisible((visible) => !visible);
  };

  return (
    <Spin spinning={isVehiclesFetching}>
      <>
        {selectedVehicle ? (
          <VehiclePage
            vehicle={selectedVehicle}
            selectVehicle={selectVehicle}
          />
        ) : (
          <div style={{ margin: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <DropDownSelection
                dropDownTitle="Select Brand"
                selected={selectedBrand}
                handleClick={selectBrand}
              />
              <Button onClick={showBiddings}>Bids</Button>
            </div>

            <VehicleCardList
              vehicles={vehiclesData}
              selectVehicle={selectVehicle}
            />
            <Pagination
              defaultCurrent={1}
              current={selectedPage}
              total={36}
              pageSize={VEHICLE_LOAD_PAGE_SIZE}
              onChange={changePage}
            />
          </div>
        )}
        <BiddingModal
          visible={modalVisible}
          onClose={showBiddings}
          biddings={biddings}
        />
      </>
    </Spin>
  );
};

export default VehiclesPage;
