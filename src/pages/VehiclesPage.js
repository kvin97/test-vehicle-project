import { useEffect } from "react";
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
  const [totalItems, setTotalItems] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { data: vehicles, isFetching: isVehiclesFetching } = useQuery(
    ["vehicles", selectedPage, VEHICLE_LOAD_PAGE_SIZE, selectedBrand],
    fetchVehicles
  );

  // set total count of returned vehicles --- this is essential for initial rendering of items to set total
  useEffect(() => {
    if (selectedPage === 1 && vehicles?.data) {
      setTotalItems(vehicles.data?.length);
    }
  }, [selectedPage, vehicles?.data]);

  // get biddings from redux store
  const biddings = useSelector((state) => state.biddings);

  /*
    slice the initial load since it deliver all the items in order to find the total count
  */
  const vehiclesData = vehicles
    ? vehicles.data?.slice(0, VEHICLE_LOAD_PAGE_SIZE)
    : [];

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
              total={totalItems}
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
