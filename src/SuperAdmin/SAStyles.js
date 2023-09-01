import styled from "styled-components";


export const SidebarTitle = styled.p`
  color: #222222;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  margin-bottom: 35px;
  padding: 0px 32px;

`;
export const SideBarLogoContainer = styled.div`
  padding: 16px 32px;
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
`;
export const SideBarLogo = styled.img`
  height: 56px;
  width: 56px;
`;
export const SideBarLogodiv = styled.div`
  display: flex;
  flex-direction: column;
  /* gap:10px; */
`;
export const SideBarLogoHead = styled.p`
  color: #222222;
  font-size: 16px;
  font-weight: 700;
  line-height: 0px;
`;

export const SideBarLogoPara = styled.p`
  font-size: 12px;
  font-weight: 400;
  line-height: 0px;
  color: #686868;
`;
export const SideBarList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px;
  gap: 20px;
`;
export const SideBarListContainer = styled.div`
  display: flex;
  gap: 11px;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s ease-out;
  &:hover img path {
    fill: #279af1;
  }
  &:hover p {
    color: #279af1;
  }
`;
export const SideBarListLogo = styled.img`
  height: 18px;
  width: 18px;
  fill: #5c5c5c;
  cursor: pointer;
`;
export const SideBarListTitle = styled.p`
  color: #5c5c5c;
  font-size: 14px;
  font-weight: 600;
  line-height: 0px;
  cursor: pointer;
`;

export const Dashboard = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
`;
export const DashNav = styled.div`
  width: 18%;
  background-color: #ffffff;
  /* padding: 32px; */
`;

export const DashMain = styled.div`
  width: 82%;
  padding: 0px 30px 0px 20px;
  background: #f3f3f5;
`;
export const DashHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 40px;
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
  border-radius: 1px;
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

export const DashHeading = styled.h1`
  color: #222b45;
  font-size: 22px;
  line-height: 24px;
  font-weight: 400;
`;
export const DepartmentFilterContainer = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: flex-end; */
  width: 100%;
  margin-bottom: 15px;
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
export const MenuIcon = styled.img`
  display: inline-block;
  width: 22px;
  height: 23px;
  cursor: pointer;
`;
export const MenuIconDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
export const ActionIcons = styled.img`
  width: 20px;
  height: 20px;
  display: inline-block;
  cursor: pointer;
`;
export const ActionIconDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
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
  transition: all 0.5s ease-out;
  cursor: pointer;
  &:hover{
    color: #222B45;
    font-weight: 500;
  }
`;
export const DisciplinaryDiv = styled.div`
  display: flex;
  background: #fff;
  border-radius: 8px 8px 0px 0px;
  border: 1px solid #eff4fa;
  align-items: center;
  justify-content: space-between;

  padding: 10px 20px;
`;
export const DisciplinaryHeading = styled.p`
  color: #222b45;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
`;
export const ModalIcon = styled.img`
  display: inline-block;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
export const ModalHeading = styled.p`
  font-size: 17px;
  font-weight: 600;
  line-height: 16px;
`;
export const ModalUpperDiv = styled.div`
  padding: 0px 16px 10px 35px;
  border-bottom: 1px solid #eff4fa;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const ModalUpperMid = styled.div`
  /* border-bottom: 1px solid #eff4fa; */
  padding: 16px 35px 16px 35px;
  box-sizing: border-box;
`;
export const Input = styled.input`
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  width: 100%;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  padding: 1em;
  margin-bottom: 10px;
  color: #222b45;
  background: #fff;
  box-sizing: border-box;
`;
export const TextArea = styled.textarea`
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  width: 100%;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  resize: none;
  height: 105px;
  padding: 1em;
  color: #222b45;
  background: #fff;
  box-sizing: border-box;
`;
export const InputLabel = styled.label`
  color: #222b45;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 10px;
  display: block;
`;
export const InputSpan = styled.span`
  color: red;
  font-weight: 100;
`;
export const InputPara = styled.p`
  color: #737992;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 0px; /* 171.429% */
  display: flex;
  justify-content: flex-end;
`;
export const Errors = styled.p`
  display: block;
  color: red;
  font-size: 10px;
  font-weight: 300;
  line-height: 0px;
  margin-top: 2px;
`;