import styled from "styled-components";

export const Dashboard = styled.div`
  display: flex;
  width: 100%;
  overflow-x: hidden;
`;
export const DashNav = styled.div`
  width: 18%;
  background-color: #ffffff;
  /* padding: 32px; */
`;

export const DashMain = styled.div`
  width: 82%;
  padding: 0px 30px 60px 20px;
  background: #f3f3f5;
  /* margin-bottom: 50px; */
`;
export const DashHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
`;
export const DashHeaderTitle = styled.p`
  color: #222b45;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
`;
export const DashHeaderSearch = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;
export const DashNotification = styled.img``;
export const SearchBox = styled.div`
  border-radius: 8px;
  border: 1px solid #eff4fa;
  background: #fff;

  background-color: #ffffff;
  padding: 9px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const SearchInput = styled.input`
  border: 0px;
  /* padding:0.5em; */
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;
export const SearchIcon = styled.img``;
export const DepartmentFilterContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;
export const DepartmentFilterdiv = styled.div`
  display: flex;
  gap: 24px;
  height: fit-content;
`;
export const DepartmentFilterButton = styled.div`
  border: none;
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  color: #8f9bb3;
  cursor: pointer;
`;
export const AddNewButton = styled.button`
  border-radius: 8px;
  background-color: #279af1;
  color: #ffffff;
  font-size: 13px;
  line-height: 16px;
  font-weight: 600;
  padding: 1em 2em;
  border: none;
  cursor: pointer;
`;
export const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px 8px 0px 0px;
  border-bottom: 1px solid #eff4fa;
  background: #fff;
  padding: 10px 20px;
`;
export const HeaderTitle = styled.h1`
  color: #222b45;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
`;
export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
export const Icons = styled.img`
  width: 20px;
  height: 20px;
`;
export const TabelImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;
export const TabelDiv = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
export const TabelDarkPara = styled.p`
  color: #222b45;
  /* font-family: Inter; */
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 10px;
`;
export const TabelLightPara = styled.p`
  color: #8f9bb3;
  /* font-family: Open Sans; */
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 0px;
`;
export const TabelParaContainer = styled.div``;
export const BackButton = styled.button`
  border-radius: 88px;
  border: 1px solid #8f9bb3;
  padding: 0.5em 0.75em;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  color: #222b45;
  display: flex;
  gap: 4px;
  align-items: center;
`;
export const IconsEmployee = styled.img`
  display: inline-block;
`;
export const FlexContaier = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
export const EmployeeBody = styled.div`
  border-radius: 8px;
  border: 1px solid #eff4fa;
  background: #fff;
  margin-bottom: 80px;
  padding-bottom: 80px;
`;
export const BodyHeader = styled.div`
  width: 100%;
  padding: 24px;
`;
export const BodyHeading = styled.h1`
  color: #222b45;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
`;
export const BodyContainer = styled.div`
  width: 100%;
  display: flex;
  /* padding: 0px 24px;  */
`;
export const SideBarContainer = styled.div`
  width: 20%;
  border-right: 1px solid #eff4fa;
`;
export const MainBodyContainer = styled.div`
  width: 80%;
`;
export const PersonalInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0px 22px 10px 22px;
`;
export const PersonalImg = styled.img`
  width: 94px;
  height: 94px;
  border-radius: 94px;
  border: 2px solid #fff;
`;
export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap:8px;
  width: 50%;
`;
export const PersonalName = styled.h1`
  color: #222b45;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 0px;
`;
export const PersonalTitle = styled.h2`
  color: #8f9bb3;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 0px;
`;

export const PersonalDepartment = styled.h3`
  color: #8f9bb3;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 0px;
`;
export const BasicInfoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
export const BasicInfoDiv = styled.div`
  width: 71%;
`;
export const FlexSpaceBetween = styled.div`
width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;
export const EditButton = styled.button`
  border-radius: 88px;
  border: 1px solid #8f9bb3;
padding: 0.5em .75em;
  color: #279af1;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  display: flex;
  align-items: center;
  background-color: #fff;

`;
export const ButtonIcon = styled.img`
  width: 17px;
  height: 17px;
  display:inline-block;
`;
export const BasicHeading = styled.h1`
  color: #222b45;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
`;
export const BasicDetailsDiv = styled.div`
width: 100%;
justify-self: flex-start;

`;
export const TitlePara = styled.p`
  color: #8f9bb3;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 0px;
`;
export const ViewPara = styled.p`
  color: #222b45;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 0px;
`;
export const TimelineDiv = styled.div`
  border-radius: 8px;
  border: 1.5px solid #eff4fa;
  background: #fff;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 16px;
`;
export const TimelinePara = styled.p`
  color: #222b45;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`;
export const File = styled.div`
  border-radius: 88px;
  border: 1px solid #8f9bb3;
  color: #279af1;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  padding: 8px 16px 8px 9px;
  display: flex;
  align-items: center;
  gap:2px;
width: max-content;
`;
export const ReviewsDiv = styled.div`
  color: #0d7d0b;
  text-align: center;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  border-radius: 8px;
  background: #c8ffc7;
  padding: 0.5em 1em;
  width: max-content;
  margin-top: 10px;
`;

export const LeaveDiv = styled.div`
  color: #222b45;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  padding: 14px 22px;
  display:flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #EFF4FA;
`;
