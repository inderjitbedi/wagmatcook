import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

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
  FlexContaierForm,
  FlexColumnForm,
  InputLabel,
  InputSpan,
  Input,
  Errors,
  ButtonBlue,
  ButtonGrey,
} from "./AddEmployeeStyles";
const Benefits = () => {

  const Navigate = useNavigate();

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
   Navigate("/add-new-employee/certificates-info")
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
      <EmployeeBody style={{ height: "75%" }}>
        <BodyHeader>
          <BodyHeaderTitle>
            <span
              style={{ color: "#8B8B8B", cursor: "pointer" }}
              onClick={() => Navigate("/add-new-employee/personal-info")}
            >
              {" "}
              Personal Information &#62;{" "}
            </span>{" "}
            <span
              style={{ color: "#8B8B8B", cursor: "pointer" }}
              onClick={() => Navigate("/add-new-employee/job-details")}
            >
              Job Details &#62;
            </span>{" "}
            Benefits
          </BodyHeaderTitle>
        </BodyHeader>
        <BodyMain>
          <BodyMainHeading style={{ marginBottom: "25px" }}>
            Benefits
          </BodyMainHeading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormContainer>
              {/* first name and last name  */}
              <FlexContaierForm>
                <FlexColumnForm>
                  <InputLabel>
                    Benefits Name<InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input
                    type="text"
                    {...register("benefitname", {
                      required: {
                        value: true,
                        message: "Benefit Name is Required",
                      },
                    })}
                  />

                  {errors.benefitname && (
                    <Errors>{errors.benefitname?.message}</Errors>
                  )}
                </FlexColumnForm>
                <FlexColumnForm>
                  <InputLabel>
                    Description <InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input
                    type="text"
                    {...register("description", {
                      required: {
                        value: true,
                        message: "Description is Required",
                      },
                    })}
                  />
                  {errors.description && (
                    <Errors>{errors.description?.message}</Errors>
                  )}
                </FlexColumnForm>
              </FlexContaierForm>

              <FlexContaierForm>
                <FlexColumnForm>
                  <InputLabel>
                    Start Date<InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input
                    type="date"
                    {...register("startdate", {
                      required: {
                        value: true,
                        message: " Start Date is Required",
                      },
                    })}
                  />
                  {errors.startdate && (
                    <Errors>{errors.startdate?.message}</Errors>
                  )}
                </FlexColumnForm>
                <FlexColumnForm>
                  <InputLabel>
                    End Date<InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input
                    type="date"
                    {...register("enddate", {
                      required: {
                        value: true,
                        message: "End Date is Required",
                      },
                      validate: (fieldValue) => {
                        const startDate = new Date(getValues("startdate"));
                        const endDate = new Date(fieldValue);
                        return (
                          startDate <= endDate ||
                          "End Date must not be earlier than Start Date"
                        );
                      },
                    })}
                  />
                  {errors.enddate && <Errors>{errors.enddate?.message}</Errors>}
                </FlexColumnForm>
              </FlexContaierForm>

              <FlexContaierForm>
                <FlexColumnForm>
                  <InputLabel>
                    Cost <InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input
                    type="text"
                    {...register("cost", {
                      required: {
                        value: true,
                        message: "Cost per week is Required",
                      },
                      validate: (fieldValue) => {
                        return (
                          (!isNaN(parseFloat(fieldValue)) &&
                            isFinite(fieldValue)) ||
                          "Invalid Cost"
                        );
                      },
                    })}
                  />
                  {errors.cost && <Errors>{errors.cost?.message}</Errors>}
                </FlexColumnForm>
                <FlexColumnForm>
                  <InputLabel>
                    Employee Contribution rate (%) <InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input
                    type="text"
                    {...register("rate", {
                      required: {
                        value: true,
                        message: "Employee Contribution rate is Required",
                      },
                      validate: (fieldValue) => {
                        return (
                          (!isNaN(parseFloat(fieldValue)) &&
                            isFinite(fieldValue)) ||
                          "Invalid Employee Contribution rate"
                        );
                      },
                    })}
                  />
                  {errors.rate && <Errors>{errors.rate?.message}</Errors>}
                </FlexColumnForm>
              </FlexContaierForm>
            </FormContainer>

            <FlexContaier>
              <ButtonGrey onClick={() => Navigate(-1)}>Back</ButtonGrey>
              <ButtonBlue
                type="submit"
                onClick={() => {
                  handleSubmit(onSubmit);
                }}
              >
                Continue
              </ButtonBlue>
            </FlexContaier>
          </form>
        </BodyMain>
      </EmployeeBody>
    </>
  );
};

export default Benefits;
