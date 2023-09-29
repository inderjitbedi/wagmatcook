import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  DashHeader,
  DashHeaderSearch,
  DashHeaderTitle,
  DashNotification,
  SearchBox,
  SearchIcon,
  SearchInput,
  DashHeading,
} from "../OADashboard/OADashBoardStyles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  CardBody,
  CardContainer,
  CardHeading,
  CardImg,
  CardList,
  CardSubGrey,
  CardSubHeading,
  FlexColContainer,
  Birthday,
  FlexColumn,
  FlexContainer,
  Heading_24,
  PendingStyle,
  WorkAnniversary,
  CardIcons,
} from "./ManagerStyles";
const ManagerDashBoard = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(false);
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
    navigate("/");
  };
  const array6 = [1, 1, 1, 1, 1, 1];
  const array5 = [1, 2, 1, 2,];

  return (
    <>
      <DashHeader>
        <DashHeaderTitle>Dashboard</DashHeaderTitle>
        <DashHeaderSearch>
          <SearchBox>
            <SearchInput type="text" placeholder="Search..."></SearchInput>
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
            {" "}
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
        </DashHeaderSearch>
      </DashHeader>
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
      <Heading_24> Good Evening</Heading_24>
      <CardContainer>
        <FlexColContainer>
          <CardBody>
            <CardHeading>Leave Request</CardHeading>
            {array6.map((data) => (
              <CardList>
                <FlexContainer>
                  <CardImg src="/images/User.jpg" />
                  <FlexColumn>
                    <CardSubHeading>Dianne Russel</CardSubHeading>
                    <CardSubGrey>georgia.young@example.com</CardSubGrey>
                  </FlexColumn>
                </FlexContainer>
                <PendingStyle>Pending</PendingStyle>
              </CardList>
            ))}
          </CardBody>
          <CardBody>
            <CardHeading>Leave Adjustments</CardHeading>
            <CardList>
              <FlexContainer>
                <CardIcons src="/images/icons/empty-box 1.svg" />
                <CardSubGrey style={{fontSize:"14px"}} > 
                  All good! You've nothing new to track.
                </CardSubGrey>
              </FlexContainer>
            </CardList>
          </CardBody>
        </FlexColContainer>
        <FlexColContainer>
          <CardBody>
            <CardHeading>Upcoming Events</CardHeading>
            {array5.map((data) => (
              <CardList style={{ border: "none", paddingBottom: "8px" }}>
                <FlexColumn style={{ gap: "8px" }}>
                  <CardSubHeading>Dianne Russel</CardSubHeading>
                  <CardSubGrey>Design</CardSubGrey>
                </FlexColumn>
                {data === 1 ? (
                  <WorkAnniversary>Work Anniversary</WorkAnniversary>
                ) : (
                  <Birthday> Birthday</Birthday>
                )}
              </CardList>
            ))}
          </CardBody>
        </FlexColContainer>
        <FlexColContainer>
          <CardBody>
            <CardHeading> Announcements</CardHeading>
            <CardList>
              <FlexColumn style={{ gap: "8px" }}>
                <CardSubHeading>
                  Hurry! Your IT declaration is awaiting. Please submit it
                  before the window gets closed.{" "}
                </CardSubHeading>
                <CardSubGrey>12-05-2023</CardSubGrey>
              </FlexColumn>
            </CardList>
            <CardList>
              <FlexColumn style={{ gap: "8px" }}>
                <CardSubHeading>
                  Hurry! Your IT declaration is awaiting. Please submit it
                  before the window gets closed.{" "}
                </CardSubHeading>
                <CardSubGrey>12-05-2023</CardSubGrey>
              </FlexColumn>
            </CardList>
          </CardBody>
          <CardBody>
            <CardHeading>Credential Expiry</CardHeading>
            <CardList>
              <FlexContainer style={{ alignItems: "flex-start" }}>
                <CardIcons src="/images/icons/Bell Off.svg" />
                <FlexColumn style={{ gap: "8px" }}>
                  <CardSubHeading>
                    Hurry! Your IT declaration is awaiting. Please submit it
                    before the window gets closed.{" "}
                  </CardSubHeading>
                  <CardSubGrey>12-05-2023</CardSubGrey>
                </FlexColumn>
              </FlexContainer>
            </CardList>
          </CardBody>
        </FlexColContainer>
      </CardContainer>
    </>
  );
};

export default ManagerDashBoard;
