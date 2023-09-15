import React, { useState, useEffect } from "react";
import SideBar from "./SideBar.js";
import OADAashModal from "./OADAashModal.js";
import { Link, useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
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
import { DepartmentIconImg } from "../../Departments/DepartmentsStyles.js";

const OADashBoard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  return (
    <>
      <OADAashModal isOpen={isModalOpen} closeModal={closeModal} />

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
        <BannerSection>
          <BannerHeading>
            <BannerTitle>
              Add your Organization’s details to complete your profile.{" "}
            </BannerTitle>
            <BannerButton>Update Profile</BannerButton>
          </BannerHeading>
          <BannerImage src="/images/image10.jpg" />
        </BannerSection>
        <DashCardContainer>
          {CardData.map((data) => (
            <DashCard>
              <DashCardTitle>{data.SubTitle}</DashCardTitle>
              <DashCardsub>
                <DashCardIcons src={data.src} />
                <DashCardPri>
                  <DashCardTitle2>{data.SubTitle}</DashCardTitle2>
                  {data.Para}
                  <DashCardPara></DashCardPara>
                  <Link to={data.to} key={data.to}>
                    <DashCardButon style={{cursor:"pointer"}}> Add {data.Title}</DashCardButon>
                  </Link>
                </DashCardPri>
              </DashCardsub>
            </DashCard>
          ))}
        </DashCardContainer>
      </>
    </>
  );
};

export default OADashBoard;
