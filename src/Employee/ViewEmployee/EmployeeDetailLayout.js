import React, { useState, useEffect } from "react";
import EmployeeSideBar from "./EmployeeSideBar";
import { useNavigate, useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CommenDashHeader from "../../Dashboard/CommenDashHeader";
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
          <BodyHeading>Employee Details</BodyHeading>
          {screenWidth < 600 ? (
            <SideBarContainer>
              <EmployeeSideBar
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
              <EmployeeSideBar employeeId={employeeid} />
            </SideBarContainer>
          )}

          <div style={screenWidth < 600 ? { width: "100%" } : { width: "80%" }}>
            <Outlet />
          </div>
        </BodyContainer>
      </EmployeeBody>
    </div>
  );
};

export default EmployeeDetailLayout;
