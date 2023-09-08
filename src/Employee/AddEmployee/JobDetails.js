import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

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
  Select,
  Option,
  ButtonGrey,
  BluePara,
  AlignFlex,
  DeleteIcon,
} from "./AddEmployeeStyles";

const JobDetails = () => {
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
      Navigate("/add-new-employee/benefits");
      setFormData(data);
    }
    console.log("form submmited", data);
  };

  const initialPosition = {
    positionTitle: "",
    department: "",
    from: "",
    to: "",
  };
  const [positions, setPositions] = useState([initialPosition]);
  const HandleAddPositions = () => {
    setPositions([...positions, initialPosition]);
  };
  const HandleRemovePosition = (index) => {
    const updatedPositions = [...positions];
    updatedPositions.splice(index, 1);
    setPositions(updatedPositions);
  };
  //  const handleInputChange = (index, field, value) => {
  //   const updatedPositions = [...positions];
  //   updatedPositions[index][field] = value;
  //   setPositions(updatedPositions);
  // };
  // onChange={(e) => handleInputChange(index, 'positionTitle', e.target.value)}
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
          <BodyHeaderTitle>
            <span
              style={{ color: "#8B8B8B", cursor: "pointer" }}
              onClick={() => Navigate("/add-new-employee/personal-info")}
            >
              {" "}
              Personal Information{" "}
            </span>
            &#62; Job Details
          </BodyHeaderTitle>
        </BodyHeader>
        <BodyMain>
          <BodyMainHeading style={{ marginBottom: "25px" }}>
            Job Details
          </BodyMainHeading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormContainer>
              <FlexContaierForm>
                <FlexColumnForm>
                  <InputLabel>
                    Department<InputSpan>*</InputSpan>
                  </InputLabel>
                  <Controller
                    name="department"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select {...field}>
                        <Option>Select</Option>
                        <Option value={"web"}>web developement</Option>
                        <Option value={"design"}>design </Option>
                      </Select>
                    )}
                  />
                  {errors.department && (
                    <Errors> Department is required </Errors>
                  )}
                </FlexColumnForm>
                <FlexColumnForm>
                  <InputLabel>
                    Position Title <InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input
                    type="text"
                    {...register("positiontitle", {
                      required: {
                        value: true,
                        message: "Position Title is Required",
                      },
                    })}
                  />
                  {errors.positiontitle && (
                    <Errors> {errors.positiontitle?.message}</Errors>
                  )}
                </FlexColumnForm>
              </FlexContaierForm>

              <FlexContaierForm>
                <FlexColumnForm>
                  <InputLabel>
                    Position Start Date<InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input
                    type="date"
                    {...register("startdate", {
                      required: {
                        value: true,
                        message: "  Position Start Date is Required",
                      },
                    })}
                  />
                  {errors.startdate && (
                    <Errors>{errors.startdate?.message}</Errors>
                  )}
                </FlexColumnForm>
                <FlexColumnForm>
                  <InputLabel>
                    Position End Date <InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input
                    type="date"
                    {...register("enddate", {
                      required: {
                        value: true,
                        message: "  Position End Date is Required",
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
                    Salary Scale From <InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input
                    type="text"
                    {...register("salaryfrom", {
                      required: {
                        value: true,
                        message: "salary scale is Required",
                      },
                    })}
                  />
                  {errors.salaryfrom && (
                    <Errors>{errors.salaryfrom?.message}</Errors>
                  )}
                </FlexColumnForm>
                <FlexColumnForm>
                  <InputLabel>
                    Salary Scale To<InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input
                    type="text"
                    {...register("salaryto", {
                      required: {
                        value: true,
                        message: "Salary Scale TO is Required",
                      },
                    })}
                  />
                  {errors.salaryto && (
                    <Errors>{errors.salaryto?.message}</Errors>
                  )}
                </FlexColumnForm>
              </FlexContaierForm>
              <FlexContaierForm>
                <FlexColumnForm>
                  <InputLabel>
                    Actual Salary amounts<InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input
                    type="text"
                    {...register("amount", {
                      required: {
                        value: true,
                        message: "Actual Salary amounts is Required",
                      },
                    })}
                  />
                  {errors.amount && <Errors>{errors.amount?.message}</Errors>}
                </FlexColumnForm>
                <FlexColumnForm>
                  <InputLabel>
                    Salary rate per
                    <InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input
                    type="text"
                    {...register("rateper", {
                      required: {
                        value: true,
                        message: " Salary rate per is Required",
                      },
                    })}
                  />
                  {errors.rateper && <Errors>{errors.rateper?.message}</Errors>}
                </FlexColumnForm>
              </FlexContaierForm>
              <FlexContaierForm>
                <FlexColumnForm>
                  <InputLabel>
                    Hours per week<InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input
                    type="text"
                    {...register("weekhours", {
                      required: {
                        value: true,
                        message: "Hours per week is Required",
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
                  {errors.weekhours && (
                    <Errors>{errors.weekhours?.message}</Errors>
                  )}
                </FlexColumnForm>
                <FlexColumnForm>
                  <InputLabel>
                    Reports to <InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input
                    type="text"
                    {...register("reportto", {
                      required: {
                        value: true,
                        message: "Report To is Required",
                      },
                    })}
                  />
                  {errors.reportto && (
                    <Errors>{errors.reportto?.message}</Errors>
                  )}
                </FlexColumnForm>
              </FlexContaierForm>
              <FlexContaierForm
                style={{ width: "50%", gap: "46px", marginTop: "16px" }}
              >
                <FlexColumnForm>
                  <AlignFlex>
                    <input type="checkbox" {...register("bebeligible", {})} />
                    <InputLabel style={{ marginBottom: "0px" }}>
                      Is BEB Eligible?<InputSpan>*</InputSpan>
                    </InputLabel>
                  </AlignFlex>
                  {errors.bebeligible && (
                    <Errors>{errors.bebeligible?.message}</Errors>
                  )}
                </FlexColumnForm>
                <FlexColumnForm>
                  <AlignFlex>
                    <input type="checkbox" />
                    <InputLabel style={{ marginBottom: "0px" }}>
                      Is Active <InputSpan>*</InputSpan>
                    </InputLabel>
                  </AlignFlex>
                </FlexColumnForm>
              </FlexContaierForm>
            </FormContainer>

            <BodyMainHeading
              style={{ marginBottom: "25px", marginTop: "50px" }}
            >
              Position History
            </BodyMainHeading>
            {positions.map((position, index) => (
              <FormContainer>
                <FlexContaierForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Position Title<InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input type="text" name="firstname" />
                    <Errors></Errors>
                  </FlexColumnForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Department <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input type="text" name="firstname" />
                    <Errors></Errors>
                  </FlexColumnForm>
                </FlexContaierForm>
                <FlexContaierForm>
                  <FlexColumnForm>
                    <InputLabel>
                      From<InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input type="text" name="firstname" />
                    <Errors></Errors>
                  </FlexColumnForm>
                  <FlexColumnForm>
                    <InputLabel>
                      To<InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input type="text" name="firstname" />
                    <Errors></Errors>
                  </FlexColumnForm>
                </FlexContaierForm>
                {positions.length > 1 && (
                  <DeleteIcon
                    onClick={() => HandleRemovePosition(index)}
                    src="/images/icons/Alert-Circle.svg"
                  />
                )}
              </FormContainer>
            ))}

            <FlexContaier>
              <BluePara onClick={HandleAddPositions}>
                {" "}
                Add New Position
              </BluePara>
            </FlexContaier>

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
      <DevTool control={control} />
    </>
  );
};

export default JobDetails;
