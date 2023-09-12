import React from "react";
import {
  SidebarTitle,
  SideBarLogoContainer,
  SideBarLogo,
  SideBarLogoHead,
  SideBarLogoPara,
  SideBarListContainer,
  SideBarLogodiv,
  SideBarListLogo,
  SideBarListTitle,
  SideBarList,
} from "./SideBarStyles";
import { Link, useNavigate, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();

  const SideBarData = [
    {
      Title: "Dashboard",
      src: "/svg/Dashboard.svg",
      to: "/organization-admin/dashboard",
    },
    {
      Title: "Departments",
      src: "/svg/Departments.svg",
      to: "/organization-admin/departments",
    },

    {
      Title: "Employee",
      src: "/svg/Employee.svg",
      to: "/organization-admin/employee/list",
      active: "employee-details",
    },
    {
      Title: "Activities",
      src: "/svg/flash.svg",
    },
    {
      Title: "Leave",
      src: "/svg/Leaves.svg",
    },
    {
      Title: "Benefits",
      src: "/svg/Benefits.svg",
      to: "/organization-admin/benefits",
    },
    {
      Title: "Disciplinary",
      src: "/svg/Disciplinary.svg",
      to: "/organization-admin/disciplinary",
    },
    {
      Title: "Account",
      src: "/svg/person.svg",
    },
    {
      Title: "Report",
      src: "/svg/Reports.svg",
    },
  ];
  console.log(location.pathname);
  const style = {
    textDecoration: "none",
    color: "#279AF1",
  };
  return (
    <>
      {" "}
      <SidebarTitle>Wagmatcook</SidebarTitle>
      <hr style={{ width: "100%", color: "#EDEDED" }}></hr>
      <SideBarLogoContainer>
        <SideBarLogo src="/images/icons/Group-Logo.svg" />
        <SideBarLogodiv>
          <SideBarLogoPara>Organization </SideBarLogoPara>
          <SideBarLogoHead>Figma Inc.</SideBarLogoHead>
        </SideBarLogodiv>
      </SideBarLogoContainer>
      <hr style={{ width: "80%", color: "#EDEDED", margin: "auto" }}></hr>
      <SideBarList>
        {SideBarData.map((data) => (
          <Link style={{ textDecoration: "none" }} to={data.to} key={data.to}>
            <SideBarListContainer style={{ zIndex: "1" }}>
              <SideBarListLogo src={data.src}>
                {/* <use xlinkHref="/svg/Dashboard.svg" /> */}
              </SideBarListLogo>
              <SideBarListTitle
                style={
                  location.pathname === data.to 
                    ? style
                    : { color: "#5C5C5C" }
                }
              >
                {" "}
                {data.Title}
              </SideBarListTitle>
            </SideBarListContainer>
          </Link>
        ))}
      </SideBarList>
    </>
  );
};

export default SideBar;
