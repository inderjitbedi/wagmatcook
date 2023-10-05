import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate, useParams } from "react-router-dom";
import HRAccountSidebar from "./HRAccountSidebar";
import CommenDashHeader from "../Dashboard/CommenDashHeader";
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
const HRAccountLayout = () => {
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
  return (
    <div style={{ width: "100%", boxSizing: "border-box" }}>
     
      <CommenDashHeader onSearch={HandleSearchCahnge} text="My Profile" />
      <EmployeeBody>
        {/* <BodyHeader>
          <BodyHeading>Employee Details</BodyHeading>
        </BodyHeader> */}
        <BodyContainer>
          <SideBarContainer style={{ paddingTop: "35px" }}>
            <HRAccountSidebar employeeId={employeeid} />
          </SideBarContainer>
          <div style={{ width: "80%", paddingTop: "35px" }}>
            <Outlet />
          </div>
        </BodyContainer>
      </EmployeeBody>
    </div>
  );
};

export default HRAccountLayout;
