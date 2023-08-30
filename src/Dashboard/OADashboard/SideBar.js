import React from 'react';
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

const SideBar = () => {
    const SideBarData = [
      {
        Title: "Dashboard",
        src: "/svg/Dashboard.svg",
      },
      {
        Title: "Departments",
        src: "/svg/Departments.svg",
      },
     

      {
        Title: "Employee",
        src: "/svg/Employee.svg",
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
      },
      {
        Title: "Disciplinary",
        src: "/svg/Disciplinary.svg",
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
  return (
    <>
      {" "}
      <SidebarTitle>Wagmatcook</SidebarTitle>
      <hr style={{ width: "100%", color: "#EDEDED" }}></hr>
      <SideBarLogoContainer>
        <SideBarLogo src="/icons/Group 13.png" />
        <SideBarLogodiv>
          <SideBarLogoPara>Organization </SideBarLogoPara>
          <SideBarLogoHead>Figma Inc.</SideBarLogoHead>
        </SideBarLogodiv>
      </SideBarLogoContainer>
      <hr style={{ width: "80%", color: "#EDEDED", margin: "auto" }}></hr>
      <SideBarList>
        {SideBarData.map((data) => (
          <SideBarListContainer>
            <SideBarListLogo src={data.src}>
              {/* <use xlinkHref="/svg/Dashboard.svg" /> */}
            </SideBarListLogo>
            <SideBarListTitle> {data.Title}</SideBarListTitle>
          </SideBarListContainer>
        ))}
      </SideBarList>
    </>
  );
}

export default SideBar