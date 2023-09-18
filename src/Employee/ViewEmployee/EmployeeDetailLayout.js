import React, { useState } from "react";
import EmployeeSideBar from "./EmployeeSideBar";
import { useNavigate, useParams } from "react-router-dom";
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
  MainBodyContainer,
} from "./ViewEmployeeStyle";
const EmployeeDetailLayout = () => {
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              gap: "5px",
            }}
            onClick={(event) => handleClickMenu(event)}
          >
            <DashNotification src="/images/icons/Logout.svg" />
            <img
              src="/images/icons/arrowdown.svg"
              style={{
                width: "5px",
                height: "9px",
                transform: anchorEl ? "rotate(180deg)" : undefined,
              }}
            />
          </div>
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
            <EmployeeSideBar employeeId={employeeid} />
          </SideBarContainer>
          <div style={{ width: "80%" }}>
            <Outlet />
          </div>
        </BodyContainer>
      </EmployeeBody>
    </>
  );
};

export default EmployeeDetailLayout;
