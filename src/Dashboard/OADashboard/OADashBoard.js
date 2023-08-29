import React ,{useState,useEffect} from "react";
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
  
  useEffect(() => {
    if (history.action === "PUSH") {
      setIsModalOpen(true);
    }
  }, [history.action]);

   const closeModal = () => {
     setIsModalOpen(false);
   };
    const CardData = [
      {
        Title: "Leaves",
        SubTitle: "Add Leaves",
        Para: "Add new leave by clicking add button and Add Name Type, description and Max carry-over details ",
        src: "/icons/AddLeaves.png",
      },
      {
        Title: "Employee",
        SubTitle: "Add Employee",
        Para: "Add Employee by clicking add button and provide the name, email and other details. ",
        src: "/icons/Employes.png",
      },
      {
        Title: "Departments",
        SubTitle: "Add Departments",
        Para: "Add new department by clicking add button and Add Name, description. ",
        src: "/icons/Department.png",
      },
      {
        Title: "Disciplinary Types",
        SubTitle: "Add Disciplinary Types",
        Para: "Add new department by clicking add button and Add Name, description. ",
        src: "/icons/Discipliner.png",
      },
    ];
  return (
    <Dashboard>
      <OADAashModal isOpen={isModalOpen} closeModal={closeModal} />
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
      </DashMain>
    </Dashboard>
  );
};

export default OADashBoard;
