import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import httpClient from "../../api/httpClient";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import ROLES from "../../constants/roles";
import {
  Input,
  ButtonBlue,
  FlexContaierForm,
  FlexColumnForm,
  InputLabel,
  Errors,
  InputSpan,
} from "./AddEmployeeStyles";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "44.6rem",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 45,
  padding: "2rem 0rem",
  borderRadius: "0.8rem",
};
const ModalContainer = styled.div`
  padding: 2rem 2.9rem 1.5rem 2.9rem;

  border-bottom: 1px solid #f3f3f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`;
const ModalHeading = styled.h1`
  color: #222b45;
  font-family: Inter;
  font-size: 1.7rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.6rem;
`;
const ModalIcon = styled.img`
  width: 2.4rem;
  height: 2.4rem;
  display: inline-block;
  cursor: pointer;
`;
const ModalFormContainer = styled.div`
  padding: 2rem 2.9rem 1.5rem 2.9rem;
  width: 100%;
  box-sizing: border-box;
`;
const AddNewEmployeeModal = ({
  openEmployee,
  HandleCloseEmployee,
  userType,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const Navigate = useNavigate();
  const {
    register,
    clearErrors,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });

  // Add New Employee Post api  user name and email
  const HandleAddEmployee = (data) => {
    setIsLoading(true);

    let dataCopy = data;
  dataCopy.email = dataCopy.email.toLowerCase();
    let url = `/employee/add`;

    httpClient({
      method: "post",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          HandleCloseEmployee();
          if (userType === ROLES.ORG_ADMIN) {
            Navigate(
              `/organization-admin/employee/personal-info/${result.employee._id}`
            );
          } else if (userType === ROLES.HR) {
            Navigate(`/hr-management/personal-info/${result.employee._id}`);
          } else if (userType === ROLES.PAYROLL) {
            Navigate(
              `/payroll-management/personal-info/${result.employee._id}`
            );
          }
          reset();
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        toast.error("Error Adding Employee . Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onSubmit = (data) => {
    function isEmptyObject(obj) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          return false;
        }
      }
      return true;
    }
    if (isEmptyObject(errors)) {
      HandleAddEmployee(data);
    }
  };

  return (
    <Modal
      open={openEmployee}
      sx={{
        backgroundColor: "rgb(27, 27, 27, 0.75)",
        backdropFilter: "blur(8px)",
      }}
      // onClose={() => {
      //   HandleCloseEmployee();
      //   clearErrors();
      //   reset();
      // }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "30rem",
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
            <ModalContainer>
              <ModalHeading>Add New Employee</ModalHeading>
              <ModalIcon
                onClick={() => {
                  HandleCloseEmployee();
                  reset();
                  clearErrors();
                }}
                src="/images/icons/Alert-Circle.svg"
              />
            </ModalContainer>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalFormContainer>
                <FlexContaierForm>
                  <FlexColumnForm>
                    <InputLabel>
                      First Name <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="text"
                      {...register("firstName", {
                        required: {
                          value: true,
                          message: "Required",
                        },
                      })}
                    />
                    {errors.firstName && (
                      <Errors>{errors.firstName?.message}</Errors>
                    )}
                  </FlexColumnForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Last Name <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="text"
                      {...register("lastName", {
                        required: {
                          value: true,
                          message: "Required",
                        },
                      })}
                    />
                    {errors.lastName && (
                      <Errors>{errors.lastName?.message}</Errors>
                    )}
                  </FlexColumnForm>
                </FlexContaierForm>
                <FlexContaierForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Email Address <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="email"
                      {...register("email", {
                        required: {
                          value: true,
                          message: "Required",
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
                {/* <FlexContaierForm>
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
            </FlexContaierForm> */}
                <ButtonBlue style={{ marginTop: "2.5rem" }} type="submit">
                  Submit
                </ButtonBlue>
              </ModalFormContainer>
            </form>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default AddNewEmployeeModal;
