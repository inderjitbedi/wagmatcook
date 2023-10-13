import React from "react";
import styled, { keyframes } from "styled-components";

export const Dashboard = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

export const DashNav = styled.div`
  width: 20%;
  background-color: #ffffff;
  /* padding: 3.2rem; */
`;

export const DashMain = styled.div`
  width: 80%;
  padding: 0rem 3rem 8rem 2rem;
  background: #f3f3f5;
  height: max-content;
  min-height: 100vh;
  overflow-x: hidden;
`;
export const DashHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 4rem;
  position: relative;
  align-items: center;
`;
export const DashHeaderTitle = styled.p`
  color: #222b45;
  font-weight: 600;
  font-size: 2rem;
  line-height: 2.4rem;
`;
export const DashHeaderSearch = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
`;
export const FlexContaier = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;
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
`;
export const DashNotification = styled.img`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  object-fit: cover;
`;
export const SearchBox = styled.div`
  border-radius: 1px;
  background-color: #ffffff;
  padding: 0.9rem 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 8px;
`;
export const SearchInput = styled.input`
  border: 0rem;
  /* padding:0.5em; */
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;
export const SearchIcon = styled.img``;

export const DashHeading = styled.h1`
  color: #222b45;
  font-size: 2.2rem;
  line-height: 2.4rem;
  font-weight: 400;
`;
export const BannerSection = styled.div`
  display: flex;
  width: 100%;
  border-radius: 0.8rem;
  margin-bottom: 1.5rem;
`;
export const BannerHeading = styled.div`
  width: 50%;
  background-color: #ffffff;
  padding-left: 2.5rem;
`;
export const BannerTitle = styled.p`
  color: #222b45;
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 3.6rem;
  width: 60%;
`;
export const BannerButton = styled.button`
  border-radius: 0.8rem;
  background-color: #279af1;
  color: #ffffff;
  font-size: 1.6rem;
  line-height: 1.93rem;
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
  gap: 2.4rem;
  flex-wrap: wrap;
  margin-bottom: 4rem;
  /* justify-content: space-between; */
  /* align-items: baseline; */
  @media only screen and (max-width: 900px) {
    align-items: none;
  }
`;
export const DashCard = styled.div`
  padding: 1.6rem 2.5rem;
  background-color: #ffffff;
  flex: 1 0 40%;
  border-radius: 0.8rem;
  box-shadow: rgba(0, 0, 0, 0.19) 0rem 1rem 2rem,
    rgba(0, 0, 0, 0.23) 0rem 6px 6px;
  /* max-width: 48%; */
`;
export const DashCardTitle = styled.p`
  color: #222b45;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 3.6rem;
`;
export const DashCardTitle2 = styled.p`
  color: #222b45;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 0rem;
`;
export const DashCardsub = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2rem;
`;
export const DashCardButon = styled.button`
  border-radius: 0.8rem;
  background-color: #279af1;
  color: #ffffff;
  font-size: 1.3rem;
  line-height: 1.6rem;
  font-weight: 600;
  padding: 1em 2em;
  border: none;
`;
export const DashCardPara = styled.p`
  color: #8f939c;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2rem;
  margin-bottom: 1.7rem;
`;
export const DashCardIcons = styled.img``;
export const DashCardPri = styled.div``;
export const Pagination = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
`;
export const PaginationButton = styled.button`
  color: #222b45;
  text-align: center;
  font-family: Inter;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding: 1rem 19.5px;
  border-radius: 6px;
  background: #e9e9ee;
  border: none;
  cursor: pointer;
`;
export const NotificationsContainer = styled.div`
  width: 44.4rem;
  box-sizing: border-box;
  max-height: 31.1rem;
  border-bottom: 1px solid #e3e3e3;
  background: #fff;
  overflow-y: scroll;
`;
export const NotificationsHeader = styled.div`
  width: 100%;
  border-bottom: 1px solid #e3e3e3;
  padding: 2rem 1.6rem 1.2rem 1.6rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;
`;
export const FlexNotificationContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
`;
export const NotificationHeading = styled.h1`
  color: #222b45;
  font-family: Inter;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2rem;
  margin: 0rem;
`;
export const NotificationIcon = styled.img`
  width: 1.6rem;
  height: 1.6rem;
`;
export const NotificationList = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: flex-start;
  padding: 0.8rem 1.6rem;
  border-bottom: 1px solid #e3e3e3;
  width: 100%;
  box-sizing: border-box;
  &:last-child {
    border-bottom: none;
  }
`;
export const NotificationUserImg = styled.img`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
`;
export const NotificationListText = styled.p`
  color: #222b45;
  font-family: Inter;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2rem;
  margin: 0rem;
`;
export const NotificationListTextLight = styled.p`
  color: #a5acb8;
  font-family: Inter;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 500;
  line-height: 2rem;
  margin: 0rem;
`;
export const NotificationFlexCol = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-direction: column;
`;
export const NotificationSelect = styled.select`
  color: #9ea0aa;
  border: none;
  background: transparent;
  outline: none;
  font-family: Inter;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 500;
  line-height: 2rem;
`;
export const NotificationOption = styled.option`
  color: #9ea0aa;
  font-family: Inter;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 500;
  line-height: 2rem;
`;
export const LoadMore = styled.div`
  color: #a5acb8;
  font-family: Inter;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.2rem;
  margin: 0rem;
  padding: 0.75em 0rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const SearchBarWrapper = styled.div`
  position: absolute;
  border-radius: 50px;
  background: #ffffff;

  box-sizing: border-box;
  transition: all 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
  top: ${(props) => (props.expanded ? "1.5rem" : "2rem")};
  right: ${(props) => (props.expanded ? "0rem" : "9rem")};
  align-items: center;
  transition: width 0.3s;
  width: ${(props) => (props.expanded ? "100%" : "30px")};
  z-index: 1000;
`;
export const SearchInputMobile = styled.input`
  border: none;
  background: none;
  padding: 8px;
  outline: none;
  width: 100%;
  margin: 0;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  display: ${(props) => (props.expanded ? "block" : "none")};

  z-index: 1000;
`;
const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;
export const SearchButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  animation: ${fadeIn} 1s linear;
  display: flex;
  align-items: center;
  justify-content: center;
`;
