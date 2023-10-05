import React from "react";
import styled from "styled-components";
//sidebar styled components

export const SidebarTitle = styled.p`
  color: #222222;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  margin-bottom: 35px;
  padding: 0px 32px;
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
  border-radius: 50%;
  /* object-fit: cover; */
`;
export const SideBarLogodiv = styled.div`
  display: flex;
  flex-direction: column;
  gap:5px;
`;
export const SideBarLogoHead = styled.p`
  color: #222222;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  margin: 0;

`;

export const SideBarLogoPara = styled.p`
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: #686868;
  width: 100%;
  margin: 0;
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
  &:hover {
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
export const SidebarArrow = styled.img``;
export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 25px;
  align-items: center;
  margin-bottom: -30px;
`;
export const DropDownContainer = styled.div`
  width: 100%;
  padding: 0px 10px;
  /* background-color: #8f9bb3; */
  margin-top: -15px;
`;
