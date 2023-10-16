import React from "react";
import styled from "styled-components";

export const SectionCard = styled.div`
  display: flex;
  gap: 1.6rem;
  margin-bottom: 2.4rem;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
`;
export const SectionCardContainer = styled.div`
  background-color: #4fafff;
  border-radius: 8px;
  flex: 1 1 25rem;
  padding: 1rem 0rem 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SectionCardContainer2 = styled.div`
  background-color: #886ef2;
  border-radius: 8px;
  flex: 1 1 25rem;
  padding: 1rem 0rem 1rem 2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const SectionCardContainer3 = styled.div`
  background-color: #60b4c2;
  border-radius: 8px;
  flex: 1 1 25rem;
  padding: 1rem 0rem 1rem 2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const SectionCardContainer4 = styled.div`
  background-color: #49d157;
  border-radius: 8px;
  flex: 1 1 25rem;
  padding: 1rem 0rem 1rem 2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const SectionCardFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const SectionCardTitle = styled.p`
  color: #ffffff;
  font-size: 1.3rem;
  line-height: 1.6rem;
  font-weight: 600;
  opacity: 60%;
`;
export const SectionCardNumber = styled.p`
  color: #ffffff;
  font-size: 2rem;
  line-height: 2.4rem;
  font-weight: 700;
`;
export const SectionCardImg = styled.img`
  width: 8.6rem;
  height: 8.6rem;
  opacity: 0.4;
`;

export const MainCardContainer = styled.div`
  display: flex;
  gap: 2.4rem;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 4rem;
`;
export const MainCard = styled.div`
  padding: 0rem 2.5rem;
  background-color: #ffffff;
  flex: 1 0 40%;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.19) 0rem 1rem 2rem,
    rgba(0, 0, 0, 0.23) 0rem 6px 6px;
`;

export const MainCardTitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: -8px;
`;
export const MainCardPara = styled.p`
  font-size: 1.4rem;
  line-height: 1.8rem;
  font-weight: 600;
  color: #222b45;
  text-transform: capitalize;
  margin: 0;
`;
export const MainCardParaLight = styled.p`
  font-size: 1.4rem;
  line-height: 1.8rem;
  font-weight: 400;
  color: #8f9bb3;
  margin: 0;
`;
export const MainCardView = styled.p`
  color: #279af1;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.6rem;
`;
export const CardEmployeeList = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1.3rem;
  padding-top: 0.8rem;
  border-bottom: 1px solid #ededed;
  &:first-child {
    padding-top: 0rem;
  }
  &:last-child {
    border-bottom: none;
  }
`;
export const CardEmployeeDiv = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
`;

export const CardEmployeePara = styled.p`
  color: #8f9bb3;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.5rem;
  align-self: flex-end;
  margin-bottom: 2px;
  display: block;
`;
export const CardEmployeespan = styled.span`
  color: #222b45;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.5rem;
`;
export const CardEmployeeImg = styled.img`
  width: 4rem;
  height: 4rem;
  object-fit: cover;

  border-radius: 50%;
`;

export const CardLeavesList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1.3rem;
  padding-top: 0.8rem;
  border-bottom: 1px solid #ededed;
  &:first-child {
    padding-top: 0rem;
  }
  &:last-child {
    border-bottom: none;
  }
`;
export const CardLeavesDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap:4px;
`;
export const CardLeavesPara = styled.p`
  color: #222b45;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.5rem;
`;

export const CardLeavesButton = styled.button`
  color: #0d7d0b;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 2.4rem;
  border-radius: 1rem;
  background-color: #c8ffc7;
  padding: 2px 0.6rem 2px 1.2rem;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 8.5rem;
  cursor: pointer;
`;
export const CardLeavesArrow = styled.img`
  display: inline-block;
`;
export const CardList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1.3rem;
  padding-top: 0.8rem;
  border-bottom: 1px solid #ededed;
  &:first-child {
    padding-top: 0rem;
  }
  &:last-child {
    border-bottom: none;
  }
`;
export const CardListPara = styled.p`
  color: #8f9bb3;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.5rem;
`;
export const CardListSpan = styled.span`
  color: #222b45;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.5rem;
`;
