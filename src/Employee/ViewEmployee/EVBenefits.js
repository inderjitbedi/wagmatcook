import React from 'react'

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
const EVBenefits = () => {
  return (
   
      

            <MainBodyContainer>
              <FlexSpaceBetween style={{ alignItems: "center" }}>
                <PersonalInfo>
                  <PersonalImg src="/images/User.jpg" />
                  <FlexColumn style={{ gap: "5px" }}>
                    <PersonalName>Hattie Watkins</PersonalName>
                    <PersonalTitle>Team Manager</PersonalTitle>
                    <PersonalDepartment>Design Department</PersonalDepartment>
                  </FlexColumn>
                </PersonalInfo>

                <EditButton style={{ marginRight: "54px" }}>
                  <ButtonIcon src="/images/icons/Pen 2.svg" />
                  Edit
                </EditButton>
              </FlexSpaceBetween>

              <BasicInfoContainer>
                <BasicInfoDiv>
                  <FlexSpaceBetween style={{ marginBottom: "10px" }}>
                    <BasicHeading>Employee Benefits</BasicHeading>
                  </FlexSpaceBetween>
                  <BasicDetailsDiv>
                    <FlexSpaceBetween>
                      <FlexColumn>
                        <TitlePara>Benefit Name</TitlePara>
                        <ViewPara>Hattie</ViewPara>
                      </FlexColumn>
                      <FlexColumn>
                        <TitlePara>Description </TitlePara>
                        <ViewPara>Watkins</ViewPara>
                      </FlexColumn>
                    </FlexSpaceBetween>
                    <FlexSpaceBetween>
                      <FlexColumn>
                        <TitlePara>Start Date</TitlePara>
                        <ViewPara>15-08-2022</ViewPara>
                      </FlexColumn>
                      <FlexColumn>
                        <TitlePara>End Date </TitlePara>
                        <ViewPara>Present</ViewPara>
                      </FlexColumn>
                    </FlexSpaceBetween>
                    <FlexSpaceBetween>
                      <FlexColumn>
                        <TitlePara>Cost</TitlePara>
                        <ViewPara>$1,200</ViewPara>
                      </FlexColumn>
                      <FlexColumn>
                        <TitlePara>Employee Contribution rate (%)*</TitlePara>
                        <ViewPara>$16</ViewPara>
                      </FlexColumn>
                    </FlexSpaceBetween>
                  </BasicDetailsDiv>
                </BasicInfoDiv>
              </BasicInfoContainer>
            </MainBodyContainer>

     
  );
}

export default EVBenefits