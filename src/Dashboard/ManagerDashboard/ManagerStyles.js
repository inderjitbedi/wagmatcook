import styled from "styled-components";

export const Heading_24 = styled.h1`
  color: #222b45;
  font-family: Inter;
  font-size: 2.4rem;
  font-style: normal;
  font-weight: 800;
  line-height: 2.4rem;
  margin: 0;
`;
export const CardContainer = styled.div`
  padding: 3.4rem 0rem;
  box-sizing: border-box;
  display: flex;
  gap: 1.3rem;
  width: 100%;
  align-items: flex-start;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;
export const FlexColContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  flex: 1 1 37.2rem;
  @media only screen and (max-width: 600px) {
   flex: 1;
   width: 100%;
  }
`;
export const CardBody = styled.div`
  padding: 2.4rem;
  border-radius: 1.6rem;
  border: 1px solid #e3e3e3;
  background: #fff;
  height: max-content;
`;
export const CardHeading = styled.h2`
  color: #222b45;
  font-family: Inter;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.4rem; /* 150% */
  margin: 0 0 0rem 0;
`;
export const CardList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1.6rem;
  padding-top: 1.6rem;
  border-bottom: 1px solid #ededed;
  &:first-child {
    padding-top: 0rem;
  }
  &:last-child {
    border-bottom: none;
    padding-bottom: 0rem;
  }
`;
export const CardSubHeading = styled.p`
  color: #222b45;
  font-family: Inter;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.6rem; /* 114.286% */
  margin: 0;
`;
export const CardSubGrey = styled.p`
  color: #8f9bb3;
  font-family: Inter;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.6rem; /* 133.333% */
  margin: 0;
`;
export const CardImg = styled.img`
  width: 3rem;
  height: 3rem;
  border: 2px solid #fff;
  border-radius: 50%;
  object-fit: cover;
`;
export const CardIcons = styled.img`
  width: 4.2rem;
  height: 4.2rem;
`;
export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;
export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;
export const PendingStyle = styled.p`
  border-radius: 1rem;
  background: #fff1dd;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 1.2rem;
  margin: 0;
  color: #e88b00;

  font-family: Inter;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.4rem;
`;
export const WorkAnniversary = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 1.2rem;
  border-radius: 0.8rem;
  background: #fff2f0;
  color: #c49991;
  text-align: center;
  font-family: Inter;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.6rem;
  margin: 0;
`;
export const Birthday = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 1.2rem;
  border-radius: 0.8rem;
  background: #fedaff;
  color: #a300a7;
  text-align: center;
  font-family: Inter;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.6rem;
`;
