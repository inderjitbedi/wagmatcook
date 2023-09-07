import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import {
  SidebarTitle,
  SideBarListContainer,
  SideBarListLogo,
  SideBarListTitle,
  SideBarList,
} from "../SAStyles";

const SASideBar = () => {
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
      <span style={{ width: "100%", borderBottom: "1px solid #EDEDED", display:"inline-block"}}></span>

      <SidebarTitle>Super Admin</SidebarTitle>
      <span style={{ width: "80%", borderBottom: "1px solid #EDEDED", display:"inline-block",  margin: "0 28px" }}></span>
      <SideBarList>
        {SideBarData.map((data) => (
          <NavLink style={{textDecoration:"none"}} to={data.to}>
            <SideBarListContainer>
              <SideBarListLogo src={data.src}>
              </SideBarListLogo>
              <SideBarListTitle> {data.Title}</SideBarListTitle>
            </SideBarListContainer>
          </NavLink>
        ))}
      </SideBarList>
    </>
  );
};

export default SASideBar;
