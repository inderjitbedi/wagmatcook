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
export const AlignFlex = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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
  text-transform: capitalize;
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
  width: 98%;
  &:focus {
    outline: none;
  }
`;
export const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
`;
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
  text-transform: capitalize;
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
  text-transform: capitalize;
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
  text-transform: capitalize;
`;
export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
export const Icons = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
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
  text-transform: capitalize;
`;
export const TabelLightPara = styled.p`
  color: #8f9bb3;
  /* font-family: Open Sans; */
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 0px;
  text-transform: capitalize;
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
  cursor: pointer;
  text-transform: capitalize;
`;
export const IconsEmployee = styled.img`
  display: inline-block;
  cursor: pointer;
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
  text-transform: capitalize;
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
  width: 100%;
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
  gap: 8px;
  width: 50%;
`;
export const PersonalName = styled.h1`
  color: #222b45;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 0px;
  text-transform: capitalize;
`;
export const PersonalTitle = styled.h2`
  color: #8f9bb3;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 0px;
  text-transform: capitalize;
`;

export const PersonalDepartment = styled.h3`
  color: #8f9bb3;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 0px;
  text-transform: capitalize;
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
export const EditButton = styled.label`
  border-radius: 88px;
  border: 1px solid #8f9bb3;
  padding: 0.5em 0.75em;
  color: #279af1;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  display: flex;
  align-items: center;
  background-color: #fff;
  gap: 4px;
  cursor: pointer;
  text-transform: capitalize;
`;
export const ButtonIcon = styled.img`
  width: 17px;
  height: 17px;
  display: inline-block;
`;
export const BasicHeading = styled.h1`
  color: #222b45;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  text-transform: capitalize;
`;
export const BasicDetailsDiv = styled.div`
  width: 100%;
  justify-self: flex-start;
  padding: 10px;
`;
export const TitlePara = styled.p`
  color: #8f9bb3;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 0px;
  text-transform: capitalize;
`;
export const ViewPara = styled.p`
  color: #222b45;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 0px;
  text-transform: capitalize;
`;
export const TimelineDiv = styled.div`
  border-radius: 8px;
  border: 1.5px solid #eff4fa;
  background: #fff;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 16px;
  text-transform: capitalize;
`;
export const TimelinePara = styled.p`
  color: #222b45;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  text-transform: capitalize;
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
  gap: 2px;
  width: max-content;
  text-transform: capitalize;
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
  text-transform: capitalize;
`;

export const LeaveDiv = styled.div`
  color: #222b45;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  padding: 14px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #eff4fa;
  text-transform: capitalize;
`;
export const FlexContaierForm = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  /* margin-bottom: 16px; */
  width: 100%;
  box-sizing: border-box;
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
  /* text-transform: capitalize; */
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
  box-sizing: border-box;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  padding: 1em;
  margin-bottom: 10px;
  color: #222b45;
  background: #fff;
  box-sizing: border-box;
  outline: #dcdcdc;
  /* text-transform: capitalize; */
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
  color: #fff;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border: none;
  text-transform: capitalize;
`;
export const ModalContainer = styled.div`
  padding: 0px 29px 15px 29px;
  border-bottom: 2px solid #f3f3f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`;
export const ModalHeading = styled.h1`
  color: #222b45;
  font-family: Inter;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 0px;
  text-transform: capitalize;
`;
export const ModalIcon = styled.img`
  width: 24px;
  height: 24px;
  display: inline-block;
  cursor: pointer;
`;
export const ModalFormContainer = styled.div`
  padding: 20px 29px 15px 29px;
  width: 100%;
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
export const InputPara = styled.p`
  color: #737992;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 0px; /* 171.429% */
  display: flex;
  justify-content: space-between;
`;
export const ModalThanks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0px;
  position: relative;
`;
export const ModalThanksImg = styled.img`
  display: block;
  width: 106px;
  height: 106px;
`;
export const ModalIconDelete = styled.img`
  display: inline-block;
  width: 24px;
  height: 24px;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 0px;
`;
export const ModalThanksHeading = styled.p`
  color: #222b45;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
  width: 70%;
  text-align: center;
  text-transform: capitalize;
`;
export const Select = styled.select`
  font-size: 13px;
  font-weight: 400;
  line-height: 24px;
  width: 100%;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  padding: 0.72em;
  margin-bottom: 10px;
  color: #222b45;
  background: #fff;
  box-sizing: border-box;
  outline: #f0f2f6;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: url("/images/icons/arrowdown.svg") no-repeat right center;
  background-size: 12px 10px;
  background-position: calc(100% - 15px) center;
`;
export const Option = styled.option`
  color: #222b45;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  padding: 8px 11px;
`;
export const CertificateContainer = styled.div`
  border-radius: 8px;
  border: 1.5px solid #eff4fa;
  background: #fff;
  padding: 16px;
  width: 100%;
  margin-bottom: 16px;
`;
export const CertificateTitle = styled.div`
  color: #222b45;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
  text-transform: capitalize;
`;
export const LightPara = styled.p`
  color: #8b8b8b;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.28px;
  cursor: pointer;
`;
export const UploadImageContainer = styled.label`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.8px dashed #d2d3d3;
  flex-direction: column;
  height: 152px;
  margin-bottom: 16px;
`;
export const UploadImageName = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  border-radius: 5px;
  border: 0.5px solid #d2d3d3;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  padding: 9px 9px 7px 9px;
  align-items: center;
  justify-content: space-between;
`;
export const UploadImagePara = styled.div`
  color: #222b45;
  
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: -0.14px;
`;
export const UploadImageLight = styled.div`
  color: #8f9bb3;
  font-family: Inter;
  font-size: 8px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px;
`;



