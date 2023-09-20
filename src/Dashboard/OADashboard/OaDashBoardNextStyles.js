import React from "react";
import styled from "styled-components";

export const SectionCard = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  width: 100%;
  justify-content: space-between;
`;
export const SectionCardContainer = styled.div`
  background-color: #4fafff;
  border-radius: 8px;
  flex: 1 1 250px;
  padding: 10px 20px;
`;

export const SectionCardContainer2 = styled.div`
  background-color: #886ef2;
  border-radius: 8px;
  flex: 1 1 250px;
  padding: 10px 20px;
`;
export const SectionCardContainer3 = styled.div`
  background-color: #60b4c2;
  border-radius: 8px;
  flex: 1 1 250px;
  padding: 10px 20px;
`;
export const SectionCardContainer4 = styled.div`
  background-color: #49d157;
  border-radius: 8px;
  flex: 1 1 250px;
  padding: 10px 20px;
`;
export const SectionCardTitle = styled.p`
  color: #ffffff;
  font-size: 13px;
  line-height: 16px;
  font-weight: 600;
  opacity: 60%;
`;
export const SectionCardNumber = styled.p`
  color: #ffffff;
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
`;

export const MainCardContainer = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;
export const MainCard = styled.div`
  padding: 0px 25px;
  background-color: #ffffff;
  flex: 1 0 40%;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;

export const MainCardTitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: -8px;
`;
export const MainCardPara = styled.p`
  font-size: 14px;
  line-height: 0px;
  font-weight: 600;
  color: #222b45;
  text-transform: capitalize;
`;
export const MainCardParaLight = styled.p`
  font-size: 14px;
  line-height: 0px;
  font-weight: 400;
  color: #8f9bb3;
`;
export const MainCardView = styled.p`
  color: #279af1;
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
`;
export const CardEmployeeList = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 13px;
  padding-top: 8px;
  border-bottom: 1px solid #ededed;
  &:first-child {
    padding-top: 0px;
  }
  &:last-child {
    border-bottom: none;
  }
`;
export const CardEmployeeDiv = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const CardEmployeePara = styled.p`
  color: #8f9bb3;
  font-size: 14px;
  font-weight: 400;
  line-height: 15px;
  align-self: flex-end;
  margin-bottom: 2px;
  display: block;
`;
export const CardEmployeespan = styled.span`
  color: #222b45;
  font-size: 14px;
  font-weight: 400;
  line-height: 15px;
`;
export const CardEmployeeImg = styled.img`
  width: 40px;
  height: 40px;
`;

export const CardLeavesList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 13px;
  padding-top: 8px;
  border-bottom: 1px solid #ededed;
  &:first-child {
    padding-top: 0px;
  }
  &:last-child {
    border-bottom: none;
  }
`;
export const CardLeavesDiv = styled.div`
  display: flex;
  flex-direction: column;
  /* gap:4px; */
`;
export const CardLeavesPara = styled.p`
  color: #222b45;
  font-size: 14px;
  font-weight: 400;
  line-height: 15px;
`;

export const CardLeavesButton = styled.button`
  color: #0d7d0b;
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  border-radius: 100px;
  background-color: #c8ffc7;
  padding: 2px 6px 2px 12px;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
export const CardLeavesArrow = styled.img`
  display: inline-block;
`;
export const CardList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 13px;
  padding-top: 8px;
  border-bottom: 1px solid #ededed;
  &:first-child {
    padding-top: 0px;
  }
  &:last-child {
    border-bottom: none;
  }
`;
export const CardListPara = styled.p`
  color: #8f9bb3;
  font-size: 14px;
  font-weight: 400;
  line-height: 15px;
`;
export const CardListSpan = styled.span`
  color: #222b45;
  font-size: 14px;
  font-weight: 400;
  line-height: 15px;
`;
