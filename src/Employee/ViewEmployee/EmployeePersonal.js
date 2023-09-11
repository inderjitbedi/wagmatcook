import React,{useState,useEffect} from "react";
import { useNavigate,useParams } from "react-router-dom";
import httpClient from "../../api/httpClient";
import { toast } from "react-toastify";


import {
  MainBodyContainer,
  PersonalInfo,
  PersonalImg,
  FlexColumn,
  PersonalName,
  PersonalTitle,
  PersonalDepartment,
  BasicInfoContainer,
  FlexSpaceBetween,
  BasicHeading,
  EditButton,
  ButtonIcon,
  BasicInfoDiv,
  BasicDetailsDiv,
  TitlePara,
  ViewPara,
} from "./ViewEmployeeStyle";

const EmployeePersonal = () => {
  const Navigate = useNavigate();
  const { employeeid } = useParams();
  const [result, setResult] = useState([]);
  
 const GetEmployeesPersonalInfo = () => {
   // setIsLoading(true); api serach - &searchKey=search_keyword
   const trimid = employeeid.trim();
   let url = `/employee/personal-info/${trimid}`;
   httpClient({
     method: "get",
     url,
   })
     .then(({ result }) => {
       if (result) {
         setResult(result);
         console.log(result, "we are getting the persnal information ");
       } else {
         //toast.warn("something went wrong ");
       }
     })
     .catch((error) => {
       console.error("Error:", error);
       toast.error("Error creating department. Please try again.");
       //  setIsLoading(false);
     })
     .finally(() => {
       // setIsLoading(false);
     });
  };
    useEffect(() => {
      GetEmployeesPersonalInfo();
    }, []);
  console.log(result);
  return (
    <>
      <MainBodyContainer>
        <PersonalInfo>
          <PersonalImg src="/images/Oval Copy.jpg" />
          <FlexColumn>
            <PersonalName>
              {result?.personalInfo?.firstName} {result?.personalInfo?.lastName}
            </PersonalName>
            <PersonalTitle>Team Manager</PersonalTitle>
            <PersonalDepartment>Design Department</PersonalDepartment>
          </FlexColumn>
        </PersonalInfo>
        <BasicInfoContainer>
          <BasicInfoDiv>
            <FlexSpaceBetween style={{ marginBottom: "10px" }}>
              <BasicHeading>Basic Information</BasicHeading>
              <EditButton>
                <ButtonIcon src="/images/icons/Pen 2.svg" />
                Edit
              </EditButton>
            </FlexSpaceBetween>
            <BasicDetailsDiv>
              <FlexSpaceBetween>
                <FlexColumn>
                  <TitlePara>Name</TitlePara>
                  <ViewPara>{result?.personalInfo?.firstName}</ViewPara>
                </FlexColumn>
                <FlexColumn>
                  <TitlePara>Last Name</TitlePara>
                  <ViewPara>{result?.personalInfo?.lastName}</ViewPara>
                </FlexColumn>
              </FlexSpaceBetween>
              <FlexSpaceBetween>
                <FlexColumn>
                  <TitlePara>Address</TitlePara>
                  <ViewPara>{result?.personalInfo?.address}</ViewPara>
                </FlexColumn>
                <FlexColumn>
                  <TitlePara>Province</TitlePara>
                  <ViewPara>{result?.personalInfo?.province}</ViewPara>
                </FlexColumn>
              </FlexSpaceBetween>
              <FlexSpaceBetween>
                <FlexColumn>
                  <TitlePara>City</TitlePara>
                  <ViewPara>{result?.personalInfo?.city}</ViewPara>
                </FlexColumn>
                <FlexColumn>
                  <TitlePara>Postal Code</TitlePara>
                  <ViewPara>{result?.personalInfo?.postalCode}</ViewPara>
                </FlexColumn>
              </FlexSpaceBetween>
              <FlexSpaceBetween>
                <FlexColumn>
                  <TitlePara>Home Phone</TitlePara>
                  <ViewPara>{result?.personalInfo?.homePhone}</ViewPara>
                </FlexColumn>
                <FlexColumn>
                  <TitlePara>Personal (mobile)</TitlePara>
                  <ViewPara>{result?.personalInfo?.mobile}</ViewPara>
                </FlexColumn>
              </FlexSpaceBetween>
              <FlexSpaceBetween>
                <FlexColumn>
                  <TitlePara>Email - Personal</TitlePara>
                  <ViewPara>{result?.personalInfo?.personalEmail}</ViewPara>
                </FlexColumn>
                <FlexColumn>
                  <TitlePara>Emergency Contact </TitlePara>
                  <ViewPara>{result?.personalInfo?.emergencyContact}</ViewPara>
                </FlexColumn>
              </FlexSpaceBetween>
              <FlexSpaceBetween>
                <FlexColumn>
                  <TitlePara>Emergency Contact Number *</TitlePara>
                  <ViewPara>
                    {result?.personalInfo?.emergencyContactNumber}
                  </ViewPara>
                </FlexColumn>
              </FlexSpaceBetween>
              <BasicHeading style={{ marginTop: "53px" }}>
                Basic Information
              </BasicHeading>
              <FlexSpaceBetween>
                <FlexColumn>
                  <TitlePara>Employee </TitlePara>
                  <ViewPara>{result.personalInfo?.employeeId}</ViewPara>
                </FlexColumn>
                <FlexColumn>
                  <TitlePara>Date of Birth</TitlePara>
                  <ViewPara>{result.personalInfo?.dob.slice(0, 10)}</ViewPara>
                </FlexColumn>
              </FlexSpaceBetween>
              <FlexSpaceBetween>
                <FlexColumn>
                  <TitlePara>Sin</TitlePara>
                  <ViewPara>{result.personalInfo?.sin}</ViewPara>
                </FlexColumn>
                <FlexColumn>
                  <TitlePara>Gender</TitlePara>
                  {result.personalInfo?.gender === 1 ? (
                    <ViewPara> Male</ViewPara>
                  ) : (
                    <ViewPara> Female</ViewPara>
                  )}
                </FlexColumn>
              </FlexSpaceBetween>
              <FlexSpaceBetween>
                <FlexColumn>
                  <TitlePara>Is Status </TitlePara>
                  <ViewPara>Yes</ViewPara>
                </FlexColumn>
                <FlexColumn>
                  <TitlePara>Band Number</TitlePara>
                  <ViewPara>JHGTRYSG4542DES</ViewPara>
                </FlexColumn>
              </FlexSpaceBetween>
            </BasicDetailsDiv>
          </BasicInfoDiv>
        </BasicInfoContainer>
      </MainBodyContainer>
    </>
  );
};

export default EmployeePersonal;
