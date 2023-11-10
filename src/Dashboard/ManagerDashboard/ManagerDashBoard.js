import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommenDashHeader from "../CommenDashHeader";
import httpClient from "../../api/httpClient";
import API_URLS from "../../constants/apiUrls";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

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
import moment from "moment";
const ManagerDashBoard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
  let API_URL = process.env.REACT_APP_API_URL;

  const HandleSearchCahnge = (data) => {
    setSearchValue(data);
  };
  const GetDashboardInfo = () => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      let url = API_URLS.getDashboardData;
      httpClient({
        method: "get",
        url,
      })
        .then(({ result, error }) => {
          if (result) {
            setDashboardData(result);
            resolve(result);
          } else {
            //toast.warn("something went wrong ");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Error creating department. Please try again.");
          setIsLoading(false);
          reject(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  };
  useEffect(() => {
    GetDashboardInfo();
  }, []);

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "70vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RotatingLines
            strokeColor="#279AF1"
            strokeWidth="3"
            animationDuration="0.75"
            width="52"
            visible={true}
          />
        </div>
      ) : (
        <>
          <CommenDashHeader onSearch={HandleSearchCahnge} text="Dashboard" />

          <Heading_24> Good Evening</Heading_24>
          <CardContainer>
            <FlexColContainer>
              <CardBody>
                <CardHeading>Leave Request</CardHeading>
                {!dashboardData?.leaves?.length && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      margin: "3rem 0rem",
                    }}
                  >
                    <CardSubHeading>No pending leave request</CardSubHeading>
                  </div>
                )}
                {dashboardData?.leaves?.map((data) => (
                  <CardList>
                    <FlexContainer>
                      <CardImg
                        src={
                          data?.employee?.personalInfo?.photo
                            ? API_URL +
                              data?.employee?.personalInfo?.photo?.path
                            : "/images/User.jpg"
                        }
                      />
                      <FlexColumn>
                        <CardSubHeading>
                          {data?.employee?.personalInfo
                            ? [
                                data?.employee?.personalInfo?.firstName,
                                data?.employee?.personalInfo?.lastName,
                              ].join(" ")
                            : " - "}
                        </CardSubHeading>
                        <CardSubGrey>
                          {data?.employee ? data?.employee?.email : " - "}
                        </CardSubGrey>
                      </FlexColumn>
                    </FlexContainer>
                    <PendingStyle>{data?.status}</PendingStyle>
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
                {!dashboardData?.certificates?.length && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      margin: "3rem 0rem",
                    }}
                  >
                    <CardSubHeading>No expiries to show</CardSubHeading>
                  </div>
                )}
                {dashboardData?.certificates?.map((data) => (
                  <CardList>
                    <FlexContainer style={{ alignItems: "flex-start" }}>
                      <CardIcons src="/images/icons/Bell Off.svg" />
                      <FlexColumn style={{ gap: "8px" }}>
                        <CardSubHeading>
                          Hurry! Your {data.title} certificate is expirying
                          soon.{" "}
                        </CardSubHeading>
                        <CardSubGrey>
                          {data.expiryDate
                            ? moment.utc(data.expiryDate).format("D MMM, YYYY")
                            : " - "}
                        </CardSubGrey>
                      </FlexColumn>
                    </FlexContainer>
                  </CardList>
                ))}
              </CardBody>
            </FlexColContainer>
          </CardContainer>
        </>
      )}
    </>
  );
};

export default ManagerDashBoard;
