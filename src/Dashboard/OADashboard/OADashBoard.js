import React, { useState, useEffect } from "react";
import SideBar from "./SideBar.js";
import OADAashModal from "./OADAashModal.js";
import { Link, useNavigate } from "react-router-dom";
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



const OADashBoard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useNavigate();

  // useEffect(() => {
  //   if (!localStorage.getItem('welcomeModelShown')) {
  //     // if (history.action === "PUSH") {
  //     setIsModalOpen(true);
  //     localStorage.setItem('welcomeModelShown',true)
  //     // }
  //   }
  // }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const CardData = [
    {
      Title: "Leaves",
      SubTitle: "Add Leaves",
      Para: "Add new leave by clicking add button and Add Name Type, description and Max carry-over details ",
      src: "/images/icons/AddLeaves.svg",
    },
    {
      Title: "Employee",
      SubTitle: "Add Employee",
      Para: "Add Employee by clicking add button and provide the name, email and other details. ",
      src: "/images/icons/Employees.svg",
    },
    {
      Title: "Departments",
      SubTitle: "Add Departments",
      Para: "Add new department by clicking add button and Add Name, description. ",
      src: "/images/icons/Department.svg",
    },
    {
      Title: "Disciplinary Types",
      SubTitle: "Add Disciplinary Types",
      Para: "Add new department by clicking add button and Add Name, description. ",
      src: "/images/icons/Discipliner.svg",
    },
  ];
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
          </DashHeaderSearch>
        </DashHeader>
        <DashHeading>Welcome Jason Porter!</DashHeading>
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
                  <DashCardButon> Add Leaves</DashCardButon>
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
