import React, {useState,useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import CommenDashHeader from '../Dashboard/CommenDashHeader';
import { useNavigate, useParams } from "react-router-dom";
import JobSideBar from './JobSideBar';
import {
  FlexContaier,
  BackButton,
  IconsEmployee,
  EmployeeBody,
  BodyHeader,
  BodyHeading,
  BodyContainer,
  SideBarContainer,
  MainBodyContainer,
  BackArrowButton,
  BackButtonContainer,
  BodyHeaderjob,
} from "../Employee/ViewEmployee/ViewEmployeeStyle";

const JobDetailsLayout = () => {
  const Navigate = useNavigate();

      const { employeeid } = useParams();
  const [searchValue, setSearchValue] = useState("");

  const HandleSearchCahnge = (data) => {
    setSearchValue(data);
    };
     const [screenWidth, setScreenWidth] = useState(window.innerWidth);
     useEffect(() => {
       function handleResize() {
         setScreenWidth(window.innerWidth);
       }

       window.addEventListener("resize", handleResize);

       return () => {
         window.removeEventListener("resize", handleResize);
       };
     }, []);
  return (
    <div style={{ width: "100%", boxSizing: "border-box" }}>
      <CommenDashHeader onSearch={HandleSearchCahnge} text="Job Post Details" />
      <EmployeeBody>
        <BodyHeaderjob>
          <BackButtonContainer>
            {screenWidth < 600 && (
              <BackArrowButton onClick={() => Navigate(-1)}>
                <IconsEmployee src="/images/icons/ArrowLeft.svg" />
              </BackArrowButton>
            )}
            {/* <BodyHeading>Employee Details</BodyHeading> */}
          </BackButtonContainer>

          {screenWidth < 600 ? (
            <SideBarContainer>
              <JobSideBar employeeId={employeeid} />
            </SideBarContainer>
          ) : (
            ""
          )}
        </BodyHeaderjob>
        <BodyContainer>
          {screenWidth < 600 ? (
            ""
          ) : (
            <SideBarContainer>
              <JobSideBar employeeId={employeeid} />
            </SideBarContainer>
          )}
          <div style={screenWidth < 600 ? { width: "100%" } : { width: "80%" }}>
            <Outlet />
          </div>
        </BodyContainer>
      </EmployeeBody>
    </div>
  );
}

export default JobDetailsLayout;