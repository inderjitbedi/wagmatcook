import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import httpClient from "../../api/httpClient";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
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

const OADashBoardNext = ({ user, orgData }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [disciplinaryData, setDisciplinaryData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const Data = [1, 2, 3];
  const [status, setStatus] = useState("Active");
  const HandelClick = () => {
    setStatus(status === "Active" ? "Inactive" : "Active");
  };
  const [anchorEl, setAnchorEl] = useState(false);
  const openMenu = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const HandleLogout = () => {
    localStorage.clear();
    handleCloseMenu();
    navigate("/");
  };
  // get disciplinary
  const GetDisciplinary = () => {
    //  setIsLoading(true);
    let url = `/disciplinary/list?limit=3`;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setDisciplinaryData(result);
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error creating department. Please try again.");
        //  setIsLoading(false);
      })
      .finally(() => {
        //  setIsLoading(false);
      });
  };
  const GetEmployees = () => {
    //  setIsLoading(true);

    let url = `employee/list?limit=3`;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setEmployeeData(result);
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error creating Employee. Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    setIsLoading(true);
    GetDisciplinary();
    GetEmployees();
  }, []);
  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "70vh",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <RotatingLines
            strokeColor="#279AF1"
            strokeWidth="3"
            animationDuration="0.75"
            width="52"
            visible={true}
          />
        </div>
      ) : (
        <>
          <DashHeader>
            <DashHeaderTitle>Dashboard</DashHeaderTitle>
            <DashHeaderSearch>
              <SearchBox>
                <SearchInput type="text" placeholder="Search..."></SearchInput>
                <SearchIcon src="/images/icons/searchIcon.svg" />
              </SearchBox>
              <DashNotification src="/images/icons/Notifications.svg" />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  gap: "5px",
                }}
                onClick={(event) => handleClickMenu(event)}
              >
                {" "}
                <DashNotification src="/images/icons/Logout.svg" />
                <img
                  src="/images/icons/arrowdown.svg"
                  style={{
                    width: "5px",
                    height: "9px",
                    transform: anchorEl ? "rotate(180deg)" : undefined,
                  }}
                />
              </div>
            </DashHeaderSearch>
          </DashHeader>
          <Menu
            sx={{ margin: "0px" }}
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={HandleLogout}>Logout</MenuItem>
          </Menu>
            <DashHeading>Welcome {user?.name || "Jason poter"}!</DashHeading>
            
          <SectionCard>
            <SectionCardContainer>
              <SectionCardTitle>Total Employee</SectionCardTitle>
              <SectionCardNumber>{employeeData.totalEmployees} </SectionCardNumber>
            </SectionCardContainer>
            <SectionCardContainer2>
              <SectionCardTitle>Total Disciplinaries</SectionCardTitle>
              <SectionCardNumber>{disciplinaryData.totalDisciplinaries} </SectionCardNumber>
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
            {/* Department card */}
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
            {/* Disciplinary card section  */}
            <MainCard>
              <MainCardTitleDiv>
                <DashCardTitle>Disciplinary Types</DashCardTitle>
                {disciplinaryData?.totalDisciplinaries > 3 && (
                  <MainCardView
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/organization-admin/disciplinary")}
                  >
                    View All
                  </MainCardView>
                )}
              </MainCardTitleDiv>
              {disciplinaryData?.disciplinaries?.map((data) => (
                <CardList>
                  <MainCardPara>{data.name} </MainCardPara>
                  <CardListPara>
                    Requires BCR:
                    <CardListSpan>
                      {data.requiredBcr ? "Yes" : "No"}
                    </CardListSpan>
                  </CardListPara>
                </CardList>
              ))}
            </MainCard>
            {/* employee card  */}
            <MainCard>
              <MainCardTitleDiv>
                <DashCardTitle>New Employee</DashCardTitle>
                {employeeData.totalEmployees > 3 && (
                  <MainCardView
                    onClick={() =>
                      navigate("/organization-admin/employee/list")
                    }
                  >
                    View All
                  </MainCardView>
                )}
              </MainCardTitleDiv>
              {employeeData?.employees?.map((data) => (
                <CardEmployeeList>
                  <CardEmployeeDiv>
                    <CardEmployeeImg src="/images/user.jpg" />
                    <CardLeavesDiv>
                      <MainCardPara>
                        {" "}
                        {[
                          data.personalInfo[0]?.firstName,
                          data.personalInfo[0]?.lastName,
                        ].join(" ")}
                      </MainCardPara>
                      <MainCardParaLight>{data.email}</MainCardParaLight>
                    </CardLeavesDiv>
                  </CardEmployeeDiv>
                  <CardEmployeePara>
                    Employee ID:{" "}
                    <CardEmployeespan>
                      {data.personalInfo[0].employeeId || "-"}
                    </CardEmployeespan>
                  </CardEmployeePara>
                </CardEmployeeList>
              ))}
            </MainCard>
            {/*  Leave card  */}
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
                        ? { backgroundColor: "#c8ffc7", color: "#0d7d0b" }
                        : { backgroundColor: "#FF6666", color: "#FF0000" }
                    }
                  >
                    {status}{" "}
                    <CardLeavesArrow
                      src="/svg/Arrow Down.svg"
                      style={status === "active" ? {} : { fill: "#FF0000" }}
                    />
                  </CardLeavesButton>
                </CardLeavesList>
              ))}
            </MainCard>
          </MainCardContainer>
        </>
      )}
    </>
  );
};

export default OADashBoardNext;
