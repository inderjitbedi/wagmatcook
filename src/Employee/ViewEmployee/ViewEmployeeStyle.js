import styled from "styled-components";

export const Dashboard = styled.div`
  display: flex;
  width: 100%;
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
border: 1px solid #EFF4FA;
background: #FFF;
  
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
gap:20px
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
gap:8px;
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
export const TabelParaContainer = styled.div`


`;

