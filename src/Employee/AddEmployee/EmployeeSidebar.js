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
} from "./AddEmployeeStyles";
import { Link, useNavigate, useLocation } from "react-router-dom";

const EmployeeSidebar = () => {
  const location = useLocation();

  const SideBarData = [
    {
      Title: "Dashboard",
      src: "/svg/Dashboard.svg",
      
    },

    {
      Title: "Employee",
      src: "/svg/Employee.svg",
    },

    {
      Title: "Leave",
      src: "/images/icons/EmployeeLeave.svg",
    },

      {
      Title: "Events",
      src: "/images/icons/EmployeeEvents.svg",
    },
    {
      Title: "Accounts",
      src: "/svg/person.svg",
    },
    {
      Title: "Report",
      src: "/images/icons/EmployeeReport.svg",
    },
  ];
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
            <SideBarLogoHead>Tom Holland</SideBarLogoHead>
            <SideBarLogoPara>Design Manager </SideBarLogoPara>
          </SideBarLogodiv>
        </SideBarLogoContainer>
        <hr style={{ width: "80%", color: "#EDEDED", margin: "auto" }}></hr>
        <SideBarList>
          {SideBarData.map((data) => (
            <Link style={{ textDecoration: "none" }} to={data.to} key={data.to}>
              <SideBarListContainer>
                <SideBarListLogo src={data.src}>
                  {/* <use xlinkHref="/svg/Dashboard.svg" /> */}
                </SideBarListLogo>
                <SideBarListTitle
                  style={
                    location.pathname === data.to ? style : { color: "#5C5C5C" }
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

export default EmployeeSidebar;
