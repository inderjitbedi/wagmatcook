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
 
  ButtonGrey,
  
} from "./AddEmployeeStyles";
const Benefits = () => {
  return (
    <Employee style={{ height: "100vh" }}>
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
        <EmployeeBody style={{ height: "75vh" }}>
          <BodyHeader>
            <BodyHeaderTitle>
              <span style={{ color: "#8B8B8B" }}>
                {" "}
                Personal Information &#62; Job Details &#62;{" "}
              </span>{" "}
              Benefits
            </BodyHeaderTitle>
          </BodyHeader>
          <BodyMain>
            <BodyMainHeading style={{ marginBottom: "25px" }}>
              Benefits
            </BodyMainHeading>
            <FormContainer>
              {/* first name and last name  */}
              <FlexContaierForm>
                <FlexColumnForm>
                  <InputLabel>
                    Benefits Name<InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input type="text" name="firstname" />

                  <Errors></Errors>
                </FlexColumnForm>
                <FlexColumnForm>
                  <InputLabel>
                    Description <InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input type="text" name="firstname" />
                  <Errors></Errors>
                </FlexColumnForm>
              </FlexContaierForm>

              <FlexContaierForm>
                <FlexColumnForm>
                  <InputLabel>
                    Start Date<InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input type="text" name="firstname" />
                  <Errors></Errors>
                </FlexColumnForm>
                <FlexColumnForm>
                  <InputLabel>
                    End Date<InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input type="text" name="firstname" />
                  <Errors></Errors>
                </FlexColumnForm>
              </FlexContaierForm>

              <FlexContaierForm>
                <FlexColumnForm>
                  <InputLabel>
                    Cost <InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input type="text" name="firstname" />
                  <Errors></Errors>
                </FlexColumnForm>
                <FlexColumnForm>
                  <InputLabel>
                    Employee Contribution rate (%) <InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input type="text" name="firstname" />
                  <Errors></Errors>
                </FlexColumnForm>
              </FlexContaierForm>
            </FormContainer>

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

export default Benefits;
