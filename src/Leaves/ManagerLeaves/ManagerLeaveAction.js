import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import httpClient from "../../api/httpClient";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import { useForm, Controller } from "react-hook-form";
import API_URLS from "../../constants/apiUrls";
import moment from "moment";
import ROLES from "../../constants/roles";

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
  InputPara,
  Errors,
  ApproveStyle,
  RejectedStyle,
} from "./ActionsStyles";
import LeaveActionModal from "./LeaveActionModal";

const ManagerLeaveAction = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userType, setUserType] = useState("");

  const { employeeid, requestid } = useParams();

  const [openDelete, setOpenDelete] = useState(false);
  const HandleOpenDelete = (action) => {
    if (action === "Approve") {
      setModalProps({
        src: "/svg/approve.svg",
        message:
          "You have approved this leave request and the user will be notified.",

        buttonValue: "Thanks",
      });
    } else if (action === "Reject") {
      setModalProps({
        src: "/svg/Calendar Mark.svg",
        message:
          "You have rejected this leave request and the user will be notified.",

        buttonValue: "Ok",
        // Add other props specific to the "Reject" action
      });
    }
    setOpenDelete(true);
  };
  const HandleCloseDelete = () => setOpenDelete(false);
  const [modalProps, setModalProps] = useState({});

  const [anchorEl, setAnchorEl] = useState(false);
  const openMenu = Boolean(anchorEl);
  const [comment, setComment] = useState("");
  const [commentError, setComentError] = useState("");
  const [detailsLength, setDetailsLength] = useState(500);
  const [leaveDetails, setLeaveDetails] = useState([]);
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
  const HandleChange = (e) => {
    const value = e.target.value;
    setDetailsLength(500 - value.length);
    if (value.length > 500) {
      setComentError("Comment exceeds  500 characters ");
    }
    setComment(value);
  };
  const [isLoading, setIsLoading] = useState(false);

  const GetLeaveDetails = () => {
    setIsLoading(true);
    let url = API_URLS.getLeaveDetails
      .replace(":employeeid", employeeid)
      .replace(":requestid", requestid);
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setLeaveDetails(result.request);
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        //console.error("Error:", error);
        toast.error("Error creating department. Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    GetLeaveDetails();
    if (location.pathname.indexOf("manager") > -1) {
      setUserType(ROLES.MANAGER);
    } else if (location.pathname.indexOf("hr") > -1) {
      setUserType(ROLES.HR);
    } else if (location.pathname.indexOf("user") > -1) {
      setUserType(ROLES.EMPLOYEE);
    }
  }, []);
  let API_URL = process.env.REACT_APP_API_URL;
  const HandleSubmitLeave = (isApproved) => {
    console.log("hitting submit api");
    // if (!commentError) {
    //   return;
    // }
    const data = {
      responderComment: comment,
      leaveType: leaveDetails?.leaveType?._id,
      isApproved: isApproved,
      status: isApproved ? "APPROVED" : "REJECTED",
    };
    setIsLoading(true);
    let dataCopy = { ...data };

    let url = API_URLS.respondLeave
      .replace(":employeeid", employeeid)
      .replace(":requestid", requestid);

    httpClient({
      method: "put",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          // toast.success(result.message);
          HandleOpenDelete(isApproved ? "Approve" : "Reject");
          //Entry Updated Successfully");
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        //console.error("Error:", error);
        //  toast.error("Error Updating Benefits . Please try again.");
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
            height: "380px",
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
                <LeaveIcon
                  src={
                    leaveDetails?.employee?.personalInfo?.photo
                      ? API_URL +
                        leaveDetails?.employee?.personalInfo?.photo.path
                      : "/images/User.jpg"
                  }
                />

                <FlexContainer>
                  <HeaderDiv>
                    <FlexColumn>
                      <Headingleave>
                        {leaveDetails?.employee?.personalInfo?.firstName +
                          (leaveDetails?.employee?.personalInfo.lastName
                            ? leaveDetails?.employee?.personalInfo.lastName
                            : " ")}
                      </Headingleave>
                      <HeadingGrey>Design Department</HeadingGrey>
                    </FlexColumn>
                    {leaveDetails?.status === "PENDING" ? (
                      <PendingStyle>{leaveDetails?.status}</PendingStyle>
                    ) : leaveDetails?.status === "APPROVED" ? (
                      <ApproveStyle>{leaveDetails?.status}</ApproveStyle>
                    ) : leaveDetails?.status === "REJECTED" ? (
                      <RejectedStyle>{leaveDetails?.status}</RejectedStyle>
                    ) : (
                      " - "
                    )}
                  </HeaderDiv>
                  <FormContainer>
                    <ColumnFlexDiv>
                      <Titlelight>From</Titlelight>
                      {leaveDetails.from
                        ? moment(leaveDetails.from).format("DD/MM/YYYY")
                        : " - "}
                      <Titledark> </Titledark>
                    </ColumnFlexDiv>
                    <ColumnFlexDiv>
                      <Titlelight>To</Titlelight>
                      <Titledark>
                        {" "}
                        {leaveDetails.to
                          ? moment(leaveDetails.to).format("DD/MM/YYYY")
                          : " - "}
                      </Titledark>
                    </ColumnFlexDiv>
                  </FormContainer>
                  <FormContainer>
                    <ColumnFlexDiv>
                      <Titlelight> {leaveDetails?.leaveType?.name} </Titlelight>
                      <Titledark>sick</Titledark>
                    </ColumnFlexDiv>
                    <ColumnFlexDiv>
                      <Titlelight>Hours</Titlelight>
                      <Titledark> {leaveDetails?.hours} </Titledark>
                    </ColumnFlexDiv>
                  </FormContainer>
                  <FormContainer>
                    <ColumnFlexDiv>
                      <Titlelight>Description</Titlelight>
                      <Titledark>{leaveDetails?.requesterComment}</Titledark>
                    </ColumnFlexDiv>
                  </FormContainer>

                  <HeadingDetail>Approval Details</HeadingDetail>

                  <FormContainer style={{ marginBottom: "15px" }}>
                    <ColumnFlexDiv>
                      <Titledark style={{ fontWeight: "600" }}>
                        Comment
                      </Titledark>
                      <TextArea
                        type="text"
                        name="responderComment"
                        onChange={HandleChange}
                      />
                      <InputPara>
                        {" "}
                        {<Errors>{commentError}</Errors>}{" "}
                        <span style={{ justifySelf: "flex-end" }}>
                          {" "}
                          {detailsLength > -1 ? detailsLength : 0} characters
                          left
                        </span>
                      </InputPara>
                    </ColumnFlexDiv>
                  </FormContainer>
                  <FormContainer>
                    <AddNewButton onClick={() => HandleSubmitLeave(true)}>
                      {" "}
                      Approve
                    </AddNewButton>
                    <AddNewButton
                      style={{ background: "#EA4335" }}
                      onClick={() => HandleSubmitLeave(false)}
                    >
                      Reject
                    </AddNewButton>
                  </FormContainer>
                  <FormContainer>
                    <Greypara>
                      Total Leave Balance:{" "}
                      <span style={{ color: "#222B45" }}>
                        {" "}
                        {leaveDetails?.leaveType?.maxCarryOver || " - "}
                      </span>
                    </Greypara>
                  </FormContainer>
                </FlexContainer>
              </LeaveActionHeader>
            </MainSub>
          </Main>
          <LeaveActionModal
            {...modalProps}
            openDelete={openDelete}
            HandleCloseDelete={HandleCloseDelete}
          />
        </>
      )}
    </>
  );
};

export default ManagerLeaveAction;
