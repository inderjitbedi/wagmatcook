import React, { useState } from "react";
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
  padding: "20px 0px",
  borderRadius: "8px",
};

const EVCertificates = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <MainBodyContainer>
      <FlexSpaceBetween style={{ alignItems: "center" }}>
        <PersonalInfo>
          <PersonalImg src="/images/Oval Copy.jpg" />
          <FlexColumn style={{ gap: "5px" }}>
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
            <BasicHeading>Employee Certifications</BasicHeading>
            <AddNewButton onClick={handleOpen}>Add New</AddNewButton>
          </FlexSpaceBetween>
          {/* add new modal  */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <ModalContainer>
                <ModalHeading>New Certificate</ModalHeading>
                <ModalIcon
                  onClick={handleClose}
                  src="/images/icons/Alert-Circle.svg"
                />
              </ModalContainer>
              <ModalFormContainer>
                <FlexContaierForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Certificate Title <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input type="text" name="firstname" />
                    <Errors></Errors>
                  </FlexColumnForm>
                </FlexContaierForm>
                <FlexContaierForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Provider <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input type="text" name="firstname" />
                    <Errors></Errors>
                  </FlexColumnForm>
                </FlexContaierForm>
                <FlexContaierForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Completion Date<InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input type="password" name="firstname" />
                    <Errors></Errors>
                  </FlexColumnForm>
                </FlexContaierForm>
                <FlexContaierForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Exipiry<InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input type="password" name="firstname" />
                    <Errors></Errors>
                  </FlexColumnForm>
                </FlexContaierForm>
                <EditButton style={{marginBottom:"20px"}}>
                  {" "}
                  <ButtonIcon src="/images/icons/BlueUpload.svg" /> Upload
                  Documents
                </EditButton>
                <ButtonBlue>Submit</ButtonBlue>
              </ModalFormContainer>
            </Box>
          </Modal>
          {/*modal ends here  */}
          <BasicDetailsDiv>
            <FlexSpaceBetween>
              <FlexColumn>
                <TitlePara>Certificate Title</TitlePara>
                <ViewPara>Hattie</ViewPara>
              </FlexColumn>
              <FlexColumn>
                <TitlePara>Provider</TitlePara>
                <ViewPara>Watkins</ViewPara>
              </FlexColumn>
            </FlexSpaceBetween>
            <FlexSpaceBetween style={{ marginBottom: "70px" }}>
              <FlexColumn>
                <TitlePara>Completion Date</TitlePara>
                <ViewPara>15-08-2022</ViewPara>
              </FlexColumn>
              <FlexColumn>
                <TitlePara>Expriry </TitlePara>
                <ViewPara>Present</ViewPara>
              </FlexColumn>
            </FlexSpaceBetween>
          </BasicDetailsDiv>
        </BasicInfoDiv>
      </BasicInfoContainer>
    </MainBodyContainer>
  );
};

export default EVCertificates;
