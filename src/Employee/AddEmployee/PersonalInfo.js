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
            <BodyHeaderTitle>Personal Information</BodyHeaderTitle>
          </BodyHeader>
          <BodyMain>
            <BodyMainHeading>Basic Information</BodyMainHeading>
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
                  <Input type="text" name="firstname" />
                  <Errors></Errors>
                </FlexColumnForm>
                <FlexColumnForm>
                  <InputLabel>
                    Last Name <InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input type="text" name="firstname" />
                  <Errors></Errors>
                </FlexColumnForm>
              </FlexContaierForm>

              <FlexContaierForm>
                <FlexColumnForm>
                  <InputLabel>
                    Address<InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input type="text" name="firstname" />
                  <Errors></Errors>
                </FlexColumnForm>
                <FlexColumnForm>
                  <InputLabel>
                    City<InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input type="text" name="firstname" />
                  <Errors></Errors>
                </FlexColumnForm>
              </FlexContaierForm>

              <FlexContaierForm>
                <FlexColumnForm>
                  <InputLabel>
                    Province <InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input type="text" name="firstname" />
                  <Errors></Errors>
                </FlexColumnForm>
                <FlexColumnForm>
                  <InputLabel>
                    Postal Code<InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input type="text" name="firstname" />
                  <Errors></Errors>
                </FlexColumnForm>
              </FlexContaierForm>
              <FlexContaierForm>
                <FlexColumnForm>
                  <InputLabel>
                    Home Phone <InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input type="text" name="firstname" />
                  <Errors></Errors>
                </FlexColumnForm>
                <FlexColumnForm>
                  <InputLabel>Personal (mobile)</InputLabel>
                  <Input type="text" name="firstname" />
                  <Errors></Errors>
                </FlexColumnForm>
              </FlexContaierForm>
              <FlexContaierForm>
                <FlexColumnForm>
                  <InputLabel>
                    Email-Personal <InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input type="text" name="firstname" />
                  <Errors></Errors>
                </FlexColumnForm>
                <FlexColumnForm>
                  <InputLabel>
                    Emergency Contact <InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input type="text" name="firstname" />
                  <Errors></Errors>
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
                    name="firstname"
                  />
                  <Errors></Errors>
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
                  <Input type="text" name="firstname" />
                  <Errors></Errors>
                </FlexColumnForm>
                <FlexColumnForm>
                  <InputLabel>
                    Date of Birth <InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input type="text" name="firstname" />
                  <Errors></Errors>
                </FlexColumnForm>
              </FlexContaierForm>
              <FlexContaierForm>
                <FlexColumnForm>
                  <InputLabel>
                    Sin <InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input type="text" name="firstname" />
                  <Errors></Errors>
                </FlexColumnForm>
                <FlexColumnForm>
                  <InputLabel>
                    Gender<InputSpan>*</InputSpan>
                  </InputLabel>
                  <Select name="requiredBcr">
                    <Option>Select</Option>
                    <Option value={"Male"}>Male</Option>
                    <Option value={"Female"}>Female</Option>
                  </Select>
                  <Errors></Errors>
                </FlexColumnForm>
              </FlexContaierForm>
            </FormContainer>
            <ButtonBlue>Continue</ButtonBlue>
          </BodyMain>
        </EmployeeBody>
      </EmployeeMain>
    </Employee>
  );
};

export default PersonalInfo;
