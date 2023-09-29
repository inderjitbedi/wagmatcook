import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  DashHeader,
  DashHeaderSearch,
  DashHeaderTitle,
  DashNotification,
  SearchBox,
  SearchIcon,
  SearchInput,
  BackButton,
  FlexContaier,
} from "../../Dashboard/OADashboard/OADashBoardStyles";
import {
  FlexColumn,
  FormContainer,
  HeadingGrey,
  Headingleave,
  LeaveActionHeader,
  LeaveIcon,
  Main,
  MainSub,
  PendingStyle,
  FlexContainer,
  HeaderDiv,
  ColumnFlexDiv,
  Titlelight,
  Titledark,
  HeadingDetail,
  TextArea,
  AddNewButton,
  Greypara,
} from "./ActionsStyles";
import LeaveActionModal from "./LeaveActionModal";

const ManagerLeaveAction = () => {
  const navigate = useNavigate();
  const [openDelete, setOpenDelete] = useState(false);
  const HandleOpenDelete = () => setOpenDelete(true);
  const HandleCloseDelete = () => setOpenDelete(false); 
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
      <DashHeader>
        <FlexContaier>
          <BackButton onClick={() => navigate(-1)}>
            <img src="/images/icons/ArrowLeft.svg" />
            Back
          </BackButton>
          <DashHeaderTitle>Leave Request</DashHeaderTitle>
        </FlexContaier>

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
        <MenuItem
          style={{
            color: "#222B45",
            fontFamily: "Inter",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "20px",
          }}
        >
          Settings
        </MenuItem>
        <MenuItem
          onClick={HandleLogout}
          style={{
            color: "#EA4335",
            fontFamily: "Inter",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "20px",
          }}
        >
          Logout
        </MenuItem>
      </Menu>
      <Main>
        <MainSub>
          <LeaveActionHeader>
            <LeaveIcon src="/images/User.jpg" />

            <FlexContainer>
              <HeaderDiv>
                <FlexColumn>
                  <Headingleave> Hattie Watkins</Headingleave>
                  <HeadingGrey>Design Department</HeadingGrey>
                </FlexColumn>
                <PendingStyle>Pending</PendingStyle>
              </HeaderDiv>
              <FormContainer>
                <ColumnFlexDiv>
                  <Titlelight>From</Titlelight>
                  <Titledark>23-09-2023</Titledark>
                </ColumnFlexDiv>
                <ColumnFlexDiv>
                  <Titlelight>To</Titlelight>
                  <Titledark>23-09-2023</Titledark>
                </ColumnFlexDiv>
              </FormContainer>
              <FormContainer>
                <ColumnFlexDiv>
                  <Titlelight>Leave Type</Titlelight>
                  <Titledark>sick</Titledark>
                </ColumnFlexDiv>
                <ColumnFlexDiv>
                  <Titlelight>Hours</Titlelight>
                  <Titledark>23</Titledark>
                </ColumnFlexDiv>
              </FormContainer>
              <FormContainer>
                <ColumnFlexDiv>
                  <Titlelight>Description</Titlelight>
                  <Titledark>
                    This is the reason text related to this leave request
                  </Titledark>
                </ColumnFlexDiv>
              </FormContainer>

              <HeadingDetail>Approval Details</HeadingDetail>

              <FormContainer style={{ marginBottom: "15px" }}>
                <ColumnFlexDiv>
                  <Titledark style={{ fontWeight: "600" }}>Comment</Titledark>
                  <TextArea type="text" />
                </ColumnFlexDiv>
              </FormContainer>
              <FormContainer>
                <AddNewButton onClick={HandleOpenDelete}> Approve</AddNewButton>
                <AddNewButton style={{ background: "#EA4335" }}>
                  Reject
                </AddNewButton>
              </FormContainer>
              <FormContainer>
                <Greypara>
                  Total Leave Balance:{" "}
                  <span style={{ color: "#222B45" }}> 655</span>
                </Greypara>
              </FormContainer>
            </FlexContainer>
          </LeaveActionHeader>
        </MainSub>
      </Main>
      <LeaveActionModal
        openDelete={openDelete}
        src="/svg/Calendar Mark.svg"
        message="You have approved this leave request and the user will be notified."
        HandleCloseDelete={HandleCloseDelete}
        // isLoading={isDeleting}
        // HandleDelete={HandleDelete}
      />
    </>
  );
};

export default ManagerLeaveAction;
