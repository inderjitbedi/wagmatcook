import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate, useParams } from "react-router-dom";
import ManagerAccountSidebar from "./ManagerAccountSidebar";
import CommenDashHeader from "../Dashboard/CommenDashHeader";
import styled from "styled-components";
import CommenHeader from "../Employee/ViewEmployee/CommenHeader";

import {
  Dashboard,
  DashNav,
  DashMain,
  DashHeader,
  DashHeaderSearch,
  DashHeaderTitle,
  DashNotification,
  SearchBox,
  SearchIcon,
  SearchInput,
  FlexContaier,
  BackButton,
  IconsEmployee,
  EmployeeBody,
  BodyHeader,
  BodyHeading,
  BodyContainer,
  SideBarContainer,
  MainBodyContainer,
} from "../Employee/ViewEmployee/ViewEmployeeStyle";

const BackArrowButton = styled.div`
  padding: 5px 4px 5px 6px;
  border-radius: 50%;
  border: 1px solid #8f9bb3;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  margin: 10px 10px;
`;

const ManagerAccountLayout = () => {
  const Navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const { employeeid } = useParams();
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const HandleLogout = () => {
    localStorage.clear();
    handleCloseMenu();
    Navigate("/");
  };
  const [searchValue, setSearchValue] = useState("");

  const HandleSearchCahnge = (data) => {
    setSearchValue(data);
  };
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div style={{ width: "100%", boxSizing: "border-box" }}>
      <CommenDashHeader onSearch={HandleSearchCahnge} text="My Profile" />

      <EmployeeBody>
        {screenWidth < 600 && (
          <BackArrowButton onClick={() => Navigate(-1)}>
            <IconsEmployee src="/images/icons/ArrowLeft.svg" />
          </BackArrowButton>
        )}
        {screenWidth < 600 ? (
          <SideBarContainer>
            <ManagerAccountSidebar
              employeeId={employeeid}
              screenWidth={screenWidth}
            />
          </SideBarContainer>
        ) : (
          ""
        )}
        <BodyContainer>
          {screenWidth < 600 ? (
            ""
          ) : (
            <SideBarContainer style={{ paddingTop: "3.5rem" }}>
              <ManagerAccountSidebar employeeId={employeeid} />
            </SideBarContainer>
          )}
          <div
            style={
              screenWidth < 600
                ? { width: "100%", paddingTop: "3.5rem" }
                : { width: "80%", paddingTop: "3.5rem" }
            }
          >
            <CommenHeader employeeid={employeeid} />
            <Outlet />
          </div>
        </BodyContainer>
      </EmployeeBody>
    </div>
  );
};

export default ManagerAccountLayout;
