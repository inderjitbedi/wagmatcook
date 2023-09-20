import React, { useState, useEffect } from "react";
import SideBar from "./SideBar.js";
import OADAashModal from "./OADAashModal.js";
import { Link, useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import OADashBoardNext from "./OADashBoardNext.js";
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
  BannerSection,
  BannerHeading,
  BannerImage,
  BannerTitle,
  BannerButton,
  DashCardContainer,
  DashCard,
  DashCardTitle,
  DashCardButon,
  DashCardPara,
  DashCardsub,
  DashCardIcons,
  DashCardPri,
  DashCardTitle2,
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
import { DepartmentIconImg } from "../../Departments/DepartmentsStyles.js";

const OADashBoard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orgData, setOrgData] = useState();
  const [disciplinaryData, setDisciplinaryData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [leavesData, setLeavesData] = useState([]);
  
    const [status, setStatus] = useState("Active");
    const HandelClick = () => {
      setStatus(status === "Active" ? "Inactive" : "Active");
  };
  const Data = [1, 2, 3];
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const [user, setUser] = useState();
  // useEffect(() => {
  //   if (!localStorage.getItem('welcomeModelShown')) {
  //     // if (history.action === "PUSH") {
  //     setIsModalOpen(true);
  //     localStorage.setItem('welcomeModelShown',true)
  //     // }
  //   }
  // }, []);
  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      let parsedUser = JSON.parse(user);
      setUser(parsedUser);
    }
     let org = localStorage.getItem("org");
     if (org) {
       let parsedUser = JSON.parse(org);
       setOrgData(parsedUser);
    }
    setIsLoading(true);
    GetDisciplinary();
    GetEmployees();
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const CardData = [
    {
      Title: "Departments",
      SubTitle: "Add Departments",
      Para: "Add new department by clicking add button and Add Name, description. ",
      src: "/images/icons/Department.svg",
      to:"/organization-admin/departments"
    },
    {
      Title: "Disciplinary Types",
      SubTitle: "Add Disciplinary Types",
      Para: "Add new department by clicking add button and Add Name, description. ",
      src: "/images/icons/Discipliner.svg",
      to:"/organization-admin/disciplinary"
    },
    {
      Title: "Employee",
      SubTitle: "Add Employee",
      Para: "Add Employee by clicking add button and provide the name, email and other details. ",
      src: "/images/icons/Employees.svg",
      to:"/organization-admin/employee/list"
    },
    {
      Title: "Leaves",
      SubTitle: "Add Leaves",
      Para: "Add new leave by clicking add button and Add Name Type, description and Max carry-over details ",
      src: "/images/icons/AddLeaves.svg",
      to:"/organization-admin/disciplinary"
    },
  ];

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
          <OADAashModal isOpen={isModalOpen} closeModal={closeModal} />
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
                <DepartmentIconImg src="/images/icons/Logout.svg" />
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
          {orgData ? (
            <SectionCard>
              <SectionCardContainer>
                <SectionCardTitle>Total Employee</SectionCardTitle>
                <SectionCardNumber>
                  {employeeData.totalEmployees}{" "}
                </SectionCardNumber>
              </SectionCardContainer>
              <SectionCardContainer2>
                <SectionCardTitle>Total Disciplinaries</SectionCardTitle>
                <SectionCardNumber>
                  {disciplinaryData.totalDisciplinaries}{" "}
                </SectionCardNumber>
              </SectionCardContainer2>
              <SectionCardContainer3>
                {" "}
                <SectionCardTitle>Total Leaves</SectionCardTitle>
                <SectionCardNumber>654</SectionCardNumber>
              </SectionCardContainer3>
              <SectionCardContainer4>
                {" "}
                <SectionCardTitle>Total Departments</SectionCardTitle>
                <SectionCardNumber>654</SectionCardNumber>
              </SectionCardContainer4>
            </SectionCard>
          ) : (
            <BannerSection>
              <BannerHeading>
                <BannerTitle>
                  Add your Organization’s details to complete your profile.{" "}
                </BannerTitle>
                <BannerButton>Update Profile</BannerButton>
              </BannerHeading>
              <BannerImage src="/images/image10.jpg" />
            </BannerSection>
          )}

          <DashCardContainer>
            {/* Department card */}

            {departmentData.length ? (
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
            ) : (
              <DashCard>
                <DashCardTitle>{CardData[0].SubTitle}</DashCardTitle>
                <DashCardsub>
                  <DashCardIcons src={CardData[0].src} />
                  <DashCardPri>
                    <DashCardTitle2>{CardData[0].SubTitle}</DashCardTitle2>
                    {CardData[0].Para}
                    <DashCardPara></DashCardPara>
                    <Link to={CardData[0].to} key={CardData[0].to}>
                      <DashCardButon style={{ cursor: "pointer" }}>
                        {" "}
                        Add {CardData[0].Title}
                      </DashCardButon>
                    </Link>
                  </DashCardPri>
                </DashCardsub>
              </DashCard>
            )}
            {disciplinaryData?.disciplinaries?.length ? (
              <MainCard>
                <MainCardTitleDiv>
                  <DashCardTitle>Disciplinary Types</DashCardTitle>
                  {disciplinaryData?.totalDisciplinaries > 3 && (
                    <MainCardView
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate("/organization-admin/disciplinary")
                      }
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
            ) : (
              <DashCard>
                <DashCardTitle>{CardData[1].SubTitle}</DashCardTitle>
                <DashCardsub>
                  <DashCardIcons src={CardData[1].src} />
                  <DashCardPri>
                    <DashCardTitle2>{CardData[1].SubTitle}</DashCardTitle2>
                    {CardData[1].Para}
                    <DashCardPara></DashCardPara>
                    <Link to={CardData[1].to} key={CardData[1].to}>
                      <DashCardButon style={{ cursor: "pointer" }}>
                        {" "}
                        Add {CardData[1].Title}
                      </DashCardButon>
                    </Link>
                  </DashCardPri>
                </DashCardsub>
              </DashCard>
            )}
            {employeeData?.employees?.length ? (
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
            ) : (
              <DashCard>
                <DashCardTitle>{CardData[2].SubTitle}</DashCardTitle>
                <DashCardsub>
                  <DashCardIcons src={CardData[2].src} />
                  <DashCardPri>
                    <DashCardTitle2>{CardData[2].SubTitle}</DashCardTitle2>
                    {CardData[2].Para}
                    <DashCardPara></DashCardPara>
                    <Link to={CardData[2].to} key={CardData[2].to}>
                      <DashCardButon style={{ cursor: "pointer" }}>
                        {" "}
                        Add {CardData[2].Title}
                      </DashCardButon>
                    </Link>
                  </DashCardPri>
                </DashCardsub>
              </DashCard>
            )}
            {leavesData.length ? (
              <MainCard>
                <MainCardTitleDiv>
                  <DashCardTitle>Leaves</DashCardTitle>
                  <MainCardView>View All</MainCardView>
                </MainCardTitleDiv>
                {Data.map((data) => (
                  <CardLeavesList>
                    <CardLeavesDiv>
                      <MainCardPara>Sickness Benefits</MainCardPara>
                      <MainCardParaLight>
                        Overtime Accumulated
                      </MainCardParaLight>
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
            ) : (
              <DashCard>
                <DashCardTitle>{CardData[3].SubTitle}</DashCardTitle>
                <DashCardsub>
                  <DashCardIcons src={CardData[3].src} />
                  <DashCardPri>
                    <DashCardTitle2>{CardData[3].SubTitle}</DashCardTitle2>
                    {CardData[3].Para}
                    <DashCardPara></DashCardPara>
                    <Link to={CardData[3].to} key={CardData[3].to}>
                      <DashCardButon style={{ cursor: "pointer" }}>
                        {" "}
                        Add {CardData[3].Title}
                      </DashCardButon>
                    </Link>
                  </DashCardPri>
                </DashCardsub>
              </DashCard>
            )}
          </DashCardContainer>
        </>
      )}
    </>
  );
};

export default OADashBoard;
