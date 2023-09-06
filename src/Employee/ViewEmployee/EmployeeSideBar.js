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
const EmployeeSideBar = () => {
     const location = useLocation();
  const SideBarData = [
    {
      Title: "Personal",
      to: "/EmployeePersonal",
    },
    {
      Title: "Job Details",

      to: "/EmployeeJobDetails",
    },

    {
      Title: "Benefits",
      to: "/EVBenefits",
    },
    {
      Title: "Leave History",
      to: "/EVLeaveHistory",
    },
    {
      Title: "Certificates",
      to: "/EVCertificates",
    },
    {
      Title: "Discipline",
      to: "/EVDiscipline",
    },
    {
      Title: "Performance",
      to: "/EVPerformance",
    },
    {
      Title: "Documents",
      to: "/EVDocuments",
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
