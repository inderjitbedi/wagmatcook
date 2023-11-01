import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import CommenDashHeader from "../Dashboard/CommenDashHeader";
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
import moment from "moment";
import { Stepper, Step } from "react-form-stepper";

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
  TitlePara,
} from "../Employee/ViewEmployee/ViewEmployeeStyle";

const JobView = () => {
  let API_URL = process.env.REACT_APP_API_URL;
  const { jobid } = useParams();
  const Navigate = useNavigate();
  const [userType, setUserType] = useState("");
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [page, setPage] = useState(1);
  const [departmentData, setDepartmentData] = useState([]);
  const [valueTab, setValueTab] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: "Applicant List" },
    { title: "Meets Eligibility" },
    { title: "Interviewed" },
    { title: "Selections" },
  ];
  console.log("this the active step: ", activeStep);
  const HandleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };
  const HandleChangePage = (event, value) => {
    setPage(value);
  };

  const HandleSearchCahnge = (data) => {
    setSearchValue(data);
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
  const GetJobPostings = () => {
    setIsLoading(true);
    let url = API_URLS.detailsJobs.replace(":id", jobid);
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setResult(result);
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
  useEffect(() => {
    GetJobPostings();
  }, []);

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
            text="Job Post Details"
          />
          <BackGroundWhite>
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
                <TaskLight>Job Title</TaskLight>
                <TaskTitle> {result?.job?.title || " - "} </TaskTitle>
              </FlexColumn>
              <FlexColumn>
                <TaskLight>Department</TaskLight>
                <TaskTitle>{result?.job?.department?.name || " - "}</TaskTitle>
              </FlexColumn>
            </FlexSpaceBetween>
            <FlexSpaceBetween>
              <FlexColumn>
                <TaskLight>Closing Date</TaskLight>
                <TaskDescription>
                  {" "}
                  {result?.job?.closingDate
                    ? moment(result?.job?.closingDate).format("D MMM, YYYY")
                    : " - "}
                </TaskDescription>
              </FlexColumn>
              <FlexColumn>
                <TaskLight>Posting Date</TaskLight>
                <TaskDescription>
                  {result?.job?.postingDate
                    ? moment(result?.job?.postingDate).format("D MMM, YYYY")
                    : " - "}
                </TaskDescription>
              </FlexColumn>
            </FlexSpaceBetween>
            <FlexSpaceBetween>
              <FlexColumnNoWidth>
                <TaskLight>Board Members</TaskLight>
                <TaskDescription>
                  {result?.job?.boardMembers || " - "}
                </TaskDescription>
              </FlexColumnNoWidth>
            </FlexSpaceBetween>
            {/* <FlexSpaceBetween>
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
              </FlexSpaceBetween> */}
            {/* <Stepper activeStep={activeStep}>
              <Step
                onClick={() => setActiveStep(0)}
                label="Applicant List"
              ></Step>
              <Step
                onClick={() => setActiveStep(1)}
                label="Meets Eligibility"
              ></Step>
              <Step onClick={() => setActiveStep(2)} label="Interviewed"></Step>
              <Step onClick={() => setActiveStep(3)} label="Selections"></Step>
            </Stepper>
            <Applicants jobid={jobid} Tabvalue={activeStep} /> */}
            <div style={{ width: "100%" }}>
              <Tabs
                value={valueTab}
                onChange={HandleChangeTab}
                aria-label="basic tabs example"
              >
                <Tab label="Applicant List" {...a11yProps(0)} />
                <Tab label="Meets Eligibility" {...a11yProps(1)} />
                <Tab label="Interviewed" {...a11yProps(2)} />
                <Tab label="Selections" {...a11yProps(3)} />
              </Tabs>
            </div>
            <CustomTabPanel value={valueTab} index={0}>
              <Applicants jobid={jobid} Tabvalue={valueTab} />
            </CustomTabPanel>
            <CustomTabPanel value={valueTab} index={1}>
              <Applicants jobid={jobid} Tabvalue={valueTab} />
            </CustomTabPanel>
            <CustomTabPanel value={valueTab} index={2}>
              <Applicants jobid={jobid} Tabvalue={valueTab} />
            </CustomTabPanel>
            <CustomTabPanel value={valueTab} index={3}>
              <Applicants jobid={jobid} Tabvalue={valueTab} />
            </CustomTabPanel>
          </BackGroundWhite>
        </>
      )}
    </>
  );
};

export default JobView;
