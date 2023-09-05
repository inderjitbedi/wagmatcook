import React from 'react'
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

} from "./AddEmployeeStyles";

const CertificatesInfo = () => {
  return (
    <Employee style={{height:"100vh"}}>
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
        <EmployeeBody style={{height:"75vh"}}>
          <BodyHeader>
            <BodyHeaderTitle>
              <span style={{ color: "#8B8B8B" }}>
                {" "}
                Personal Information &#62; Job Details &#62; Benefits{" "}
              </span> Certificates
            </BodyHeaderTitle>
          </BodyHeader>
          <BodyMain>
            <BodyMainHeading style={{ marginBottom: "25px" }}>
              Certificates Info
            </BodyMainHeading>
            <FormContainer>
              {/* first name and last name  */}
              <FlexContaierForm>
                <FlexColumnForm>
                  <InputLabel>
                    Certificates Title <InputSpan>*</InputSpan>
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
                  <Input type="text" name="firstname" />
                  <Errors></Errors>
                </FlexColumnForm>
                <FlexColumnForm>
                  <InputLabel>
                    Expiry <InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input type="text" name="firstname" />
                  <Errors></Errors>
                </FlexColumnForm>
              </FlexContaierForm>
            </FormContainer>

            <BluePara> Add New</BluePara>
            <FlexContaier>
              <ButtonGrey>Back</ButtonGrey>
              <ButtonBlue>Continue</ButtonBlue>
            </FlexContaier>
          </BodyMain>
        </EmployeeBody>
      </EmployeeMain>
    </Employee>
  );
}

export default CertificatesInfo