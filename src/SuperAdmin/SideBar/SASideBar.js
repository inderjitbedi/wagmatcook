import React from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

import {
  SidebarTitle,
  SideBarListContainer,
  SideBarListLogo,
  SideBarListTitle,
  SideBarList,
  IconDelete,
} from "../SAStyles";
const style = {
  textDecoration: "none",
  color: "#279AF1",
};
const SASideBar = ({ screenWidth, ToggleSidebar }) => {
  const location = useLocation();
  const Navigate = useNavigate();

  const HandleLogout = () => {
    localStorage.clear();

    Navigate("/");
  };
  const SideBarData = [
    // {
    //   Title: "User",
    //   src: "/svg/person.svg",
    //   to: "/SAUserList",
    // },
    {
      Title: "Organization",
      src: "/svg/Departments.svg",
      to: "/super-admin/organizations",
    },
  ];
  return (
    <div style={{ position: "relative" }}>
      {" "}
      {screenWidth < 1200 && (
        <IconDelete
          onClick={ToggleSidebar}
          src="/images/icons/Alert-Circle.svg"
        />
      )}{" "}
      <SidebarTitle>Wagmatcook</SidebarTitle>
      <span
        style={{
          width: "100%",
          borderBottom: "1px solid #EDEDED",
          display: "inline-block",
        }}
      ></span>
      <SidebarTitle>Super Admin</SidebarTitle>
      <span
        style={{
          width: "80%",
          borderBottom: "1px solid #EDEDED",
          display: "inline-block",
          margin: "0 2.8rem",
        }}
      ></span>
      <SideBarList>
        {SideBarData.map((data) => (
          <NavLink style={{ textDecoration: "none" }} to={data.to}>
            <SideBarListContainer>
              <SideBarListLogo src={data.src}></SideBarListLogo>
              <SideBarListTitle
                style={
                  location.pathname.indexOf(data.to) > -1
                    ? style
                    : { color: "#5C5C5C" }
                }
              >
                {" "}
                {data.Title}
              </SideBarListTitle>
            </SideBarListContainer>
          </NavLink>
        ))}
        {screenWidth < 1200 && (
          <SideBarListContainer
            style={{ zIndex: "1", marginTop: "-1rem" }}
            onClick={HandleLogout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="18"
              viewBox="0 0 31 32"
              fill="none"
            >
              <path
                d="M15.5 26.5208C9.79306 26.5208 5.16667 21.8944 5.16667 16.1875C5.16667 10.4805 9.79306 5.85413 15.5 5.85413"
                stroke="#5C5C5C"
                stroke-width="2.5"
                stroke-linecap="round"
              />
              <path
                d="M12.9173 16.1875H25.834M25.834 16.1875L21.959 12.3125M25.834 16.1875L21.959 20.0625"
                stroke="#5C5C5C"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <SideBarListTitle> Logout</SideBarListTitle>
          </SideBarListContainer>
        )}
      </SideBarList>
    </div>
  );
};

export default SASideBar;
