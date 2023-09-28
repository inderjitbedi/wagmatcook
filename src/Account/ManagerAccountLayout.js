import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate, useParams } from "react-router-dom";
import ManagerAccountSidebar from "./ManagerAccountSidebar";
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
  return (
    <div style={{ width: "100%", boxSizing: "border-box" }}>
      <DashHeader>
        <FlexContaier>
          {/* <BackButton onClick={() => Navigate(-1)}>
            <IconsEmployee src="/images/icons/ArrowLeft.svg" />
            Back
          </BackButton> */}
          <DashHeaderTitle>My Profile</DashHeaderTitle>
        </FlexContaier>

        <DashHeaderSearch>
          {/* <SearchBox>
            <SearchInput
              type="text"
              placeholder="Search..."
              // value={searchValue}
              // onChange={(e) => HandleSearchCahnge(e)}
            ></SearchInput>
            <SearchIcon src="/images/icons/searchIcon.svg" />
          </SearchBox> */}
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
            <MenuItem
              style={{
                color: "#222B45",
                fontFamily: "Inter",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "20px",
              }}
            >
              Settings
            </MenuItem>
            <MenuItem
              onClick={HandleLogout}
              style={{
                color: "#EA4335",
                fontFamily: "Inter",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "20px",
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </DashHeaderSearch>
      </DashHeader>
      <EmployeeBody>
        {/* <BodyHeader>
          <BodyHeading>Employee Details</BodyHeading>
        </BodyHeader> */}
        <BodyContainer>
          <SideBarContainer style={{ paddingTop: "35px" }}>
            <ManagerAccountSidebar employeeId={employeeid} />
          </SideBarContainer>
          <div style={{ width: "80%", paddingTop: "35px" }}>
            <Outlet />
          </div>
        </BodyContainer>
      </EmployeeBody>
    </div>
  );
};

export default ManagerAccountLayout;
