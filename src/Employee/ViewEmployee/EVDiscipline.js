import React from "react";
import SideBar from "../../Dashboard/OADashboard/SideBar";
import EmployeeSideBar from "./EmployeeSideBar";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";
// import "./Employee.css";
import {
  Dashboard,
  DashMain,
  DashNav,
  DashHeader,
  DashHeaderSearch,
  DashHeaderTitle,
  DashNotification,
  SearchBox,
  SearchIcon,
  SearchInput,
  FlexContaier,
  BackButton,
  IconsEmployee,
  EmployeeBody,
  BodyHeader,
  BodyHeading,
  BodyContainer,
  SideBarContainer,
  MainBodyContainer,
  PersonalInfo,
  PersonalImg,
  FlexColumn,
  PersonalName,
  PersonalTitle,
  PersonalDepartment,
  BasicInfoContainer,
  FlexSpaceBetween,
  BasicHeading,
  EditButton,
  ButtonIcon,
  BasicInfoDiv,
  BasicDetailsDiv,
  TitlePara,
  ViewPara,
  TimelineDiv,
  TimelinePara,
  File,
  ReviewsDiv,
} from "./ViewEmployeeStyle";
const EVDiscipline = () => {
  return (
    <Dashboard>
      <DashNav>
        <SideBar />
      </DashNav>
      <DashMain>
        <DashHeader>
          <FlexContaier>
            <BackButton>
              <IconsEmployee src="/images/icons/ArrowLeft.svg" />
              Back
            </BackButton>
            <DashHeaderTitle>Employee</DashHeaderTitle>
          </FlexContaier>

          <DashHeaderSearch>
            <SearchBox>
              <SearchInput
                type="text"
                placeholder="Search..."
                // value={searchValue}
                // onChange={(e) => HandleSearchCahnge(e)}
              ></SearchInput>
              <SearchIcon src="/images/icons/searchIcon.svg" />
            </SearchBox>
            <DashNotification src="/images/icons/Notifications.svg" />
          </DashHeaderSearch>
        </DashHeader>
        <EmployeeBody>
          <BodyHeader>
            <BodyHeading>Employee Details</BodyHeading>
          </BodyHeader>
          <BodyContainer>
            <SideBarContainer>
              <EmployeeSideBar />
            </SideBarContainer>
            <MainBodyContainer>
              <FlexSpaceBetween style={{ alignItems: "center" }}>
                <PersonalInfo>
                  <PersonalImg src="/images/Oval Copy.jpg" />
                  <FlexColumn>
                    <PersonalName>Hattie Watkins</PersonalName>
                    <PersonalTitle>Team Manager</PersonalTitle>
                    <PersonalDepartment>Design Department</PersonalDepartment>
                  </FlexColumn>
                </PersonalInfo>

                <EditButton style={{ marginRight: "54px" }}>
                  <ButtonIcon src="/images/icons/Pen 2.svg" />
                  Edit
                </EditButton>
              </FlexSpaceBetween>

              <BasicInfoContainer>
                <BasicInfoDiv>
                  <FlexSpaceBetween style={{ marginBottom: "10px" }}>
                    <BasicHeading>Disciplinary Details</BasicHeading>
                  </FlexSpaceBetween>

                  <BasicDetailsDiv style={{width:"80%"}}>
                    <TimelineDiv style={{ padding: "16px" ,marginBottom:"8px"}}>
                      <FlexColumn style={{ width: "100%" }}>
                        <FlexSpaceBetween style={{ marginBottom: "0px" }}>
                          <TitlePara>Completed By</TitlePara>
                          <TitlePara>Completed By</TitlePara>
                          <TitlePara>issues On: 15-04-2023</TitlePara>
                        </FlexSpaceBetween>
                        <FlexSpaceBetween style={{ marginBottom: "0px" }}>
                          <ViewPara
                            style={{
                              fontWeight: 700,
                              width: "35%",
                            }}
                          >
                            Verbal Warning
                          </ViewPara>{" "}
                          <ViewPara
                            style={{
                              fontWeight: 700,
                              width: "61%",
                            }}
                          >
                            Somethings
                          </ViewPara>
                        </FlexSpaceBetween>

                        <TimelinePara>
                          From a set of data, Hattie is able to establish a
                          principle, or work out a rule, or suggest a reason for
                          failure or success. Her analysis is always accurate
                          and sometimes original. No absences without valid
                          reason in 6 months. Late on fewer than 3 occasions in
                          6 months. Always assured and confident in demeanour
                          and presentation of ideas without being aggressively
                          over-confident.
                        </TimelinePara>

                        <ReviewsDiv>Next Review on: 15-07-2023</ReviewsDiv>
                      </FlexColumn>
                    </TimelineDiv>
                    <TimelineDiv style={{ padding: "16px" }}>
                      <FlexColumn style={{ width: "100%" }}>
                        <FlexSpaceBetween style={{ marginBottom: "0px" }}>
                          <TitlePara>Completed By</TitlePara>
                          <TitlePara>Completed By</TitlePara>
                          <TitlePara>issues On: 15-04-2023</TitlePara>
                        </FlexSpaceBetween>
                        <FlexSpaceBetween style={{ marginBottom: "0px" }}>
                          <ViewPara
                            style={{
                              fontWeight: 700,
                              width: "35%",
                            }}
                          >
                            Verbal Warning
                          </ViewPara>{" "}
                          <ViewPara
                            style={{
                              fontWeight: 700,
                              width: "61%",
                            }}
                          >
                            Somethings
                          </ViewPara>
                        </FlexSpaceBetween>

                        <TimelinePara>
                          From a set of data, Hattie is able to establish a
                          principle, or work out a rule, or suggest a reason for
                          failure or success. Her analysis is always accurate
                          and sometimes original. No absences without valid
                          reason in 6 months. Late on fewer than 3 occasions in
                          6 months. Always assured and confident in demeanour
                          and presentation of ideas without being aggressively
                          over-confident.
                        </TimelinePara>

                        <ReviewsDiv>Next Review on: 15-07-2023</ReviewsDiv>
                      </FlexColumn>
                    </TimelineDiv>
                  </BasicDetailsDiv>
                </BasicInfoDiv>
              </BasicInfoContainer>
            </MainBodyContainer>
          </BodyContainer>
        </EmployeeBody>
      </DashMain>
    </Dashboard>
  );
};

export default EVDiscipline;
