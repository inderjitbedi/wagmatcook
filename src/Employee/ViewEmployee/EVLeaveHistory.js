import React, { useState, useEffect } from "react";
import { DevTool } from "@hookform/devtools";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ButtonBlue } from "../AddEmployee/AddEmployeeStyles";
import { useForm, Controller } from "react-hook-form";
import httpClient from "../../api/httpClient";
import { toast } from "react-toastify";
import { RotatingLines, ThreeDots } from "react-loader-spinner";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import moment from "moment";
import ROLES from "../../constants/roles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CommenDashHeader from "../../Dashboard/CommenDashHeader";
import Pagination from "@mui/material/Pagination";
import { Stepper, Step } from "react-form-stepper";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LeaveAdjustmentTable from "./LeaveAdjusmentTable";

import {
  DashHeader,
  DashHeaderSearch,
  DashHeaderTitle,
  DashNotification,
  SearchBox,
  SearchIcon,
  SearchInput,
  DepartmentFilterContainer,
  DepartmentFilterdiv,
  MainBodyContainer,
  PersonalInfo,
  PersonalImg,
  FlexColumn,
  PersonalName,
  PersonalTitle,
  PersonalDepartment,
  FlexSpaceBetween,
  LeaveDiv,
  TabelDiv,
  TabelImg,
  TabelDarkPara,
  TabelParaContainer,
  Icons,
  Input,
  FlexContaierForm,
  FlexColumnForm,
  InputLabel,
  Errors,
  ModalHeading,
  ModalContainer,
  ModalIcon,
  ModalFormContainer,
  InputSpan,
  ModalThanks,
  ModalIconDelete,
  ModalThanksImg,
  ModalThanksHeading,
  Select,
  Option,
  InputPara,
  TextArea,
  SectionCard,
  SectionCardContainer,
  Sectionlighttitle,
  Sectiondarktitle,
  Sectionsmalltitle,
  ShowMore,
  FlexColumn100,
} from "./ViewEmployeeStyle";
import { PaginationDiv } from "../../Disciplinary/DisciplinaryStyles";

import API_URLS from "../../constants/apiUrls";
import CommenHeader from "./CommenHeader";
const CellStyle = {
  color: "#8F9BB3",
  padding: "1.6rem 0.8rem",
  fontSize: "1.4rem",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "1.6rem",
};
const Celllstyle2 = {
  color: "#222B45",
  padding: "1.6rem 0.8rem",
  fontSize: "1.4rem",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "15px",
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: " 44.6rem",
  bgcolor: "background.paper",
  border: "1px solid #EFF4FA",
  boxShadow: 45,
  // padding: "2rem 0rem",
  borderRadius: "0.8rem",
  height: "59.7rem",
  overflowY: "scroll",
};

const PendingStyle = {
  borderRadius: "10rem",
  background: "#FFF1DD",
  display: "inline-flex",
  padding: "2px 1.2rem",
  alignItems: "center",
  color: "#E88B00",
  textAlign: "center",
  fontFamily: "Inter",
  fontSize: "1.4rem",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "2.4rem",
};
const ApprovedStyles = {
  borderRadius: "10rem",
  background: "var(--green-20, #C8FFC7)",
  display: "inline-flex",
  padding: "2px 1.2rem",
  alignItems: "center",
  color: "var(--green-90, #0D7D0B)",
  textAlign: "center",
  fontFamily: "Inter",
  fontSize: "1.4rem",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "2.4rem",
};

const RejectedStyles = {
  borderRadius: "10rem",
  background: "#FFE6E3",
  display: "inline-flex",
  padding: "2px 1.2rem",
  alignItems: "center",
  color: "#EA4335",
  textAlign: "center",
  fontFamily: "Inter",
  fontSize: "1.4rem",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "2.4rem",
};

const EVLeaveHistory = () => {
  const location = useLocation();
  const [userType, setUserType] = useState("");
  const [isAccount, setIsAccount] = useState(false);
  const [page, setPage] = useState(1);
  const HandleChangePage = (event, value) => {
    setPage(value);
  };

  // const limitedData = showAll ? leaveBalance : leaveBalance?.slice(0, 4);

  const [open, setOpen] = useState(false);
  const [Id, setId] = useState("");
  const [update, setUpdate] = useState(false);
  const [detailsLength, setDetailsLength] = useState(500);
  const { employeeid } = useParams();
  const Navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setUpdate(false);
    clearErrors();
    reset({});
    setOpen(false);
    setDetailsLength(500);
  };
  const [openThanks, setOpenThanks] = useState(false);
  const handleOpenThanks = () => setOpenThanks(true);
  const handleCloseThanks = () => setOpenThanks(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [isSatus, setIsSatus] = useState("");
  const [formData, setFormData] = useState([]);
  const [reportList, setReportList] = useState([]);
  const [leaveType, setLeaveType] = useState([]);
  const [leaveBalance, setLeaveBalance] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [leaveAdjustment, setLeaveAdjustment] = useState([]);

  const limitedData = showAll ? leaveBalance : leaveBalance?.slice(0, 3);

  const handleShowMoreClick = () => {
    setShowAll(!showAll);
  };
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    setError,
    clearErrors,
  } = useForm({
    mode: "all",
    defaultValues: {
      status: "PENDING",
    },
  });

  const onSubmit = (data) => {
    function isEmptyObject(obj) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          return false;
        }
      }
      return true;
    }
    if (isEmptyObject(errors)) {
      HandleSubmit(data);
    }
  };
  const HandleUpdateAction = (data) => {
    setUpdate(true);
    setId(data._id);
    setDetailsLength(500 - data?.requesterComment?.length);

    reset({
      leaveType: data.leaveType._id,
      from: new Date(data.from).toISOString().split("T")[0],
      to: new Date(data.to).toISOString().split("T")[0],
      hours: data.hours,
      requesterComment: data.requesterComment,
      responder: data.responder?._id,
      status: data.status,
    });
    setIsSatus(data.status);
    handleOpen();
  };
  const HandleOpenAddNewAction = () => {
    handleOpen();
    reset({});
    clearErrors();
    setDetailsLength(500);
  };

  const GetReportList = () => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      let url = API_URLS.getReporttoList;
      httpClient({
        method: "get",
        url,
      })
        .then(({ result, error }) => {
          if (result) {
            resolve(result);
            const FilterforAdmin = result?.users?.filter(
              (item) => item.userData.role !== "ORGANIZATION_ADMIN"
            );
            const extractedDataArray = FilterforAdmin?.map((user) => {
              if (user.personalInfo.length > 0) {
                const {
                  _id: personalInfoId,
                  firstName,
                  lastName,
                } = user.personalInfo[0];
                return {
                  _id: user.user,
                  personalInfoId,
                  name: `${firstName} ${lastName ? lastName : ""}`,
                };
              } else {
                const { _id: userDataId, name } = user.userData;
                return { _id: user.user, userDataId, name };
              }
            });
            const filteredArray = extractedDataArray.filter(
              (obj) => obj._id !== employeeid
            );
            setReportList(filteredArray);
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
  // const GetLeavesType = () => {
  //   setIsLoading(true);
  //   let url = API_URLS.getLeaveTypeList;
  //   httpClient({
  //     method: "get",
  //     url,
  //   })
  //     .then(({ result, error }) => {
  //       if (result) {
  //         setLeaveType(result.leaveTypes);
  //       } else {
  //         //toast.warn("something went wrong ");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //       toast.error("Error creating department. Please try again.");
  //       setIsLoading(false);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // };
  const GetLeaveAlloaction = () => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      // GetLeavesType();
      const trimid = employeeid.trim();
      let url = API_URLS.EmployeeAllocation.replace(":employeeid", employeeid);
      httpClient({
        method: "get",
        url,
      })
        .then(({ result, error }) => {
          if (result) {
            setLeaveBalance(result.allocations);
            resolve(result);
          } else {
            //toast.warn("something went wrong ");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Error Adding Benefits. Please try again.");
          setIsLoading(false);
          reject(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  };

  const HandleSubmit = (data) => {
    // e.preventDefault();
    setIsLoading(true);
    let url = API_URLS.submitEmployeeLeaveHistory.replace(
      ":employeeid",
      employeeid
    );

    let dataCopy = data;
    httpClient({
      method: "post",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          handleClose();
          reset();
          GetLeaveHistory();
          toast.success(result.message, {
            className: "toast",
          });
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error feteching benefits. Please try again.");
        handleClose();
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const GetLeaveHistory = () => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      // const trimid = employeeid?.trim();
      let url = API_URLS.getLeaveHistory
        .replace(":employeeid", employeeid)
        .replace("Page", page)
        .replace("searchValue", searchValue);
      httpClient({
        method: "get",
        url,
      })
        .then(({ result, error }) => {
          if (result) {
            setResult(result);
            resolve(result);
          } else {
            //toast.warn("something went wrong ");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Error Adding Benefits. Please try again.");
          setIsLoading(false);
          reject(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  };
  useEffect(() => {
    Promise.all([GetReportList(), GetLeaveAlloaction(), GetLeaveHistory()]);

    if (location.pathname.indexOf("manager") > -1) {
      setUserType(ROLES.MANAGER);
    } else if (location.pathname.indexOf("hr") > -1) {
      setUserType(ROLES.HR);
    } else if (location.pathname.indexOf("payroll") > -1) {
      setUserType(ROLES.PAYROLL);
    } else if (location.pathname.indexOf("organization-admin") > -1) {
      setUserType(ROLES.ORG_ADMIN);
    } else if (location.pathname.indexOf("user") > -1) {
      setUserType(ROLES.EMPLOYEE);
      // GetLeaveAlloactionBalance();
    }
    if (location.pathname.indexOf("account") > -1) {
      setIsAccount(true);
    }
  }, [page]);
  let API_URL = process.env.REACT_APP_API_URL;
  const userstyle = {
    padding: "1.6rem 2.0rem",
    background: "#fff",
    borderRadius: "0.8rem 0.8rem 0rem 0rem",
  };
  const [searchValue, setSearchValue] = useState("");

  const HandleSearchCahnge = (data) => {
    setSearchValue(data);
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
  const [valueTab, setValueTab] = useState(0);
  const HandleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

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
        <MainBodyContainer>
          {userType === ROLES.EMPLOYEE && (
            <CommenDashHeader onSearch={HandleSearchCahnge} text="Leaves" />
          )}
          {userType === ROLES.EMPLOYEE ? (
            ""
          ) : (
            <FlexSpaceBetween style={{ alignItems: "center" }}>
              {/* <CommenHeader employeeid={employeeid} /> */}
            </FlexSpaceBetween>
          )}
          {[
            ROLES.EMPLOYEE,
            ROLES.MANAGER,
            ROLES.HR,
            ROLES.ORG_ADMIN,
            ROLES.PAYROLL,
          ].includes(userType) && (
            <>
              <SectionCard style={{ padding: "0px 1rem" }}>
                {limitedData?.map((data) => (
                  <SectionCardContainer style={{ flex: "0 1 25%" }}>
                    <FlexColumn100>
                      <Sectionlighttitle>
                        {" "}
                        {data?.leaveType?.name || "- "} -{" "}
                        <span
                          style={{
                            color: "#222b45",
                            textAlign: "right",
                            fontFamily: "Inter",
                            fontSize: "1.4rem",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "1.8rem",
                            margin: 0,
                          }}
                        >
                          {data?.balance} hours left
                        </span>
                      </Sectionlighttitle>
                      <Sectionsmalltitle>
                        {data?.initialBalance - data?.balance} of{" "}
                        {data?.initialBalance} hours used
                      </Sectionsmalltitle>
                    </FlexColumn100>
                  </SectionCardContainer>
                ))}
              </SectionCard>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "0rem 2rem",
                }}
              >
                {leaveBalance?.length > 3 && (
                  <ShowMore onClick={handleShowMoreClick}>
                    {showAll ? "Show Less" : "Show More "}
                  </ShowMore>
                )}
              </div>
            </>
          )}
          <div style={{ width: "100%" }}>
            <Tabs
              value={valueTab}
              onChange={HandleChangeTab}
              aria-label="basic tabs example"
            >
              <Tab label="Leave History" {...a11yProps(0)} />
              <Tab label="Leave Adjustment" {...a11yProps(1)} />
            </Tabs>
          </div>

          <CustomTabPanel value={valueTab} index={0}>
            <LeaveDiv style={userType === ROLES.EMPLOYEE ? userstyle : {}}>
              Leave History
              {isAccount ? (
                ""
              ) : (
                <ButtonBlue onClick={() => HandleOpenAddNewAction()}>
                  Add New
                </ButtonBlue>
              )}
            </LeaveDiv>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow
                    sx={{
                      background: "#FBFBFB",
                    }}
                  >
                    <TableCell sx={{ ...CellStyle, maxWidth: "2.5rem" }}>
                      Sr.No
                    </TableCell>
                    <TableCell
                      sx={{ ...CellStyle, maxWidth: "12.8rem" }}
                      align="left"
                    >
                      Leave&nbsp;Type
                    </TableCell>
                    <TableCell
                      sx={{ ...CellStyle, maxWidth: "18.4rem" }}
                      align="left"
                    >
                      Applied&nbsp;to
                    </TableCell>
                    <TableCell
                      sx={{ ...CellStyle, maxWidth: "10rem" }}
                      align="left"
                    >
                      From
                    </TableCell>
                    <TableCell
                      sx={{ ...CellStyle, maxWidth: "10rem" }}
                      align="left"
                    >
                      To
                    </TableCell>
                    <TableCell
                      sx={{ ...CellStyle, maxWidth: "40rem" }}
                      align="left"
                    >
                      Hours
                    </TableCell>
                    <TableCell sx={{ ...CellStyle }} align="left">
                      Status
                    </TableCell>
                    <TableCell sx={{ ...CellStyle }} align="left">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!result.history?.length && (
                    <TableRow sx={{ height: "20rem" }}>
                      <TableCell align="center" sx={Celllstyle2} colSpan={8}>
                        No Leave History Found
                      </TableCell>
                    </TableRow>
                  )}
                  {result?.history?.map((data, index) => (
                    <TableRow
                      key={data.index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                      style={{ background: "#fff" }}
                    >
                      <TableCell align="center" sx={Celllstyle2}>
                        {index + 1}
                      </TableCell>
                      <TableCell align="left" sx={Celllstyle2}>
                        <TabelDiv>
                          {/* <TabelImg src="/images/Oval Copy 2.jpg" /> */}
                          <TabelParaContainer>
                            <TabelDarkPara>
                              {data?.leaveType?.name || " - "}
                            </TabelDarkPara>
                          </TabelParaContainer>
                        </TabelDiv>
                      </TableCell>
                      <TableCell align="left" sx={Celllstyle2}>
                        {(data.responder?.personalInfo?.firstName
                          ? data.responder?.personalInfo?.firstName
                          : " - ") +
                          " " +
                          (data.responder?.personalInfo?.lastName
                            ? data.responder?.personalInfo?.lastName
                            : " ")}
                      </TableCell>
                      <TableCell align="left" sx={Celllstyle2}>
                        {data.from
                          ? moment.utc(data.from).format("D MMM, YYYY")
                          : " - "}
                      </TableCell>
                      <TableCell align="left" sx={Celllstyle2}>
                        {data.to
                          ? moment.utc(data.to).format("D MMM, YYYY")
                          : " - "}
                      </TableCell>
                      <TableCell align="left" sx={Celllstyle2}>
                        {data.hours || " - "}
                      </TableCell>
                      <TableCell align="left" sx={Celllstyle2}>
                        <span
                          style={
                            data.status === "PENDING"
                              ? PendingStyle
                              : data.status === "APPROVED"
                              ? ApprovedStyles
                              : RejectedStyles
                          }
                        >
                          {" "}
                          {data.status}{" "}
                        </span>
                      </TableCell>
                      <TableCell align="center" sx={Celllstyle2}>
                        <Icons
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            HandleUpdateAction(data);
                          }}
                          src="/images/icons/eye.svg"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {result?.totalPages > 1 && (
              <PaginationDiv>
                <Pagination
                  count={result?.totalPages}
                  variant="outlined"
                  shape="rounded"
                  page={page}
                  onChange={HandleChangePage}
                />
              </PaginationDiv>
            )}
          </CustomTabPanel>
          <CustomTabPanel value={valueTab} index={1}>
            <LeaveAdjustmentTable
              userType={userType}
              userstyle={userstyle}
              isAccount={isAccount}
              HandleOpenAddNewAction={HandleOpenAddNewAction}
              leaveAdjustment={leaveAdjustment}
              HandleChangePage={HandleChangePage}
              page={page}
              leaveBalance={leaveBalance}
              GetLeaveAlloaction={GetLeaveAlloaction}
            />
          </CustomTabPanel>

          {/* modal applying leaves  */}
          <Modal
            open={open}
            // onClose={handleClose}
            sx={{
              backgroundColor: "rgb(27, 27, 27, 0.75)",
              backdropFilter: "blur(0.8rem)",
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {isLoading ? (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    height: "38rem",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 999,
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
                  <ModalContainer>
                    <ModalHeading>
                      {!update ? "Applying for Leave" : "View Leave"}
                    </ModalHeading>
                    <ModalIcon
                      onClick={handleClose}
                      src="/images/icons/Alert-Circle.svg"
                    />
                  </ModalContainer>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalFormContainer>
                      {/* <SearchBox style={{ marginBottom: "1.6rem" }}>
                    <SearchIcon src="/images/icons/searchIcon.svg" />
                    <SearchInput
                      type="text"
                      placeholder="Search..."
                    ></SearchInput>
                  </SearchBox> */}
                      <FlexContaierForm style={{ alignItems: "flex-start" }}>
                        <FlexColumnForm>
                          <InputLabel>
                            From {update ? " " : <InputSpan>*</InputSpan>}{" "}
                          </InputLabel>
                          <Input
                            readOnly={update}
                            type="date"
                            {...register("from", {
                              required: {
                                value: true,
                                message: "Required",
                              },
                              // validate: (fieldValue) => {
                              //   const selectedDate = Date.parse(fieldValue);
                              // const currentDate = new Date().setHours(
                              //   0,
                              //   0,
                              //   0,
                              //   0
                              // );
                              //   if (selectedDate < currentDate) {
                              //     return "From must not be smaller  than today's date";
                              //   }
                              //   return true;
                              // },
                              onChange: (e) => {
                                const endDate = getValues("to");
                                const startDate = new Date(e.target.value);
                                if (startDate >= new Date(endDate) && endDate) {
                                  setError("to", {
                                    type: "custom",
                                    message:
                                      "End date must not be earlier than start date",
                                  });
                                } else {
                                  setError("to", {
                                    type: "custom",
                                    message: "",
                                  });
                                }
                              },
                            })}
                          />
                          {<Errors>{errors.from?.message}</Errors>}
                        </FlexColumnForm>
                        <FlexColumnForm>
                          <InputLabel>
                            To {update ? " " : <InputSpan>*</InputSpan>}
                          </InputLabel>
                          <Input
                            readOnly={update}
                            type="date"
                            {...register("to", {
                              required: {
                                value: true,
                                message: " Required",
                              },
                              validate: (fieldValue) => {
                                const startDateValue = getValues("from");

                                const endDateValue = getValues("to");

                                if (endDateValue && startDateValue) {
                                  const endDate = new Date(endDateValue);
                                  const startDate = new Date(startDateValue);
                                  if (startDate > endDate) {
                                    return "End date must not be earlier than start date";
                                    // return setError("to", {
                                    //   type: "custom",
                                    //   message:
                                    //     "End date must not be earlier than start date",
                                    // });
                                  } else {
                                    return clearErrors("to");
                                  }
                                }
                              },
                            })}
                          />
                          {<Errors>{errors.to?.message}</Errors>}
                        </FlexColumnForm>
                      </FlexContaierForm>
                      <FlexContaierForm style={{ alignItems: "flex-start" }}>
                        <FlexColumnForm>
                          <InputLabel>
                            Leave Type {update ? " " : <InputSpan>*</InputSpan>}{" "}
                          </InputLabel>

                          <Controller
                            name="leaveType"
                            control={control}
                            rules={{
                              required: {
                                value: true,
                                message: "Required",
                              },
                            }}
                            render={({ field }) => (
                              <Select {...field} disabled={update}>
                                <Option>Select</Option>
                                {leaveBalance.leaveType?.map((data) => (
                                  <Option value={data.leaveType?._id}>
                                    {data.leaveType?.name}
                                  </Option>
                                ))}
                              </Select>
                            )}
                          />
                          {<Errors>{errors.leaveType?.message}</Errors>}
                        </FlexColumnForm>
                        <FlexColumnForm>
                          <InputLabel>
                            Hours {update ? " " : <InputSpan>*</InputSpan>}
                          </InputLabel>
                          <Input
                            type="text"
                            readOnly={update}
                            {...register("hours", {
                              required: {
                                value: true,
                                message: "Required",
                              },
                              validate: (fieldValue) => {
                                return (
                                  (!isNaN(parseFloat(fieldValue)) &&
                                    isFinite(fieldValue)) ||
                                  "Invalid Hours number "
                                );
                              },
                              pattern: {
                                value: /^[+]?\d+(\.\d+)?$/,
                                message: "Please enter valid hours",
                              },
                            })}
                          />
                          {<Errors>{errors.hours?.message}</Errors>}
                        </FlexColumnForm>
                      </FlexContaierForm>
                      <FlexContaierForm>
                        <FlexColumnForm>
                          <InputLabel>Description</InputLabel>
                          <TextArea
                            style={update ? { marginBottom: "1.6rem" } : {}}
                            type="text"
                            readOnly={update}
                            {...register("requesterComment", {
                              // required: {
                              //   value: true,
                              //   message: " Required",
                              // },
                              maxLength: {
                                value: 500,
                                message: "Details exceeds  500 characters ",
                              },

                              onChange: (value) => {
                                setDetailsLength(
                                  500 - value.target.value.length
                                );
                              },
                            })}
                          />
                          {update ? (
                            " "
                          ) : (
                            <InputPara>
                              {
                                <Errors>
                                  {errors.requesterComment?.message}
                                </Errors>
                              }{" "}
                              <span style={{ justifySelf: "flex-end" }}>
                                {" "}
                                {detailsLength > -1 ? detailsLength : 0}{" "}
                                characters left
                              </span>
                            </InputPara>
                          )}
                        </FlexColumnForm>
                      </FlexContaierForm>
                      <FlexContaierForm>
                        <FlexColumnForm>
                          <InputLabel>
                            Send Leave Request to{" "}
                            {update ? " " : <InputSpan>*</InputSpan>}
                          </InputLabel>
                          <Controller
                            name="responder"
                            control={control}
                            rules={{
                              required: {
                                value: true,
                                message: "Required",
                              },
                            }}
                            render={({ field }) => (
                              <Select {...field} disabled={update}>
                                <Option>Select</Option>
                                {reportList?.map((data) => (
                                  <Option value={data._id}>{data.name}</Option>
                                ))}
                              </Select>
                            )}
                          />
                          {<Errors>{errors.responder?.message}</Errors>}
                        </FlexColumnForm>
                      </FlexContaierForm>
                      {!update ? (
                        <ButtonBlue type="submit"> Submit</ButtonBlue>
                      ) : (
                        <span
                          style={
                            isSatus === "PENDING"
                              ? PendingStyle
                              : isSatus === "APPROVED"
                              ? ApprovedStyles
                              : RejectedStyles
                            // isSatus === "PENDING"
                            //   ? PendingStyle
                            //   : ApprovedStyles
                          }
                        >
                          {" "}
                          {isSatus}{" "}
                        </span>
                      )}
                    </ModalFormContainer>
                  </form>
                </>
              )}
            </Box>
          </Modal>
          {/* thanks modal for leaves */}
          <Modal
            open={openThanks}
            // onClose={handleCloseThanks}
            sx={{
              backgroundColor: "rgb(27, 27, 27, 0.75)",
              backdropFilter: "blur(0.8rem)",
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <ModalThanks>
                <ModalIconDelete
                  onClick={handleCloseThanks}
                  src="/images/icons/Alert-Circle.svg"
                />
                <ModalThanksImg src="/images/icons/Calendar Mark.svg" />
                <ModalThanksHeading>
                  Your leave request sent successfully.
                </ModalThanksHeading>
                <ButtonBlue onClick={handleCloseThanks}>Thanks</ButtonBlue>
              </ModalThanks>
            </Box>
          </Modal>
        </MainBodyContainer>
      )}
      {/* <DevTool control={control} /> */}
    </>
  );
};

export default EVLeaveHistory;
