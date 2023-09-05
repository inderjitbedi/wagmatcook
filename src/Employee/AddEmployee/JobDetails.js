import React from "react";
import EmployeeSidebar from "./EmployeeSidebar";
import {
  Employee,
  EmployeeMain,
  EmployeeNav,
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
} from "./AddEmployeeStyles";

const JobDetails = () => {
  return (
    <Employee>
      <EmployeeNav>
        <EmployeeSidebar />
      </EmployeeNav>
      <EmployeeMain>
        <HeaderEmployee>
          <FlexContaier>
            <BackButton>
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
              <span style={{ color: "#8B8B8B" }}> Personal Information </span>
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
              <FlexContaierForm style={{ width: "50%",gap:"46px" }}>
                <AlignFlex>
                  <input
                    style={{ width: "" }}
                    type="checkbox"
                    name="firstname"
                  />
                  <InputLabel style={{ marginBottom: "0px" }}>
                    Is BEB Eligible?<InputSpan>*</InputSpan>
                  </InputLabel>
                </AlignFlex>

                <AlignFlex>
                  <input
                    style={{ width: "" }}
                    type="checkbox"
                    name="firstname"
                  />
                  <InputLabel style={{ marginBottom: "0px" }}>
                    Is Active <InputSpan>*</InputSpan>
                  </InputLabel>
                </AlignFlex>
              </FlexContaierForm>
            </FormContainer>

            <BodyMainHeading style={{ marginBottom: "25px",marginTop:"50px" }}>
              Position History
            </BodyMainHeading>
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
            </FormContainer>
            <BluePara> Add New Position</BluePara>
            <FlexContaier>
              <ButtonGrey>Back</ButtonGrey>
              <ButtonBlue>Continue</ButtonBlue>
            </FlexContaier>
          </BodyMain>
        </EmployeeBody>
      </EmployeeMain>
    </Employee>
  );
};

export default JobDetails;
