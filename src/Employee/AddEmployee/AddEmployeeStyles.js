import styled from "styled-components";
// sidebar Styles
export const SidebarTitle = styled.p`
  color: #222222;
  font-size: 2rem;
  font-weight: 700;
  line-height: 2.4rem;
  margin-bottom: 3.5rem;
  padding: 0rem 3.2rem;
  padding-top: 2rem;
`;
export const SideBarLogoContainer = styled.div`
  padding: 1.6rem 3.2rem;
  display: flex;
  gap: 0.8rem;
  align-items: center;
  width: 100%;
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
  color: #222b45;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 0rem;
  letter-spacing: -0.3.2rem;
`;

export const SideBarLogoPara = styled.p`
  font-size: 1.2rem;
  font-weight: 00;
  line-height: 0rem;
  color: #8f9bb3;
  letter-spacing: -0.2.4rem;
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
  &:hover img path {
    fill: #279af1;
  }
  &:hover p {
    color: #279af1;
  }
`;
export const SideBarListLogo = styled.img`
  height: 10.8rem;
  width: 10.8rem;
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
// ********************Employees layout styles************************
export const Employee = styled.div`
  display: flex;
  width: 100%;
`;
export const EmployeeNav = styled.div`
  width: 18%;
  background-color: #ffffff;
  /* padding: 3.2rem; */
`;
export const EmployeeMain = styled.div`
  width: 82%;
  padding: 0rem 3rem 0rem 2rem;
  background: #f3f3f5;
`;
export const BackButton = styled.button`
  border-radius: 80.8rem;
  border: 1px solid #8f9bb3;
  padding: 0.5em 0.75em;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.6rem;
  color: #222b45;
  display: flex;
  gap: 4px;
  align-items: center;
  cursor: pointer;
`;
export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  /* gap:2.4rem; */
`;
export const FlexContaier = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;
export const HeaderEmployee = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.6rem;
  margin-top: 3rem;
`;
export const HeaderTitle = styled.h1`
  color: #222b45;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.4rem;
`;
export const IconsEmployee = styled.img`
  display: inline-block;
`;
export const EmployeeBody = styled.div`
  border-radius: 0.8rem;
  border: 1px solid #eff4fa;
  background: #fff;
  margin-bottom: 8rem;
`;
export const BodyHeader = styled.div`
  padding: 0.8rem 2.4rem 5px 2.4rem;
  border-bottom: 1px solid #f3f3f5;
  display: flex;
  align-items: center;
`;
export const BodyHeaderTitle = styled.h1`
  color: #222b45;
  font-family: Inter;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding: 0.8rem 0rem;
`;
export const BodyMain = styled.div`
  padding: 1rem 2.4rem 5.6rem 2.4rem;
  width: 100%;
  box-sizing: border-box;
`;
export const BodyMainHeading = styled.h1`
  color: #222b45;
  font-family: Inter;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.6rem;
`;
export const FormContainer = styled.div`
box-sizing: border-box;
  width: 60%;

  position: relative;
   @media only screen and (max-width: 900px) {
     width: 100%;
  }
  
`;
export const ImgUpload = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  margin: 2.4rem 0rem;
`;
export const PersonImg = styled.img`
  display: inline-block;
  width: 9.2rem;
  height: 9.2rem;
  /* fill: #f8f8f8;
  background-color: #7b7b7b; */
  border-radius: 50%;
  object-fit: cover;
`;
export const LightPara = styled.p`
  color: #8b8b8b;
  font-family: Inter;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.2.8rem;
  cursor: pointer;
`;
export const UploadImgButton = styled.label`
  color: #595959;
  font-family: Inter;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.2.8rem;
  border-radius: 0.8rem;
  border: 1px solid #dfdfdf;
  background: #fff;
  box-shadow: 0rem 4px 4px 0rem rgba(0, 0, 0, 0.15);
  padding: 0.5em;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;
export const UploadPara = styled.p`
  color: #8c8c8c;
  font-family: Inter;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.2.4rem;
`;
export const FlexContaierForm = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.6rem;
  /* margin-bottom: 1.6rem; */
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
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 1rem;
  display: block;
`;
export const InputSpan = styled.span`
  color: red;
  font-weight: 100;
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
  outline: #dcdcdc;
`;
export const Errors = styled.p`
  display: block;
  color: red;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.2rem;
  margin-top: 2px;
`;
export const ButtonBlue = styled.button`
  border-radius: 6px;
  background: #279af1;
  display: inline-flex;
  padding: 1.1rem 1.4rem 1.2rem 1.4rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  color: #fff;
  text-align: center;
  cursor: pointer;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border: none;
  /* margin-top: 25px; */
`;
export const Select = styled.select`
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 2.4rem;
  width: 100%;
  border: 1px solid #dcdcdc;
  border-radius: 0.8rem;
  padding: 0.72em;
  margin-bottom: 1rem;
  color: #222b45;
  background: #fff;
  box-sizing: border-box;
  outline: #f0f2f6;
  /* border-right: 1.6rem solid transparent; */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: url("/images/icons/arrowdown.svg") no-repeat right center;
  background-size: 1.2rem 1rem;
  background-position: calc(100% - 1.5rem) center;
`;
export const Option = styled.option`
  color: #222b45;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2.4rem; /* 150% */
  padding: 0.8rem 1.1rem;
`;
export const ButtonGrey = styled.button`
  border-radius: 6px;
  background: var(--neutral-10, #f0f2f6);
  color: var(--neutral-100, #1e202c);
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  display: inline-flex;
  padding: 1.1rem 1.4rem 1.2rem 1.4rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border: none;
  cursor: pointer;
`;
export const BluePara = styled.p`
  cursor: pointer;
  color: #279af1;
  font-family: Inter;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin: 1rem 0rem 5rem 0rem;
`;
export const AlignFlex = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;
export const DeleteIcon = styled.img`
  display: inline-block;
  width: 1.7rem;
  height: 1.7rem;
  /* cursor: pointer; */
  /* position: absolute;
  right: 1rem;
  top: 0rem; */
`;
export const TrashDiv = styled.div`
  color: #f61717;
  font-family: Inter;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 700;
  /* line-height: 10.8rem; */
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0rem 0rem 1.2rem 0rem;
  margin-bottom: 2.4rem;
  border-bottom: 1px solid #eaeaea;
  cursor: pointer;
`;
export const UploadLabel = styled.label`
  display: flex;
  width: 18.4rem;
  padding: 0.8rem 1.1rem;
  gap: 1rem;
  align-items: center;
  border-radius: 1rem;
  border: 1px solid #eff4fa;
  background: var(--default-white, #fff);
  box-shadow: 0rem 2px 4px 0rem rgba(5, 16, 55, 0.06),
    0rem 0rem 0rem 1px #cdd0dc inset;
  color: #279af1;
  font-family: Inter;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.4rem;
  cursor: pointer;
`;
export const UploadIcon = styled.img`
  width: 2.1rem;
  height: 2.1rem;
  display: inline-block;
`;
export const RemoveContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
`;
