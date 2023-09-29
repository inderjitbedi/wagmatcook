import React from "react";
import styled from "styled-components";

export const Dashboard = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;
export const DashNav = styled.div`
  width: 18%;
  background-color: #ffffff;
  /* padding: 32px; */
`;

export const DashMain = styled.div`
  width: 82%;
  padding: 0px 30px 80px 20px;
  background: #f3f3f5;
  height: max-content;
  min-height: 100vh;
  overflow-x: hidden;
`;
export const DashHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 40px;
`;
export const DashHeaderTitle = styled.p`
  color: #222b45;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
`;
export const DashHeaderSearch = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;
export const FlexContaier = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
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
export const DashNotification = styled.img``;
export const SearchBox = styled.div`
  border-radius: 1px;
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
  &:focus {
    outline: none;
  }
`;
export const SearchIcon = styled.img``;

export const DashHeading = styled.h1`
  color: #222b45;
  font-size: 22px;
  line-height: 24px;
  font-weight: 400;
`;
export const BannerSection = styled.div`
  display: flex;
  width: 100%;
  border-radius: 8px;
  margin-bottom: 15px;
`;
export const BannerHeading = styled.div`
  width: 50%;
  background-color: #ffffff;
  padding-left: 25px;
`;
export const BannerTitle = styled.p`
  color: #222b45;
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
  width: 60%;
`;
export const BannerButton = styled.button`
  border-radius: 8px;
  background-color: #279af1;
  color: #ffffff;
  font-size: 16px;
  line-height: 19.35px;
  font-weight: 700;
  padding: 1em 2em;
  border: none;
`;

export const BannerImage = styled.img`
  width: 50%;
`;
export const DashCardContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;
export const DashCard = styled.div`
  padding: 16px 25px;
  background-color: #ffffff;
  flex: 1 0 40%;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  /* max-width: 48%; */
`;
export const DashCardTitle = styled.p`
  color: #222b45;
  font-size: 16px;
  font-weight: 700;
  line-height: 36px;
`;
export const DashCardTitle2 = styled.p`
  color: #222b45;
  font-size: 16px;
  font-weight: 700;
  line-height: 0px;
`;
export const DashCardsub = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
`;
export const DashCardButon = styled.button`
  border-radius: 8px;
  background-color: #279af1;
  color: #ffffff;
  font-size: 13px;
  line-height: 16px;
  font-weight: 600;
  padding: 1em 2em;
  border: none;
`;
export const DashCardPara = styled.p`
  color: #8f939c;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  margin-bottom: 17px;
`;
export const DashCardIcons = styled.img``;
export const DashCardPri = styled.div``;
export const Pagination = styled.div`
display:flex;
gap:8px;
align-items: center;
`
export const PaginationButton = styled.button`
  color: #222b45;
  text-align: center;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding: 10px 19.5px;
  border-radius: 6px;
  background: #e9e9ee;
  border:none;
  cursor: pointer;
`;
export const NotificationsContainer = styled.div`
  width: 444px;
  height: 311px;
  border: 1px solid #e3e3e3;
  background: #fff;
  overflow-y: scroll;
  
`;
export const NotificationsHeader = styled.div`
  width: 100%;
  border-bottom: 1px solid #e3e3e3;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const FlexNotificationContainer = styled.div`
display: flex;
gap:8px;
`;
export const NotificationHeading = styled.h1`
  color: #222b45;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  margin: 0px;
`;
export const NotificationIcon = styled.img`
  width: 16px;
  height: 16px;
`;
