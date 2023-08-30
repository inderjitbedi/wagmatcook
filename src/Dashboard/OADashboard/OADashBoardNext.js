import React,{useState} from "react";
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
  MainCardPara,
  MainCardParaLight,
  CardLeavesList,
  CardLeavesDiv,
  CardLeavesPara,
  CardLeavesButton,
  CardLeavesArrow,
  CardEmployeeImg,
  CardList,
  CardListPara,
  CardListSpan,
} from "./OaDashBoardNextStyles.js";

const OADashBoardNext = () => {
  const Data = [1, 2, 3];
    const [status, setStatus] = useState("Active");
    const HandelClick = () => {
    setStatus(status === "Active" ? "Inactive" : "Active");
}
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
            {Data.map((data) => (
              <CardLeavesList>
                <CardLeavesDiv>
                  <MainCardPara>Sickness Benefits</MainCardPara>
                  <MainCardParaLight>Overtime Accumulated</MainCardParaLight>
                </CardLeavesDiv>
                <CardLeavesPara>Max Carry Over: 10</CardLeavesPara>
                <CardLeavesButton
                  onClick={HandelClick}
                  style={
                    status === "Active"
                      ? { backgroundColor: "#c8ffc7",color: "#0d7d0b"}
                      : { backgroundColor: "#FF6666", color: "#FF0000" }
                  }
                >
                  {status}{" "}
                  <CardLeavesArrow
                    src="svg/Arrow Down.svg"
                    style={
                      status === "active"
                        ? {}
                        : { fill: "#FF0000" }
                    }
                  />
                </CardLeavesButton>
              </CardLeavesList>
            ))}
          </MainCard>
          <MainCard>
            <MainCardTitleDiv>
              <DashCardTitle>New Employee</DashCardTitle>
              <MainCardView>View All</MainCardView>
            </MainCardTitleDiv>
            {Data.map((data) => (
              <CardEmployeeList>
                <CardEmployeeDiv>
                  <CardEmployeeImg src="images/Oval Copy 2.jpg" />
                  <CardLeavesDiv>
                    <MainCardPara>Web Developer</MainCardPara>
                    <MainCardParaLight>Web Developer</MainCardParaLight>
                  </CardLeavesDiv>
                </CardEmployeeDiv>
                <CardEmployeePara>
                  Employee ID: <CardEmployeespan>LA-0234</CardEmployeespan>
                </CardEmployeePara>
              </CardEmployeeList>
            ))}
          </MainCard>
          <MainCard>
            <MainCardTitleDiv>
              <DashCardTitle>Departments</DashCardTitle>
              <MainCardView>View All</MainCardView>
            </MainCardTitleDiv>
            {Data.map((data) => (
              <CardList>
                <MainCardPara>Product Design </MainCardPara>
                <CardListPara>
                  Employees:
                  <CardListSpan>11</CardListSpan>
                </CardListPara>
              </CardList>
            ))}
          </MainCard>
          <MainCard>
            <MainCardTitleDiv>
              <DashCardTitle>Disciplinary Types</DashCardTitle>
            </MainCardTitleDiv>
            {Data.map((data) => (
              <CardList>
                <MainCardPara>Verbal warning </MainCardPara>
                <CardListPara>
                  Requires BCR:
                  <CardListSpan>Yes</CardListSpan>
                </CardListPara>
              </CardList>
            ))}
          </MainCard>
        </MainCardContainer>
      </DashMain>
    </Dashboard>
  );
};

export default OADashBoardNext;
