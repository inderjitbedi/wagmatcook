import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import SettingsModal from "../Modals/SettingsModal";
import httpClient from "../api/httpClient";
import { toast } from "react-toastify";
import API_URLS from "../constants/apiUrls";
import { RotatingLines, ThreeDots } from "react-loader-spinner";
import ROLES from "../constants/roles";
import moment from "moment";
import { HiOutlineMenu } from "react-icons/hi";
import styled from "styled-components";
import SideBar from "./OADashboard/SideBar";
import UserSideBar from "./UserDashboard/UserSideBar";
import ManagerSideBar from "./ManagerDashboard/ManagerSideBar";
import HRSideBar from "./HRDashboard/HRSideBar";
import { useHeaderInfoContext } from "../Context/ContextProvider";
import SASideBar from "../SuperAdmin/SideBar/SASideBar";
import {
  DashHeader,
  DashHeaderTitle,
  DashHeaderSearch,
  SearchBox,
  SearchInput,
  SearchIcon,
  DashNotification,
  NotificationsContainer,
  NotificationsHeader,
  FlexNotificationContainer,
  NotificationHeading,
  NotificationIcon,
  NotificationList,
  NotificationUserImg,
  NotificationListText,
  NotificationListTextLight,
  NotificationFlexCol,
  NotificationSelect,
  NotificationOption,
  BackButton,
  FlexContaier,
  IconsEmployee,
  LoadMore,
  SearchBarWrapper,
  SearchInputMobile,
  SearchButton,
} from "./OADashboard/OADashBoardStyles";
export const newStyle = styled.p`
  border-radius: 10rem;
  background: #27acf1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 1.4rem;
  margin: 0;
  color: #27def1;
  width: max-content;
  font-family: Inter;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.4rem;
`;
const CommenDashHeader = ({ onSearch, text }) => {
  let API_URL = process.env.REACT_APP_API_URL;
  const {
    headerData,
    globalNotificationCount,
    setGlobalNotificationCount,
    clearContextData,
  } = useHeaderInfoContext();
  const Navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  const toggleSearchBar = () => {
    setExpanded(!expanded);
    setSearchValue("");
  };
  const [openSettings, setOpenSettings] = React.useState(false);
  const HandleOpenSettings = () => {
    setOpenSettings(true);
    GetOrgProfile();
  };
  const HandleCloseSettings = () => setOpenSettings(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isProfile, setIsProfile] = useState([]);
  const [notificationCount, setNotificationCount] = useState([]);
  const [anchorElNotification, setAnchorElNotification] = useState(null);
  const openMenuNotification = Boolean(anchorElNotification);
  const handleClickMenuNotification = (event) => {
    setAnchorElNotification(event.currentTarget);
    // //console.log("working menu for notification");
    setShowAll(false);
  };
  const handleCloseMenuNotification = () => {
    setAnchorElNotification(null);
    // HandleMarkRead();
  };
  const [user, setUser] = useState();
  const [orgData, setOrgData] = useState();
  const [userType, setUserType] = useState("");

  const [notificationList, setNotificationList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [delayedSearchValue, setDelayedSearchValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(false);
  const [orgProfile, setOrgProfile] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const limitedData = showAll
    ? notificationList
    : notificationList?.slice(0, 5);

  const handleShowMoreClick = () => {
    setShowAll(true);
  };
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
    Navigate("/");
    clearContextData();
  };
  const HandleChange = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    onSearch(newValue);
  };
  useEffect(() => {
    onSearch(delayedSearchValue);
  }, [delayedSearchValue, onSearch]);
  useEffect(() => {
    const delayDuration = 1500;

    const searchTimer = setTimeout(() => {
      setDelayedSearchValue(searchValue);
    }, delayDuration);

    return () => clearTimeout(searchTimer);
  }, [searchValue]);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const ToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const SidebarWrapper = styled.div`
    display: none;
    @media only screen and (max-width: 1200px) {
      display: block;
      width: 25rem;
      background-color: #ffffff;
      height: 100vh;
      position: fixed;
      top: 0;
      right: 0;
      transition: width 0.3s;
      z-index: 100000;
      overflow-y: scroll;
    }
  `;
  const SidebarContainer = () => {
    if (userType === ROLES.HR) {
      return (
        <SidebarWrapper>
          {" "}
          <HRSideBar
            ToggleSidebar={ToggleSidebar}
            screenWidth={screenWidth}
          />{" "}
        </SidebarWrapper>
      );
    } else if (userType === ROLES.MANAGER) {
      return (
        <SidebarWrapper>
          {" "}
          <ManagerSideBar
            ToggleSidebar={ToggleSidebar}
            screenWidth={screenWidth}
          />{" "}
        </SidebarWrapper>
      );
    } else if (userType === ROLES.EMPLOYEE) {
      return (
        <SidebarWrapper>
          {" "}
          <UserSideBar
            ToggleSidebar={ToggleSidebar}
            screenWidth={screenWidth}
          />{" "}
        </SidebarWrapper>
      );
    } else if (userType === ROLES.SUPER_ADMIN) {
      return (
        <SidebarWrapper>
          {" "}
          <SASideBar
            ToggleSidebar={ToggleSidebar}
            screenWidth={screenWidth}
          />{" "}
        </SidebarWrapper>
      );
    } else {
      return (
        <SidebarWrapper>
          {" "}
          <SideBar
            ToggleSidebar={ToggleSidebar}
            screenWidth={screenWidth}
          />{" "}
        </SidebarWrapper>
      );
    }
  };
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const GetNotificationList = () => {
    setIsLoading(true);
    let url = API_URLS.getNotificationList;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setNotificationList(result.notifications);
          HandleMarkRead(result.notifications);
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error creating department. Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const GetNotificationCount = () => {
    setIsLoading(true);
    let url = API_URLS.getNotificationCount;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setNotificationCount(result);
          setGlobalNotificationCount(result);
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error creating department. Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const HandleMarkAllRead = () => {
    setIsLoading(true);
    let url = API_URLS.notificationReadAll;
    httpClient({
      method: "put",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          // GetNotificationList();
          GetNotificationCount();
          // toast.success(result.message, {
          // className: "toast",
          // }); //Entry Deleted successfully");
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        // console.error("Error:", error);
        toast.error("Error in deleting employee. Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const HandleMarkRead = (data) => {
    setIsLoading(true);
    const notificationIds = data
      ?.filter((notification) => !notification.isRead)
      .map((notification) => notification._id);

    let dataCopy = { notificationIds: notificationIds };

    let url = API_URLS.markReadNotification;

    httpClient({
      method: "put",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          GetNotificationCount();

          // toast.success(result.message, {
          //   className: "toast",
          // }); //Entry Updated Successfully");
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        //console.error("Error:", error);
        toast.error("Error Updating Benefits . Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // const [headerData, setHeaderData] = useState([]);

  // const GetHeadersData = (id) => {
  //   // setIsLoading(true);

  //   let url = `/employee/header-info/${id}`;
  //   httpClient({
  //     method: "get",
  //     url,
  //   })
  //     .then(({ result, error }) => {
  //       if (result) {
  //         setHeaderData(result);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //       toast.error("Error in fetching Personal info. Please try again.");
  //     });
  // };
  const GetOrgProfile = () => {
    setIsProfile(true);
    let url = API_URLS.getOrgProfile;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setOrgProfile(result.details);
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error creating department. Please try again.");
        setIsProfile(false);
      })
      .finally(() => {
        setIsProfile(false);
      });
  };

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      let parsedUser = JSON.parse(user);
      setUser(parsedUser);
      // GetHeadersData(parsedUser._id);
    }
    let org = localStorage.getItem("org");
    if (org) {
      let parsedUser = JSON.parse(org);
      setOrgData(parsedUser);
    }

    if (location.pathname.indexOf("manager") > -1) {
      setUserType(ROLES.MANAGER);
    } else if (location.pathname.indexOf("hr") > -1) {
      setUserType(ROLES.HR);
    } else if (location.pathname.indexOf("user") > -1) {
      setUserType(ROLES.EMPLOYEE);
    } else if (location.pathname.indexOf("organization-admin") > -1) {
      setUserType(ROLES.ORG_ADMIN);
    } else if (location.pathname.indexOf("super-admin") > -1) {
      setUserType(ROLES.SUPER_ADMIN);
    }
  }, []);

  return (
    <>
      {isSidebarOpen && <SidebarContainer />}
      <DashHeader>
        <FlexContaier>
          {screenWidth < 1200
            ? " "
            : (location.pathname.indexOf("details") > -1 ||
                location.pathname.indexOf("request") > -1 ||
                location.pathname.indexOf("personal-info") > -1 ||
                location.pathname.indexOf("employee/benefits") > -1 ||
                location.pathname.indexOf("tasks/details") > -1 ||
                location.pathname.indexOf("documents/history") > -1) && (
                <BackButton onClick={() => Navigate(-1)}>
                  <IconsEmployee src="/images/icons/ArrowLeft.svg" />
                  Back
                </BackButton>
              )}
          <DashHeaderTitle>
            {" "}
            {screenWidth < 1200 ? <span>Wagmatcook</span> : text}{" "}
          </DashHeaderTitle>
        </FlexContaier>

        <DashHeaderSearch>
          {location.pathname.indexOf("details") > -1 ||
          location.pathname.indexOf("request") > -1 ||
          location.pathname.indexOf("personal-info") > -1 ||
          location.pathname.indexOf("employee/benefits") > -1 ||
          location.pathname.indexOf("tasks/details") > -1 ||
          location.pathname.indexOf("documents/history") > -1 ||
          location.pathname.indexOf("dashboard") > -1 ? (
            " "
          ) : screenWidth < 600 ? (
            <SearchBarWrapper expanded={expanded}>
              <SearchInputMobile
                type="text"
                placeholder="Search..."
                expanded={expanded}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <SearchButton onClick={toggleSearchBar}>
                {expanded ? (
                  <SearchIcon src="/images/icons/Alert-Circle.svg" />
                ) : (
                  <SearchIcon src="/images/icons/searchIcon.svg" />
                )}
              </SearchButton>
            </SearchBarWrapper>
          ) : (
            <SearchBox>
              <SearchInput
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              ></SearchInput>
              <SearchIcon src="/images/icons/searchIcon.svg" />
            </SearchBox>
          )}

          {userType === ROLES.SUPER_ADMIN ? (
            " "
          ) : (
            <Badge
              badgeContent={globalNotificationCount?.count}
              color="primary"
              size="small"
            >
              <div
                style={{ cursor: "pointer", paddingTop: ".4rem" }}
                onClick={(event) => {
                  handleClickMenuNotification(event);
                  GetNotificationList();
                }}
              >
                <DashNotification src="/images/icons/Notifications.svg" />
              </div>
            </Badge>
          )}
          {screenWidth < 1200 ? (
            ""
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                gap: "5px",
              }}
              onClick={(event) => handleClickMenu(event)}
            >
              <DashNotification
                src={
                  // userType === ROLES.ORG_ADMIN && orgData?.logo
                  //   ? API_URL + orgData?.logo?.path
                  //     :
                  headerData?.personalInfo?.photo
                    ? API_URL + headerData?.personalInfo.photo?.path
                    : "/images/User.jpg"
                }
              />
              <img
                src="/images/icons/arrowdown.svg"
                style={{
                  width: "5px",
                  height: "9px",
                  transform: anchorEl ? "rotate(180deg)" : undefined,
                }}
              />
            </div>
          )}
          {screenWidth < 1200 && (
            <HiOutlineMenu
              onClick={ToggleSidebar}
              style={{ width: "3rem", height: "3rem", cursor: "pointer" }}
            />
          )}
        </DashHeaderSearch>
      </DashHeader>
      <Menu
        sx={{ margin: "0rem" }}
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {userType === ROLES.ORG_ADMIN && (
          <MenuItem
            style={{
              color: "#222B45",
              fontFamily: "Inter",
              fontSize: "1.4rem",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "2rem",
            }}
            onClick={HandleOpenSettings}
          >
            Organization Profile
          </MenuItem>
        )}
        <MenuItem
          style={{
            color: "#222B45",
            fontFamily: "Inter",
            fontSize: "1.4rem",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "2rem",
          }}
        >
          Settings
        </MenuItem>
        <MenuItem
          onClick={HandleLogout}
          style={{
            color: "#EA4335",
            fontFamily: "Inter",
            fontSize: "1.4rem",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "2rem",
          }}
        >
          Logout
        </MenuItem>
      </Menu>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorElNotification}
        open={openMenuNotification}
        onClose={handleCloseMenuNotification}
      >
        <NotificationsContainer>
          {isLoading ? (
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "30rem",
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
              <NotificationsHeader>
                <FlexNotificationContainer>
                  <NotificationHeading>Notifications</NotificationHeading>
                  {/* <NotificationSelect>
                    <NotificationOption>All</NotificationOption>
                    <NotificationOption>Last Week</NotificationOption>
                    <NotificationOption>Last Month</NotificationOption>
                    <NotificationOption>Last 24 Hrs</NotificationOption>
                  </NotificationSelect> */}
                </FlexNotificationContainer>
                <FlexNotificationContainer>
                  <NotificationHeading
                    style={{ cursor: "pointer" }}
                    onClick={HandleMarkAllRead}
                  >
                    Mark all as read
                  </NotificationHeading>
                  <NotificationIcon src="/svg/outline.svg" />
                </FlexNotificationContainer>
              </NotificationsHeader>
              {!limitedData?.length && (
                <LoadMore>
                  <span>no notification found</span>
                </LoadMore>
              )}
              {limitedData?.map((data) => (
                <>
                  <NotificationList>
                    <NotificationUserImg
                      src={
                        data.sender?.personalInfo.photo
                          ? API_URL + data?.sender?.personalInfo?.photo?.path
                          : "/images/User.jpg"
                      }
                    />

                    <NotificationFlexCol>
                      <NotificationListText>{data.title}</NotificationListText>
                      <NotificationListTextLight>
                        {data.createdAt
                          ? moment
                              .utc(data.createdAt)
                              .format("D MMM, YYYY hh:mm A")
                          : "-"}
                      </NotificationListTextLight>
                    </NotificationFlexCol>
                  </NotificationList>
                </>
              ))}
              {notificationList.length > 5 && !showAll ? (
                <LoadMore>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={handleShowMoreClick}
                  >
                    {" "}
                    Load more{" "}
                  </span>
                </LoadMore>
              ) : (
                ""
              )}
            </>
          )}
        </NotificationsContainer>
      </Menu>
      <SettingsModal
        openSettings={openSettings}
        HandleCloseSettings={HandleCloseSettings}
        isProfile={isProfile}
        orgProfile={orgProfile}
      />
    </>
  );
};

export default CommenDashHeader;
