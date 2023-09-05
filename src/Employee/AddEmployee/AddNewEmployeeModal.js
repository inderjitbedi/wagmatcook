import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import {
  Input,
  ButtonBlue,
  FlexContaierForm,
  FlexColumnForm,
  InputLabel,
  Errors,
} from "./AddEmployeeStyles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 446,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 45,
  padding: "20px 0px",
  borderRadius: "8px",
};
const ModalContainer = styled.div`
  padding: 20px 12px 15px 29px;
  border-bottom: 1px solid #f3f3f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ModalHeading = styled.h1`
  color: #222b45;
  font-family: Inter;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
`;
const ModalIcon = styled`
width: 24px;
height: 24px;
display:inline-block;
`;
const ModalFormContainer = styled.div`
  padding: 20px 29px 15px 29px;
  width: 100%;
`;
const AddNewEmployeeModal = () => {
  return (
    <Modal
      // open={openDelete}
      // onClose={HandleCloseDelete}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <ModalContainer>
          <ModalHeading>Add New Employee</ModalHeading>
          <ModalIcon src="/images/icons/Alert-Circle.svg" />
        </ModalContainer>
        <ModalFormContainer>
          <FlexContaierForm>
            <FlexColumnForm>
              <InputLabel>First Name</InputLabel>
              <Input type="text" name="firstname" />
              <Errors></Errors>
            </FlexColumnForm>
            <FlexColumnForm>
              <InputLabel>Last Name</InputLabel>
              <Input type="text" name="firstname" />
              <Errors></Errors>
            </FlexColumnForm>
          </FlexContaierForm>
          <FlexContaierForm>
            <FlexColumnForm>
              <InputLabel>Email Address</InputLabel>
              <Input type="email" name="firstname" />
              <Errors></Errors>
            </FlexColumnForm>
          </FlexContaierForm>
          <FlexContaierForm>
            <FlexColumnForm>
              <InputLabel>Passsword</InputLabel>
              <Input type="password" name="firstname" />
              <Errors></Errors>
            </FlexColumnForm>
          </FlexContaierForm>
          <FlexContaierForm>
            <FlexColumnForm>
              <InputLabel>Confirm Password</InputLabel>
              <Input type="password" name="firstname" />
              <Errors></Errors>
            </FlexColumnForm>
          </FlexContaierForm>
          <ButtonBlue>Submit</ButtonBlue>
        </ModalFormContainer>
      </Box>
    </Modal>
  );
};

export default AddNewEmployeeModal;
