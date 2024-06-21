import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PayRollEmployeeSideBar from "./PayRollEmployeeSideBar";
import CommenDashHeader from "../../Dashboard/CommenDashHeader";
// import CommenHeader from "./CommenHeader";
import CommenHeader from "../ViewEmployee/CommenHeader";
import styled, { keyframes } from "styled-components";

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
} from "../ViewEmployee/ViewEmployeeStyle";

const BackArrowButton = styled.div`
  padding: 5px 4px 5px 6px;
  border-radius: 88px;
  border: 1px solid #8f9bb3;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BackButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  margin-bottom: 1.5rem;
`;
const PayRollEmployeeLayout = () => {
  const Navigate = useNavigate();
  const location = useLocation();

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
      <CommenDashHeader onSearch={HandleSearchCahnge} text="Employee Details" />

      <EmployeeBody>
        <BodyHeader>
          <BackButtonContainer>
            {screenWidth < 600 && (
              <BackArrowButton onClick={() => Navigate(-1)}>
                <IconsEmployee src="/images/icons/ArrowLeft.svg" />
              </BackArrowButton>
            )}
            <BodyHeading>Employee Details</BodyHeading>
          </BackButtonContainer>
          {screenWidth < 600 ? (
            <SideBarContainer>
              <PayRollEmployeeSideBar
                employeeId={employeeid}
                screenWidth={screenWidth}
              />
            </SideBarContainer>
          ) : (
            ""
          )}
        </BodyHeader>
        <BodyContainer>
          {screenWidth < 600 ? (
            ""
          ) : (
            <SideBarContainer>
              <PayRollEmployeeSideBar employeeId={employeeid} />
            </SideBarContainer>
          )}
          <div style={screenWidth < 600 ? { width: "100%" } : { width: "80%" }}>
            {location.pathname.includes("/personal-info") ? (
              " "
            ) : (
              <CommenHeader employeeid={employeeid} />
            )}
            <Outlet />
          </div>
        </BodyContainer>
      </EmployeeBody>
    </div>
  );
};

export default PayRollEmployeeLayout;
