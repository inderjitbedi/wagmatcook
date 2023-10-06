import React from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const SideBarList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 24px;
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

const UserAccountSiderBar = (props) => {
    const location = useLocation();
       const SideBarData = [
         {
           Title: "Personal",
           to: "/user-management/account/personal-info/" + props.employeeId,
         },
         {
           Title: "Job Details",
           to: "/user-management/account/job-details/" + props.employeeId,
         },

         {
           Title: "Benefit",
           to: "/user-management/account/benefits/" + props.employeeId,
         },
        //  {
        //    Title: "Leave Allocations",
        //    to: "/user-management/account/leave-alloacation/" + props.employeeId,
        //  },
        //  {
        //    Title: "Leave History",
        //    to: "/user-management/account/leave-history/" + props.employeeId,
        //  },

         {
           Title: "Certificates",
           to: "/user-management/account/certificates/" + props.employeeId,
         },
         {
           Title: "Disciplinary",
           to: "/user-management/account/discipline/" + props.employeeId,
         },
         {
           Title: "Performance",
           to: "/user-management/account/performance/" + props.employeeId,
         },
         {
           Title: "Documents",
           to: "/user-management/account/documents/" + props.employeeId,
         },
    ];
     const style = {
       textDecoration: "none",
       color: "#279AF1",
     };
  return (
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
  );
}

export default UserAccountSiderBar