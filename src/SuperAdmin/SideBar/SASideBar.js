import React from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

import {
  SidebarTitle,
  SideBarListContainer,
  SideBarListLogo,
  SideBarListTitle,
  SideBarList,
} from "../SAStyles";
 const style = {
   textDecoration: "none",
   color: "#279AF1",
 };
const SASideBar = () => {
  const location = useLocation();

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
    <>
      {" "}
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
          margin: "0 28px",
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
      </SideBarList>
    </>
  );
};

export default SASideBar;
