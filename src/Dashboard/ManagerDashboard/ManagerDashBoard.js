import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommenDashHeader from "../CommenDashHeader";
import httpClient from "../../api/httpClient";
import API_URLS from "../../constants/apiUrls";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import { useLocation } from "react-router";
import ROLES from "../../constants/roles";

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
  MainCardView,
  CardSubBlack,
  CardSubHeadingEffect,
} from "./ManagerStyles";
import moment from "moment";
import { FlexSpaceBetween } from "../../Employee/ViewEmployee/ViewEmployeeStyle";

const ManagerDashBoard = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const [userType, setUserType] = useState("");
  const [dashboardData, setDashboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState();
  const [greeting, setGreeting] = useState("");
  const [anchorEl, setAnchorEl] = useState(false);
  const [Announcements, setAnnouncements] = useState([]);
  const [result, setResult] = useState([]);

  const openMenu = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
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
  const GetAnnouncements = () => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      let url = API_URLS.listAnnouncement;

      httpClient({
        method: "get",
        url,
      })
        .then(({ result, error }) => {
          if (result) {
            setResult(result);
            setAnnouncements(result.announcements);
            resolve(result);
          } else {
            //toast.warn("something went wrong ");
          }
        })
        .catch((error) => {
          //console.error("Error:", error);
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
    GetAnnouncements();
    if (location.pathname.indexOf("manager") > -1) {
      setUserType(ROLES.MANAGER);
    } else if (location.pathname.indexOf("hr") > -1) {
      setUserType(ROLES.HR);
    } else if (location.pathname.indexOf("payroll") > -1) {
      setUserType(ROLES.PAYROLL);
    } else if (location.pathname.indexOf("user") > -1) {
      setUserType(ROLES.EMPLOYEE);
    } else if (location.pathname.indexOf("organization-admin") > -1) {
      setUserType(ROLES.ORG_ADMIN);
    } else if (location.pathname.indexOf("super-admin") > -1) {
      setUserType(ROLES.SUPER_ADMIN);
    }
    let user = localStorage.getItem("user");
    if (user) {
      let parsedUser = JSON.parse(user);
      setUser(parsedUser);
    }
    function getGreeting() {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();

      if (currentHour >= 5 && currentHour < 12) {
        return "Good Morning";
      } else if (currentHour >= 12 && currentHour < 17) {
        return "Good Afternoon";
      } else if (currentHour >= 17 && currentHour < 24) {
        return "Good Evening";
      } else {
        return "Good Night";
      }
    }

    // Set greeting when component mounts
    setGreeting(getGreeting());
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

          <Heading_24> {greeting}</Heading_24>
          <CardContainer>
            <FlexColContainer>
              {userType === ROLES.EMPLOYEE ? (
                <CardBody>
                  <FlexSpaceBetween
                    style={{ alignItems: "center", margin: "0" }}
                  >
                    <CardHeading>Applied Leave Request</CardHeading>
                    {!dashboardData?.leaves?.length < 1 && (
                      <MainCardView
                        onClick={() => {
                          if (userType === ROLES.MANAGER) {
                            Navigate(`/manager-management/announcements`);
                          } else if (userType === ROLES.HR) {
                            Navigate(`/hr-management/announcements`);
                          } else if (userType === ROLES.PAYROLL) {
                            Navigate(`/payroll-management/announcements`);
                          } else if (userType === ROLES.EMPLOYEE) {
                            Navigate(
                              `/user-management/leave/history/${user?._id}`
                            );
                          }
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        View All
                      </MainCardView>
                    )}
                  </FlexSpaceBetween>

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
                    <CardList style={{ width: "100%" }}>
                      <FlexContainer
                        onClick={() => {
                          if (userType === ROLES.MANAGER) {
                            Navigate(`/manager-management/announcements`);
                          } else if (userType === ROLES.HR) {
                            Navigate(`/hr-management/announcements`);
                          } else if (userType === ROLES.PAYROLL) {
                            Navigate(`/payroll-management/announcements`);
                          } else if (userType === ROLES.EMPLOYEE) {
                            Navigate(
                              `/user-management/leave/history/${user?._id}`
                            );
                          }
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <FlexColumn>
                          <CardSubHeadingEffect>
                            {data?.leaveType?.name || " - "}
                          </CardSubHeadingEffect>
                          <FlexContainer style={{ flex: "1" }}>
                            <CardSubGrey>
                              From :
                              <CardSubBlack>
                                {data?.from
                                  ? moment.utc(data?.from).format("D MMM, YYYY")
                                  : " - "}
                              </CardSubBlack>
                            </CardSubGrey>
                            <CardSubGrey>
                              To :
                              <CardSubBlack>
                                {data?.to
                                  ? moment.utc(data?.to).format("D MMM, YYYY")
                                  : " - "}
                              </CardSubBlack>
                            </CardSubGrey>
                          </FlexContainer>
                        </FlexColumn>
                      </FlexContainer>
                      <PendingStyle>{data?.status}</PendingStyle>
                    </CardList>
                  ))}
                </CardBody>
              ) : (
                <CardBody>
                  <FlexSpaceBetween
                    style={{ alignItems: "center", margin: "0" }}
                  >
                    <CardHeading>Leave Request</CardHeading>
                    {!dashboardData?.leaves?.length < 1 && (
                      <MainCardView
                        onClick={() => {
                          if (userType === ROLES.MANAGER) {
                            Navigate(`/manager-management/leaves`);
                          } else if (userType === ROLES.HR) {
                            Navigate(`/hr-management/leaves`);
                          } else if (userType === ROLES.PAYROLL) {
                            Navigate(`/payroll-management/leaves`);
                          } else {
                            Navigate(`/user-management/leaves`);
                          }
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        View All
                      </MainCardView>
                    )}
                  </FlexSpaceBetween>

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
                      <FlexContainer
                        onClick={() => {
                          if (userType === ROLES.MANAGER) {
                            Navigate(
                              `/manager-management/request/${data?.employee?._id}/${data._id}`
                            );
                          } else if (userType === ROLES.HR) {
                            Navigate(
                              `/hr-management/request/${data?.employee?._id}/${data._id}`
                            );
                          } else if (userType === ROLES.PAYROLL) {
                            Navigate(
                              `/payroll-management/request/${data?.employee?._id}/${data._id}`
                            );
                          } else if (userType === ROLES.EMPLOYEE) {
                            Navigate(
                              `/user-management/request/${data?.employee?._id}/${data._id}`
                            );
                          }
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <CardImg
                          src={
                            data?.employee?.personalInfo?.photo
                              ? API_URL +
                                data?.employee?.personalInfo?.photo?.path
                              : "/images/User.jpg"
                          }
                        />
                        <FlexColumn>
                          <CardSubHeadingEffect>
                            {data?.employee?.personalInfo
                              ? [
                                  data?.employee?.personalInfo?.firstName,
                                  data?.employee?.personalInfo?.lastName,
                                ].join(" ")
                              : " - "}
                          </CardSubHeadingEffect>

                          <CardSubGrey>
                            {data?.employee ? data?.employee?.email : " - "}
                          </CardSubGrey>
                        </FlexColumn>
                      </FlexContainer>
                      <PendingStyle>{data?.status}</PendingStyle>
                    </CardList>
                  ))}
                </CardBody>
              )}

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
                <FlexSpaceBetween style={{ alignItems: "center", margin: "0" }}>
                  <CardHeading> Announcements</CardHeading>
                  {!Announcements?.length < 1 && (
                    <MainCardView
                      onClick={() => {
                        if (userType === ROLES.MANAGER) {
                          Navigate(`/manager-management/announcements`);
                        } else if (userType === ROLES.HR) {
                          Navigate(`/hr-management/announcements`);
                        } else if (userType === ROLES.PAYROLL) {
                          Navigate(`/payroll-management/announcements`);
                        } else {
                          Navigate(`/user-management/announcements`);
                        }
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      View All
                    </MainCardView>
                  )}
                </FlexSpaceBetween>
                {!Announcements?.length && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      margin: "3rem 0rem",
                    }}
                  >
                    <CardSubHeading>No announcements found </CardSubHeading>
                  </div>
                )}
                {Announcements?.map((data) => (
                  <CardList>
                    <FlexColumn style={{ gap: "8px" }}>
                      <CardSubHeadingEffect
                        onClick={() => {
                          if (userType === ROLES.MANAGER) {
                            Navigate(
                              `/manager-management/announcements/details/${data._id}`
                            );
                          } else if (userType === ROLES.HR) {
                            Navigate(
                              `/hr-management/announcements/details/${data._id}`
                            );
                          } else if (userType === ROLES.PAYROLL) {
                            Navigate(
                              `/payroll-management/announcements/details/${data._id}`
                            );
                          } else if (userType === ROLES.EMPLOYEE) {
                            Navigate(
                              `/user-management/announcements/details/${data._id}`
                            );
                          }
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {data.title || " - "}
                      </CardSubHeadingEffect>

                      <CardSubGrey>
                        {data.updatedAt
                          ? moment(data.updatedAt).format("D MMM, YYYY")
                          : " "}
                      </CardSubGrey>
                    </FlexColumn>
                  </CardList>
                ))}
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
                    <FlexContainer
                      style={{ alignItems: "flex-start", cursor: "pointer" }}
                      onClick={() => {
                        if (userType === ROLES.MANAGER) {
                          Navigate(
                            `/manager-management/account/certificates/${data.employee}`
                          );
                        } else if (userType === ROLES.HR) {
                          Navigate(
                            `/hr-management/account/certificates/${data.employee}`
                          );
                        } else if (userType === ROLES.PAYROLL) {
                          Navigate(
                            `/payroll-management/account/certificates/${data.employee}`
                          );
                        } else {
                          Navigate(
                            `/user-management/account/certificates/${data.employee}`
                          );
                        }
                      }}
                    >
                      <CardIcons src="/images/icons/Bell Off.svg" />
                      <FlexColumn style={{ gap: "8px" }}>
                        <CardSubHeading style={{ fontWeight: "400" }}>
                          Hurry! Your{" "}
                          <span style={{ fontWeight: "600" }}>
                            {data.title}
                          </span>{" "}
                          certificate is expirying soon.{" "}
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
            <FlexColContainer>
              <CardBody>
                <CardHeading>Upcoming Events</CardHeading>
                {!dashboardData?.upcomingEvents?.length ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      margin: "3rem 0rem",
                    }}
                  >
                    <CardSubHeading>No upcoming events </CardSubHeading>
                  </div>
                ) : (
                  dashboardData?.upcomingEvents?.map((data) => (
                    <CardList style={{ border: "none", paddingBottom: "8px" }}>
                      <FlexColumn style={{ gap: "8px" }}>
                        <CardSubHeading>
                          {data.employee
                            ? [
                                data.employee.firstName,
                                data.employee.lastName,
                              ].join(" ")
                            : " - "}
                        </CardSubHeading>
                        <CardSubGrey>{data.date}</CardSubGrey>
                      </FlexColumn>
                      {data.type === "Work Anniversary" ? (
                        <WorkAnniversary>Work Anniversary</WorkAnniversary>
                      ) : (
                        <Birthday> Birthday</Birthday>
                      )}
                    </CardList>
                  ))
                )}
              </CardBody>
            </FlexColContainer>
          </CardContainer>
        </>
      )}
    </>
  );
};

export default ManagerDashBoard;
