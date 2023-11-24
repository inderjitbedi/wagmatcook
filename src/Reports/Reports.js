import React, { useState, useEffect } from "react";
import CommenDashHeader from "../Dashboard/CommenDashHeader";
import ROLES from "../constants/roles";
import httpClient from "../api/httpClient";
import API_URLS from "../constants/apiUrls";
import { toast } from "react-toastify";
import Paper from "@mui/material/Paper";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useLocation } from "react-router";
import Pagination from "@mui/material/Pagination";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import ReportTabel from "./ReportTabel";
import ReportsLeaves from "./ReportsLeaves";
import { AiOutlinePrinter } from "react-icons/ai";

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
  TitlePara,
  StepperContainer,
  FlexStep,
  StepCircle,
  StepHr,
  StepText,
} from "../Employee/ViewEmployee/ViewEmployeeStyle";

const Reports = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const [userType, setUserType] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [count, setCount] = useState(0);
  const HandleSearchCahnge = (data) => {
    setSearchValue(data);
  };

  const [valueTab, setValueTab] = useState(0);

  const HandleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

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
  return (
    <>
      {" "}
      <CommenDashHeader onSearch={HandleSearchCahnge} text={"Reports"} />
      <BackGroundWhite>
        <div
          style={{
            width: "100%",
            marginBottom: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Tabs
            value={valueTab}
            onChange={HandleChangeTab}
            aria-label="basic tabs example"
          >
            <Tab label="Leave report " {...a11yProps(0)} />
            <Tab label="BEB Eligible" {...a11yProps(1)} />
          </Tabs>
         
        </div>
        <CustomTabPanel value={valueTab} index={0}>
          <ReportsLeaves Tabvalue={valueTab} searchValue={searchValue} />
        </CustomTabPanel>
        <CustomTabPanel value={valueTab} index={1}>
          <ReportTabel Tabvalue={valueTab} searchValue={searchValue} />
        </CustomTabPanel>
      </BackGroundWhite>
    </>
  );
};

export default Reports;
