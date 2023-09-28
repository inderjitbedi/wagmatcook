import styled from "styled-components";

export const PendingStyle = styled.p`
  border-radius: 100px;
  background: #fff1dd;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 12px;
  margin: 0;
  color: #e88b00;

  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
`;
export const Main = styled.div`
  border-radius: 8px;
  border: 1px solid #eff4fa;
  background: #fff;
  width: 100%;
  padding: 24px 26px;
`;
export const MainSub = styled.div`
  width: 48%;
`;
export const FlexContainer = styled.div`
  width: 100%;
  flex: 1;

  /* gap: 8px; */
`;
export const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 30px;
`;
export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
export const LeaveActionHeader = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
`;
export const LeaveIcon = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 50%;
`;
export const Headingleave = styled.h1`
  color: #222b45;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
  margin: 0;
`;
export const HeadingGrey = styled.h1`
  color: #8f9bb3;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  margin: 0;
`;
export const FormContainer = styled.div`
  width: 80%;
  display: flex;
  margin-bottom: 30px;
`;
export const Titlelight = styled.p`
  color: #8f9bb3;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 133.333% */
  margin: 0;
`;
export const Titledark = styled.p`
  color: #222b45;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 114.286% */
  margin: 0;
`;
export const ColumnFlexDiv = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  width: 100%;
`;
export const HeadingDetail = styled.h1`
  color: #222b45;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
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
export const AddNewButton = styled.button`
  border-radius: 8px;
  background-color: #279af1;
  color: #ffffff;
  font-size: 13px;
  line-height: 16px;
  font-weight: 600;
  padding: 1em 1.5em;
  border: none;
  cursor: pointer;
  text-transform: capitalize;
  &:first-child{
    margin-right: 16px;
  }
`;
export const Greypara = styled.p`
  color: #8f9bb3;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
`;
