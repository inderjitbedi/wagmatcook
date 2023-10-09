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
} from "./OADashboard/OADashBoardStyles";

const CommenDashHeader = ({ onSearch, text }) => {
  const Navigate = useNavigate();
  const location = useLocation();

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
    console.log("working menu for notification");
     setShowAll(false);
  };
  const handleCloseMenuNotification = () => {
    setAnchorElNotification(null);
    HandleMarkRead();
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
          // toast.success(result.message); //Entry Deleted successfully");
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
  const HandleMarkRead = () => {
    setIsLoading(true);
    const notificationIds = notificationList
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

          // toast.success(result.message); //Entry Updated Successfully");
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
  const [headerData, setHeaderData] = useState([]);

  const GetHeadersData = (id) => {
    // setIsLoading(true);

    let url = `/employee/header-info/${id}`;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setHeaderData(result);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error in fetching Personal info. Please try again.");
      });
  };
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
    // GetNotificationList()
    GetNotificationCount();

    let user = localStorage.getItem("user");
    if (user) {
      let parsedUser = JSON.parse(user);
      setUser(parsedUser);
      GetHeadersData(parsedUser._id);
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
    } else if (location.pathname.indexOf("organization") > -1) {
      setUserType(ROLES.ORG_ADMIN);
    }
  }, []);
  let API_URL = process.env.REACT_APP_API_URL;

  return (
    <>
      <DashHeader>
        <FlexContaier>
          {(location.pathname.indexOf("details") > -1 ||
            location.pathname.indexOf("leaves-request") > -1 ||
            location.pathname.indexOf("personal-info") > -1 ||
            location.pathname.indexOf("employee/benefits") > -1) && (
            <BackButton onClick={() => Navigate(-1)}>
              <IconsEmployee src="/images/icons/ArrowLeft.svg" />
              Back
            </BackButton>
          )}
          <DashHeaderTitle> {text} </DashHeaderTitle>
        </FlexContaier>

        <DashHeaderSearch>
          {location.pathname.indexOf("details") > -1 ||
          location.pathname.indexOf("leaves-request") > -1 ||
          location.pathname.indexOf("personal-info") > -1 ||
          location.pathname.indexOf("employee/benefits") > -1 ? (
            " "
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
          <Badge
            badgeContent={notificationCount?.count}
            color="primary"
            size="small"
          >
            <div
              style={{ cursor: "pointer", paddingTop: "4px" }}
              onClick={(event) => {
                handleClickMenuNotification(event);
                GetNotificationList();
              }}
            >
              <DashNotification src="/images/icons/Notifications.svg" />
            </div>
          </Badge>

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
                userType === ROLES.ORG_ADMIN && orgData?.logo
                  ? API_URL + orgData?.logo?.path
                  : headerData?.personalInfo?.photo
                  ? API_URL + headerData?.personalInfo.photo?.path
                  : "/images/icons/Logout.svg"
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
        </DashHeaderSearch>
      </DashHeader>
      <Menu
        sx={{ margin: "0px" }}
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
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "20px",
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
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "20px",
          }}
        >
          Settings
        </MenuItem>
        <MenuItem
          onClick={HandleLogout}
          style={{
            color: "#EA4335",
            fontFamily: "Inter",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "20px",
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
                height: "300px",
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
                  <NotificationSelect>
                    <NotificationOption>All</NotificationOption>
                    <NotificationOption>Last Week</NotificationOption>
                    <NotificationOption>Last Month</NotificationOption>
                    <NotificationOption>Last 24 Hrs</NotificationOption>
                  </NotificationSelect>
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
                          ? moment(data.createdAt).format("YYYY-MM-DD hh:mm A")
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
                    Loadmore{" "}
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
