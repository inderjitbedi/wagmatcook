import React, { useState, useEffect } from "react";

import { useNavigate, useLocation, useParams } from "react-router";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import { useForm, Controller } from "react-hook-form";
import { RotatingLines } from "react-loader-spinner";
import CommenDashHeader from "../Dashboard/CommenDashHeader";
import DeleteModal from "../Modals/DeleteModal";
import API_URLS from "../constants/apiUrls";
import ROLES from "../constants/roles";
import httpClient from "../api/httpClient";
import styled from "styled-components";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Applicants from "./Applicants";
import Selected from "./Selected";
import Interviewing from "./Interviewing";

import { DisciplinaryHeading } from "../Disciplinary/DisciplinaryStyles";
import {
  FlexSpaceBetween,
  FlexColumn,
  BackGroundWhite,
  FlexContaier,
  FlexColumnNoWidth,
  TaskTitle,
  TaskLight,
  TaskHeading,
  TaskDescription,
  IconsEmployee,
  FlexSpaceBetweenmobile,
  BasicInfoDiv,
  ViewPara,
  TitlePara
} from "../Employee/ViewEmployee/ViewEmployeeStyle";

const JobView = () => {
  let API_URL = process.env.REACT_APP_API_URL;
  const { jobid } = useParams();
  const Navigate = useNavigate();

  const [userType, setUserType] = useState("");
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const HandleOpenDelete = () => setOpenDelete(true);
  const HandleCloseDelete = () => setOpenDelete(false);
  const [Id, setId] = useState("");
  const [update, setUpdate] = useState(false);
  const [detailsLength, setDetailsLength] = useState(500);
  const [result, setResult] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [page, setPage] = useState(1);
  const [departmentData, setDepartmentData] = useState([]);
  const [valueTab, setValueTab] = useState(0);

  const HandleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };
  const HandleChangePage = (event, value) => {
    setPage(value);
  };
  const {
    register,
    control,
    clearErrors,
    handleSubmit,
    setError,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  const [open, setOpen] = useState(false);
  const HandleOpen = () => setOpen(true);
  const HandleClose = () => {
    setOpen(false);
    setDetailsLength(500);
    clearErrors();
    reset({});
  };
  const HandleSearchCahnge = (data) => {
    setSearchValue(data);
  };
  const onSubmit = (data) => {
    function isEmptyObject(obj) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          return false;
        }
      }
      return true;
    }
    if (isEmptyObject(errors) && !update) {
      //   HandleSubmit(data);
    } else if (update && isEmptyObject(errors)) {
      //   HandleUpdate(data);
    }
  };
  const HandleUpdateAction = (data) => {
    setUpdate(true);
    setId(data._id);
    setDetailsLength(500 - data?.description?.length);
    reset({
      title: data.title,
      description: data.description,
      assignedto: data.assignee._id,
      dueDate: data.dueDate
        ? new Date(data.dueDate).toISOString().split("T")[0]
        : null,
    });
    HandleOpen();
  };

  const HandleOpenAddNewAction = () => {
    setUpdate(false);
    HandleOpen();
    reset({});
    clearErrors();
    setDetailsLength(500);
  };
  const BackArrowButton = styled.div`
    display: none;

    @media only screen and (max-width: 600px) {
      padding: 5px 4px 5px 6px;
      border-radius: 88px;
      border: 1px solid #8f9bb3;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `;
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        style={{ width: "100%" }}
      >
        {value === index && children}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const jobPosting = [
    {
      id: 1,
      title: "Developer",
      description: "works in js and react ",
      duration: "5 months",
      rate: "500",
      department: "IT",
      position: "head",
      postingDate: "22,Nov 2023",
    },
    {
      id: 2,
      title: "Developer",
      description: "works in js and react ",
      duration: "5 months",
      rate: "500",
      department: "IT",
      position: "head",
      postingDate: "22,Nov 2023",
    },
    {
      id: 3,
      title: "Developer",
      description: "works in js and react ",
      duration: "5 months",
      rate: "500",
      department: "IT",
      position: "head",
      postingDate: "22,Nov 2023",
    },

    {
      id: 4,
      title: "Developer",
      description: "works in js and react ",
      duration: "5 months",
      rate: "500",
      department: "IT",
      position: "head",
      postingDate: "22,Nov 2023",
    },
    {
      id: 5,
      title: "Developer",
      description: "works in js and react ",
      duration: "5 months",
      rate: "500",
      department: "IT",
      position: "head",
      postingDate: "22,Nov 2023",
    },
  ];
  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "52rem",
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
          <BasicInfoDiv>
            <FlexSpaceBetweenmobile>
              <FlexContaier>
                {/* <BackArrowButton onClick={() => Navigate(-1)}>
                  <IconsEmployee src="/images/icons/ArrowLeft.svg" />
                </BackArrowButton> */}
                <DisciplinaryHeading> Basic Information </DisciplinaryHeading>
              </FlexContaier>
            </FlexSpaceBetweenmobile>
            <FlexSpaceBetween>
              <FlexColumn>
                <TitlePara>Job Title</TitlePara>
                <ViewPara> {"developer" || " - "} </ViewPara>
              </FlexColumn>
              <FlexColumn>
                <TaskLight>Department</TaskLight>
                <TaskTitle>Accounts</TaskTitle>
              </FlexColumn>
            </FlexSpaceBetween>
            <FlexSpaceBetween>
              <FlexColumn>
                <TaskLight>Duration</TaskLight>
                <TaskDescription>{" 1 Year" || " - "}</TaskDescription>
              </FlexColumn>
              <FlexColumn>
                <TaskLight>Wage Rate/Salary</TaskLight>
                <TaskDescription>{"Head Accountant" || " - "}</TaskDescription>
              </FlexColumn>
            </FlexSpaceBetween>
            <FlexSpaceBetween>
              <FlexColumnNoWidth>
                <TaskLight>Posting Date</TaskLight>
                <TaskDescription>{"22 Nov 2023" || " - "}</TaskDescription>
              </FlexColumnNoWidth>
            </FlexSpaceBetween>
            <FlexSpaceBetween>
              <FlexColumnNoWidth>
                <TaskLight>Description</TaskLight>
                <TaskDescription>
                  {" "}
                  {"Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You’ve nailed the design and the responsiveness at various breakpoints works really well." ||
                    " - "}{" "}
                </TaskDescription>
              </FlexColumnNoWidth>
            </FlexSpaceBetween>
            <FlexSpaceBetween>
              <FlexColumnNoWidth>
                <TaskLight>Term of Position</TaskLight>
                <TaskDescription>
                  {" "}
                  {"Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You’ve nailed the design and the responsiveness at various breakpoints works really well." ||
                    " - "}{" "}
                </TaskDescription>
              </FlexColumnNoWidth>
            </FlexSpaceBetween>
            {/* <div style={{ width: "100%" }}>
              <Tabs
                value={valueTab}
                onChange={HandleChangeTab}
                aria-label="basic tabs example"
              >
                <Tab label="Applicants List" {...a11yProps(0)} />
                <Tab label="Interviewing List" {...a11yProps(1)} />
                <Tab label="Selected List" {...a11yProps(2)} />
              </Tabs>
            </div>
            <CustomTabPanel value={valueTab} index={0}>
              <Applicants />
            </CustomTabPanel>
            <CustomTabPanel value={valueTab} index={1}>
              <Interviewing />
            </CustomTabPanel>
            <CustomTabPanel value={valueTab} index={2}>
              <Selected />
            </CustomTabPanel> */}
          </BasicInfoDiv>
        </>
      )}
      <DeleteModal
        openDelete={openDelete}
        message="Are you sure you want to delete this applicant?"
        HandleCloseDelete={HandleCloseDelete}
        isLoading={isDeleting}
        // HandleDelete={HandleDelete}
      />
    </>
  );
};

export default JobView;
