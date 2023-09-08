import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
  const [formData, setFormData] = useState([]);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  const onSubmit = (data) => {
    if (!errors) {
      Navigate("/add-new-employee/job-details");
      setFormData(data);
    }
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
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  {errors.firstname && (
                    <Errors>{errors.firstname?.message}</Errors>
                  )}
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
                  {errors.lastname && (
                    <Errors>{errors.lastname?.message}</Errors>
                  )}
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
                  {errors.address && <Errors>{errors.address?.message}</Errors>}
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
                  {errors.city && <Errors> {errors.city?.message} </Errors>}
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
                  {errors.province && (
                    <Errors> {errors.province?.message} </Errors>
                  )}
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
                  {errors.postalcode && (
                    <Errors>{errors.postalcode?.message}</Errors>
                  )}
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
                      validate: (fieldValue) => {
                        return (
                          (!isNaN(parseFloat(fieldValue)) &&
                            isFinite(fieldValue)) ||
                          "Invalid Home-Phone number "
                        );
                      },
                    })}
                  />
                  {errors.homephone && (
                    <Errors> {errors.homephone?.message} </Errors>
                  )}
                </FlexColumnForm>
                <FlexColumnForm>
                  <InputLabel>Personal (mobile)</InputLabel>
                  <Input
                    type="text"
                    {...register("peersonalmobile", {
                      validate: (fieldValue) => {
                        return (
                          (!isNaN(parseFloat(fieldValue)) &&
                            isFinite(fieldValue)) ||
                          "Invalid Mobile number contains a letters  "
                        );
                      },
                    })}
                  />
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
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email",
                      },
                    })}
                  />
                  {errors.email && <Errors> {errors.email?.message} </Errors>}
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
                  {errors.emergencycontact && (
                    <Errors> {errors.emergencycontact?.message} </Errors>
                  )}
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
                      validate: (fieldValue) => {
                        return (
                          (!isNaN(parseFloat(fieldValue)) &&
                            isFinite(fieldValue)) ||
                          "Invalid sin "
                        );
                      },
                    })}
                  />
                  {errors.emergencycontactnumber && (
                    <Errors> {errors.emergencycontactnumber?.message} </Errors>
                  )}
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
                  {errors.employee_id && (
                    <Errors> {errors.employee_id?.message} </Errors>
                  )}
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
                  {errors.birthdate && (
                    <Errors> {errors.birthdate?.message} </Errors>
                  )}
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
                      validate: (fieldValue) => {
                        return (
                          (!isNaN(parseFloat(fieldValue)) &&
                            isFinite(fieldValue)) ||
                          "Invalid sin "
                        );
                      },
                    })}
                  />
                  {errors.sin && <Errors> {errors.sin?.message} </Errors>}
                </FlexColumnForm>
                <FlexColumnForm>
                  <InputLabel>
                    Gender<InputSpan>*</InputSpan>
                  </InputLabel>
                  <Controller
                    name="gender"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select {...field}>
                        <Option>Select</Option>
                        <Option value={"Male"}>Male</Option>
                        <Option value={"Female"}>Female</Option>
                      </Select>
                    )}
                  />
                  {errors.gender && <Errors> Gender is required</Errors>}
                </FlexColumnForm>
              </FlexContaierForm>
            </FormContainer>
            <ButtonBlue
              type="submit"
              onClick={() => {
                handleSubmit(onSubmit);
              }}
            >
              Continue
            </ButtonBlue>
          </form>
        </BodyMain>
      </EmployeeBody>
      {/* <DevTool control={control} /> */}
    </>
  );
};

export default PersonalInfo;
