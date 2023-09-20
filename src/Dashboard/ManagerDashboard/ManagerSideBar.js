import React,{useState,useEffect} from 'react'
import {
  SidebarTitle,
  SideBarListTitle,
  SideBarLogoContainer,
  SideBarLogo,
  SideBarLogoHead,
  SideBarLogoPara,
  SideBarListContainer,
  SideBarLogodiv,
  SideBarListLogo,
  SideBarList,
} from "../OADashboard/SideBarStyles";
import { Link, useNavigate, useLocation } from "react-router-dom";

const ManagerSideBar = () => {
    const location = useLocation();
     const [orgData, setOrgData] = useState();
     const SideBarData = [
       {
         Title: "Dashboard",
         src: "/svg/Dashboard.svg",
         //  to: "/organization-admin/dashboard",
       },

       {
         Title: "Employee",
         src: "/svg/Employee.svg",
         //  to: "/organization-admin/employee/list",
         active: "employee-details",
       },

       {
         Title: "Leaves",
         src: "/svg/managerleaves.svg",
         to: "/manager-management/leaves",
       },
       {
         Title: "Events",
         src: "/svg/fire.svg",
         //  to: "/organization-admin/leaves",
       },
       {
         Title: "Accounts",
         src: "/svg/person.svg",
         //  to: "/organization-admin/leaves",
       },
       {
         Title: "Helpdesk",
         src: "/svg/alert-circle.svg",
         //  to: "/organization-admin/leaves",
       },
     ];
      const style = {
        textDecoration: "none",
        color: "#279AF1",
    };
     useEffect(() => {
       let org = localStorage.getItem("org");
       if (org) {
         let parsedUser = JSON.parse(org);
         setOrgData(parsedUser);
       }
     }, []);
  return (
    <>
      {" "}
      <SidebarTitle>Wagmatcook</SidebarTitle>
      <hr style={{ width: "100%", color: "#EDEDED" }}></hr>
      <SideBarLogoContainer>
        <SideBarLogo src="/images/User.jpg" />
        <SideBarLogodiv>
          <SideBarLogoHead>{orgData?.name || "Tom Holland"}</SideBarLogoHead>
                  <SideBarLogoPara>Design Manager</SideBarLogoPara>
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
                  location.pathname.indexOf(data.to) > -1
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
}

export default ManagerSideBar