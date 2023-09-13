import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";
import "./Employee.css";
import { useForm } from "react-hook-form";

import {
  IconsEmployee,
  MainBodyContainer,
  PersonalInfo,
  PersonalImg,
  FlexColumn,
  PersonalName,
  PersonalTitle,
  PersonalDepartment,
  BasicInfoContainer,
  FlexSpaceBetween,
  BasicHeading,
  EditButton,
  ButtonIcon,
  BasicInfoDiv,
  BasicDetailsDiv,
  TitlePara,
  ViewPara,
  TimelineDiv,
  TimelinePara,
  File,
  ReviewsDiv,
  AddNewButton,
  Input,
  ButtonBlue,
  FlexContaierForm,
  FlexColumnForm,
  InputLabel,
  Errors,
  ModalHeading,
  ModalContainer,
  ModalIcon,
  ModalFormContainer,
  InputSpan,
  TextArea,
  InputPara,
} from "./ViewEmployeeStyle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 446,
  bgcolor: "background.paper",
  border: "1px solid #EFF4FA",
  boxShadow: 45,
  padding: "8px 0px",
  borderRadius: "8px",
};
const EVPerformance = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openFollow, setOpenFollow] = useState(false);
  const handleOpenFollow = () => setOpenFollow(true);
  const handleCloseFollow = () => setOpenFollow(false);
  const [formData, setFormData] = useState([]);
  const [detailsLength, setDetailsLength] = useState(500);
  const [followLength, setFollowLength] = useState(500);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({ mode: "all" });

  const onSubmit = (data) => {
    if (!errors) {
      setFormData(data);
    }
    console.log("form submmited", data);
  };
   const onSubmitFollow = (data) => {
    if (!errors) {
      setFormData(data);// chnage the sate when you use it 
    }
    console.log("form submmited", data);
  };
  return (
    <MainBodyContainer>
      <FlexSpaceBetween style={{ alignItems: "center" }}>
        <PersonalInfo>
          <PersonalImg src="/images/User.jpg" />
          <FlexColumn>
            <PersonalName>Hattie Watkins</PersonalName>
            <PersonalTitle>Team Manager</PersonalTitle>
            <PersonalDepartment>Design Department</PersonalDepartment>
          </FlexColumn>
        </PersonalInfo>

        <EditButton style={{ marginRight: "54px" }}>
          <ButtonIcon src="/images/icons/Pen 2.svg" />
          Edit
        </EditButton>
      </FlexSpaceBetween>

      <BasicInfoContainer>
        <BasicInfoDiv>
          <FlexSpaceBetween style={{ marginBottom: "10px" }}>
            <BasicHeading>Reviews</BasicHeading>
            <AddNewButton onClick={handleOpen}>Add New Review</AddNewButton>
          </FlexSpaceBetween>
          {/* modal t add new review  */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <ModalContainer style={{ paddingTop: "8px" }}>
                <ModalHeading>Add Review </ModalHeading>
                <ModalIcon
                  onClick={handleClose}
                  src="/images/icons/Alert-Circle.svg"
                />
              </ModalContainer>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalFormContainer>
                  <FlexContaierForm>
                    <FlexColumnForm>
                      <InputLabel>
                        Date of Review <InputSpan>*</InputSpan>
                      </InputLabel>
                      <Input
                        type="date"
                        {...register("date", {
                          required: {
                            value: true,
                            message: "  Date is Required",
                          },
                        })}
                      />
                      {errors.startdate && (
                        <Errors>{errors.date?.message}</Errors>
                      )}
                    </FlexColumnForm>
                  </FlexContaierForm>
                  <FlexContaierForm>
                    <FlexColumnForm>
                      <InputLabel>
                        Completed By <InputSpan>*</InputSpan>
                      </InputLabel>
                      <Input
                        type="date"
                        {...register("enddate", {
                          required: {
                            value: true,
                            message: "Completion  Date is Required",
                          },

                          validate: (fieldValue) => {
                            const startDate = new Date(getValues("date"));
                            const endDate = new Date(fieldValue);
                            return (
                              startDate <= endDate ||
                              "Completion Date must not be earlier than Start Date"
                            );
                          },
                        })}
                      />
                      {errors.enddate && (
                        <Errors>{errors.enddate?.message}</Errors>
                      )}
                    </FlexColumnForm>
                  </FlexContaierForm>
                  <FlexContaierForm>
                    <FlexColumnForm>
                      <InputLabel>
                        Details<InputSpan>*</InputSpan>
                      </InputLabel>
                      <TextArea
                        type="text"
                        {...register("details", {
                          required: {
                            value: true,
                            message: " Details is Required",
                          },
                          maxLength: {
                            value: 500,
                            message:
                              "Details exceeds the maximum length of 500 characters ",
                          },
                          minLength: {
                            value: 10,
                            message: "Atleast write  10 characters ",
                          },
                          onChange: (value) => {
                            setDetailsLength(500 - value.target.value.length);
                          },
                        })}
                      />
                      <InputPara>
                        {" "}
                        {<Errors>{errors.details?.message}</Errors>}{" "}
                        <span style={{ justifySelf: "flex-end" }}>
                          {" "}
                          Max {detailsLength} characters
                        </span>
                      </InputPara>
                    </FlexColumnForm>
                  </FlexContaierForm>
                  <FlexContaierForm>
                    <FlexColumnForm>
                      <InputLabel>
                        Date of Next Review<InputSpan>*</InputSpan>
                      </InputLabel>
                      <Input
                        type="date"
                        {...register("nextdate", {
                          required: {
                            value: true,
                            message: "Next Review  Date is Required",
                          },

                          validate: (fieldValue) => {
                            const startDate = new Date(getValues("date"));
                            const endDate = new Date(fieldValue);
                            return (
                              startDate <= endDate ||
                              "Next Review must not be earlier than Start Date"
                            );
                          },
                        })}
                      />
                      {errors.nextdate && (
                        <Errors>{errors.nextdate?.message}</Errors>
                      )}
                    </FlexColumnForm>
                  </FlexContaierForm>
                  <EditButton
                    style={{ marginBottom: "20px", borderRadius: "8px" }}
                  >
                    {" "}
                    <ButtonIcon src="/images/icons/BlueUpload.svg" /> Upload
                    Documents
                  </EditButton>
                  <ButtonBlue type="submit">Submit</ButtonBlue>
                </ModalFormContainer>
              </form>
            </Box>
          </Modal>
          {/*modal ends here  */}

          <BasicDetailsDiv>
            {/* dot and circle  */}
            <VerticalTimeline
              layout={"1-column-left"}
              lineColor={"#EFF4FA"}
              style={{
                padding: "0px",
                margin: "0px",
                maxWidth: "100%",
              }}
            >
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  outine: "none",
                  boxShadow: "none",
                  border: "none",
                }}
                iconStyle={{
                  width: "18px",
                  height: "18px",
                  background: "#fff",
                  border: "1.5px solid #8F9BB3",
                  borderRadius: "50%",
                  boxShadow: "none",
                  outine: "none",
                  marginLeft: "10px",
                }}
                intersectionObserverProps={{
                  margin: "0px 0px 0px 0px",
                }}
                style={{ margin: "0px" }}
              >
                <TimelineDiv style={{ padding: "16px" }}>
                  <FlexColumn style={{ width: "100%" }}>
                    <FlexSpaceBetween style={{ marginBottom: "0px" }}>
                      <TitlePara>Completed By</TitlePara>
                      <TitlePara>Date of Review: 15-04-2023</TitlePara>
                    </FlexSpaceBetween>
                    <ViewPara
                      style={{
                        color: "#222B45",
                        fontFamily: "Inter",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 700,
                        lineHeight: "1px",
                      }}
                    >
                      Tom Holland
                    </ViewPara>
                    <TimelinePara>
                      From a set of data, Hattie is able to establish a
                      principle, or work out a rule, or suggest a reason for
                      failure or success. Her analysis is always accurate and
                      sometimes original. No absences without valid reason in 6
                      months. Late on fewer than 3 occasions in 6 months. Always
                      assured and confident in demeanour and presentation of
                      ideas without being aggressively over-confident.
                    </TimelinePara>
                    <FlexSpaceBetween>
                      <File>
                        {" "}
                        <IconsEmployee src="/images/icons/File Text.svg" />{" "}
                        file_5fSSSS_01_11_2015.pdf
                      </File>
                      <AddNewButton onClick={handleOpenFollow}>
                        Add Follow-up
                      </AddNewButton>
                    </FlexSpaceBetween>
                    <ReviewsDiv>Next Review on: 15-07-2023</ReviewsDiv>
                  </FlexColumn>
                </TimelineDiv>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  outine: "none",
                  boxShadow: "none",
                  border: "none",
                }}
                iconStyle={{
                  width: "18px",
                  height: "18px",
                  background: "#fff",
                  border: "1.5px solid #8F9BB3",
                  borderRadius: "50%",
                  boxShadow: "none",
                  outine: "none",
                  marginLeft: "10px",
                }}
                intersectionObserverProps={{
                  margin: "0px 0px 0px 0px",
                }}
                style={{ margin: "0px" }}
              >
                <TimelineDiv style={{ padding: "16px" }}>
                  <FlexColumn style={{ width: "100%" }}>
                    <FlexSpaceBetween>
                      <TitlePara>Completed By</TitlePara>
                      <TitlePara>Date of Review: 15-04-2023</TitlePara>
                    </FlexSpaceBetween>
                    <ViewPara>Tom Holland</ViewPara>
                    <TimelinePara>
                      From a set of data, Hattie is able to establish a
                      principle, or work out a rule, or suggest a reason for
                      failure or success. Her analysis is always accurate and
                      sometimes original. No absences without valid reason in 6
                      months. Late on fewer than 3 occasions in 6 months. Always
                      assured and confident in demeanour and presentation of
                      ideas without being aggressively over-confident.
                    </TimelinePara>
                    <File>
                      {" "}
                      <IconsEmployee src="/images/icons/File Text.svg" />{" "}
                      file_5fSSSS_01_11_2015.pdf
                    </File>
                    <ReviewsDiv>Next Review on: 15-07-2023</ReviewsDiv>
                  </FlexColumn>
                </TimelineDiv>
              </VerticalTimelineElement>
              {/* add follow uo modal is here */}
              <Modal
                open={openFollow}
                onClose={handleCloseFollow}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <ModalContainer>
                    <ModalHeading>Add Follow-up </ModalHeading>
                    <ModalIcon
                      onClick={handleCloseFollow}
                      src="/images/icons/Alert-Circle.svg"
                    />
                  </ModalContainer>
                  <form onSubmit={handleSubmit(onSubmitFollow)}>
                    <ModalFormContainer>
                      <FlexContaierForm>
                        <FlexColumnForm>
                          <InputLabel>
                            Follow-up Date <InputSpan>*</InputSpan>
                          </InputLabel>
                          <Input
                            type="date"
                            {...register("followdate", {
                              required: {
                                value: true,
                                message: "  Date is Required",
                              },
                            })}
                          />
                          {errors.followdate && (
                            <Errors>{errors.followdate?.message}</Errors>
                          )}{" "}
                        </FlexColumnForm>
                      </FlexContaierForm>

                      <FlexContaierForm>
                        <FlexColumnForm>
                          <InputLabel>
                            Details<InputSpan>*</InputSpan>
                          </InputLabel>
                          <TextArea
                            type="text"
                            {...register("detailsfollow", {
                              required: {
                                value: true,
                                message: " Details is Required",
                              },
                              maxLength: {
                                value: 500,
                                message:
                                  "Details exceeds the maximum length of 500 characters ",
                              },
                              minLength: {
                                value: 10,
                                message: "Atleast write  10 characters ",
                              },
                              onChange: (value) => {
                                setFollowLength(
                                  500 - value.target.value.length
                                );
                              },
                            })}
                          />

                          <InputPara>
                            {" "}
                            {
                              <Errors>{errors.detailsfollow?.message}</Errors>
                            }{" "}
                            <span style={{ justifySelf: "flex-end" }}>
                              {" "}
                              Max {followLength} characters
                            </span>
                          </InputPara>
                        </FlexColumnForm>
                      </FlexContaierForm>

                      <ButtonBlue type= "submit">Submit</ButtonBlue>
                    </ModalFormContainer>
                  </form>
                </Box>
              </Modal>
            </VerticalTimeline>
          </BasicDetailsDiv>
        </BasicInfoDiv>
      </BasicInfoContainer>
    </MainBodyContainer>
  );
};

export default EVPerformance;
