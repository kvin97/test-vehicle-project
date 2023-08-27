import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Menu } from "antd";
import brands from "../constants/brands";

const items = brands.map((brand) => <Menu.Item key={brand}>{brand}</Menu.Item>);

const DropDownSelection = ({ selected, dropDownTitle, handleClick }) => {
  const menu = <Menu onClick={handleClick}>{items}</Menu>;

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <a
        className="ant-dropdown-link"
        onClick={(e) => e.preventDefault()}
        style={{ color: "#d46b08", fontWeight: "bold" }}
      >
        {selected ? selected : dropDownTitle}
        <DownOutlined />
      </a>
    </Dropdown>
  );
};
export default DropDownSelection;
