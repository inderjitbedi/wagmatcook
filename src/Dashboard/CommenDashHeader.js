import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import SettingsModal from "../Modals/SettingsModal";

import {
  DashHeader,
  DashHeaderTitle,
  DashHeaderSearch,
  SearchBox,
  SearchInput,
  SearchIcon,
  DashNotification,
  NotificationsContainer,
  NotificationsHeader,
  FlexNotificationContainer,
  NotificationHeading,
  NotificationIcon,
  NotificationList,
  NotificationUserImg,
  NotificationListText,
  NotificationListTextLight,
  NotificationFlexCol,
  NotificationSelect,
  NotificationOption,
} from "./OADashboard/OADashBoardStyles";

const CommenDashHeader = ({ onSearch,text }) => {
  const Navigate = useNavigate();
  const [openSettings, setOpenSettings] = React.useState(false);
  const HandleOpenSettings = () => setOpenSettings(true);
  const HandleCloseSettings = () => setOpenSettings(false);

  const [anchorElNotification, setAnchorElNotification] = useState(null);
  const openMenuNotification = Boolean(anchorElNotification);
  const handleClickMenuNotification = (event) => {
    setAnchorElNotification(event.currentTarget);
    console.log("working menu for notification");
  };
  const handleCloseMenuNotification = () => {
    setAnchorElNotification(null);
  };

  const [searchValue, setSearchValue] = useState("");
  const [delayedSearchValue, setDelayedSearchValue] = useState("");
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
    Navigate("/");
  };
  const HandleChange = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    onSearch(newValue);
  };
  useEffect(() => {
    onSearch(delayedSearchValue);
  }, [delayedSearchValue, onSearch]);
  useEffect(() => {
    const delayDuration = 1500; 

    const searchTimer = setTimeout(() => {
      setDelayedSearchValue(searchValue);
    }, delayDuration);

    return () => clearTimeout(searchTimer); 
  }, [searchValue]);
  return (
    <>
      <DashHeader>
        <DashHeaderTitle> {text} </DashHeaderTitle>
        <DashHeaderSearch>
          <SearchBox>
            <SearchInput
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            ></SearchInput>
            <SearchIcon src="/images/icons/searchIcon.svg" />
          </SearchBox>
          <Badge badgeContent={8} color="primary" size="small">
            <div
              style={{ cursor: "pointer" }}
              onClick={handleClickMenuNotification}
            >
              <DashNotification src="/images/icons/Notifications.svg" />
            </div>
          </Badge>

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
          onClick={HandleOpenSettings}
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
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorElNotification}
        open={openMenuNotification}
        onClose={handleCloseMenuNotification}
      >
        <NotificationsContainer>
          <NotificationsHeader>
            <FlexNotificationContainer>
              <NotificationHeading>Notifications</NotificationHeading>
              <NotificationSelect>
                <NotificationOption>All</NotificationOption>
                <NotificationOption>Last Week</NotificationOption>
                <NotificationOption>Last Month</NotificationOption>
                <NotificationOption>Last 24 Hrs</NotificationOption>
              </NotificationSelect>
            </FlexNotificationContainer>
            <FlexNotificationContainer>
              <NotificationHeading>Mark all as read</NotificationHeading>
              <NotificationIcon src="/svg/outline.svg" />
            </FlexNotificationContainer>
          </NotificationsHeader>
          <NotificationList>
            <NotificationUserImg src="/images/User.jpg" />
            <NotificationFlexCol>
              <NotificationListText>
                Ray Arnold request a Lieu Time, 26 Sep,2023
              </NotificationListText>
              <NotificationListTextLight>
                Yesterday at 11:42 PM
              </NotificationListTextLight>
            </NotificationFlexCol>
          </NotificationList>
          <NotificationList>
            <NotificationUserImg src="/images/User.jpg" />
            <NotificationFlexCol>
              <NotificationListText>
                Ray Arnold request a Lieu Time, 26 Sep,2023
              </NotificationListText>
              <NotificationListTextLight>
                Yesterday at 11:42 PM
              </NotificationListTextLight>
            </NotificationFlexCol>
          </NotificationList>
          <NotificationList>
            <NotificationUserImg src="/images/User.jpg" />
            <NotificationFlexCol>
              <NotificationListText>
                Ray Arnold request a Lieu Time, 26 Sep,2023
              </NotificationListText>
              <NotificationListTextLight>
                Yesterday at 11:42 PM
              </NotificationListTextLight>
            </NotificationFlexCol>
          </NotificationList>
        </NotificationsContainer>
      </Menu>
      <SettingsModal
        openSettings={openSettings}
        HandleCloseSettings={HandleCloseSettings}
      />
    </>
  );
};

export default CommenDashHeader;
