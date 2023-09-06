import React from 'react';
import SideBar from "../../Dashboard/OADashboard/SideBar";
import EmployeeSideBar from "./EmployeeSideBar";
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
} from "./ViewEmployeeStyle";

const EVDocuments = () => {
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
                  <FlexColumn style={{ gap: "5px" }}>
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
                  <FlexSpaceBetween
                    style={{ marginBottom: "10px", width: "84%" }}
                  >
                    <BasicHeading>Documents</BasicHeading>
                    <TitlePara>Last Updated On: 15-04-2023</TitlePara>
                  </FlexSpaceBetween>
                  <FlexSpaceBetween
                    style={{
                      marginBottom: "10px",
                      width: "80%",
                      borderRadius: "8px",
                      border: "1.5px solid #EFF4FA",
                      padding: "16px",
                    }}
                  >
                    <FlexContaier>
                      <IconsEmployee src="/images/icons/FileText.svg" />
                      <ViewPara>Welcome_to_team_offer_letter.doc</ViewPara>
                    </FlexContaier>
                    <IconsEmployee src="/images/icons/Download.svg" />
                  </FlexSpaceBetween>
                  <FlexSpaceBetween
                    style={{
                      marginBottom: "10px",
                      width: "80%",
                      borderRadius: "8px",
                      border: "1.5px solid #EFF4FA",
                      padding: "16px",
                    }}
                  >
                    <FlexContaier>
                      <IconsEmployee src="/images/icons/FilePDF.svg" />
                      <ViewPara>Welcome_to_team_offer_letter.pdf</ViewPara>
                    </FlexContaier>
                    <IconsEmployee src="/images/icons/Download.svg" />
                  </FlexSpaceBetween>
                  <FlexSpaceBetween
                    style={{
                      marginBottom: "10px",
                      width: "80%",
                      borderRadius: "8px",
                      border: "1.5px solid #EFF4FA",
                      padding: "16px",
                    }}
                  >
                    <FlexContaier>
                      <IconsEmployee src="/images/icons/File3.svg" />
                      <ViewPara>Welcome_to_team_offer_letter.doc</ViewPara>
                    </FlexContaier>
                    <IconsEmployee src="/images/icons/Download.svg" />
                  </FlexSpaceBetween>
                </BasicInfoDiv>
              </BasicInfoContainer>
            </MainBodyContainer>
          </BodyContainer>
        </EmployeeBody>
      </DashMain>
    </Dashboard>
  );
}

export default EVDocuments