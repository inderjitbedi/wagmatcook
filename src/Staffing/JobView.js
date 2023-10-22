import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import Modal from "@mui/material/Modal";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import Pagination from "@mui/material/Pagination";
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
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Applicants from "./Applicants";
import Selected from "./Selected";
import Interviewing from "./Interviewing";


import {
  DisciplinaryDiv,
  DisciplinaryHeading,
  AddNewButton,
  MenuIcon,
  MenuIconDiv,
  ActionIconDiv,
  ActionIcons,
  ModalUpperDiv,
  ModalHeading,
  ModalIcon,
  ModalUpperMid,
  Input,
  TextArea,
  InputLabel,
  InputSpan,
  InputPara,
  Select,
  Option,
  Errors,
  PendingStyle,
  ApproveStyle,
  PaginationDiv,
} from "../Disciplinary/DisciplinaryStyles";
import {
  BasicInfoDiv,
  FlexSpaceBetween,
  FlexColumn,
  TitlePara,
  ViewPara,
  BackGroundWhite,
  CommentDiv,
  UserImg,
  FlexColumnForm,
  TextAreaComment,
  FlexContaier,
  FlexColumnNoWidth,
  BasicHeading,
  TaskTitle,
  TaskLight,
  TaskHeading,
  TaskDescription,
  Hr,
  TaskStatus,
  TaskSelect,
  TaskOption,
  CommentDivADD,
  TextAreaContaier,
  IconsEmployee,
  FlexSpaceBetweenmobile,
} from "../Employee/ViewEmployee/ViewEmployeeStyle";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: " 44.6rem",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 45,
  padding: "2rem 0rem",
  borderRadius: "8px",
};
const CellHeadStyles = {
  color: "#8F9BB3",
  fontFamily: "Inter",
  fontSize: "1.4rem",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "1.6rem",
};

const CellStyle = {
  color: "#222B45",
  fontSize: "1.4rem",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "1.5rem",
};
const CellStyle2 = {
  color: "#222B45",
  fontSize: "1.4rem",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "1.5rem",
};
const inputStyles = {
  fontSize: "1.3rem",
  fontWeight: 400,
  lineHeight: "1.6rem",
  width: "100%",
  border: "1px solid #dcdcdc",
  borderRadius: "8px",
  padding: "1em",
  marginBottom: "1rem",
  color: "#222b45",
  background: "#fff",
  boxSizing: "border-box",
  outline: "none", // Removed outline color
};
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
          <CommenDashHeader
            onSearch={HandleSearchCahnge}
            text={"Job Details"}
          />
          <BackGroundWhite>
            <FlexSpaceBetweenmobile>
              <FlexContaier>
                <BackArrowButton onClick={() => Navigate(-1)}>
                  <IconsEmployee src="/images/icons/ArrowLeft.svg" />
                </BackArrowButton>
                <DisciplinaryHeading> Job Details </DisciplinaryHeading>
              </FlexContaier>
            </FlexSpaceBetweenmobile>
            <FlexSpaceBetweenmobile>
              <FlexColumnNoWidth>
                <TaskLight>Task Title</TaskLight>
                <TaskHeading> {"developer" || " - "} </TaskHeading>
              </FlexColumnNoWidth>
              <FlexContaier style={{ gap: ".8rem" }}>
                <TaskLight>Department - </TaskLight>
                <TaskTitle>Accounts</TaskTitle>
              </FlexContaier>
            </FlexSpaceBetweenmobile>
            <FlexSpaceBetweenmobile>
              <FlexColumnNoWidth>
                <TaskLight>Description</TaskLight>
                <TaskDescription>
                  {" "}
                  {"Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You’ve nailed the design and the responsiveness at various breakpoints works really well." ||
                    " - "}{" "}
                </TaskDescription>
              </FlexColumnNoWidth>
            </FlexSpaceBetweenmobile>
            <FlexSpaceBetween>
              <FlexColumn>
                <TaskLight>Duration</TaskLight>
                <TaskDescription>{" 1 Year" || " - "}</TaskDescription>
              </FlexColumn>
              <FlexColumn>
                <TaskLight>Position</TaskLight>
                <TaskDescription>{"Head Accountant" || " - "}</TaskDescription>
              </FlexColumn>
            </FlexSpaceBetween>
            <FlexSpaceBetween>
              <FlexColumn>
                <TaskLight>Salary</TaskLight>
                <TaskDescription>{"$5000" || " - "}</TaskDescription>
              </FlexColumn>
              <FlexColumn>
                <TaskLight>Posting Date</TaskLight>
                <TaskDescription>{"22 Nov 2023" || " - "}</TaskDescription>
              </FlexColumn>
            </FlexSpaceBetween>
            <div style={{ width: "100%" }}>
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
            </CustomTabPanel>
          </BackGroundWhite>
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
