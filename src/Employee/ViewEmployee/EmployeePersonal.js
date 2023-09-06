import React from "react";
import SideBar from "../../Dashboard/OADashboard/SideBar";
import EmployeeSideBar from "./EmployeeSideBar";
import { useNavigate } from "react-router-dom";
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

const EmployeePersonal = () => {
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
              <PersonalInfo>
                <PersonalImg src="/images/Oval Copy.jpg" />
                <FlexColumn>
                  <PersonalName>Hattie Watkins</PersonalName>
                  <PersonalTitle>Team Manager</PersonalTitle>
                  <PersonalDepartment>Design Department</PersonalDepartment>
                </FlexColumn>
              </PersonalInfo>
              <BasicInfoContainer>
                <BasicInfoDiv>
                  <FlexSpaceBetween style={{ marginBottom: "10px" }}>
                    <BasicHeading>Basic Information</BasicHeading>
                    <EditButton>
                      <ButtonIcon src="/images/icons/Pen 2.svg" />
                      Edit
                    </EditButton>
                  </FlexSpaceBetween>
                  <BasicDetailsDiv>
                    <FlexSpaceBetween>
                      <FlexColumn>
                        <TitlePara>Name</TitlePara>
                        <ViewPara>Hattie</ViewPara>
                      </FlexColumn>
                      <FlexColumn>
                        <TitlePara>Last Name</TitlePara>
                        <ViewPara>Watkins</ViewPara>
                      </FlexColumn>
                    </FlexSpaceBetween>
                    <FlexSpaceBetween>
                      <FlexColumn>
                        <TitlePara>Address</TitlePara>
                        <ViewPara>2975 Westheimer Rd. Downtown</ViewPara>
                      </FlexColumn>
                      <FlexColumn>
                        <TitlePara>Province</TitlePara>
                        <ViewPara>Santa Ana</ViewPara>
                      </FlexColumn>
                    </FlexSpaceBetween>
                    <FlexSpaceBetween>
                      <FlexColumn>
                        <TitlePara>City</TitlePara>
                        <ViewPara>Illinois</ViewPara>
                      </FlexColumn>
                      <FlexColumn>
                        <TitlePara>Postal Code</TitlePara>
                        <ViewPara>85486</ViewPara>
                      </FlexColumn>
                    </FlexSpaceBetween>
                    <FlexSpaceBetween>
                      <FlexColumn>
                        <TitlePara>Home Phone</TitlePara>
                        <ViewPara>Hatti</ViewPara>
                      </FlexColumn>
                      <FlexColumn>
                        <TitlePara>Persoal (mobile)</TitlePara>
                        <ViewPara>Watkins</ViewPara>
                      </FlexColumn>
                    </FlexSpaceBetween>
                    <FlexSpaceBetween>
                      <FlexColumn>
                        <TitlePara>Email - Personal</TitlePara>
                        <ViewPara>Hattie</ViewPara>
                      </FlexColumn>
                      <FlexColumn>
                        <TitlePara>Personal Mobile</TitlePara>
                        <ViewPara>watiksin</ViewPara>
                      </FlexColumn>
                    </FlexSpaceBetween>
                    <FlexSpaceBetween>
                      <FlexColumn>
                        <TitlePara>Emergency Contact </TitlePara>
                        <ViewPara>Hattie</ViewPara>
                      </FlexColumn>
                      <FlexColumn>
                        <TitlePara>Emergency Contact number *</TitlePara>
                        <ViewPara>Watkins</ViewPara>
                      </FlexColumn>
                    </FlexSpaceBetween>
                    <BasicHeading style={{ marginTop: "53px" }}>
                      Basic Information
                    </BasicHeading>
                    <FlexSpaceBetween>
                      <FlexColumn>
                        <TitlePara>Employee </TitlePara>
                        <ViewPara>Hattie</ViewPara>
                      </FlexColumn>
                      <FlexColumn>
                        <TitlePara>Date of Birth</TitlePara>
                        <ViewPara>Watkins</ViewPara>
                      </FlexColumn>
                    </FlexSpaceBetween>
                    <FlexSpaceBetween>
                      <FlexColumn>
                        <TitlePara>Sin</TitlePara>
                        <ViewPara>45781254</ViewPara>
                      </FlexColumn>
                      <FlexColumn>
                        <TitlePara>Gender</TitlePara>
                        <ViewPara>Female</ViewPara>
                      </FlexColumn>
                    </FlexSpaceBetween>
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

export default EmployeePersonal;
