import React from "react";
import styled from "styled-components";
//sidebar styled components

export const SidebarTitle = styled.p`
  color: #222222;
  font-size: 2rem;
  font-weight: 700;
  line-height: 2.4rem;
  margin-bottom: 3.5rem;
  padding: 0rem 3.2rem;
`;
export const IconDelete = styled.img`
  display: inline-block;
  width: 2.4rem;
  height: 2.4rem;
  cursor: pointer;
  position: absolute;
  right: 1rem;
  top: 0rem;
`;
export const SideBarLogoContainer = styled.div`
  padding: 1.6rem 3.2rem;
  display: flex;
  gap: 0.8rem;
  align-items: center;
  width: 100%;
`;
export const SideBarLogo = styled.img`
  height: 5.6rem;
  width: 5.6rem;
  border-radius: 50%;
  object-fit: cover;
`;
export const SideBarLogodiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
export const SideBarLogoHead = styled.p`
  color: #222222;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 2.2rem;
  margin: 0;
`;

export const SideBarLogoPara = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.6rem;
  color: #686868;
  width: 100%;
  margin: 0;
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
  &:hover {
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
  line-height: 1.6rem;
  cursor: pointer;
  margin: 0px;
`;
export const SidebarArrow = styled.img``;
export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2.5rem;
  align-items: center;
  margin-bottom: -3rem;
`;
export const DropDownContainer = styled.div`
  width: 100%;
  padding: 0rem 1rem;
  /* background-color: #8f9bb3; */
  margin-top: -1.5rem;
`;
