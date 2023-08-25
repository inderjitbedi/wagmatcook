import React from "react";
import SideBar from "./SideBar.js";
import {
  Dashboard,
  DashNav,
  DashMain,
  DashHeader,
  DashHeaderSearch,
  DashHeaderTitle,
  DashNotification,
  SearchBox,
  SearchIcon,
  SearchInput,
  DashHeading,
  DashCardTitle,
} from "./OADashBoardStyles";
import {
  SectionCard,
  SectionCardContainer,
  SectionCardContainer2,
  SectionCardContainer3,
  SectionCardContainer4,
  SectionCardTitle,
  SectionCardNumber,
  MainCardContainer,
  MainCard,
  MainCardTitleDiv,
  MainCardView,
  CardEmployeeList,
  CardEmployeeDiv,
  CardEmployeePara,
  CardEmployeespan,
} from "./OaDashBoardNextStyles.js";

const OADashBoardNext = () => {
  return (
    <Dashboard>
      <DashNav>
        <SideBar />
      </DashNav>
      <DashMain>
        <DashHeader>
          <DashHeaderTitle>Dashboard</DashHeaderTitle>
          <DashHeaderSearch>
            <SearchBox>
              <SearchInput type="text" placeholder="Search..."></SearchInput>
              <SearchIcon src="/icons/searchIcon.png" />
            </SearchBox>
            <DashNotification src="/icons/Notifications.png" />
          </DashHeaderSearch>
        </DashHeader>
        <DashHeading>Welcome Jason Porter!</DashHeading>
        <SectionCard>
          <SectionCardContainer>
            <SectionCardTitle>Total Employee</SectionCardTitle>
            <SectionCardNumber>654</SectionCardNumber>
          </SectionCardContainer>
          <SectionCardContainer2>
            <SectionCardTitle>Total Employee</SectionCardTitle>
            <SectionCardNumber>654</SectionCardNumber>
          </SectionCardContainer2>
          <SectionCardContainer3>
            {" "}
            <SectionCardTitle>Total Employee</SectionCardTitle>
            <SectionCardNumber>654</SectionCardNumber>
          </SectionCardContainer3>
          <SectionCardContainer4>
            {" "}
            <SectionCardTitle>Total Employee</SectionCardTitle>
            <SectionCardNumber>654</SectionCardNumber>
          </SectionCardContainer4>
        </SectionCard>
        <MainCardContainer>
          <MainCard>
            <MainCardTitleDiv>
              <DashCardTitle>Leaves</DashCardTitle>
              <MainCardView>View All</MainCardView>
            </MainCardTitleDiv>
          </MainCard>
          <MainCard>
            <MainCardTitleDiv>
              <DashCardTitle>New Employee</DashCardTitle>
              <MainCardView>View All</MainCardView>
            </MainCardTitleDiv>
            <CardEmployeeList>
                          <CardEmployeeDiv>
                              
              </CardEmployeeDiv>
              <CardEmployeePara>
                Employee ID: <CardEmployeespan>LA-0234</CardEmployeespan>
              </CardEmployeePara>
            </CardEmployeeList>
          </MainCard>
          <MainCard>
            <MainCardTitleDiv>
              <DashCardTitle>Departments</DashCardTitle>
              <MainCardView>View All</MainCardView>
            </MainCardTitleDiv>
          </MainCard>
          <MainCard>
            <MainCardTitleDiv>
              <DashCardTitle>Disciplinary Types</DashCardTitle>
            </MainCardTitleDiv>
          </MainCard>
        </MainCardContainer>
      </DashMain>
    </Dashboard>
  );
};

export default OADashBoardNext;
