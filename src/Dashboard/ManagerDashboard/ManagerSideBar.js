import React, { useState, useEffect } from "react";
import httpClient from "../../api/httpClient";
import { useHeaderInfoContext } from "../../Context/ContextProvider";
import {
  SidebarTitle,
  SideBarListTitle,
  SideBarLogoContainer,
  SideBarLogo,
  SideBarLogoHead,
  SideBarLogoPara,
  SideBarListContainer,
  SideBarLogodiv,
  SideBarListLogo,
  SideBarList,
  IconDelete,
} from "../OADashboard/SideBarStyles";
import ROLES from "../../constants/roles";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BiTask } from "react-icons/bi";
import { MdWorkHistory } from "react-icons/md";
import { TbMessageCheck } from "react-icons/tb";


const ManagerSideBar = ({ ToggleSidebar, screenWidth }) => {
  const { headerData } = useHeaderInfoContext();

  const location = useLocation();
  const [orgData, setOrgData] = useState();
  const [userData, setUserData] = useState();
  const [userType, setUserType] = useState("");
  const Navigate = useNavigate();

  const HandleLogout = () => {
    localStorage.clear();

    Navigate("/");
  };
  const SideBarData = [
    {
      Title: "Dashboard",
      src: "/svg/Dashboard.svg",
      to: "/manager-management/dashboard",
    },

    //  {
    //    Title: "Employee",
    //    src: "/svg/Employee.svg",
    //    to: "/manager-management/employee-list",
    //    active: "employee-details",
    //  },

    {
      Title: "Leaves",
      src: "/svg/managerleaves.svg",
      to: "/manager-management/leaves",
    },
    //  {
    //    Title: "Events",
    //    src: "/svg/fire.svg",
    //    //  to: "/manager-management/leaves",
    //  },
    //  {
    //    Title: "My Account",
    //    src: "/svg/person.svg",
    //    //  to: "/manager-management/leaves",
    //  },
    //  {
    //    Title: "Helpdesk",
    //    src: "/svg/alert-circle.svg",
    //    //  to: "/manager-management/leaves",
    //  },
  ];
  const style = {
    textDecoration: "none",
    color: "#279AF1",
  };
  const [isHovering, setIsHovering] = useState({
    dashbord: false,
    employee: false,
    leaves: false,
    myleaves: false,
    account: false,
    documents: false,
    staffing: false,
    task: false,
    logout: false,
    staffing: false,
    announcements: false,
  });
  const handleMouseEnter = (linkName) => {
    setIsHovering((prevState) => ({
      ...prevState,
      [linkName]: true,
    }));
  };

  const handleMouseLeave = (linkName) => {
    setIsHovering((prevState) => ({
      ...prevState,
      [linkName]: false,
    }));
  };
  useEffect(() => {
    let org = localStorage.getItem("org");
    if (org) {
      let parsedUser = JSON.parse(org);
      setOrgData(parsedUser);
    }
    let user = localStorage.getItem("user");
    if (user) {
      let parsedUser = JSON.parse(user);
      setUserData(parsedUser);
    }
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
    }
  }, []);
  let API_URL = process.env.REACT_APP_API_URL;

  return (
    <div style={{ position: "relative" }}>
      {screenWidth < 1200 && (
        <IconDelete
          onClick={ToggleSidebar}
          src="/images/icons/Alert-Circle.svg"
        />
      )}
      <SidebarTitle>Your Community Portal</SidebarTitle>
      <hr style={{ width: "100%", color: "#EDEDED" }}></hr>
      <SideBarLogoContainer>
        <SideBarLogo
          src={
            headerData?.personalInfo?.photo
              ? API_URL + headerData?.personalInfo?.photo?.path
              : "/images/User.jpg"
          }
        />
        <SideBarLogodiv>
          <SideBarLogoHead>
            {(headerData?.personalInfo?.firstName
              ? headerData?.personalInfo?.firstName
              : " -") +
              " " +
              (headerData?.personalInfo?.lastName
                ? headerData?.personalInfo?.lastName
                : " -")}
          </SideBarLogoHead>
          <SideBarLogoPara>
            {headerData?.position?.department?.name || "-"}
          </SideBarLogoPara>
        </SideBarLogodiv>
      </SideBarLogoContainer>
      <hr style={{ width: "80%", color: "#EDEDED", margin: "auto" }}></hr>
      <SideBarList>
        <Link
          style={{ textDecoration: "none" }}
          to="/manager-management/dashboard"
          onMouseEnter={() => handleMouseEnter("dashboard")}
          onMouseLeave={() => handleMouseLeave("dashboard")}
        >
          <SideBarListContainer style={{ zIndex: "1" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.49525 5.25C5.49525 4.83525 5.84691 4.5 6.2802 4.5C6.71349 4.5 7.06515 4.83525 7.06515 5.25C7.06515 5.66475 6.71349 6 6.2802 6C5.84691 6 5.49525 5.66475 5.49525 5.25ZM8.63504 5.25C8.63504 4.83525 8.98669 4.5 9.41998 4.5C9.85328 4.5 10.2049 4.83525 10.2049 5.25C10.2049 5.66475 9.85328 6 9.41998 6C8.98669 6 8.63504 5.66475 8.63504 5.25ZM3.92536 6.75V4.5C3.92536 4.086 4.2778 3.75 4.71031 3.75H14.1297C14.5622 3.75 14.9146 4.086 14.9146 4.5V6.75H3.92536ZM14.9146 13.5C14.9146 13.914 14.5622 14.25 14.1297 14.25H4.71031C4.2778 14.25 3.92536 13.914 3.92536 13.5V8.25H14.9146V13.5ZM14.1297 2.25H4.71031C3.41201 2.25 2.35547 3.2595 2.35547 4.5V6.75V8.25V13.5C2.35547 14.7405 3.41201 15.75 4.71031 15.75H14.1297C15.428 15.75 16.4845 14.7405 16.4845 13.5V8.25V6.75V4.5C16.4845 3.2595 15.428 2.25 14.1297 2.25Z"
                fill={
                  location.pathname.indexOf("dashboard") > -1 ||
                  isHovering.dashboard
                    ? "#279AF1"
                    : "#5C5C5C"
                }
              />
              <mask
                id="mask0_1480_5022"
                style={{ maskType: "luminance" }}
                maskUnits="userSpaceOnUse"
                x="2"
                y="2"
                width="15"
                height="14"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.49525 5.25C5.49525 4.83525 5.84691 4.5 6.2802 4.5C6.71349 4.5 7.06515 4.83525 7.06515 5.25C7.06515 5.66475 6.71349 6 6.2802 6C5.84691 6 5.49525 5.66475 5.49525 5.25ZM8.63504 5.25C8.63504 4.83525 8.98669 4.5 9.41998 4.5C9.85328 4.5 10.2049 4.83525 10.2049 5.25C10.2049 5.66475 9.85328 6 9.41998 6C8.98669 6 8.63504 5.66475 8.63504 5.25ZM3.92536 6.75V4.5C3.92536 4.086 4.2778 3.75 4.71031 3.75H14.1297C14.5622 3.75 14.9146 4.086 14.9146 4.5V6.75H3.92536ZM14.9146 13.5C14.9146 13.914 14.5622 14.25 14.1297 14.25H4.71031C4.2778 14.25 3.92536 13.914 3.92536 13.5V8.25H14.9146V13.5ZM14.1297 2.25H4.71031C3.41201 2.25 2.35547 3.2595 2.35547 4.5V6.75V8.25V13.5C2.35547 14.7405 3.41201 15.75 4.71031 15.75H14.1297C15.428 15.75 16.4845 14.7405 16.4845 13.5V8.25V6.75V4.5C16.4845 3.2595 15.428 2.25 14.1297 2.25Z"
                  fill={
                    location.pathname.indexOf("dashboard") > -1 ||
                    isHovering.dashboard
                      ? "#279AF1"
                      : "#5C5C5C"
                  }
                />
              </mask>
              <g mask="url(#mask0_1480_5022)"></g>
            </svg>
            <SideBarListTitle
              style={
                location.pathname.indexOf("dashboard") > -1 ||
                isHovering.dashboard
                  ? style
                  : { color: "#5C5C5C" }
              }
            >
              {"Dashboard"}
            </SideBarListTitle>
          </SideBarListContainer>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          to="/manager-management/employee-list"
          onMouseEnter={() => handleMouseEnter("employee")}
          onMouseLeave={() => handleMouseLeave("employee")}
        >
          <SideBarListContainer style={{ zIndex: "1" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.2692 14.25C17.2692 14.664 16.9184 15 16.4843 15C16.0502 15 15.6993 14.664 15.6993 14.25C15.6993 13.0095 14.6428 12 13.3445 12C12.8084 12 12.299 12.1755 11.8876 12.4867C12.3147 13.2338 12.5596 14.0903 12.5596 15C12.5596 15.414 12.2087 15.75 11.7746 15.75C11.3405 15.75 10.9897 15.414 10.9897 15C10.9897 12.9323 9.22903 11.25 7.06494 11.25C4.90084 11.25 3.1402 12.9323 3.1402 15C3.1402 15.414 2.78933 15.75 2.35526 15.75C1.92118 15.75 1.57031 15.414 1.57031 15C1.57031 12.105 4.03583 9.75 7.06494 9.75C8.57753 9.75 9.94804 10.3372 10.9426 11.2845C11.6247 10.7805 12.4646 10.5 13.3445 10.5C15.5086 10.5 17.2692 12.1823 17.2692 14.25ZM13.3445 6.75C13.7778 6.75 14.1295 7.08675 14.1295 7.5C14.1295 7.91325 13.7778 8.25 13.3445 8.25C12.9112 8.25 12.5596 7.91325 12.5596 7.5C12.5596 7.08675 12.9112 6.75 13.3445 6.75ZM13.3445 9.75C14.6428 9.75 15.6993 8.7405 15.6993 7.5C15.6993 6.2595 14.6428 5.25 13.3445 5.25C12.0462 5.25 10.9897 6.2595 10.9897 7.5C10.9897 8.7405 12.0462 9.75 13.3445 9.75ZM7.06494 3.75C7.93073 3.75 8.63483 4.42275 8.63483 5.25C8.63483 6.07725 7.93073 6.75 7.06494 6.75C6.19914 6.75 5.49504 6.07725 5.49504 5.25C5.49504 4.42275 6.19914 3.75 7.06494 3.75ZM7.06494 8.25C8.79653 8.25 10.2047 6.9045 10.2047 5.25C10.2047 3.5955 8.79653 2.25 7.06494 2.25C5.33334 2.25 3.92515 3.5955 3.92515 5.25C3.92515 6.9045 5.33334 8.25 7.06494 8.25Z"
                fill={
                  location.pathname.indexOf("employee") > -1 ||
                  isHovering.employee
                    ? "#279AF1"
                    : "#5C5C5C"
                }
              />
            </svg>
            <SideBarListTitle
              style={
                location.pathname.indexOf("employee") > -1 ||
                isHovering.employee
                  ? style
                  : { color: "#5C5C5C" }
              }
            >
              {" "}
              Employees
            </SideBarListTitle>
          </SideBarListContainer>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          to="/manager-management/leaves"
          onMouseEnter={() => handleMouseEnter("leaves")}
          onMouseLeave={() => handleMouseLeave("leaves")}
        >
          <SideBarListContainer style={{ zIndex: "1" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.4815 8.2305H16.4838C16.9163 8.2305 17.268 8.565 17.2688 8.97825C17.2751 10.9815 16.4642 12.8678 14.9854 14.2882C13.5073 15.7088 11.5387 16.494 9.44209 16.5H9.41932C7.33058 16.5 5.36586 15.726 3.88467 14.3182C2.39798 12.906 1.57614 11.025 1.56986 9.02175C1.56358 7.01775 2.37443 5.13225 3.85327 3.71175C5.33132 2.29125 7.29997 1.506 9.39656 1.5C10.0206 1.509 10.6564 1.569 11.2655 1.7085C11.6862 1.806 11.9461 2.211 11.844 2.61375C11.7428 3.01575 11.3165 3.26325 10.8974 3.16725C10.4099 3.05475 9.89264 3.0075 9.40127 3C7.72384 3.0045 6.14845 3.633 4.96632 4.76925C3.78341 5.9055 3.13504 7.4145 3.13975 9.01725C3.14446 10.62 3.80225 12.1245 4.99144 13.2548C6.17671 14.3805 7.74817 15 9.41932 15H9.43738C11.1148 14.9955 12.6902 14.367 13.8723 13.2308C15.0552 12.0938 15.7036 10.5855 15.6989 8.98275C15.6981 8.56875 16.0482 8.23125 16.4815 8.2305ZM6.50953 8.46968C6.81644 8.17643 7.31253 8.17643 7.61944 8.46968L9.38086 10.1527L14.3237 4.75568C14.6094 4.44593 15.1047 4.41293 15.4312 4.68593C15.757 4.95818 15.7899 5.43218 15.5042 5.74418L10.0096 11.7442C9.86674 11.9002 9.66266 11.9924 9.44523 11.9999H9.41932C9.21131 11.9999 9.01194 11.9212 8.86437 11.7802L6.50953 9.53018C6.20261 9.23693 6.20261 8.76293 6.50953 8.46968Z"
                fill={
                  location.pathname.indexOf("leaves") > -1 ||
                  location.pathname.indexOf("request") > -1 ||
                  isHovering.leaves
                    ? "#279AF1"
                    : "#5C5C5C"
                }
              />
              <mask
                id="mask0_1509_8191"
                style={{ maskType: "luminance" }}
                maskUnits="userSpaceOnUse"
                x="1"
                y="1"
                width="17"
                height="16"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16.4815 8.2305H16.4838C16.9163 8.2305 17.268 8.565 17.2688 8.97825C17.2751 10.9815 16.4642 12.8678 14.9854 14.2882C13.5073 15.7088 11.5387 16.494 9.44209 16.5H9.41932C7.33058 16.5 5.36586 15.726 3.88467 14.3182C2.39798 12.906 1.57614 11.025 1.56986 9.02175C1.56358 7.01775 2.37443 5.13225 3.85327 3.71175C5.33132 2.29125 7.29997 1.506 9.39656 1.5C10.0206 1.509 10.6564 1.569 11.2655 1.7085C11.6862 1.806 11.9461 2.211 11.844 2.61375C11.7428 3.01575 11.3165 3.26325 10.8974 3.16725C10.4099 3.05475 9.89264 3.0075 9.40127 3C7.72384 3.0045 6.14845 3.633 4.96632 4.76925C3.78341 5.9055 3.13504 7.4145 3.13975 9.01725C3.14446 10.62 3.80225 12.1245 4.99144 13.2548C6.17671 14.3805 7.74817 15 9.41932 15H9.43738C11.1148 14.9955 12.6902 14.367 13.8723 13.2308C15.0552 12.0938 15.7036 10.5855 15.6989 8.98275C15.6981 8.56875 16.0482 8.23125 16.4815 8.2305ZM6.50953 8.46968C6.81644 8.17643 7.31253 8.17643 7.61944 8.46968L9.38086 10.1527L14.3237 4.75568C14.6094 4.44593 15.1047 4.41293 15.4312 4.68593C15.757 4.95818 15.7899 5.43218 15.5042 5.74418L10.0096 11.7442C9.86674 11.9002 9.66266 11.9924 9.44523 11.9999H9.41932C9.21131 11.9999 9.01194 11.9212 8.86437 11.7802L6.50953 9.53018C6.20261 9.23693 6.20261 8.76293 6.50953 8.46968Z"
                  fill={
                    location.pathname.indexOf("leaves") > -1 ||
                    location.pathname.indexOf("request") > -1 ||
                    isHovering.leaves
                      ? "#279AF1"
                      : "white"
                  }
                />
              </mask>
              <g mask="url(#mask0_1509_8191)"></g>
            </svg>
            <SideBarListTitle
              style={
                location.pathname.indexOf("leaves") > -1 ||
                location.pathname.indexOf("request") > -1 ||
                isHovering.leaves
                  ? style
                  : { color: "#5C5C5C" }
              }
            >
              {" "}
              Leaves
            </SideBarListTitle>
          </SideBarListContainer>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          to="/manager-management/leave/history"
          onMouseEnter={() => handleMouseEnter("myleaves")}
          onMouseLeave={() => handleMouseLeave("myleaves")}
        >
          <SideBarListContainer style={{ zIndex: "1" }}>
            <MdWorkHistory
              style={
                location.pathname.indexOf("leave/history") > -1 ||
                isHovering.myleaves
                  ? style
                  : { color: "#5C5C5C" }
              }
            />
            <SideBarListTitle
              style={
                location.pathname.indexOf("leave/history") > -1 ||
                isHovering.myleaves
                  ? style
                  : { color: "#5C5C5C" }
              }
            >
              {" "}
              My Leaves
            </SideBarListTitle>
          </SideBarListContainer>
        </Link>
        {/* <Link
          style={{ textDecoration: "none" }}
          to="/manager-management/tasks"
          onMouseEnter={() => handleMouseEnter("task")}
          onMouseLeave={() => handleMouseLeave("task")}
        >
          <SideBarListContainer style={{ zIndex: "1" }}>
            <BiTask
              style={
                location.pathname.indexOf("task") > -1 || isHovering.task
                  ? style
                  : { color: "#5C5C5C" }
              }
            />
            <SideBarListTitle
              style={
                location.pathname.indexOf("task") > -1 || isHovering.task
                  ? style
                  : { color: "#5C5C5C" }
              }
            >
              {" "}
              Tasks
            </SideBarListTitle>
          </SideBarListContainer>
        </Link> */}
        <Link
          style={{ textDecoration: "none" }}
          to="/manager-management/documents"
          onMouseEnter={() => handleMouseEnter("documents")}
          onMouseLeave={() => handleMouseLeave("documents")}
        >
          <SideBarListContainer style={{ zIndex: "1" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
            >
              <path
                d="M4.70898 6.6C4.70898 4.90294 4.70898 4.05442 5.30017 3.52721C5.89136 3 6.84285 3 8.74585 3H10.0915C11.9945 3 12.946 3 13.5372 3.52721C14.1283 4.05442 14.1283 4.90294 14.1283 6.6V11.4C14.1283 13.0971 14.1283 13.9456 13.5372 14.4728C12.946 15 11.9945 15 10.0915 15H8.74585C6.84285 15 5.89136 15 5.30017 14.4728C4.70898 13.9456 4.70898 13.0971 4.70898 11.4V6.6Z"
                stroke={
                  location.pathname.indexOf("manager-management/documents") >
                    -1 || isHovering.documents
                    ? "#279AF1"
                    : "#5C5C5C"
                }
                stroke-width="1.5"
              />
              <path
                d="M7.06445 9.75H11.7741"
                stroke={
                  location.pathname.indexOf("manager-management/documents") >
                    -1 || isHovering.documents
                    ? "#279AF1"
                    : "#5C5C5C"
                }
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M7.06445 6.75H11.7741"
                stroke={
                  location.pathname.indexOf("manager-management/documents") >
                    -1 || isHovering.documents
                    ? "#279AF1"
                    : "#5C5C5C"
                }
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M7.06445 12H9.41929"
                stroke={
                  location.pathname.indexOf("manager-management/documents") >
                    -1 || isHovering.documents
                    ? "#279AF1"
                    : "#5C5C5C"
                }
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
            <SideBarListTitle
              style={
                location.pathname.indexOf("manager-management/documents") >
                  -1 || isHovering.documents
                  ? style
                  : { color: "#5C5C5C" }
              }
            >
              {" "}
              Document Library
            </SideBarListTitle>
          </SideBarListContainer>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          to="/manager-management/job-posting"
          onMouseEnter={() => handleMouseEnter("staffing")}
          onMouseLeave={() => handleMouseLeave("staffing")}
        >
          <SideBarListContainer style={{ zIndex: "1" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
            >
              <g clip-path="url(#clip0_1913_11804)">
                <ellipse
                  cx="7.06403"
                  cy="6.75"
                  rx="1.56989"
                  ry="1.5"
                  stroke={
                    location.pathname.indexOf("posting") > -1 ||
                    isHovering.staffing
                      ? "#279AF1"
                      : "#5C5C5C"
                  }
                  stroke-width="1.5"
                />
                <path
                  d="M10.2034 11.25C10.2034 12.0784 10.2034 12.75 7.06361 12.75C3.92383 12.75 3.92383 12.0784 3.92383 11.25C3.92383 10.4216 5.32956 9.75 7.06361 9.75C8.79767 9.75 10.2034 10.4216 10.2034 11.25Z"
                  stroke={
                    location.pathname.indexOf("posting") > -1 ||
                    isHovering.staffing
                      ? "#279AF1"
                      : "#5C5C5C"
                  }
                  stroke-width="1.5"
                />
                <path
                  d="M1.57031 9C1.57031 6.17157 1.57031 4.75736 2.48993 3.87868C3.40956 3 4.88966 3 7.84988 3H10.9897C13.9499 3 15.43 3 16.3496 3.87868C17.2692 4.75736 17.2692 6.17157 17.2692 9C17.2692 11.8284 17.2692 13.2426 16.3496 14.1213C15.43 15 13.9499 15 10.9897 15H7.84988C4.88966 15 3.40956 15 2.48993 14.1213C1.57031 13.2426 1.57031 11.8284 1.57031 9Z"
                  stroke={
                    location.pathname.indexOf("posting") > -1 ||
                    isHovering.staffing
                      ? "#279AF1"
                      : "#5C5C5C"
                  }
                  stroke-width="1.5"
                />
                <path
                  d="M14.9141 9H11.7743"
                  stroke={
                    location.pathname.indexOf("posting") > -1 ||
                    isHovering.staffing
                      ? "#279AF1"
                      : "#5C5C5C"
                  }
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M14.9141 6.75H10.9893"
                  stroke={
                    location.pathname.indexOf("posting") > -1 ||
                    isHovering.staffing
                      ? "#279AF1"
                      : "#5C5C5C"
                  }
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M14.9141 11.25H12.5592"
                  stroke={
                    location.pathname.indexOf("posting") > -1 ||
                    isHovering.staffing
                      ? "#279AF1"
                      : "#5C5C5C"
                  }
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1913_11804">
                  <rect width="18.8387" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
            {/* <BsFilePost
              style={
                location.pathname === "/hr-management/job-posting" ||
                isHovering.staffing
                  ? style
                  : { color: "#5C5C5C" }
              }
            /> */}
            <SideBarListTitle
              style={
                location.pathname.indexOf("posting") > -1 || isHovering.staffing
                  ? style
                  : { color: "#5C5C5C" }
              }
            >
              {" "}
              Staffing
            </SideBarListTitle>
          </SideBarListContainer>
        </Link>
        {/* 
         <Link
          style={{ textDecoration: "none" }}
          to="/manager-management/events"
        >
          <SideBarListContainer style={{ zIndex: "1" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.88301 7.13754C4.288 8.78679 4.32175 11.4013 5.98427 13.0205C6.7959 13.8133 7.87442 14.2505 9.02358 14.2513H9.02751C10.179 14.2513 11.2615 13.814 12.077 13.0205C13.7694 11.372 13.7662 8.69079 12.07 7.04454L9.72611 4.75629C9.48906 6.61779 8.75827 8.25129 7.45683 8.25129C7.05808 8.25129 6.40814 8.08179 5.88301 7.13754ZM9.02751 15.7513H9.02201C7.44741 15.7498 5.97014 15.1535 4.86258 14.0698C2.57525 11.8423 2.57211 8.21754 4.85552 5.99379L5.62712 5.24829C5.8265 5.05779 6.11614 4.98429 6.39009 5.05254C6.66246 5.12304 6.8744 5.32779 6.94504 5.58879C7.12558 6.25554 7.34066 6.58329 7.45918 6.70779C7.73784 6.42729 8.24178 5.29404 8.24178 3.37629C8.24178 3.26604 8.24178 3.16179 8.2355 3.05754C8.22058 2.83629 8.30928 2.61954 8.47726 2.46654C8.78888 2.18379 9.28811 2.18379 9.58717 2.47779L13.1901 5.99454C15.4821 8.21754 15.486 11.8423 13.1979 14.0705C12.0841 15.155 10.6037 15.7513 9.02751 15.7513Z"
                fill={
                  location.pathname.indexOf("events") > -1
                    ? "#279AF1"
                    : "#5C5C5C"
                }
              />
              <mask
                id="mask0_1509_1510"
                style={{ maskType: "luminance" }}
                maskUnits="userSpaceOnUse"
                x="3"
                y="2"
                width="12"
                height="14"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.88301 7.13754C4.288 8.78679 4.32175 11.4013 5.98427 13.0205C6.7959 13.8133 7.87442 14.2505 9.02358 14.2513H9.02751C10.179 14.2513 11.2615 13.814 12.077 13.0205C13.7694 11.372 13.7662 8.69079 12.07 7.04454L9.72611 4.75629C9.48906 6.61779 8.75827 8.25129 7.45683 8.25129C7.05808 8.25129 6.40814 8.08179 5.88301 7.13754ZM9.02751 15.7513H9.02201C7.44741 15.7498 5.97014 15.1535 4.86258 14.0698C2.57525 11.8423 2.57211 8.21754 4.85552 5.99379L5.62712 5.24829C5.8265 5.05779 6.11614 4.98429 6.39009 5.05254C6.66246 5.12304 6.8744 5.32779 6.94504 5.58879C7.12558 6.25554 7.34066 6.58329 7.45918 6.70779C7.73784 6.42729 8.24178 5.29404 8.24178 3.37629C8.24178 3.26604 8.24178 3.16179 8.2355 3.05754C8.22058 2.83629 8.30928 2.61954 8.47726 2.46654C8.78888 2.18379 9.28811 2.18379 9.58717 2.47779L13.1901 5.99454C15.4821 8.21754 15.486 11.8423 13.1979 14.0705C12.0841 15.155 10.6037 15.7513 9.02751 15.7513Z"
                  fill={
                    location.pathname.indexOf("events") > -1
                      ? "#279AF1"
                      : "white"
                  }
                />
              </mask>
              <g mask="url(#mask0_1509_1510)"></g>
            </svg>
            <SideBarListTitle
              style={
                location.pathname.indexOf("events") > -1
                  ? style
                  : { color: "#5C5C5C" }
              }
            >
              {" "}
              Events
            </SideBarListTitle>
          </SideBarListContainer>
        </Link> */}
        <Link
          style={{ textDecoration: "none" }}
          to="/manager-management/announcements"
          onMouseEnter={() => handleMouseEnter("announcements")}
          onMouseLeave={() => handleMouseLeave("announcements")}
        >
          <SideBarListContainer style={{ zIndex: "1" }}>
            <TbMessageCheck
              style={
                location.pathname.indexOf("announcements") > -1 ||
                isHovering.announcements
                  ? style
                  : { color: "#5C5C5C" }
              }
            />

            <SideBarListTitle
              style={
                location.pathname.indexOf("announcements") > -1 ||
                isHovering.announcements
                  ? style
                  : { color: "#5C5C5C" }
              }
            >
              {" "}
              Announcements
            </SideBarListTitle>
          </SideBarListContainer>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          to={`/manager-management/account/personal-info/${userData?._id}`}
          onMouseEnter={() => handleMouseEnter("account")}
          onMouseLeave={() => handleMouseLeave("account")}
        >
          <SideBarListContainer style={{ zIndex: "1" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.9141 15C14.9141 15.414 14.5632 15.75 14.1291 15.75C13.695 15.75 13.3442 15.414 13.3442 15C13.3442 12.9323 11.5835 11.25 9.41943 11.25C7.25533 11.25 5.4947 12.9323 5.4947 15C5.4947 15.414 5.14383 15.75 4.70975 15.75C4.27568 15.75 3.9248 15.414 3.9248 15C3.9248 12.105 6.39032 9.75 9.41943 9.75C12.4485 9.75 14.9141 12.105 14.9141 15ZM9.41943 3.75C10.2852 3.75 10.9893 4.42275 10.9893 5.25C10.9893 6.07725 10.2852 6.75 9.41943 6.75C8.55363 6.75 7.84954 6.07725 7.84954 5.25C7.84954 4.42275 8.55363 3.75 9.41943 3.75ZM9.41943 8.25C11.151 8.25 12.5592 6.9045 12.5592 5.25C12.5592 3.5955 11.151 2.25 9.41943 2.25C7.68784 2.25 6.27964 3.5955 6.27964 5.25C6.27964 6.9045 7.68784 8.25 9.41943 8.25Z"
                fill={
                  location.pathname.indexOf("account") > -1 ||
                  isHovering.account
                    ? "#279AF1"
                    : "#5C5C5C"
                }
              />
            </svg>
            <SideBarListTitle
              style={
                location.pathname.indexOf("account") > -1 || isHovering.account
                  ? style
                  : { color: "#5C5C5C" }
              }
            >
              {" "}
              My Account
            </SideBarListTitle>
          </SideBarListContainer>
        </Link>

        {/* <Link
          style={{ textDecoration: "none" }}
          to="/manager-management/helpdesk"
        >
          <SideBarListContainer style={{ zIndex: "1" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.63434 6C8.63434 5.586 8.986 5.25 9.41929 5.25C9.85258 5.25 10.2042 5.586 10.2042 6V9.75C10.2042 10.164 9.85258 10.5 9.41929 10.5C8.986 10.5 8.63434 10.164 8.63434 9.75V6ZM8.63434 12C8.63434 11.586 8.986 11.25 9.41929 11.25C9.85258 11.25 10.2042 11.586 10.2042 12C10.2042 12.414 9.85258 12.75 9.41929 12.75C8.986 12.75 8.63434 12.414 8.63434 12ZM9.41929 15C5.95689 15 3.13972 12.3082 3.13972 9C3.13972 5.69175 5.95689 3 9.41929 3C12.8817 3 15.6989 5.69175 15.6989 9C15.6989 12.3082 12.8817 15 9.41929 15ZM9.41929 1.5C5.08403 1.5 1.56982 4.85775 1.56982 9C1.56982 13.1423 5.08403 16.5 9.41929 16.5C13.7545 16.5 17.2687 13.1423 17.2687 9C17.2687 4.85775 13.7545 1.5 9.41929 1.5Z"
                fill={
                  location.pathname.indexOf("helpdesk") > -1
                    ? "#279AF1"
                    : "#5C5C5C"
                }
              />
              <mask
                id="mask0_1509_8227"
                style={{ maskType: "luminance" }}
                maskUnits="userSpaceOnUse"
                x="1"
                y="1"
                width="17"
                height="16"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.63434 6C8.63434 5.586 8.986 5.25 9.41929 5.25C9.85258 5.25 10.2042 5.586 10.2042 6V9.75C10.2042 10.164 9.85258 10.5 9.41929 10.5C8.986 10.5 8.63434 10.164 8.63434 9.75V6ZM8.63434 12C8.63434 11.586 8.986 11.25 9.41929 11.25C9.85258 11.25 10.2042 11.586 10.2042 12C10.2042 12.414 9.85258 12.75 9.41929 12.75C8.986 12.75 8.63434 12.414 8.63434 12ZM9.41929 15C5.95689 15 3.13972 12.3082 3.13972 9C3.13972 5.69175 5.95689 3 9.41929 3C12.8817 3 15.6989 5.69175 15.6989 9C15.6989 12.3082 12.8817 15 9.41929 15ZM9.41929 1.5C5.08403 1.5 1.56982 4.85775 1.56982 9C1.56982 13.1423 5.08403 16.5 9.41929 16.5C13.7545 16.5 17.2687 13.1423 17.2687 9C17.2687 4.85775 13.7545 1.5 9.41929 1.5Z"
                  fill={
                    location.pathname.indexOf("helpdesk") > -1
                      ? "#279AF1"
                      : "white"
                  }
                />
              </mask>
              <g mask="url(#mask0_1509_8227)"></g>
            </svg>
            <SideBarListTitle
              style={
                location.pathname.indexOf("helpdesk") > -1
                  ? style
                  : { color: "#5C5C5C" }
              }
            >
              {" "}
              Helpdesk
            </SideBarListTitle>
          </SideBarListContainer>
        </Link>  */}
        {screenWidth < 1200 && (
          <SideBarListContainer
            style={{ zIndex: "1", marginTop: "-1rem" }}
            onClick={HandleLogout}
            onMouseEnter={() => handleMouseEnter("logout")}
            onMouseLeave={() => handleMouseLeave("logout")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="18"
              viewBox="0 0 31 32"
              fill="none"
            >
              <path
                d="M15.5 26.5208C9.79306 26.5208 5.16667 21.8944 5.16667 16.1875C5.16667 10.4805 9.79306 5.85413 15.5 5.85413"
                stroke="#5C5C5C"
                stroke-width="2.5"
                stroke-linecap="round"
              />
              <path
                d="M12.9173 16.1875H25.834M25.834 16.1875L21.959 12.3125M25.834 16.1875L21.959 20.0625"
                stroke="#5C5C5C"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <SideBarListTitle
              style={isHovering.logout ? style : { color: "#5C5C5C" }}
            >
              {" "}
              Logout
            </SideBarListTitle>
          </SideBarListContainer>
        )}
      </SideBarList>
    </div>
  );
};

export default ManagerSideBar;
