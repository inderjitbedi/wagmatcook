import React from "react";
import { useNavigate } from "react-router-dom";
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
  // const Navigate = useNavigate();
  return (
    <>
      <MainBodyContainer>
        <PersonalInfo>
          <PersonalImg src="/images/Oval Copy.jpg" />
          <FlexColumn>
            <PersonalName>Hattie Watkins</PersonalName>
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
                  <ViewPara>Hattie</ViewPara>
                </FlexColumn>
                <FlexColumn>
                  <TitlePara>Last Name</TitlePara>
                  <ViewPara>Watkins</ViewPara>
                </FlexColumn>
              </FlexSpaceBetween>
              <FlexSpaceBetween>
                <FlexColumn>
                  <TitlePara>Address</TitlePara>
                  <ViewPara>2975 Westheimer Rd. Downtown</ViewPara>
                </FlexColumn>
                <FlexColumn>
                  <TitlePara>Province</TitlePara>
                  <ViewPara>Santa Ana</ViewPara>
                </FlexColumn>
              </FlexSpaceBetween>
              <FlexSpaceBetween>
                <FlexColumn>
                  <TitlePara>City</TitlePara>
                  <ViewPara>Illinois</ViewPara>
                </FlexColumn>
                <FlexColumn>
                  <TitlePara>Postal Code</TitlePara>
                  <ViewPara>85486</ViewPara>
                </FlexColumn>
              </FlexSpaceBetween>
              <FlexSpaceBetween>
                <FlexColumn>
                  <TitlePara>Home Phone</TitlePara>
                  <ViewPara>Hatti</ViewPara>
                </FlexColumn>
                <FlexColumn>
                  <TitlePara>Persoal (mobile)</TitlePara>
                  <ViewPara>Watkins</ViewPara>
                </FlexColumn>
              </FlexSpaceBetween>
              <FlexSpaceBetween>
                <FlexColumn>
                  <TitlePara>Email - Personal</TitlePara>
                  <ViewPara>Hattie</ViewPara>
                </FlexColumn>
                <FlexColumn>
                  <TitlePara>Personal Mobile</TitlePara>
                  <ViewPara>watiksin</ViewPara>
                </FlexColumn>
              </FlexSpaceBetween>
              <FlexSpaceBetween>
                <FlexColumn>
                  <TitlePara>Emergency Contact </TitlePara>
                  <ViewPara>Hattie</ViewPara>
                </FlexColumn>
                <FlexColumn>
                  <TitlePara>Emergency Contact number *</TitlePara>
                  <ViewPara>Watkins</ViewPara>
                </FlexColumn>
              </FlexSpaceBetween>
              <BasicHeading style={{ marginTop: "53px" }}>
                Basic Information
              </BasicHeading>
              <FlexSpaceBetween>
                <FlexColumn>
                  <TitlePara>Employee </TitlePara>
                  <ViewPara>Hattie</ViewPara>
                </FlexColumn>
                <FlexColumn>
                  <TitlePara>Date of Birth</TitlePara>
                  <ViewPara>Watkins</ViewPara>
                </FlexColumn>
              </FlexSpaceBetween>
              <FlexSpaceBetween>
                <FlexColumn>
                  <TitlePara>Sin</TitlePara>
                  <ViewPara>45781254</ViewPara>
                </FlexColumn>
                <FlexColumn>
                  <TitlePara>Gender</TitlePara>
                  <ViewPara>Female</ViewPara>
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
