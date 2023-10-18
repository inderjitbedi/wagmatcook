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
  gap: 1rem;
`;

export const DashMain = styled.div`
  width: 82%;
  padding: 0rem 3rem 6rem 2rem;
  background: #f3f3f5;
  /* margin-bottom: 50rem; */
`;
export const DashHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 2rem;
`;
export const DashHeaderTitle = styled.p`
  color: #222b45;
  font-weight: 600;
  font-size: 2rem;
  line-height: 2.4rem;
  text-transform: capitalize;
`;
export const TaskHeading = styled.p`
  color: #222b45;

  font-family: Inter;
  font-size: 2.4rem;
  font-style: normal;
  font-weight: 700;
  line-height: 3.2rem;
  margin: 0rem;
`;
export const DashHeaderSearch = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
`;
export const DashNotification = styled.img``;
export const SearchBox = styled.div`
  border-radius: 0.8rem;
  border: 1px solid #eff4fa;
  background: #fff;

  background-color: #ffffff;
  padding: 0.9rem 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const SearchInput = styled.input`
  border: 0rem;
  /* padding:0.5em; */
  background-color: transparent;
  width: 98%;
  &:focus {
    outline: none;
  }
`;
export const SearchIcon = styled.img`
  width: 2rem;
  height: 2rem;
`;
export const DepartmentFilterContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2rem;
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
  cursor: pointer;
  text-transform: capitalize;
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
  text-transform: capitalize;
`;
export const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.8rem 0.8rem 0rem 0rem;
  border-bottom: 1px solid #eff4fa;
  background: #fff;
  padding: 1rem 2rem;
`;
export const HeaderTitle = styled.h1`
  color: #222b45;
  font-size: 1.7rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.6rem;
  text-transform: capitalize;
`;
export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;
export const Icons = styled.img`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;
export const TabelImg = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
`;
export const TabelDiv = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
`;
export const TabelDarkPara = styled.p`
  color: #222b45;
  /* font-family: Inter; */
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1rem;
  text-transform: capitalize;
`;
export const TabelLightPara = styled.p`
  color: #8f9bb3;
  /* font-family: Open Sans; */
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 0rem;
  text-transform: capitalize;
`;
export const TabelParaContainer = styled.div``;
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
  text-transform: capitalize;
`;
export const IconsEmployee = styled.img`
  display: inline-block;
  cursor: pointer;
  object-fit: cover;
  @media only screen and (max-width: 600px) {
    height: 2.2rem;
    width: 2.2rem;
  }
`;
export const FlexContaier = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;
export const EmployeeBody = styled.div`
  border-radius: 0.8rem;
  border: 1px solid #eff4fa;
  background: #fff;
  margin-bottom: 8rem;
  padding-bottom: 8rem;
  @media only screen and (max-width: 600px) {
    margin-bottom: 4rem;
    padding-bottom: 4rem;
  }
`;
export const BodyHeader = styled.div`
  width: 100%;
  padding: 2.4rem;
  box-sizing: border-box;
  /* margin-bottom: 1rem; */
  @media only screen and (max-width: 600px) {
    /* background: #f3f3f5; */
    padding: 2.4rem 0 2.4rem 2.4rem;
  }
`;
export const BodyHeading = styled.h1`
  color: #222b45;
  font-size: 1.7rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.6rem;
  text-transform: capitalize;
`;
export const BodyContainer = styled.div`
  width: 100%;
  display: flex;
  /* padding: 0rem 2.4rem;  */
`;
export const SideBarContainer = styled.div`
  width: 20%;
  border-right: 1px solid #eff4fa;
  @media only screen and (max-width: 600px) {
    width: 100%;
    box-sizing: border-box;
    border-right: none;
  }
`;
export const MainBodyContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
`;
export const PersonalInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 0rem 2.2rem 1rem 2.2rem;
  box-sizing: border-box;
`;
export const PersonalImg = styled.img`
  width: 9.4rem;
  height: 9.4rem;
  border-radius: 9.4rem;
  border: 2px solid #fff;
  object-fit: cover;
`;
export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 50%;
`;
export const FlexColumn100 = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: 0.8rem;
  width: 100%;
`;
export const SectionCard = styled.div`
  position: relative;
  display: flex;
  gap: 1.6rem;
  margin-bottom: 1.6rem;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
`;
export const SectionCardContainer = styled.div`
  border-radius: 0.8rem;
  flex: 0 1 20%;
  /* max-width: 350rem; */
  background-color: #fff;
  padding: 1.6rem 2rem 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Sectionlighttitle = styled.h1`
  color: #8f9bb3;
  font-family: Inter;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.4rem; /* 171.429% */
  margin: 0;
`;
export const ShowMore = styled.p`
  color: #8f9bb3;
  font-family: Inter;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.4rem;
  margin: 0rem 0rem 0.8rem 0rem;
  cursor: pointer;
  /* padding: 0.75em 1.25em;
  border: 1px solid black;
  border-radius: 1.6rem; */
  /* position: fixed;
  bottom: 2px;
  right: 0rem; */
`;
export const Sectionsmalltitle = styled.p`
  color: #222b45;
  text-align: right;
  font-family: Inter;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.8rem;
  margin: 0;
  align-self: flex-start;
`;
export const Sectiondarktitle = styled.p`
  color: #222b45;
  font-family: Inter;
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2.4rem;
  margin: 0;
`;

export const PersonalName = styled.h1`
  color: #222b45;
  font-family: Inter;
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 700;
  line-height: 0rem;
  text-transform: capitalize;
`;
export const PersonalTitle = styled.h2`
  color: #8f9bb3;
  font-family: Inter;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 0rem;
  text-transform: capitalize;
`;
export const TaskTitle = styled.p`
  color: #222b45;

  font-family: Inter;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  margin: 0rem;
`;
export const TaskLight = styled.p`
  color: #8f9bb3;

  font-family: Inter;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.6rem;
  margin: 0rem;
`;
export const TaskDescription = styled.p`
  color: #222b45;

  font-family: Inter;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  margin: 0rem;

  line-height: 2.2rem;
`;
export const PersonalDepartment = styled.h3`
  color: #8f9bb3;
  font-family: Inter;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 400;
  line-height: 0rem;
  text-transform: capitalize;
`;
export const BasicInfoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
`;
export const BasicInfoDiv = styled.div`
  width: 71%;
  @media only screen and (max-width: 600px) {
    box-sizing: border-box;
    width: 100%;
    padding: 0rem 2.2rem 1rem 2.2rem;
  }
`;
export const BackGroundWhite = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 0.8rem 0.8rem 0rem 0rem;
  border: 1px solid #eff4fa;
  padding: 1rem 2rem;
  box-sizing: border-box;
`;

export const FlexSpaceBetween = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.4rem;
  align-items: flex-start;
  box-sizing: border-box;
`;
export const EditButton = styled.label`
  border-radius: 80.8rem;
  border: 1px solid #8f9bb3;
  padding: 0.5em 0.75em;
  color: #279af1;
  font-family: Inter;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.6rem;
  display: flex;
  align-items: center;
  background-color: #fff;
  gap: 4px;
  cursor: pointer;
  text-transform: capitalize;
`;
export const ButtonIcon = styled.img`
  width: 1.7rem;
  height: 1.7rem;
  display: inline-block;
`;
export const BasicHeading = styled.h1`
  color: #222b45;
  font-family: Inter;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.6rem;
  text-transform: capitalize;
`;
export const BasicDetailsDiv = styled.div`
  width: 100%;
  justify-self: flex-start;
  padding: 1rem;
`;
export const TitlePara = styled.p`
  color: #8f9bb3;
  font-family: Inter;
  font-size: 1.2rem !important;
  font-style: normal;
  font-weight: 500;
  line-height: 1.6rem;
  text-transform: capitalize;
  margin: 0;
`;
export const ViewPara = styled.p`
  color: #222b45;
  font-family: Inter;
  font-size: 1.4rem !important;
  font-style: normal;
  font-weight: 500;
  line-height: 1.8rem;
  /* text-transform: capitalize; */
  margin: 0;
`;
export const TimelineDiv = styled.div`
  border-radius: 0.8rem;
  border: 1.5px solid #eff4fa;
  background: #fff;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.8rem 1.6rem;
  text-transform: capitalize;
`;
export const TimelinePara = styled.p`
  color: #222b45;
  font-family: Inter;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2rem;
  text-transform: capitalize;
`;
export const File = styled.div`
  border-radius: 80.8rem;
  border: 1px solid #8f9bb3;
  color: #279af1;
  font-family: Inter;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.6rem;
  padding: 0.8rem 1.6rem 0.8rem 0.9rem;
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
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.6rem;
  border-radius: 0.8rem;
  background: #c8ffc7;
  padding: 0.5em 1em;
  width: max-content;
  margin-top: 1rem;
  text-transform: capitalize;
`;

export const LeaveDiv = styled.div`
  color: #222b45;
  font-family: Inter;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.6rem;
  padding: 1.4rem 2.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #eff4fa;
  text-transform: capitalize;
`;
export const FlexContaierForm = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  /* margin-bottom: 1.6rem; */
  width: 100%;
  box-sizing: border-box;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;
export const FlexColumnForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;
export const FlexColumnNoWidth = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  /* width: 100%; */
`;
export const InputLabel = styled.label`
  color: #222b45;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 1rem;
  display: block;
  /* text-transform: capitalize; */
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
  box-sizing: border-box;
  border: 1px solid #dcdcdc;
  border-radius: 0.8rem;
  padding: 1em;
  margin-bottom: 1rem;
  color: #222b45;
  background: #fff;
  box-sizing: border-box;
  outline: #dcdcdc;
  /* text-transform: capitalize; */
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
  text-transform: capitalize;
`;
export const ModalContainer = styled.div`
  padding: 0rem 2.9rem 1.5rem 2.9rem;
  border-bottom: 2px solid #f3f3f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`;
export const ModalHeading = styled.h1`
  color: #222b45;
  font-family: Inter;
  font-size: 1.7rem;
  font-style: normal;
  font-weight: 600;
  line-height: 0rem;
  text-transform: capitalize;
`;
export const ModalIcon = styled.img`
  width: 2.4rem;
  height: 2.4rem;
  display: inline-block;
  cursor: pointer;
`;
export const ModalFormContainer = styled.div`
  padding: 2rem 2.9rem 1.5rem 2.9rem;
  width: 100%;
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
  outline: none;
`;
export const TextAreaComment = styled.textarea`
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 1.6rem;
  width: 100%;
  border: none;
  /* border-radius: 0.8rem; */
  resize: none;
  height: 6rem;
  padding: 0.5em;
  color: #222b45;
  background: #fff;
  box-sizing: border-box;
  outline: none;
`;
export const InputPara = styled.p`
  color: #737992;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 0rem; /* 171.429% */
  display: flex;
  justify-content: space-between;
`;
export const ModalThanks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0rem;
  position: relative;
`;
export const ModalThanksImg = styled.img`
  display: block;
  width: 10.6rem;
  height: 10.6rem;
`;
export const ModalIconDelete = styled.img`
  display: inline-block;
  width: 2.4rem;
  height: 2.4rem;
  cursor: pointer;
  position: absolute;
  right: 1rem;
  top: 0rem;
`;
export const ModalThanksHeading = styled.p`
  color: #222b45;
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.2rem;
  width: 70%;
  text-align: center;
  text-transform: capitalize;
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
export const CertificateContainer = styled.div`
  border-radius: 0.8rem;
  border: 1.5px solid #eff4fa;
  background: #fff;
  padding: 1.6rem;
  width: 80%;
  margin-bottom: 1.6rem;
`;
export const CertificateTitle = styled.div`
  color: #222b45;
  font-family: Inter;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.6rem;
  text-transform: capitalize;
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
export const UploadImageContainer = styled.label`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #d2d3d3;
  flex-direction: column;
  height: 15.2rem;
  margin-bottom: 1.6rem;
`;
export const UploadImageName = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  border-radius: 5px;
  border: 0.5px solid #d2d3d3;
  font-family: Inter;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
  padding: 0.9rem 0.9rem 7px 0.9rem;
  align-items: center;
  justify-content: space-between;
`;
export const UploadImagePara = styled.div`
  color: #222b45;

  font-family: Inter;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.1rem;
  letter-spacing: -0.1.4rem;
`;
export const UploadImageLight = styled.div`
  color: #8f9bb3;
  font-family: Inter;
  font-size: 0.8rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.2rem;
`;

export const CommentDiv = styled.div`
  width: 100%;
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  margin-bottom: 2.4rem;
  border-radius: 8px;
  border: 1.5px solid #eff4fa;
  padding: 1.6rem 1.9rem;
  box-sizing: border-box;

  background: #fff;
`;
export const CommentDivADD = styled.div`
  width: 100%;
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  margin-bottom: 2.4rem;
  box-sizing: border-box;
`;
export const UserImg = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
`;
export const Hr = styled.hr`
  height: 1px;
  width: 100%;
  color: #eff4fa;
  background-color: #eff4fa;
`;
export const TaskStatus = styled.div`
  padding: 1.1rem 1.4rem 1.2rem 1.4rem;
  border-radius: 0.8rem;
  border: 1px solid #d9d9d9;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const TaskSelect = styled.select`
  color: #9ea0aa;
  border: none;
  background: transparent;
  outline: none;
  color: #222b45;

  text-align: center;
  font-family: Inter;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: ${(props) =>
    props.value === false
      ? "#E88B00"
      : props.value === true
      ? "#0d7d0b"
      : "#9ea0aa"};
`;
export const TaskOption = styled.option`
  color: #9ea0aa;
  font-family: Inter;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 500;
  line-height: 2rem;
`;
export const TextAreaContaier = styled.div`
  border-radius: 8px;
  border: 1px solid #e9ebf0;
  background: #fff;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.8rem;
`;
