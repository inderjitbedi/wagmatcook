import React, {useState} from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
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
              <ModalFormContainer >
                <FlexContaierForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Disciplinary Type <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input type="text" name="firstname" />
                    <Errors></Errors>
                  </FlexColumnForm>
                </FlexContaierForm>
                <FlexContaierForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Date <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input type="text" name="firstname" />
                    <Errors></Errors>
                  </FlexColumnForm>
                </FlexContaierForm>
                <FlexContaierForm>
                  <FlexColumnForm>
                    <InputLabel>
                      BCR<InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input type="password" name="firstname" />
                    <Errors></Errors>
                  </FlexColumnForm>
                </FlexContaierForm>
                <FlexContaierForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Expiry Date<InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input type="password" name="firstname" />
                    <Errors></Errors>
                  </FlexColumnForm>
                </FlexContaierForm>
                <FlexContaierForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Details<InputSpan>*</InputSpan>
                    </InputLabel>
                    <TextArea type="text" name="description" />

                    <InputPara>
                      {" "}
                      <Errors></Errors> Max 500 characters
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
                <ButtonBlue>Submit</ButtonBlue>
              </ModalFormContainer>
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
