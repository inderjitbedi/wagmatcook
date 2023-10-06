import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommenDashHeader from "../CommenDashHeader";

import {
  DashHeader,
  DashHeaderSearch,
  DashHeaderTitle,
  DashNotification,
  SearchBox,
  SearchIcon,
  SearchInput,
  DashHeading,
} from "../OADashboard/OADashBoardStyles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  CardBody,
  CardContainer,
  CardHeading,
  CardImg,
  CardList,
  CardSubGrey,
  CardSubHeading,
  FlexColContainer,
  Birthday,
  FlexColumn,
  FlexContainer,
  Heading_24,
  PendingStyle,
  WorkAnniversary,
  CardIcons,
} from "./ManagerStyles";
const ManagerDashBoard = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(false);
  const openMenu = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const HandleLogout = () => {
    localStorage.clear();
    handleCloseMenu();
    navigate("/");
  };
  const array6 = [1, 1, 1, 1, 1, 1];
  const array5 = [1, 2, 1, 2];
  const [searchValue, setSearchValue] = useState("");

  const HandleSearchCahnge = (data) => {
    setSearchValue(data);
  };
  return (
    <>
      <CommenDashHeader onSearch={HandleSearchCahnge} text="Dashboard" />

      <Heading_24> Good Evening</Heading_24>
      <CardContainer>
        <FlexColContainer>
          <CardBody>
            <CardHeading>Leave Request</CardHeading>
            {array6.map((data) => (
              <CardList>
                <FlexContainer>
                  <CardImg src="/images/User.jpg" />
                  <FlexColumn>
                    <CardSubHeading>Dianne Russel</CardSubHeading>
                    <CardSubGrey>georgia.young@example.com</CardSubGrey>
                  </FlexColumn>
                </FlexContainer>
                <PendingStyle>Pending</PendingStyle>
              </CardList>
            ))}
          </CardBody>
          {/* <CardBody>
            <CardHeading>Leave Adjustments</CardHeading>
            <CardList>
              <FlexContainer>
                <CardIcons src="/images/icons/empty-box 1.svg" />
                <CardSubGrey style={{ fontSize: "14px" }}>
                  All good! You've nothing new to track.
                </CardSubGrey>
              </FlexContainer>
            </CardList>
          </CardBody> */}
        </FlexColContainer>
        <FlexColContainer>
          <CardBody>
            <CardHeading>Upcoming Events</CardHeading>
            {array5.map((data) => (
              <CardList style={{ border: "none", paddingBottom: "8px" }}>
                <FlexColumn style={{ gap: "8px" }}>
                  <CardSubHeading>Dianne Russel</CardSubHeading>
                  <CardSubGrey>Design</CardSubGrey>
                </FlexColumn>
                {data === 1 ? (
                  <WorkAnniversary>Work Anniversary</WorkAnniversary>
                ) : (
                  <Birthday> Birthday</Birthday>
                )}
              </CardList>
            ))}
          </CardBody>
        </FlexColContainer>
        <FlexColContainer>
          <CardBody>
            <CardHeading> Announcements</CardHeading>
            <CardList>
              <FlexColumn style={{ gap: "8px" }}>
                <CardSubHeading>
                  Hurry! Your IT declaration is awaiting. Please submit it
                  before the window gets closed.{" "}
                </CardSubHeading>
                <CardSubGrey>12-05-2023</CardSubGrey>
              </FlexColumn>
            </CardList>
            <CardList>
              <FlexColumn style={{ gap: "8px" }}>
                <CardSubHeading>
                  Hurry! Your IT declaration is awaiting. Please submit it
                  before the window gets closed.{" "}
                </CardSubHeading>
                <CardSubGrey>12-05-2023</CardSubGrey>
              </FlexColumn>
            </CardList>
          </CardBody>
          <CardBody>
            <CardHeading>Credential Expiry</CardHeading>
            <CardList>
              <FlexContainer style={{ alignItems: "flex-start" }}>
                <CardIcons src="/images/icons/Bell Off.svg" />
                <FlexColumn style={{ gap: "8px" }}>
                  <CardSubHeading>
                    Hurry! Your IT declaration is awaiting. Please submit it
                    before the window gets closed.{" "}
                  </CardSubHeading>
                  <CardSubGrey>12-05-2023</CardSubGrey>
                </FlexColumn>
              </FlexContainer>
            </CardList>
          </CardBody>
        </FlexColContainer>
      </CardContainer>
    </>
  );
};

export default ManagerDashBoard;
