import styled from "styled-components";

export const Heading_24 = styled.h1`
  color: #222b45;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 800;
  line-height: 24px;
  margin: 0;
`;
export const CardContainer = styled.div`
  padding: 34px 0px;
  box-sizing: border-box;
  display: flex;
  gap: 13px;
  width: 100%;
  align-items: flex-start;
`;
export const FlexColContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  flex: 1 1 372px;
`;
export const CardBody = styled.div`
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #e3e3e3;
  background: #fff;
  height: max-content;
`;
export const CardHeading = styled.h2`
  color: #222b45;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */
  margin: 0 0  0px 0;
`;
export const CardList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  padding-top: 16px;
  border-bottom: 1px solid #ededed;
  &:first-child {
    padding-top: 0px;
  }
  &:last-child {
    border-bottom: none;
    padding-bottom: 0px;
  }
`;
export const CardSubHeading = styled.p`
  color: #222b45;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px; /* 114.286% */
  margin: 0;
`;
export const CardSubGrey = styled.p`
  color: #8f9bb3;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
  margin:0;

`;
export const CardImg = styled.img`
  width: 30px;
  height: 30px;
  border: 2px solid #fff;
  border-radius: 50%;
  object-fit: cover;
`;
export const CardIcons = styled.img`
  width: 42px;
  height: 42px;
`;
export const FlexContainer = styled.div`
display: flex;
align-items: center;
gap:8px;

`;
export const FlexColumn = styled.div`
display: flex;
flex-direction: column;

`
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
export const WorkAnniversary = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  border-radius: 8px;
  background: #fff2f0;
  color: #c49991;
  text-align: center;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  margin: 0;
`;
export const Birthday = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  border-radius: 8px;
  background: #fedaff;
  color: #a300a7;
  text-align: center;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
`;
