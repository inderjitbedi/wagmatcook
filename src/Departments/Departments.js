import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  Dashboard,
  DashNav,
  DashMain,
  DashHeader,
  DashHeaderTitle,
  SearchBox,
  SearchInput,
  DashHeaderSearch,
  SearchIcon,
} from "../Dashboard/OADashboard/OADashBoardStyles";
import SideBar from "../Dashboard/OADashboard/SideBar";
import {
  DashHeaderDepartment,
  DepartmentIconContainer,
  DepartmentIconImg,
  DepartmentFilterContainer,
  AddNewButton,
  DepartmentFilterdiv,
  DepartmentFilterButton,
  DepartmentCardContainer,
  DepartmentCardDiv,
  DepartmentCardImg,
  DepartmentCardPara,
  DepartmentCardParaLit,
  DepartmentCardButtoncolor,
  DepartmentCardButtongrey,
  DepartmentButtonContainer,
  ModalUpperDiv,
  ModalHeading,
  ModalIcon,
  ModalUpperMid,
  ModalBottom,
  CancelButton,
  Input,
  TextArea,
  ModalThanks,
  ModalThanksImg,
  ModalThanksHeading,
} from "./DepartmentsStyles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 374,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 45,
  padding: "20px 0px",
  borderRadius: "8px",
};

const Departments = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openThanks, setOpenThanks] = useState(false);
  const handleOpenThanks = () => setOpenThanks(true);
  const handleCloseThanks = () => setOpenThanks(false);
  const FilterData = [
    "All",
    "Full-time Perm",
    "Full-time",
    "Part-time",
    "Contract",
    "Term",
    "Students",
    "Other",
  ];
  const TempData = [1, 2, 3, 4, 5];
  return (
    <Dashboard>
      <DashNav>
        <SideBar />
      </DashNav>
      <DashMain>
        <DashHeader>
          <DashHeaderDepartment>
            <DashHeaderTitle>Dashboard</DashHeaderTitle>
            <DashHeaderSearch>
              <SearchBox>
                <SearchInput type="text" placeholder="Search..."></SearchInput>
                <SearchIcon src="/icons/searchIcon.png" />
              </SearchBox>
            </DashHeaderSearch>
          </DashHeaderDepartment>
          <DepartmentIconContainer>
            <DepartmentIconImg src="/icons/Messages.png" />
            <DepartmentIconImg src="/icons/Notifications.png" />
            <DepartmentIconImg src="/icons/PersonIcon.png" />
          </DepartmentIconContainer>
        </DashHeader>
        <DepartmentFilterContainer>
          <DepartmentFilterdiv>
            {FilterData.map((data) => (
              <DepartmentFilterButton>{data}</DepartmentFilterButton>
            ))}
          </DepartmentFilterdiv>
          <AddNewButton onClick={handleOpen}>Add New</AddNewButton>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <ModalUpperDiv>
                <ModalHeading>Add New Department</ModalHeading>
                <ModalIcon
                  onClick={handleClose}
                  src="/icons/alert-circle.png"
                />
              </ModalUpperDiv>
              <ModalUpperMid>
                <Input placeholder="Department Name" value="" />
                <TextArea placeholder="Description" />
              </ModalUpperMid>
              <ModalBottom>
                <AddNewButton
                  onClick={() => {
                    handleOpenThanks();
                    handleClose();
                  }}
                >
                  Add New
                </AddNewButton>
                <CancelButton onClick={handleClose}>Cancel</CancelButton>
              </ModalBottom>
            </Box>
          </Modal>
          <Modal
            open={openThanks}
            onClose={handleCloseThanks}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <ModalThanks>
                <ModalThanksImg src="/images/success.jpg" />
                <ModalThanksHeading>
                  Department added successfully.
                </ModalThanksHeading>
                <AddNewButton onClick={handleCloseThanks}> Thanks</AddNewButton>
              </ModalThanks>
            </Box>
          </Modal>
        </DepartmentFilterContainer>
        <DepartmentCardContainer>
          {TempData.map((data) => (
            <DepartmentCardDiv>
              <DepartmentCardImg />
              <DepartmentCardPara>Department</DepartmentCardPara>
              <DepartmentCardParaLit>Web Development</DepartmentCardParaLit>
              <DepartmentButtonContainer>
                <DepartmentCardButtoncolor>
                  <img src="/icons/alert-circle-fill.png" />
                </DepartmentCardButtoncolor>
                <DepartmentCardButtongrey>
                  <img src="/icons/trash-2.png" />
                </DepartmentCardButtongrey>
              </DepartmentButtonContainer>
            </DepartmentCardDiv>
          ))}
          <DepartmentCardDiv>
            <DepartmentCardImg />
            <DepartmentCardPara>Department</DepartmentCardPara>
            <DepartmentCardParaLit>Web Development</DepartmentCardParaLit>
            <DepartmentButtonContainer>
              <DepartmentCardButtoncolor>
                <img src="/icons/alert-circle-fill.png" />
              </DepartmentCardButtoncolor>
              <DepartmentCardButtongrey>
                <img src="/icons/trash-2.png" />
              </DepartmentCardButtongrey>
            </DepartmentButtonContainer>
          </DepartmentCardDiv>
        </DepartmentCardContainer>
      </DashMain>
    </Dashboard>
  );
};

export default Departments;
