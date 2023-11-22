import React, { useEffect, useState } from "react";
import SASideBar from "./SideBar/SASideBar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import {
  DashHeader,
  DashHeaderSearch,
  DashHeaderTitle,
  SearchBox,
  SearchIcon,
  SearchInput,
  SearchBarWrapper,
  SearchInputMobile,
  SearchButton,
} from "./SAStyles";
import { DepartmentIconImg } from "../Departments/DepartmentsStyles";
import { HiOutlineMenu } from "react-icons/hi";
const SACommonHeader = ({ onSearch, text }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const toggleSearchBar = () => {
    setExpanded(!expanded);
    setSearchValue("");
  };
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
    navigate("/");
  };
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [delayedSearchValue, setDelayedSearchValue] = useState("");

  const ToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
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
  const SidebarWrapper = styled.div`
    display: none;
    @media only screen and (max-width: 1200px) {
      display: block;
      width: 25rem;
      background-color: #ffffff;
      height: 100vh;
      position: fixed;
      top: 0;
      right: 0;
      transition: width 0.3s;
      z-index: 100000;
      overflow-y: scroll;
    }
  `;
  const SidebarContainer = () => {
    return (
      <SidebarWrapper>
        {" "}
        <SASideBar
          ToggleSidebar={ToggleSidebar}
          screenWidth={screenWidth}
        />{" "}
      </SidebarWrapper>
    );
  };
  return (
    <>
      {" "}
      {isSidebarOpen && <SidebarContainer />}
      <DashHeader>
        <DashHeaderTitle>
          {screenWidth < 1200 ? <span>Your Community Portal</span> : text}{" "}
        </DashHeaderTitle>
        <DashHeaderSearch>
          {screenWidth < 600 ? (
            <SearchBarWrapper expanded={expanded}>
              <SearchInputMobile
                type="text"
                placeholder="Search..."
                expanded={expanded}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <SearchButton onClick={toggleSearchBar}>
                {expanded ? (
                  <SearchIcon src="/images/icons/Alert-Circle.svg" />
                ) : (
                  <SearchIcon src="/images/icons/searchIcon.svg" />
                )}
              </SearchButton>
            </SearchBarWrapper>
          ) : (
            <SearchBox>
              <SearchInput
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              ></SearchInput>
              <SearchIcon src="/images/icons/searchIcon.svg" />
            </SearchBox>
          )}
          {/* <DashNotification src="/images/icons/Notifications.svg" /> */}
          {screenWidth < 1200 ? (
            ""
          ) : (
            <DepartmentIconImg
              style={{ cursor: "pointer" }}
              onClick={(event) => handleClickMenu(event)}
              src="/images/icons/PersonIcon.svg"
            />
          )}
          {screenWidth < 1200 && (
            <HiOutlineMenu
              onClick={ToggleSidebar}
              style={{ width: "3rem", height: "3rem", cursor: "pointer" }}
            />
          )}
        </DashHeaderSearch>
      </DashHeader>
      <Menu
        sx={{ margin: "0rem" }}
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
            fontSize: "1.4rem",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "2rem",
          }}
        >
          Settings
        </MenuItem>
        <MenuItem
          onClick={HandleLogout}
          style={{
            color: "#EA4335",
            fontFamily: "Inter",
            fontSize: "1.4rem",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "2rem",
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default SACommonHeader;
