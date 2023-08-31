import React from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  SidebarTitle,
  SideBarListContainer,
  SideBarListLogo,
  SideBarListTitle,
  SideBarList,
} from "./SAStyles.js";

const SASideBar = () => {
  const SideBarData = [
    {
      Title: "User",
      src: "/svg/person.svg",
      to: "/SAUserList",
    },
    {
      Title: "Organization",
      src: "/svg/Departments.svg",
      to: "/SAOrganization",
    },
  ];
  return (
    <>
      {" "}
      <SidebarTitle>Wagmatcook</SidebarTitle>
      <hr style={{ width: "100%", color: "#EDEDED" }}></hr>
      <SidebarTitle>Super Admin</SidebarTitle>
      <hr style={{ width: "80%", color: "#EDEDED", margin: "auto" }}></hr>
      <SideBarList>
        {SideBarData.map((data) => (
          <Link style={{textDecoration:"none"}} to={data.to}>
            <SideBarListContainer>
              <SideBarListLogo src={data.src}>
                {/* <use xlinkHref="/svg/Dashboard.svg" /> */}
              </SideBarListLogo>
              <SideBarListTitle> {data.Title}</SideBarListTitle>
            </SideBarListContainer>
          </Link>
        ))}
      </SideBarList>
    </>
  );
};

export default SASideBar;
