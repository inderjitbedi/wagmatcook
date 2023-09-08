import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useForm, Controller } from "react-hook-form";

import {
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
  padding: "0px 0px",
  borderRadius: "8px",
};
const EVDiscipline = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [detailsLength, setDetailsLength] = useState(500);
  const [formData, setFormData] = useState([]);

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
  return (
    <MainBodyContainer>
      <FlexSpaceBetween style={{ alignItems: "center" }}>
        <PersonalInfo>
          <PersonalImg src="/images/Oval Copy.jpg" />
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
            <BasicHeading>Disciplinary Details</BasicHeading>
            <AddNewButton onClick={handleOpen}>Add New Review</AddNewButton>
          </FlexSpaceBetween>
          {/* modal add disciplinary */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <ModalContainer style={{ padding: "10px 29px 10px 29px " }}>
                <ModalHeading>Add Disciplinary </ModalHeading>
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
                        Disciplinary Type <InputSpan>*</InputSpan>
                      </InputLabel>
                      <Input
                        type="text"
                        {...register("discipline", {
                          required: {
                            value: true,
                            message: "Disciplinary Type is Required",
                          },
                        })}
                      />
                      {errors.discipline && (
                        <Errors> {errors.discipline?.message}</Errors>
                      )}
                    </FlexColumnForm>
                  </FlexContaierForm>
                  <FlexContaierForm>
                    <FlexColumnForm>
                      <InputLabel>
                        Date <InputSpan>*</InputSpan>
                      </InputLabel>
                      <Input
                        type="date"
                        {...register("startdate", {
                          required: {
                            value: true,
                            message: "  Date is Required",
                          },
                        })}
                      />
                      {errors.startdate && (
                        <Errors>{errors.startdate?.message}</Errors>
                      )}
                    </FlexColumnForm>
                  </FlexContaierForm>
                  <FlexContaierForm>
                    <FlexColumnForm>
                      <InputLabel>
                        BCR<InputSpan>*</InputSpan>
                      </InputLabel>
                      <Input
                        type="text"
                        {...register("bcr", {
                          required: {
                            value: true,
                            message: "BCR is Required",
                          },
                        })}
                      />
                      {errors.bcr && <Errors> {errors.bcr?.message}</Errors>}
                    </FlexColumnForm>
                  </FlexContaierForm>
                  <FlexContaierForm>
                    <FlexColumnForm>
                      <InputLabel>
                        Exipiry Date<InputSpan>*</InputSpan>
                      </InputLabel>
                      <Input
                        type="date"
                        {...register("enddate", {
                          required: {
                            value: true,
                            message: " Exipiry Date is Required",
                          },

                          validate: (fieldValue) => {
                            const startDate = new Date(getValues("startdate"));
                            const endDate = new Date(fieldValue);
                            return (
                              startDate <= endDate ||
                              "Must not be earlier than Start Date"
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

          <BasicDetailsDiv style={{ width: "80%" }}>
            <TimelineDiv style={{ padding: "16px", marginBottom: "8px" }}>
              <FlexColumn style={{ width: "100%" }}>
                <FlexSpaceBetween style={{ marginBottom: "0px" }}>
                  <TitlePara>Completed By</TitlePara>
                  <TitlePara>Completed By</TitlePara>
                  <TitlePara>issues On: 15-04-2023</TitlePara>
                </FlexSpaceBetween>
                <FlexSpaceBetween style={{ marginBottom: "0px" }}>
                  <ViewPara
                    style={{
                      fontWeight: 700,
                      width: "35%",
                    }}
                  >
                    Verbal Warning
                  </ViewPara>{" "}
                  <ViewPara
                    style={{
                      fontWeight: 700,
                      width: "61%",
                    }}
                  >
                    Somethings
                  </ViewPara>
                </FlexSpaceBetween>

                <TimelinePara>
                  From a set of data, Hattie is able to establish a principle,
                  or work out a rule, or suggest a reason for failure or
                  success. Her analysis is always accurate and sometimes
                  original. No absences without valid reason in 6 months. Late
                  on fewer than 3 occasions in 6 months. Always assured and
                  confident in demeanour and presentation of ideas without being
                  aggressively over-confident.
                </TimelinePara>

                <ReviewsDiv>Next Review on: 15-07-2023</ReviewsDiv>
              </FlexColumn>
            </TimelineDiv>
            <TimelineDiv style={{ padding: "16px" }}>
              <FlexColumn style={{ width: "100%" }}>
                <FlexSpaceBetween style={{ marginBottom: "0px" }}>
                  <TitlePara>Completed By</TitlePara>
                  <TitlePara>Completed By</TitlePara>
                  <TitlePara>issues On: 15-04-2023</TitlePara>
                </FlexSpaceBetween>
                <FlexSpaceBetween style={{ marginBottom: "0px" }}>
                  <ViewPara
                    style={{
                      fontWeight: 700,
                      width: "35%",
                    }}
                  >
                    Verbal Warning
                  </ViewPara>{" "}
                  <ViewPara
                    style={{
                      fontWeight: 700,
                      width: "61%",
                    }}
                  >
                    Somethings
                  </ViewPara>
                </FlexSpaceBetween>

                <TimelinePara>
                  From a set of data, Hattie is able to establish a principle,
                  or work out a rule, or suggest a reason for failure or
                  success. Her analysis is always accurate and sometimes
                  original. No absences without valid reason in 6 months. Late
                  on fewer than 3 occasions in 6 months. Always assured and
                  confident in demeanour and presentation of ideas without being
                  aggressively over-confident.
                </TimelinePara>

                <ReviewsDiv>Next Review on: 15-07-2023</ReviewsDiv>
              </FlexColumn>
            </TimelineDiv>
          </BasicDetailsDiv>
        </BasicInfoDiv>
      </BasicInfoContainer>
    </MainBodyContainer>
  );
};

export default EVDiscipline;
