import styled from "styled-components";
// sidebar Styles
export const SidebarTitle = styled.p`
  color: #222222;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  margin-bottom: 35px;
  padding: 0px 32px;
  padding-top: 20px;
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
  color: #222b45;
  font-size: 16px;
  font-weight: 700;
  line-height: 0px;
  letter-spacing: -0.32px;
`;

export const SideBarLogoPara = styled.p`
  font-size: 12px;
  font-weight: 00;
  line-height: 0px;
  color: #8f9bb3;
  letter-spacing: -0.24px;
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
// ********************Employees layout styles************************
export const Employee = styled.div`
  display: flex;
  width: 100%;
  /* height: 100vh; */
`;
export const EmployeeNav = styled.div`
  width: 18%;
  background-color: #ffffff;
  /* padding: 32px; */
`;
export const EmployeeMain = styled.div`
  width: 82%;
  padding: 0px 30px 0px 20px;
  background: #f3f3f5;
`;
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
export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  /* gap:24px; */
`;
export const FlexContaier = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
export const HeaderEmployee = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 26px;
  margin-top: 30px;
`;
export const HeaderTitle = styled.h1`
  color: #222b45;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
`;
export const IconsEmployee = styled.img`
  display: inline-block;
`;
export const EmployeeBody = styled.div`
  border-radius: 8px;
  border: 1px solid #eff4fa;
  background: #fff;
  margin-bottom: 80px;
`;
export const BodyHeader = styled.div`
  padding: 8px 24px 5px 24px;
  border-bottom: 1px solid #f3f3f5;
  display: flex;
  align-items: center;
`;
export const BodyHeaderTitle = styled.h1`
  color: #222b45;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding: 8px 0px;
`;
export const BodyMain = styled.div`
  padding: 10px 24px 56px 24px;
`;
export const BodyMainHeading = styled.h1`
  color: #222b45;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
`;
export const FormContainer = styled.div`
  width: 60%;
`;
export const ImgUpload = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 24px 0px;
`;
export const PersonImg = styled.div`
  display: inline-block;
  width: 92px;
  height: 92px;
  fill: #f8f8f8;
  background-color: #7b7b7b;
  border-radius: 50%;
`;
export const LightPara = styled.p`
  color: #8b8b8b;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.28px;
`;
export const UploadImgButton = styled.button`
  color: #595959;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.28px;
  border-radius: 8px;
  border: 1px solid #dfdfdf;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);
  padding: 0.5em;
  display: flex;
  align-items: center;
  gap: 4px;
`;
export const UploadPara = styled.p`
  color: #8c8c8c;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.24px;
`;
export const FlexContaierForm = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  /* margin-bottom: 16px; */
  width: 100%;
`;
export const FlexColumnForm = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 5px; */
  width: 100%;
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
  outline: #dcdcdc;
`;
export const Errors = styled.p`
  display: block;
  color: red;
  font-size: 10px;
  font-weight: 300;
  line-height: 0px;
  margin-top: 2px;
`;
export const ButtonBlue = styled.button`
  border-radius: 6px;
  background: #279af1;
  display: inline-flex;
  padding: 11px 14px 12px 14px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color:  #fff;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border: none;
`;
export const Select = styled.select`
  font-size: 13px;
  font-weight: 400;
  line-height: 24px;
  width: 100%;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  padding: 1em;
  margin-bottom: 10px;
  color: #222b45;
  background: #fff;
  box-sizing: border-box;
  outline: #f0f2f6;
`;
export const Option = styled.option`
  color: #222b45;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  padding: 8px 11px;
`;
export const ButtonGrey = styled.button`
  border-radius: 6px;
  background: var(--neutral-10, #f0f2f6);
  color: var(--neutral-100, #1e202c);
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  display: inline-flex;
  padding: 11px 14px 12px 14px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: none;
`;
export const BluePara = styled.p`
  color: #279af1;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin: 10px 0px 50px 0px ;
 
`;
export const AlignFlex = styled.div`
display: flex;
align-items: center;
gap:10px;
`;