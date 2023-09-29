import React, { useEffect, useState } from "react";
import {
  SidebarTitle,
  SideBarLogoContainer,
  SideBarLogo,
  SideBarLogoHead,
  SideBarLogoPara,
  SideBarListContainer,
  SideBarLogodiv,
  SideBarListLogo,
  SideBarListTitle,
  SideBarList,
} from "./SideBarStyles";
import { Link, useNavigate, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();
  const [orgData, setOrgData] = useState();
  useEffect(() => {
    let org = localStorage.getItem("org");
    if (org) {
      let parsedUser = JSON.parse(org);
      setOrgData(parsedUser);
    }
  }, []);

  const SideBarData = [
    {
      Title: "Dashboard",
      src: "/svg/Dashboard.svg",
      to: "/organization-admin/dashboard",
    },
    {
      Title: "Departments",
      src: "/svg/Departments.svg",
      to: "/organization-admin/departments",
      some: `{
                      location.pathname === "/organization-admin/departments"
                        ? "#279AF1"
                        : "#5C5C5C"
                    }`,
    },
    {
      Title: "Employee",
      src: "/svg/Employee.svg",
      to: "/organization-admin/employee/list",
      active: "employee-details",
    },

    {
      Title: "Benefits",
      src: "/svg/Benefits.svg",
      to: "/organization-admin/benefits",
    },
    {
      Title: "Disciplinary",
      src: "/svg/Disciplinary.svg",
      to: "/organization-admin/disciplinary",
    },
    {
      Title: "Leaves Type",
      src: "/svg/Leaves.svg",
      to: "/organization-admin/leaves",
    },
    {
      Title: "Employee Types",
      src: "/svg/Employee.svg",
      to: "/organization-admin/employee-types",
    },
    {
      Title: "Activities",
      src: "/svg/flash.svg",
    },

    {
      Title: "Account",
      src: "/svg/person.svg",
    },
    {
      Title: "Report",
      src: "/svg/Reports.svg",
    },
  ];
  const style = {
    textDecoration: "none",
    color: "#279AF1",
  };
  console.log(orgData, "this is orgdata");
  let API_URL = process.env.REACT_APP_API_URL;

  return (
    <>
      {" "}
      <SidebarTitle>Wagmatcook</SidebarTitle>
      <hr style={{ width: "100%", color: "#EDEDED" }}></hr>
      <SideBarLogoContainer>
        <SideBarLogo
          src={
            orgData?.logo ? API_URL + orgData?.logo?.path : "/images/User.jpg"
          }
        />
        <SideBarLogodiv>
          <SideBarLogoPara> Organization</SideBarLogoPara>
          <SideBarLogoHead>{orgData?.name}</SideBarLogoHead>
        </SideBarLogodiv>
      </SideBarLogoContainer>
      <hr style={{ width: "80%", color: "#EDEDED", margin: "auto" }}></hr>
      <SideBarList>
        <Link
          style={{ textDecoration: "none" }}
          to="/organization-admin/dashboard"
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
                  location.pathname === "/organization-admin/dashboard"
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
                    location.pathname === "/organization-admin/dashboard"
                      ? "#279AF1"
                      : "white"
                  }
                />
              </mask>
              <g mask="url(#mask0_1480_5022)"></g>
            </svg>

            <SideBarListTitle
              style={
                location.pathname === "/organization-admin/dashboard"
                  ? style
                  : { color: "#5C5C5C" }
              }
            >
              {" "}
              Dashboard
            </SideBarListTitle>
          </SideBarListContainer>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          to="/organization-admin/departments"
        >
          <SideBarListContainer style={{ zIndex: "1" }}>
            <svg
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1480_4406)">
                <path
                  d="M7.06445 5.25C7.06445 4.40885 7.06445 3.98827 7.25375 3.675C7.37775 3.46977 7.55612 3.29935 7.7709 3.18087C8.09877 3 8.53894 3 9.41929 3C10.2996 3 10.7398 3 11.0677 3.18087C11.2825 3.29935 11.4608 3.46977 11.5848 3.675C11.7741 3.98827 11.7741 4.40885 11.7741 5.25C11.7741 6.09115 11.7741 6.51173 11.5848 6.825C11.4608 7.03023 11.2825 7.20065 11.0677 7.31913C10.7398 7.5 10.2996 7.5 9.41929 7.5C8.53894 7.5 8.09877 7.5 7.7709 7.31913C7.55612 7.20065 7.37775 7.03023 7.25375 6.825C7.06445 6.51173 7.06445 6.09115 7.06445 5.25Z"
                  stroke={
                    location.pathname === "/organization-admin/departments"
                      ? "#279AF1"
                      : "#5C5C5C"
                  }
                  stroke-width="1.5"
                />
                <path
                  d="M14.1289 14.25C14.1289 13.6892 14.1289 13.4088 14.2551 13.2C14.3378 13.0632 14.4567 12.9496 14.5999 12.8706C14.8185 12.75 15.1119 12.75 15.6988 12.75C16.2857 12.75 16.5791 12.75 16.7977 12.8706C16.9409 12.9496 17.0598 13.0632 17.1425 13.2C17.2687 13.4088 17.2687 13.6892 17.2687 14.25C17.2687 14.8108 17.2687 15.0912 17.1425 15.3C17.0598 15.4368 16.9409 15.5504 16.7977 15.6294C16.5791 15.75 16.2857 15.75 15.6988 15.75C15.1119 15.75 14.8185 15.75 14.5999 15.6294C14.4567 15.5504 14.3378 15.4368 14.2551 15.3C14.1289 15.0912 14.1289 14.8108 14.1289 14.25Z"
                  stroke={
                    location.pathname === "/organization-admin/departments"
                      ? "#279AF1"
                      : "#5C5C5C"
                  }
                  stroke-width="1.5"
                />
                <path
                  d="M7.84961 14.25C7.84961 13.6892 7.84961 13.4088 7.9758 13.2C8.05848 13.0632 8.17738 12.9496 8.32058 12.8706C8.53915 12.75 8.8326 12.75 9.4195 12.75C10.0064 12.75 10.2998 12.75 10.5184 12.8706C10.6616 12.9496 10.7805 13.0632 10.8632 13.2C10.9894 13.4088 10.9894 13.6892 10.9894 14.25C10.9894 14.8108 10.9894 15.0912 10.8632 15.3C10.7805 15.4368 10.6616 15.5504 10.5184 15.6294C10.2998 15.75 10.0064 15.75 9.4195 15.75C8.8326 15.75 8.53915 15.75 8.32058 15.6294C8.17738 15.5504 8.05848 15.4368 7.9758 15.3C7.84961 15.0912 7.84961 14.8108 7.84961 14.25Z"
                  stroke={
                    location.pathname === "/organization-admin/departments"
                      ? "#279AF1"
                      : "#5C5C5C"
                  }
                  stroke-width="1.5"
                />
                <path
                  d="M1.57031 14.25C1.57031 13.6892 1.57031 13.4088 1.69651 13.2C1.77918 13.0632 1.89809 12.9496 2.04128 12.8706C2.25986 12.75 2.55331 12.75 3.1402 12.75C3.7271 12.75 4.02055 12.75 4.23913 12.8706C4.38232 12.9496 4.50123 13.0632 4.5839 13.2C4.7101 13.4088 4.7101 13.6892 4.7101 14.25C4.7101 14.8108 4.7101 15.0912 4.5839 15.3C4.50123 15.4368 4.38232 15.5504 4.23913 15.6294C4.02055 15.75 3.7271 15.75 3.1402 15.75C2.55331 15.75 2.25986 15.75 2.04128 15.6294C1.89809 15.5504 1.77918 15.4368 1.69651 15.3C1.57031 15.0912 1.57031 14.8108 1.57031 14.25Z"
                  stroke={
                    location.pathname === "/organization-admin/departments"
                      ? "#279AF1"
                      : "#5C5C5C"
                  }
                  stroke-width="1.5"
                />
                <path
                  d="M3.14062 12V12C3.14062 11.7678 3.14062 11.6517 3.15026 11.554C3.24378 10.6044 3.99504 9.85315 4.94459 9.75963C5.04237 9.75 5.15846 9.75 5.39062 9.75H13.4498C13.6819 9.75 13.798 9.75 13.8958 9.75963C14.8454 9.85315 15.5966 10.6044 15.6901 11.554C15.6998 11.6517 15.6998 11.7678 15.6998 12V12"
                  stroke={
                    location.pathname === "/organization-admin/departments"
                      ? "#279AF1"
                      : "#5C5C5C"
                  }
                  stroke-width="1.5"
                />
                <line
                  x1="9.38477"
                  y1="9.75"
                  x2="9.38477"
                  y2="12"
                  stroke={
                    location.pathname === "/organization-admin/departments"
                      ? "#279AF1"
                      : "#5C5C5C"
                  }
                  stroke-width="1.5"
                />
              </g>
              <defs>
                <clipPath id="clip0_1480_4406">
                  <rect
                    width="18.8387"
                    height="18"
                    rx="5"
                    fill={
                      location.pathname === "/organization-admin/departments"
                        ? "#279AF1"
                        : "#5C5C5C"
                    }
                  />
                </clipPath>
              </defs>
            </svg>

            <SideBarListTitle
              style={
                location.pathname === "/organization-admin/departments"
                  ? style
                  : { color: "#5C5C5C" }
              }
            >
              {" "}
              Departments
            </SideBarListTitle>
          </SideBarListContainer>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          to="/organization-admin/employee/list"
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
                  location.pathname.indexOf("employee") > -1
                    ? "#279AF1"
                    : "#5C5C5C"
                }
              />
            </svg>
            <SideBarListTitle
              style={
                location.pathname.indexOf("employee") > -1
                  ? style
                  : { color: "#5C5C5C" }
              }
            >
              {" "}
              Employee
            </SideBarListTitle>
          </SideBarListContainer>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          to="/organization-admin/benefits"
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
                d="M7.71913 3.06018C8.1514 2.70821 8.36753 2.53222 8.59351 2.42902C9.11618 2.19033 9.72379 2.19033 10.2465 2.42902C10.4724 2.53222 10.6886 2.70821 11.1208 3.06018C11.2929 3.20027 11.3789 3.27031 11.4708 3.32915C11.6814 3.46402 11.9179 3.55762 12.1666 3.60454C12.2751 3.62501 12.3878 3.6336 12.6131 3.65078C13.1792 3.69394 13.4623 3.71553 13.6985 3.79523C14.2447 3.97957 14.6743 4.39009 14.8673 4.912C14.9507 5.13765 14.9733 5.40812 15.0185 5.94905C15.0364 6.16435 15.0454 6.27199 15.0668 6.37567C15.116 6.61332 15.2139 6.8393 15.3551 7.04052C15.4166 7.1283 15.49 7.21049 15.6366 7.37487C16.0049 7.78789 16.1891 7.99441 16.2971 8.21032C16.547 8.70972 16.547 9.29028 16.2971 9.78968C16.1891 10.0056 16.0049 10.2121 15.6366 10.6251C15.49 10.7895 15.4166 10.8717 15.3551 10.9595C15.2139 11.1607 15.116 11.3867 15.0668 11.6243C15.0454 11.728 15.0364 11.8357 15.0185 12.0509C14.9733 12.5919 14.9507 12.8623 14.8673 13.088C14.6743 13.6099 14.2447 14.0204 13.6985 14.2048C13.4623 14.2845 13.1792 14.3061 12.6131 14.3492C12.3878 14.3664 12.2751 14.375 12.1666 14.3955C11.9179 14.4424 11.6814 14.536 11.4708 14.6709C11.3789 14.7297 11.2929 14.7997 11.1208 14.9398C10.6886 15.2918 10.4724 15.4678 10.2465 15.571C9.72379 15.8097 9.11618 15.8097 8.59351 15.571C8.36753 15.4678 8.1514 15.2918 7.71913 14.9398C7.54709 14.7997 7.46107 14.7297 7.3692 14.6709C7.1586 14.536 6.92209 14.4424 6.67337 14.3955C6.56487 14.375 6.45221 14.3664 6.22688 14.3492C5.66074 14.3061 5.37767 14.2845 5.14151 14.2048C4.59528 14.0204 4.16563 13.6099 3.9727 13.088C3.88928 12.8623 3.86669 12.5919 3.82151 12.0509C3.80353 11.8357 3.79454 11.728 3.77312 11.6243C3.72402 11.3867 3.62605 11.1607 3.4849 10.9595C3.42332 10.8717 3.35002 10.7895 3.2034 10.6251C2.83503 10.2121 2.65084 10.0056 2.54283 9.78968C2.29301 9.29028 2.29301 8.70972 2.54283 8.21032C2.65084 7.99441 2.83503 7.78789 3.2034 7.37487C3.35002 7.21049 3.42332 7.1283 3.4849 7.04052C3.62605 6.8393 3.72402 6.61332 3.77312 6.37567C3.79454 6.27199 3.80353 6.16435 3.82151 5.94905C3.86669 5.40812 3.88928 5.13765 3.9727 4.912C4.16563 4.39009 4.59528 3.97957 5.14151 3.79523C5.37767 3.71553 5.66074 3.69394 6.22688 3.65078C6.4522 3.6336 6.56487 3.62501 6.67337 3.60454C6.92209 3.55762 7.1586 3.46402 7.3692 3.32915C7.46107 3.27031 7.54709 3.20027 7.71913 3.06018Z"
                stroke={
                  location.pathname === "/organization-admin/benefits"
                    ? "#279AF1"
                    : "#5C5C5C"
                }
                stroke-width="1.5"
              />
              <path
                d="M7.06445 9.3L8.41008 10.5L11.7741 7.5"
                stroke={
                  location.pathname === "/organization-admin/benefits"
                    ? "#279AF1"
                    : "#5C5C5C"
                }
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <SideBarListTitle
              style={
                location.pathname === "/organization-admin/benefits"
                  ? style
                  : { color: "#5C5C5C" }
              }
            >
              {" "}
              Benefits
            </SideBarListTitle>
          </SideBarListContainer>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          to="/organization-admin/disciplinary"
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
                d="M4.69503 8.17433C6.75671 4.72478 7.78755 3 9.41998 3C11.0524 3 12.0833 4.72477 14.1449 8.17432L14.4018 8.60418C16.1151 11.4707 16.9717 12.904 16.1975 13.952C15.4233 15 13.5078 15 9.67689 15H9.16307C5.33214 15 3.41668 15 2.64247 13.952C1.86826 12.904 2.72488 11.4707 4.43812 8.60418L4.69503 8.17433Z"
                stroke={
                  location.pathname === "/organization-admin/disciplinary"
                    ? "#279AF1"
                    : "#5C5C5C"
                }
                stroke-width="1.5"
              />
              <path
                d="M9.41992 6V9.75"
                stroke={
                  location.pathname === "/organization-admin/disciplinary"
                    ? "#279AF1"
                    : "#5C5C5C"
                }
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <ellipse
                cx="9.41971"
                cy="12"
                rx="0.784946"
                ry="0.75"
                fill="#5C5C5C"
              />
            </svg>
            <SideBarListTitle
              style={
                location.pathname === "/organization-admin/disciplinary"
                  ? style
                  : { color: "#5C5C5C" }
              }
            >
              {" "}
              Disciplinary
            </SideBarListTitle>
          </SideBarListContainer>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          to="/organization-admin/leaves"
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
                d="M2.35547 9.08333C2.35547 6.56918 2.35547 5.3121 3.18313 4.53105C4.01079 3.75 5.34289 3.75 8.00708 3.75H10.8329C13.4971 3.75 14.8292 3.75 15.6568 4.53105C16.4845 5.3121 16.4845 6.56918 16.4845 9.08333V10.4167C16.4845 12.9308 16.4845 14.1879 15.6568 14.969C14.8292 15.75 13.4971 15.75 10.8329 15.75H8.00708C5.34289 15.75 4.01079 15.75 3.18313 14.969C2.35547 14.1879 2.35547 12.9308 2.35547 10.4167V9.08333Z"
                stroke={
                  location.pathname === "/organization-admin/leaves"
                    ? "#279AF1"
                    : "#5C5C5C"
                }
                stroke-width="1.5"
              />
              <path
                d="M6.2793 3.75V2.25"
                stroke={
                  location.pathname === "/organization-admin/leaves"
                    ? "#279AF1"
                    : "#5C5C5C"
                }
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M13.3438 3.75V2.25"
                stroke={
                  location.pathname === "/organization-admin/leaves"
                    ? "#279AF1"
                    : "#5C5C5C"
                }
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <ellipse
                cx="12.5584"
                cy="12"
                rx="0.784946"
                ry="0.75"
                stroke={
                  location.pathname === "/organization-admin/leaves"
                    ? "#279AF1"
                    : "#5C5C5C"
                }
                stroke-width="1.5"
              />
              <path
                d="M2.35547 6.75H16.4845"
                stroke={
                  location.pathname === "/organization-admin/leaves"
                    ? "#279AF1"
                    : "#5C5C5C"
                }
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>

            <SideBarListTitle
              style={
                location.pathname === "/organization-admin/leaves"
                  ? style
                  : { color: "#5C5C5C" }
              }
            >
              {" "}
              Leaves Type
            </SideBarListTitle>
          </SideBarListContainer>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          to="/organization-admin/employee-types"
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
                  location.pathname === "/organization-admin/employee-types"
                    ? "#279AF1"
                    : "#5C5C5C"
                }
              />
            </svg>
            <SideBarListTitle
              style={
                location.pathname === "/organization-admin/employee-types"
                  ? style
                  : { color: "#5C5C5C" }
              }
            >
              {" "}
              Employee Types
            </SideBarListTitle>
          </SideBarListContainer>
        </Link>

        {/* <Link
          style={{ textDecoration: "none" }}
          // to="/organization-admin/dashboard"
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
                d="M5.88252 7.13754C4.28751 8.78679 4.32127 11.4013 5.98378 13.0205C6.79542 13.8133 7.87393 14.2505 9.02309 14.2513H9.02702C10.1785 14.2513 11.261 13.814 12.0765 13.0205C13.7689 11.372 13.7657 8.69079 12.0695 7.04454L9.72562 4.75629C9.48857 6.61779 8.75778 8.25129 7.45634 8.25129C7.05759 8.25129 6.40765 8.08179 5.88252 7.13754ZM9.02702 15.7513H9.02152C7.44692 15.7498 5.96965 15.1535 4.86209 14.0698C2.57476 11.8423 2.57162 8.21754 4.85503 5.99379L5.62663 5.24829C5.82601 5.05779 6.11565 4.98429 6.3896 5.05254C6.66198 5.12304 6.87391 5.32779 6.94456 5.58879C7.12509 6.25554 7.34017 6.58329 7.4587 6.70779C7.73735 6.42729 8.24129 5.29404 8.24129 3.37629C8.24129 3.26604 8.24129 3.16179 8.23501 3.05754C8.22009 2.83629 8.30879 2.61954 8.47677 2.46654C8.78839 2.18379 9.28762 2.18379 9.58668 2.47779L13.1896 5.99454C15.4816 8.21754 15.4856 11.8423 13.1974 14.0705C12.0836 15.155 10.6032 15.7513 9.02702 15.7513Z"
                fill="#5C5C5C"
              />
              <mask
                id="mask0_1480_7417"
                style={{maskType:"luminance"}}
                maskUnits="userSpaceOnUse"
                x="3"
                y="2"
                width="12"
                height="14"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.88252 7.13754C4.28751 8.78679 4.32127 11.4013 5.98378 13.0205C6.79542 13.8133 7.87393 14.2505 9.02309 14.2513H9.02702C10.1785 14.2513 11.261 13.814 12.0765 13.0205C13.7689 11.372 13.7657 8.69079 12.0695 7.04454L9.72562 4.75629C9.48857 6.61779 8.75778 8.25129 7.45634 8.25129C7.05759 8.25129 6.40765 8.08179 5.88252 7.13754ZM9.02702 15.7513H9.02152C7.44692 15.7498 5.96965 15.1535 4.86209 14.0698C2.57476 11.8423 2.57162 8.21754 4.85503 5.99379L5.62663 5.24829C5.82601 5.05779 6.11565 4.98429 6.3896 5.05254C6.66198 5.12304 6.87391 5.32779 6.94456 5.58879C7.12509 6.25554 7.34017 6.58329 7.4587 6.70779C7.73735 6.42729 8.24129 5.29404 8.24129 3.37629C8.24129 3.26604 8.24129 3.16179 8.23501 3.05754C8.22009 2.83629 8.30879 2.61954 8.47677 2.46654C8.78839 2.18379 9.28762 2.18379 9.58668 2.47779L13.1896 5.99454C15.4816 8.21754 15.4856 11.8423 13.1974 14.0705C12.0836 15.155 10.6032 15.7513 9.02702 15.7513Z"
                  fill="white"
                />
              </mask>
              <g mask="url(#mask0_1480_7417)"></g>
            </svg>

            <SideBarListTitle
            // style={
            //   location.pathname === "/organization-admin/dashboard"
            //     ? style
            //     : { color: "#5C5C5C" }
            // }
            >
              {" "}
              Activities
            </SideBarListTitle>
          </SideBarListContainer>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          // to="/organization-admin/dashboard"
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
                d="M14.9131 15C14.9131 15.414 14.5622 15.75 14.1281 15.75C13.6941 15.75 13.3432 15.414 13.3432 15C13.3432 12.9323 11.5825 11.25 9.41845 11.25C7.25435 11.25 5.49372 12.9323 5.49372 15C5.49372 15.414 5.14285 15.75 4.70877 15.75C4.2747 15.75 3.92383 15.414 3.92383 15C3.92383 12.105 6.38934 9.75 9.41845 9.75C12.4476 9.75 14.9131 12.105 14.9131 15ZM9.41845 3.75C10.2842 3.75 10.9883 4.42275 10.9883 5.25C10.9883 6.07725 10.2842 6.75 9.41845 6.75C8.55266 6.75 7.84856 6.07725 7.84856 5.25C7.84856 4.42275 8.55266 3.75 9.41845 3.75ZM9.41845 8.25C11.15 8.25 12.5582 6.9045 12.5582 5.25C12.5582 3.5955 11.15 2.25 9.41845 2.25C7.68686 2.25 6.27867 3.5955 6.27867 5.25C6.27867 6.9045 7.68686 8.25 9.41845 8.25Z"
                fill="#5C5C5C"
              />
            </svg>
            <SideBarListTitle
            // style={
            //   location.pathname === "/organization-admin/dashboard"
            //     ? style
            //     : { color: "#5C5C5C" }
            // }
            >
              {" "}
              Account
            </SideBarListTitle>
          </SideBarListContainer>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          // to="/organization-admin/dashboard"
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
                stroke="#5C5C5C"
                stroke-width="1.5"
              />
              <path
                d="M7.06445 9.75H11.7741"
                stroke="#5C5C5C"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M7.06445 6.75H11.7741"
                stroke="#5C5C5C"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M7.06445 12H9.41929"
                stroke="#5C5C5C"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M2.35547 13.5V4.5"
                stroke="#5C5C5C"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M16.4844 13.5V4.5"
                stroke="#5C5C5C"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
            <SideBarListTitle
            // style={
            //   location.pathname === "/organization-admin/dashboard"
            //     ? style
            //     : { color: "#5C5C5C" }
            // }
            >
              {" "}
              Report
            </SideBarListTitle>
          </SideBarListContainer>
        </Link> */}
      </SideBarList>
    </>
  );
};

export default SideBar;
