import styled, { keyframes } from "styled-components";


export const SidebarTitle = styled.p`
  color: #222222;
  font-size: 2rem;
  font-weight: 700;
  line-height: 2.4rem;
  margin-bottom: 3.5rem;
  padding: 0rem 3.2rem;

`;
export const SearchBarWrapper = styled.div`
  position: absolute;
  border-radius: 50px;
  background: #ffffff;

  box-sizing: border-box;
  transition: all 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
  top: ${(props) => (props.expanded ? "1.5rem" : "2rem")};
  right: ${(props) => (props.expanded ? "0rem" : "9rem")};
  align-items: center;
  transition: width 0.3s;
  width: ${(props) => (props.expanded ? "100%" : "30px")};
  z-index: 1000;
`;
export const SearchInputMobile = styled.input`
  border: none;
  background: none;
  padding: 8px;
  outline: none;
  width: 100%;
  margin: 0;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  display: ${(props) => (props.expanded ? "block" : "none")};

  z-index: 1000;
`;
const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;
export const SearchButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  animation: ${fadeIn} 1s linear;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const IconDelete = styled.img`
  display: inline-block;
  width: 2.4rem;
  height: 2.4rem;
  cursor: pointer;
  position: absolute;
  right: 1rem;
  top: 0rem;
`;

export const SideBarLogoContainer = styled.div`
  padding: 1.6rem 3.2rem;
  display: flex;
  gap: 0.8rem;
  align-items: center;
  width: 100%;
`;
export const SideBarLogo = styled.img`
  height: 5.6rem;
  width: 5.6rem;
`;
export const SideBarLogodiv = styled.div`
  display: flex;
  flex-direction: column;
  /* gap:1rem; */
`;
export const SideBarLogoHead = styled.p`
  color: #222222;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 0rem;
`;

export const SideBarLogoPara = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 0rem;
  color: #686868;
`;
export const SideBarList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3.2rem;
  gap: 2rem;
`;
export const SideBarListContainer = styled.div`
  display: flex;
  gap: 1.1rem;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s ease-out;
  &:hover img path {
    fill: #279af1;
  }
  &:hover p {
    color: #279af1;
  }
  &.active {
    color: inherit;
  }

`;
export const SideBarListLogo = styled.img`
  height: 1.8rem;
  width: 1.8rem;
  fill: #5c5c5c;
  cursor: pointer;
`;
export const SideBarListTitle = styled.p`
  color: #5c5c5c;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 0rem;
  cursor: pointer;
`;

export const Dashboard = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;
export const DashNav = styled.div`
  width: 20%;
  background-color: #ffffff;
  /* padding: 3.2rem; */
`;

export const DashMain = styled.div`
  width: 82%;
  padding: 0rem 3rem 0rem 2rem;
  box-sizing: border-box;
  background: #f3f3f5;
`;
export const DashHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 4rem;
  width: 100%;
  box-sizing: border-box;
`;
export const DashHeaderTitle = styled.p`
  color: #222b45;
  font-weight: 600;
  font-size: 2rem;
  line-height: 2.4rem;
`;
export const DashHeaderSearch = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
`;
export const DashNotification = styled.img``;
export const SearchBox = styled.div`
  border-radius: 1px;
  background-color: #ffffff;
  padding: 9px 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const SearchInput = styled.input`
  border: 0rem;
  /* padding:0.5em; */
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;
export const SearchIcon = styled.img``;

export const DashHeading = styled.h1`
  color: #222b45;
  font-size: 2.2rem;
  line-height: 2.4rem;
  font-weight: 400;
`;
export const DepartmentFilterContainer = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: flex-end; */
  width: 100%;
  margin-bottom: 1.5rem;
`;
export const AddNewButton = styled.button`
  border-radius: 0.8rem;
  background-color: #279af1;
  color: #ffffff;
  font-size: 1.3rem;
  line-height: 1.6rem;
  font-weight: 600;
  padding: 1em 2em;
  border: none;
  cursor: pointer;
  margin-top:2.5rem;
`;
export const MenuIcon = styled.img`
  display: inline-block;
  width: 2.2rem;
  height: 2.3rem;
  cursor: pointer;
`;
export const MenuIconDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;
export const ActionIcons = styled.img`
  width: 2rem;
  height: 2rem;
  display: inline-block;
  cursor: pointer;
`;
export const ActionIconDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;
export const DepartmentFilterdiv = styled.div`
  display: flex;
  gap: 2.4rem;
  height: fit-content;
`;
export const DepartmentFilterButton = styled.div`
  border: none;
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 1.6rem;
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
  border-radius: 0.8rem 0.8rem 0rem 0rem;
  border: 1px solid #eff4fa;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
`;
export const DisciplinaryHeading = styled.p`
  color: #222b45;
  font-size: 1.7rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.6rem;
`;
export const ModalIcon = styled.img`
  display: inline-block;
  width: 2.4rem;
  height: 2.4rem;
  cursor: pointer;
`;
export const ModalHeading = styled.p`
  font-size: 1.7rem;
  font-weight: 600;
  line-height: 1.6rem;
`;
export const ModalUpperDiv = styled.div`
  padding: 0rem 1.6rem 1rem 3.5rem;
  border-bottom: 1px solid #eff4fa;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const ModalUpperMid = styled.div`
  /* border-bottom: 1px solid #eff4fa; */
  padding: 1.6rem 3.5rem 1.6rem 3.5rem;
  box-sizing: border-box;

`;
export const Input = styled.input`
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 1.6rem;
  width: 100%;
  border: 1px solid #dcdcdc;
  border-radius: 0.8rem;
  padding: 1em;
  margin-bottom: 1rem;
  color: #222b45;
  background: #fff;
  box-sizing: border-box;
`;
export const TextArea = styled.textarea`
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 1.6rem;
  width: 100%;
  border: 1px solid #dcdcdc;
  border-radius: 0.8rem;
  resize: none;
  height: 10.5rem;
  padding: 1em;
  color: #222b45;
  background: #fff;
  box-sizing: border-box;
`;
export const InputLabel = styled.label`
  color: #222b45;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 0.5rem;
  display: block;
  line-height: 2rem;
`;
export const InputSpan = styled.span`
  color: red;
  font-weight: 100;
`;
export const InputPara = styled.p`
  color: #737992;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 0rem; /* 171.429% */
  display: flex;
  justify-content: flex-end;
`;
export const Errors = styled.p`
  display: block;
  color: red;
  font-size: 1rem;
  font-weight: 300;
  line-height: 0rem;
  margin-top: 2px;
`;