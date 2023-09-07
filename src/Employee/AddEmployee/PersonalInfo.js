import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useNavigate } from "react-router-dom";
import {
  HeaderEmployee,
  BackButton,
  FlexContaier,
  HeaderTitle,
  IconsEmployee,
  EmployeeBody,
  BodyHeader,
  BodyHeaderTitle,
  BodyMain,
  BodyMainHeading,
  FormContainer,
  ImgUpload,
  PersonImg,
  LightPara,
  UploadImgButton,
  FlexColumn,
  UploadPara,
  FlexContaierForm,
  FlexColumnForm,
  InputLabel,
  InputSpan,
  Input,
  Errors,
  ButtonBlue,
  Select,
  Option,
} from "./AddEmployeeStyles";

const PersonalInfo = () => {
  const Navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log("form submmited", data);
  };

  return (
    <>
      <HeaderEmployee>
        <FlexContaier>
          <BackButton onClick={() => Navigate(-1)}>
            {" "}
            <IconsEmployee src="/images/icons/ArrowLeft.svg" />
            Back
          </BackButton>
          <HeaderTitle>Add New Employee</HeaderTitle>
        </FlexContaier>
        <IconsEmployee src="/images/icons/Notifications.svg"></IconsEmployee>
      </HeaderEmployee>
      <EmployeeBody>
        <BodyHeader>
          <BodyHeaderTitle>Personal Information</BodyHeaderTitle>
        </BodyHeader>
        <BodyMain>
          <BodyMainHeading>Basic Information</BodyMainHeading>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormContainer>
              <ImgUpload>
                <PersonImg />
                <FlexColumn>
                  <FlexContaier>
                    <UploadImgButton>
                      {" "}
                      <IconsEmployee src="/images/icons/UploadIcon.svg" />{" "}
                      Upload image
                    </UploadImgButton>
                    <LightPara>Remove</LightPara>
                  </FlexContaier>
                  <UploadPara>
                    *png *jpeg up to 10MB at least 400px by 400px
                  </UploadPara>
                </FlexColumn>
              </ImgUpload>
              {/* first name and last name  */}

              <FlexContaierForm>
                <FlexColumnForm>
                  <InputLabel>
                    First Name <InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input
                    type="text"
                    {...register("firstname", {
                      required: {
                        value: true,
                        message: "First Name is Required",
                      },
                    })}
                  />
                  <Errors>{errors.firstname?.message}</Errors>
                </FlexColumnForm>
                <FlexColumnForm>
                  <InputLabel>
                    Last Name <InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input
                    type="text"
                    {...register("lastname", {
                      required: {
                        value: true,
                        message: "Last Name is Required",
                      },
                    })}
                  />
                  <Errors>{errors.lastname?.message}</Errors>
                </FlexColumnForm>
              </FlexContaierForm>

              <FlexContaierForm>
                <FlexColumnForm>
                  <InputLabel>
                    Address<InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input
                    type="text"
                    {...register("address", {
                      required: {
                        value: true,
                        message: "Address is Required",
                      },
                    })}
                  />
                  <Errors>{errors.address?.message}</Errors>
                </FlexColumnForm>
                <FlexColumnForm>
                  <InputLabel>
                    City<InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input
                    type="text"
                    {...register("city", {
                      required: {
                        value: true,
                        message: "City is Required",
                      },
                    })}
                  />
                  <Errors> {errors.city?.message} </Errors>
                </FlexColumnForm>
              </FlexContaierForm>

              <FlexContaierForm>
                <FlexColumnForm>
                  <InputLabel>
                    Province <InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input
                    type="text"
                    {...register("province", {
                      required: {
                        value: true,
                        message: "Province is Required",
                      },
                    })}
                  />
                  <Errors> {errors.province?.message} </Errors>
                </FlexColumnForm>
                <FlexColumnForm>
                  <InputLabel>
                    Postal Code<InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input
                    type="text"
                    {...register("postalcode", {
                      required: {
                        value: true,
                        message: "Postal Code is Required",
                      },
                    })}
                  />
                  <Errors>{errors.postalcode?.message}</Errors>
                </FlexColumnForm>
              </FlexContaierForm>
              <FlexContaierForm>
                <FlexColumnForm>
                  <InputLabel>
                    Home Phone <InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input
                    type="text"
                    {...register("homephone", {
                      required: {
                        value: true,
                        message: "Home Phone is Required",
                      },
                    })}
                  />
                  <Errors> {errors.homephone?.message} </Errors>
                </FlexColumnForm>
                <FlexColumnForm>
                  <InputLabel>Personal (mobile)</InputLabel>
                  <Input type="text" {...register("peersonalmobile")} />
                  <Errors></Errors>
                </FlexColumnForm>
              </FlexContaierForm>
              <FlexContaierForm>
                <FlexColumnForm>
                  <InputLabel>
                    Email-Personal <InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input
                    type="text"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Email is Required",
                      },
                    })}
                  />
                  <Errors> {errors.email?.message} </Errors>
                </FlexColumnForm>
                <FlexColumnForm>
                  <InputLabel>
                    Emergency Contact <InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input
                    type="text"
                    {...register("emergencycontact", {
                      required: {
                        value: true,
                        message: "Emergency Contact is Required",
                      },
                    })}
                  />
                  <Errors> {errors.emergencycontact?.message} </Errors>
                </FlexColumnForm>
              </FlexContaierForm>
              <FlexContaierForm>
                <FlexColumnForm>
                  <InputLabel>
                    Emergency Contact number <InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input
                    style={{ width: "50%" }}
                    type="text"
                    {...register("emergencycontactnumber", {
                      required: {
                        value: true,
                        message: "Emergency Contact Number is Required",
                      },
                    })}
                  />
                  <Errors> {errors.emergencycontactnumber?.message} </Errors>
                </FlexColumnForm>
              </FlexContaierForm>
            </FormContainer>
            <BodyMainHeading style={{ marginBottom: "25px" }}>
              Personal Information
            </BodyMainHeading>
            <FormContainer>
              <FlexContaierForm>
                <FlexColumnForm>
                  <InputLabel>
                    Employee ID <InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input
                    type="text"
                    {...register("employee_id", {
                      required: {
                        value: true,
                        message: "Employee Id is Required",
                      },
                    })}
                  />
                  <Errors> {errors.employee_id?.message} </Errors>
                </FlexColumnForm>
                <FlexColumnForm>
                  <InputLabel>
                    Date of Birth <InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input
                    type="date"
                    {...register("birthdate", {
                      required: {
                        value: true,
                        message: "Date is Required",
                      },
                    })}
                  />
                  <Errors> {errors.birthdate?.message} </Errors>
                </FlexColumnForm>
              </FlexContaierForm>
              <FlexContaierForm>
                <FlexColumnForm>
                  <InputLabel>
                    Sin <InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input
                    type="text"
                    {...register("sin", {
                      required: {
                        value: true,
                        message: "Sin is Required",
                      },
                    })}
                  />
                  <Errors> {errors.sin?.message} </Errors>
                </FlexColumnForm>
                <FlexColumnForm>
                  <InputLabel>
                    Gender<InputSpan>*</InputSpan>
                  </InputLabel>
                  <Select
                    {...register("gender", {
                      required: {
                        value: true,
                        message: "Gender is Required",
                      },
                    })}
                  >
                 
                    <Option value={"Male"}>Male</Option>
                    <Option value={"Female"}>Female</Option>
                  </Select>
                  <Errors>{errors.gender?.message}</Errors>
                </FlexColumnForm>
              </FlexContaierForm>
            </FormContainer>
            <ButtonBlue
              // type="submit"
                onClick={() => {
              // handleSubmit(onSubmit)
              Navigate("/add-new-employee/job-details")
              console.log("click is happing")
              }}
            >
              Continue
            </ButtonBlue>
          </form>
        </BodyMain>
      </EmployeeBody>
      <DevTool control={control} />
    </>
  );
};

export default PersonalInfo;
