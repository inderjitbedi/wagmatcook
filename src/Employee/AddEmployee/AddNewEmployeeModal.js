import React, {useState} from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";

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
  box-sizing: border-box;
`;
const ModalHeading = styled.h1`
  color: #222b45;
  font-family: Inter;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
`;
const ModalIcon = styled.img`
width: 24px;
height: 24px;
display:inline-block;
cursor: pointer;
`;
const ModalFormContainer = styled.div`
  padding: 20px 29px 15px 29px;
  width: 100%;
  box-sizing: border-box;
`;
const AddNewEmployeeModal = ({ openEmployee, HandleCloseEmployee }) => {
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
    <Modal
      open={openEmployee}
      onClose={HandleCloseEmployee}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <ModalContainer>
          <ModalHeading>Add New Employee</ModalHeading>
          <ModalIcon
            onClick={HandleCloseEmployee}
            src="/images/icons/Alert-Circle.svg"
          />
        </ModalContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalFormContainer>
            <FlexContaierForm>
              <FlexColumnForm>
                <InputLabel>First Name</InputLabel>
                <Input
                  type="text"
                  {...register("firstname", {
                    required: {
                      value: true,
                      message: "First Name is Required",
                    },
                  })}
                />
                {errors.firstname && (
                  <Errors>{errors.firstname?.message}</Errors>
                )}
              </FlexColumnForm>
              <FlexColumnForm>
                <InputLabel>Last Name</InputLabel>
                <Input
                  type="text"
                  {...register("lastname", {
                    required: {
                      value: true,
                      message: "Last Name is Required",
                    },
                  })}
                />
                {errors.lastname && <Errors>{errors.lastname?.message}</Errors>}
              </FlexColumnForm>
            </FlexContaierForm>
            <FlexContaierForm>
              <FlexColumnForm>
                <InputLabel>Email Address</InputLabel>
                <Input
                  type="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is Required",
                    },
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email",
                    },
                  })}
                />
                {errors.email && <Errors> {errors.email?.message} </Errors>}
              </FlexColumnForm>
            </FlexContaierForm>
            <FlexContaierForm>
              <FlexColumnForm>
                <InputLabel>Passsword</InputLabel>
                <Input
                  type="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is Required",
                    },
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message: "Please enter a valid Password",
                    },
                  })}
                />
                {errors.password && <Errors> {errors.password?.message} </Errors>}
              </FlexColumnForm>
            </FlexContaierForm>
            <FlexContaierForm>
              <FlexColumnForm>
                <InputLabel>Confirm Password</InputLabel>
                <Input
                  type="password"
                  {...register("confirmpassword", {
                    required: {
                      value: true,
                      message: "Password is Required",
                    },
                    validate: (fieldValue) => {
                      const Password =String( getValues("password"));
                      const confirmPassword =String(fieldValue)
                      return (
                        Password !== confirmPassword ||
                        "Confirm password does not match to Password"
                      );
                    },
                  })}
                />
                {errors.confirmpassword && <Errors> {errors.confirmpassword?.message} </Errors>}
              </FlexColumnForm>
            </FlexContaierForm>
            <ButtonBlue type="submit">Submit</ButtonBlue>
          </ModalFormContainer>
        </form>
      </Box>
    </Modal>
  );
};

export default AddNewEmployeeModal;
