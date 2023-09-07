import React, { useState} from "react";
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
  DeleteIcon
} from "./AddEmployeeStyles";


const CertificatesInfo = () => {

  const Navigate = useNavigate();
   const initialPosition = {
     certificateTitle: "",
     provider: "",
     completiondate: "",
     expiry: "",
  };
    const [positions, setPositions] = useState([initialPosition]);
  const HandleAddPositions = () => {
    setPositions([...positions, initialPosition]);
  };
  const HandleRemovePosition = (index) => {
    const updatedPositions = [...positions];
    updatedPositions.splice(index, 1);
    setPositions(updatedPositions);
  }
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
      <EmployeeBody style={{ height: "max-content" }}>
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
            </span>
            <span
              style={{ color: "#8B8B8B", cursor: "pointer" }}
              onClick={() => Navigate("/add-new-employee/benefits")}
            >
              {" "}
              Benefits &#62;{" "}
            </span>{" "}
            Certificates
          </BodyHeaderTitle>
        </BodyHeader>
        <BodyMain>
          <BodyMainHeading style={{ marginBottom: "25px" }}>
            Certificates Info
          </BodyMainHeading>
          {positions.map((position, index) => (
            <FormContainer>
              {positions.length > 1 && (
                <DeleteIcon
                  onClick={() => HandleRemovePosition(index)}
                  src="/images/icons/Alert-Circle.svg"
                />
              )}
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
          ))}

          <BluePara onClick={HandleAddPositions}> Add New</BluePara>
          <FlexContaier>
            <ButtonGrey onClick={() => Navigate(-1)}>Back</ButtonGrey>
            <ButtonBlue>Continue</ButtonBlue>
          </FlexContaier>
        </BodyMain>
      </EmployeeBody>
    </>
  );
};

export default CertificatesInfo;
