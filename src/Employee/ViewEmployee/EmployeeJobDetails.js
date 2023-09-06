import React from "react";
import SideBar from "../../Dashboard/OADashboard/SideBar";
import EmployeeSideBar from "./EmployeeSideBar";
import { useNavigate } from "react-router-dom";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";
import "./Employee.css";
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
} from "./ViewEmployeeStyle";


const EmployeeJobDetails = () => {
  const Navigate = useNavigate();
  return (
    <Dashboard>
      <DashNav>
        <SideBar />
      </DashNav>
      <DashMain>
        <DashHeader>
          <FlexContaier>
            <BackButton onClick={() => Navigate(-1)}>
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
                    <BasicHeading>Employment Details</BasicHeading>
                  </FlexSpaceBetween>
                  <BasicDetailsDiv>
                    <FlexSpaceBetween>
                      <FlexColumn>
                        <TitlePara>Department</TitlePara>
                        <ViewPara>Hattie</ViewPara>
                      </FlexColumn>
                      <FlexColumn>
                        <TitlePara>Department </TitlePara>
                        <ViewPara>Watkins</ViewPara>
                      </FlexColumn>
                    </FlexSpaceBetween>
                    <FlexSpaceBetween>
                      <FlexColumn>
                        <TitlePara>Position Start Date</TitlePara>
                        <ViewPara>15-08-2022</ViewPara>
                      </FlexColumn>
                      <FlexColumn>
                        <TitlePara>Position End Date</TitlePara>
                        <ViewPara>Present</ViewPara>
                      </FlexColumn>
                    </FlexSpaceBetween>
                    <FlexSpaceBetween>
                      <FlexColumn>
                        <TitlePara>Salary Scale From</TitlePara>
                        <ViewPara>$1,200</ViewPara>
                      </FlexColumn>
                      <FlexColumn>
                        <TitlePara>Salary Scale To</TitlePara>
                        <ViewPara>$1,600</ViewPara>
                      </FlexColumn>
                    </FlexSpaceBetween>
                    <FlexSpaceBetween>
                      <FlexColumn>
                        <TitlePara>Actual Salary amounts</TitlePara>
                        <ViewPara>Hatti</ViewPara>
                      </FlexColumn>
                      <FlexColumn>
                        <TitlePara>Salary rate per</TitlePara>
                        <ViewPara>Watkins</ViewPara>
                      </FlexColumn>
                    </FlexSpaceBetween>
                    <FlexSpaceBetween>
                      <FlexColumn>
                        <TitlePara>Hours per week</TitlePara>
                        <ViewPara>Hattie</ViewPara>
                      </FlexColumn>
                      <FlexColumn>
                        <TitlePara>Reports to</TitlePara>
                        <ViewPara>watiksin</ViewPara>
                      </FlexColumn>
                    </FlexSpaceBetween>
                    <FlexSpaceBetween>
                      <FlexColumn>
                        <TitlePara>Is BEB Eligible?</TitlePara>
                        <ViewPara>Yes</ViewPara>
                      </FlexColumn>
                      <FlexColumn>
                        <TitlePara>Status</TitlePara>
                        <ViewPara style={{ color: "#34A853" }}>Active</ViewPara>
                      </FlexColumn>
                    </FlexSpaceBetween>
                    <BasicHeading
                      style={{ marginTop: "53px", marginBottom: "24px" }}
                    >
                      Position History
                    </BasicHeading>
                    {/* dot and circle  */}
                    <VerticalTimeline
                      layout={"1-column-left"}
                      lineColor={"#EFF4FA"}
                      style={{
                        padding: "0px",
                        margin: "0px",
                        maxWidth: "100%",
                      }}
                    >
                      <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{
                          outine: "none",
                          boxShadow: "none",
                          border: "none",
                        }}
                        iconStyle={{
                          width: "18px",
                          height: "18px",
                          background: "#fff",
                          border: "1.5px solid #8F9BB3",
                          borderRadius: "50%",
                          boxShadow: "none",
                          outine: "none",
                          marginLeft: "10px",
                        }}
                        intersectionObserverProps={{
                          margin: "0px 0px 0px 0px",
                        }}
                        style={{ margin: "0px" }}
                      >
                        <TimelineDiv>
                          <FlexColumn style={{ gap: "4px" }}>
                            <TitlePara>Team Lead</TitlePara>
                            <ViewPara>Design Department</ViewPara>
                          </FlexColumn>
                          <TitlePara>
                            From: 15-04-2023
                            <span style={{ marginLeft: "14px" }}>
                              {" "}
                              To: Present
                            </span>{" "}
                          </TitlePara>
                        </TimelineDiv>
                      </VerticalTimelineElement>
                      <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{
                          outine: "none",
                          boxShadow: "none",
                          border: "none",
                        }}
                        iconStyle={{
                          width: "18px",
                          height: "18px",
                          background: "#fff",
                          border: "1.5px solid #8F9BB3",
                          borderRadius: "50%",
                          boxShadow: "none",
                          outine: "none",
                          marginLeft: "10px",
                        }}
                        intersectionObserverProps={{
                          margin: "0px 0px 0px 0px",
                        }}
                        style={{ margin: "0px" }}
                      >
                        <TimelineDiv>
                          <FlexColumn>
                            <TitlePara>Team Lead</TitlePara>
                            <ViewPara>Design Department</ViewPara>
                          </FlexColumn>
                          <TitlePara>
                            From: 15-04-2023
                            <span style={{ marginLeft: "14px" }}>
                              {" "}
                              To: Present
                            </span>{" "}
                          </TitlePara>
                        </TimelineDiv>
                      </VerticalTimelineElement>
                      <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{
                          outine: "none",
                          boxShadow: "none",
                          border: "none",
                        }}
                        iconStyle={{
                          width: "18px",
                          height: "18px",
                          background: "#fff",
                          border: "1.5px solid #8F9BB3",
                          borderRadius: "50%",
                          boxShadow: "none",
                          outine: "none",
                          marginLeft: "10px",
                        }}
                        intersectionObserverProps={{
                          margin: "0px 0px 0px 0px",
                        }}
                        style={{ margin: "0px" }}
                      >
                        <TimelineDiv>
                          <FlexColumn>
                            <TitlePara>Team Lead</TitlePara>
                            <ViewPara>Design Department</ViewPara>
                          </FlexColumn>
                          <TitlePara>
                            From: 15-04-2023
                            <span style={{ marginLeft: "14px" }}>
                              {" "}
                              To: Present
                            </span>{" "}
                          </TitlePara>
                        </TimelineDiv>
                      </VerticalTimelineElement>
                    </VerticalTimeline>
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

export default EmployeeJobDetails;
