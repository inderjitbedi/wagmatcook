import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";


const SideBarList = styled.div`
  display: flex;
  flex-direction: column;
  padding:  0px 24px;
  gap: 12px;
`;
const SideBarListContainer = styled.div`
  display: flex;
  gap: 11px;
  align-items: center;
  cursor: pointer;
  &:hover img path {
    fill: #279af1;
  }
  &:hover p {
    color: #279af1;
  }
`;

const SideBarListTitle = styled.p`
  color: #5c5c5c;
  font-size: 14px;
  font-weight: 600;
  line-height: 0px;
  cursor: pointer;
`;
const EmployeeSideBar = (props) => {
     const location = useLocation();
  const SideBarData = [
    {
      Title: "Personal",
      to: "/organization-admin/employee/details/personal-info/"+props.employeeId,
    },
    {
      Title: "Job Details",
      to: "/organization-admin/employee/details/job-details/"+props.employeeId,
    },

    {
      Title: "Benefits",
      to: "/organization-admin/employee/details/benefits/"+props.employeeId,
    },
    {
      Title: "Leave History",
      to: "/organization-admin/employee/details/leave-history/"+props.employeeId,
    },
    {
      Title: "Certificates",
      to: "/organization-admin/employee/details/certificates/"+props.employeeId,
    },
    {
      Title: "Discipline",
      to: "/organization-admin/employee/details/discipline/"+props.employeeId,
    },
    {
      Title: "Performance",
      to: "/organization-admin/employee/details/performance/"+props.employeeId,
    },
    {
      Title: "Documents",
      to: "/organization-admin/employee/details/documents/"+props.employeeId,
    },
  ];
      const style = {
        textDecoration: "none",
        color: "#279AF1",
      };
  return (
    <>
      {" "}
      <SideBarList>
        {SideBarData.map((data) => (
          <Link
            style={{ textDecoration: "none",  }}
            to={data.to}
            key={data.to}
          >
            <SideBarListContainer style={{zIndex:"56"}}>
            
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

export default EmployeeSideBar;
