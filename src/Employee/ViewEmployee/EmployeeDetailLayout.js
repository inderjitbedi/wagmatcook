import React, { useState } from "react";
import EmployeeSideBar from "./EmployeeSideBar";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import SideBar from "../../Dashboard/OADashboard/SideBar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
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
} from "./ViewEmployeeStyle";
const EmployeeDetailLayout = () => {
  const Navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
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
  return (
    <>
      <DashHeader>
        <FlexContaier>
          <BackButton onClick={() => Navigate(-1)}>
            <IconsEmployee src="/images/icons/ArrowLeft.svg" />
            Back
          </BackButton>
          <DashHeaderTitle>Employee</DashHeaderTitle>
        </FlexContaier>

        <DashHeaderSearch>
          <SearchBox>
            <SearchInput
              type="text"
              placeholder="Search..."
            // value={searchValue}
            // onChange={(e) => HandleSearchCahnge(e)}
            ></SearchInput>
            <SearchIcon src="/images/icons/searchIcon.svg" />
          </SearchBox>
          <DashNotification src="/images/icons/Notifications.svg" />
          <DashNotification
            style={{ cursor: "pointer" }}
            onClick={(event) => handleClickMenu(event)}
            src="/images/icons/PersonIcon.svg"
          />
          <Menu
            sx={{ margin: "0px" }}
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={HandleLogout}>Logout</MenuItem>
          </Menu>
        </DashHeaderSearch>
      </DashHeader>
      <EmployeeBody>
        <BodyHeader>
          <BodyHeading>Employee Details</BodyHeading>
        </BodyHeader>
        <BodyContainer>
          <SideBarContainer>
            <EmployeeSideBar />
          </SideBarContainer>
          <Outlet />
        </BodyContainer>
      </EmployeeBody>
    </>
  );
};

export default EmployeeDetailLayout;
