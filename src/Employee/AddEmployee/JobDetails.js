import React, { useState } from "react";
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
              style={{ color: "#8B8B8B" }}
              onClick={() => Navigate("/PersonalInfo")}
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
          <FormContainer>
            {/* first name and last name  */}
            <FlexContaierForm>
              <FlexColumnForm>
                <InputLabel>
                  Department<InputSpan>*</InputSpan>
                </InputLabel>
                <Select name="requiredBcr">
                  <Option>Select</Option>
                  <Option value={"Male"}>Male</Option>
                  <Option value={"Female"}>Female</Option>
                </Select>
                <Errors></Errors>
              </FlexColumnForm>
              <FlexColumnForm>
                <InputLabel>
                  Position Title <InputSpan>*</InputSpan>
                </InputLabel>
                <Input type="text" name="firstname" />
                <Errors></Errors>
              </FlexColumnForm>
            </FlexContaierForm>

            <FlexContaierForm>
              <FlexColumnForm>
                <InputLabel>
                  Position Start Date<InputSpan>*</InputSpan>
                </InputLabel>
                <Input type="text" name="firstname" />
                <Errors></Errors>
              </FlexColumnForm>
              <FlexColumnForm>
                <InputLabel>
                  Position End Date <InputSpan>*</InputSpan>
                </InputLabel>
                <Input type="text" name="firstname" />
                <Errors></Errors>
              </FlexColumnForm>
            </FlexContaierForm>

            <FlexContaierForm>
              <FlexColumnForm>
                <InputLabel>
                  Salary Scale From <InputSpan>*</InputSpan>
                </InputLabel>
                <Input type="text" name="firstname" />
                <Errors></Errors>
              </FlexColumnForm>
              <FlexColumnForm>
                <InputLabel>
                  Salary Scale To<InputSpan>*</InputSpan>
                </InputLabel>
                <Input type="text" name="firstname" />
                <Errors></Errors>
              </FlexColumnForm>
            </FlexContaierForm>
            <FlexContaierForm>
              <FlexColumnForm>
                <InputLabel>
                  Actual Salary amounts<InputSpan>*</InputSpan>
                </InputLabel>
                <Input type="text" name="firstname" />
                <Errors></Errors>
              </FlexColumnForm>
              <FlexColumnForm>
                <InputLabel>
                  Salary rate per
                  <InputSpan>*</InputSpan>
                </InputLabel>
                <Input type="text" name="firstname" />
                <Errors></Errors>
              </FlexColumnForm>
            </FlexContaierForm>
            <FlexContaierForm>
              <FlexColumnForm>
                <InputLabel>
                  Hours per week<InputSpan>*</InputSpan>
                </InputLabel>
                <Input type="text" name="firstname" />
                <Errors></Errors>
              </FlexColumnForm>
              <FlexColumnForm>
                <InputLabel>
                  Reports to <InputSpan>*</InputSpan>
                </InputLabel>
                <Input type="text" name="firstname" />
                <Errors></Errors>
              </FlexColumnForm>
            </FlexContaierForm>
            <FlexContaierForm style={{ width: "50%", gap: "46px" }}>
              <AlignFlex>
                <input style={{ width: "" }} type="checkbox" name="firstname" />
                <InputLabel style={{ marginBottom: "0px" }}>
                  Is BEB Eligible?<InputSpan>*</InputSpan>
                </InputLabel>
              </AlignFlex>

              <AlignFlex>
                <input style={{ width: "" }} type="checkbox" name="firstname" />
                <InputLabel style={{ marginBottom: "0px" }}>
                  Is Active <InputSpan>*</InputSpan>
                </InputLabel>
              </AlignFlex>
            </FlexContaierForm>
          </FormContainer>

          <BodyMainHeading style={{ marginBottom: "25px", marginTop: "50px" }}>
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
            <BluePara onClick={HandleAddPositions}> Add New Position</BluePara>
          </FlexContaier>

          <FlexContaier>
            <ButtonGrey onClick={() => Navigate(-1)}>Back</ButtonGrey>
            <ButtonBlue onClick={() => Navigate("/Benefits")}>
              Continue
            </ButtonBlue>
          </FlexContaier>
        </BodyMain>
      </EmployeeBody>
    </>
  );
};

export default JobDetails;
