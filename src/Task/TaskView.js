import React, { useState, useEffect } from "react";

import CommenDashHeader from "../Dashboard/CommenDashHeader";

import {
  DisciplinaryDiv,
  DisciplinaryHeading,
} from "../Disciplinary/DisciplinaryStyles";
import {
  BasicDetailsDiv,
  BasicInfoContainer,
  BasicInfoDiv,
  FlexSpaceBetween,
  FlexColumn,
  TitlePara,
  ViewPara,
  BackGroundWhite,
  CommentDiv,
  UserImg,
  FlexColumnForm,
  Input,
  AddNewButton,
} from "../Employee/ViewEmployee/ViewEmployeeStyle";
const TaskView = () => {
  const [searchValue, setSearchValue] = useState("");

  const HandleSearchCahnge = (data) => {
    setSearchValue(data);
  };
  let API_URL = process.env.REACT_APP_API_URL;

  return (
    <>
      <CommenDashHeader onSearch={HandleSearchCahnge} text={"Task Details"} />
      <BackGroundWhite>
        <DisciplinaryHeading> Details </DisciplinaryHeading>
        <BasicInfoDiv>
          <FlexSpaceBetween>
            <FlexColumn>
              <TitlePara>Task Title</TitlePara>
              <ViewPara>Complete this </ViewPara>
            </FlexColumn>
            <FlexColumn>
              <TitlePara>Assigned to</TitlePara>
              <ViewPara>Lalit kumar </ViewPara>
            </FlexColumn>
          </FlexSpaceBetween>
          <FlexSpaceBetween>
            <FlexColumn>
              <TitlePara>Due Date</TitlePara>
              <ViewPara>10/03/2023 </ViewPara>
            </FlexColumn>
          </FlexSpaceBetween>
          <FlexSpaceBetween>
            <FlexColumn>
              <TitlePara>Description</TitlePara>
              <ViewPara>here is the Description</ViewPara>
            </FlexColumn>
          </FlexSpaceBetween>
          <DisciplinaryHeading> Add Comment </DisciplinaryHeading>

          <CommentDiv>
            <UserImg src="/images/Oval Copy.jpg" />

            <Input style={{ margin: "0rem" }} type="text" />
            <AddNewButton>Send</AddNewButton>
          </CommentDiv>
          <CommentDiv>
            <UserImg src="/images/Oval Copy 2.jpg" />

            <FlexColumnForm>
              <TitlePara>Stephen</TitlePara>
              <ViewPara>Its alredy done completed it last week </ViewPara>
            </FlexColumnForm>
          </CommentDiv>
        </BasicInfoDiv>
      </BackGroundWhite>
    </>
  );
};

export default TaskView;
