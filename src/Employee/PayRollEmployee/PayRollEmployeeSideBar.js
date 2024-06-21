import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const SideBarList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0rem 2.4rem;
  gap: 1.8rem;
  @media only screen and (max-width: 600px) {
    flex-direction: row;
    box-sizing: border-box;
    width: 100%;
    padding: 0 0 1.8rem 0;

    overflow: hidden;
    overflow-x: scroll;
  }
`;
const SideBarListContainer = styled.div`
  display: flex;
  gap: 1.1rem;
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
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.6rem;
  cursor: pointer;
  margin: 0rem;
  @media only screen and (max-width: 600px) {
    width: max-content;
    /* text-decoration-line: underline; */
  }
`;

const PayRollEmployeeSideBar = (props) => {
  const location = useLocation();
  const SideBarData = [
    {
      Title: "Personal",
      to:
        "/payroll-management/employee-details/personal-info/" +
        props.employeeId,
    },
    {
      Title: "Job Details",
      to:
        "/payroll-management/employee-details/job-details/" + props.employeeId,
    },

    {
      Title: "Benefit",
      to: "/payroll-management/employee-details/benefits/" + props.employeeId,
    },
    {
      Title: "Leave Allocations",
      to:
        "/payroll-management/employee-details/leave-alloacation/" +
        props.employeeId,
    },
    {
      Title: "Leave History",
      to:
        "/payroll-management/employee-details/leave-history/" +
        props.employeeId,
    },

    {
      Title: "Certificates",
      to:
        "/payroll-management/employee-details/certificates/" + props.employeeId,
    },
    // {
    //   Title: "Disciplinary",
    //   to: "/payroll-management/employee-details/discipline/" + props.employeeId,
    // },
    // {
    //   Title: "Performance",
    //   to:
    //     "/payroll-management/employee-details/performance/" + props.employeeId,
    // },
    {
      Title: "Documents",
      to: "/payroll-management/employee-details/documents/" + props.employeeId,
    },
    {
      Title: "Organization chart",
      to: "/payroll-management/employee-details/chart/" + props.employeeId,
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
          <Link style={{ textDecoration: "none" }} to={data.to} key={data.to}>
            <SideBarListContainer style={{ zIndex: "56" }}>
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

export default PayRollEmployeeSideBar;
