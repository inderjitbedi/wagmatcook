import React, { useState, useEffect } from "react";
import { DevTool } from "@hookform/devtools";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate, useLocation } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import httpClient from "../../api/httpClient";
import { toast } from "react-toastify";
import API_URLS from "../../constants/apiUrls";
import moment from "moment";
import ROLES from "../../constants/roles";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import CommenDashHeader from "../../Dashboard/CommenDashHeader";

import {
  DashHeader,
  DashHeaderTitle,
  SearchBox,
  SearchInput,
  DashHeaderSearch,
  SearchIcon,
} from "../../Dashboard/OADashboard/OADashBoardStyles";
import {
  DashHeaderDepartment,
  DepartmentIconContainer,
  DepartmentIconImg,
} from "../../Departments/DepartmentsStyles";
import {
  ActionIconDiv,
  ActionIcons,
  HeaderDiv,
  HeaderTitle,
  TabelDarkPara,
  TabelLightPara,
  TabelDiv,
  TabelImg,
} from "../../Disciplinary/DisciplinaryStyles";
import { PendingStyle, ApproveStyle, RejectedStyle } from "./ActionsStyles";
import {
  ModalThanksHeading,
  ModalHeading,
  ModalContainer,
  ModalIcon,
  ModalFormContainer,
  InputSpan,
  ModalThanks,
  ModalIconDelete,
  ModalThanksImg,
  FlexContaierForm,
  FlexColumnForm,
  InputLabel,
  Input,
  Errors,
  Select,
  Option,
  TextArea,
  InputPara,
  ButtonBlue,
} from "../../Employee/ViewEmployee/ViewEmployeeStyle";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 446,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 45,
  padding: "20px 0px",

  borderRadius: "8px",
};
const CellHeadStyles = {
  color: "#8F9BB3",
  fontFamily: "Inter",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "16px",
};

const CellStyle = {
  color: "#222B45",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "15px",
};
const CellStyle2 = {
  color: "#222B45",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "15px",
};
const ManagerLeaves = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const [userType, setUserType] = useState("");
  const Data = [1, 2, 3, 4, 5, 6, 7, 8];
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setOptionLoading] = useState(false);
  const [result, setResult] = useState([]);

  const [searchValue, setSearchValue] = useState("");

  const HandleSearchCahnge = (data) => {
    setSearchValue(data);
  };

  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [detailsLength, setDetailsLength] = useState(500);

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
  const [reportList, setReportList] = useState([]);
  const [openAuto, setOpenAuto] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  // const loading = openAuto && options.length === 0;
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
    console.log("form submmited", data);

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
  const HandleSubmit = (data) => {
    // e.preventDefault();
    setIsLoading(true);
    let url = API_URLS.submitEmployeeLeaveHistory.replace(":employeeid");

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
          //  GetLeaveHistory();
          toast.success(result.message);
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
  const GetReportList = () => {
    setIsLoading(true);
    let url = API_URLS.getReporttoList;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          const extractedDataArray = result?.users?.map((user) => {
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

          setReportList(extractedDataArray);
          console.log("ideal data :", extractedDataArray);
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
  // auto complete
  function sleep(duration) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, duration);
    });
  }
  // React.useEffect(() => {
  //   let active = true;

  //   if (!loading) {
  //     return undefined;
  //   }

  //   (async () => {
  //     await GetActiveUser(); // For demo purposes.

  //     if (active) {
  //       setOptions([...userList]);
  //     }
  //   })();

  //   return () => {
  //     active = false;
  //   };
  // }, [loading]);

  // React.useEffect(() => {
  //   if (!openAuto) {
  //     setOptions([]);
  //   }
  // }, [openAuto]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [userList, setUserList] = useState([]);
  const [leaveType, setLeaveType] = useState([]);
  const GetLeavesHistory = () => {
    setIsLoading(true);
    let url = API_URLS.getLeaves;
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
        //  toast.error("Error creating department. Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const GetActiveUser = () => {
    setOptionLoading(true);
    let url = API_URLS.getActiveUser;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setOptions(result.employees);
        } else {
          //toast.warn("something went wrong ");
        }
        setOptionLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        //  toast.error("Error creating department. Please try again.");
        setOptionLoading(false);
      })
      .finally(() => {
        setOptionLoading(false);
      });
  };

  useEffect(() => {
    // getLeavesAllocations()
  }, [selectedEmployee]);
  useEffect(() => {
    GetLeavesHistory();
    GetReportList();
    GetActiveUser();

    if (location.pathname.indexOf("manager") > -1) {
      setUserType(ROLES.MANAGER);
    } else if (location.pathname.indexOf("hr") > -1) {
      setUserType(ROLES.HR);
    } else if (location.pathname.indexOf("user") > -1) {
      setUserType(ROLES.EMPLOYEE);
    }
  }, [searchValue]);
  let API_URL = process.env.REACT_APP_API_URL;

  return (
    <div>
      <CommenDashHeader onSearch={HandleSearchCahnge} text="Dashboard" />
      <HeaderDiv>
        <HeaderTitle>All Leaves</HeaderTitle>
        <DashHeaderSearch>
          {/* <SearchBox>
            <SearchInput
              type="text"
              placeholder="Search..."
              // value={searchValue}
              // onChange={(e) => HandleSearchCahnge(e)}
            ></SearchInput>
            <SearchIcon src="/images/icons/searchIcon.svg" />
          </SearchBox> */}
        </DashHeaderSearch>
        <ButtonBlue onClick={() => handleOpen()}>New Request</ButtonBlue>
      </HeaderDiv>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "70vh",
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{
                  background: "#FBFBFB",
                }}
              >
                <TableCell sx={{ ...CellStyle, maxWidth: "25px" }}>
                  Sr.No
                </TableCell>
                <TableCell sx={{ ...CellStyle, maxWidth: "188" }} align="left">
                  Name
                </TableCell>
                <TableCell sx={{ ...CellStyle, maxWidth: "84px" }} align="left">
                  Department
                </TableCell>
                <TableCell
                  sx={{ ...CellStyle, maxWidth: "114px" }}
                  align="left"
                >
                  From
                </TableCell>
                <TableCell sx={{ ...CellStyle, maxWidth: "88px" }} align="left">
                  To
                </TableCell>
                <TableCell
                  sx={{ ...CellStyle, maxWidth: "105px" }}
                  align="left"
                >
                  Leave&nbsp;Type
                </TableCell>
                <TableCell sx={{ ...CellStyle }} align="left">
                  Hours
                </TableCell>
                <TableCell sx={{ ...CellStyle }} align="left">
                  Status
                </TableCell>
                <TableCell sx={{ ...CellStyle }} align="left">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {result?.leaves?.length == 0 && (
                <TableRow sx={{ height: "200px" }}>
                  <TableCell align="center" colSpan={7}>
                    No Leaves found
                  </TableCell>
                </TableRow>
              )}
              {result?.leaves?.map((data, index) => (
                <TableRow
                  key={data.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  style={{ background: "#fff" }}
                >
                  <TableCell align="center" sx={CellStyle2}>
                    {index + 1}
                  </TableCell>
                  <TableCell align="left" sx={CellStyle2}>
                    <TabelDiv>
                      <TabelImg
                        src={
                          data.employee?.personalInfo?.photo
                            ? API_URL + data.employee?.personalInfo?.photo?.path
                            : "/images/User.jpg"
                        }
                      />
                      <div>
                        <TabelDarkPara>
                          {data.employee?.personalInfo?.firstName +
                            (data.employee?.personalInfo?.lastName
                              ? data.employee?.personalInfo?.lastName
                              : " ")}
                        </TabelDarkPara>
                        <TabelLightPara style={{ textTransform: "none" }}>
                          {data.employee?.email}
                        </TabelLightPara>
                      </div>
                    </TabelDiv>
                  </TableCell>
                  <TableCell align="left" sx={CellStyle2}>
                    Design
                  </TableCell>
                  <TableCell align="left" sx={CellStyle2}>
                    {data.from ? moment(data.from).format("DD/MM/YYYY") : " - "}
                  </TableCell>
                  <TableCell align="left" sx={CellStyle2}>
                    {data.to ? moment(data.to).format("DD/MM/YYYY") : " - "}
                  </TableCell>
                  <TableCell align="left" sx={CellStyle2}>
                    {data.leaveType?.name}
                  </TableCell>
                  <TableCell align="left" sx={CellStyle2}>
                    {data.hours}
                  </TableCell>
                  <TableCell align="left" sx={CellStyle2}>
                    {data.status === "PENDING" ? (
                      <PendingStyle style={{ padding: "4px 0px" }}>
                        {data.status}
                      </PendingStyle>
                    ) : data.status === "APPROVED" ? (
                      <ApproveStyle style={{ padding: "4px 0px" }}>
                        {data.status}
                      </ApproveStyle>
                    ) : data.status === "REJECTED" ? (
                      <RejectedStyle style={{ padding: "4px 0px" }}>
                        {data.status}
                      </RejectedStyle>
                    ) : (
                      " - "
                    )}
                  </TableCell>
                  <TableCell align="left" sx={CellStyle2}>
                    <ActionIconDiv style={{ justifyContent: "center" }}>
                      <ActionIcons
                        onClick={() => {
                          if (userType === ROLES.MANAGER) {
                            Navigate(
                              `/manager-management/leaves-request/${data.employee._id}/${data._id}`
                            );
                          } else if (userType === ROLES.HR) {
                            Navigate(
                              `/hr-management/leaves-request/${data.employee._id}/${data._id}`
                            );
                          }
                        }}
                        src="/images/icons/eye.svg"
                      />
                    </ActionIconDiv>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/* modal applying leaves  */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isLoading ? (
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "380px",
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
                  {!update ? "Applying for Leaves" : "View Leaves"}
                </ModalHeading>
                <ModalIcon
                  onClick={handleClose}
                  src="/images/icons/Alert-Circle.svg"
                />
              </ModalContainer>

              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalFormContainer>
                  <Autocomplete
                    {...register("employee", {
                      required: {
                        value: true,
                        message: " Required",
                      },
                    })}
                    id="asynchronous-demo"
                    sx={{ width: "100%" }}
                    open={openAuto}
                    onOpen={() => {
                      setOpenAuto(true);
                    }}
                    onClose={() => {
                      setOpenAuto(false);
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option._id === value._id
                    }
                    getOptionLabel={(option) => {
                      console.log(option);
                      if (
                        option &&
                        option.personalInfo &&
                        option.personalInfo.firstName &&
                        option.personalInfo.lastName
                      ) {
                        return `${option.personalInfo.firstName} ${option.personalInfo.lastName}`;
                      }
                      // Handle the case where required properties are missing or undefined
                      return "Select";
                    }}
                    // getOptionValue={(option) => option._id}
                    value={selectedEmployee}
                    onChange={(event, newValue) => {
                      setSelectedEmployee(newValue);
                    }}
                    options={options}
                    loading={loading}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Employee"
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <React.Fragment>
                              {loading ? (
                                <CircularProgress color="inherit" size={20} />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                        }}
                      />
                    )}
                  />

                  {<Errors>{errors.employee?.message}</Errors>}

                  <FlexContaierForm style={{ alignItems: "flex-start" }}>
                    <FlexColumnForm>
                      <InputLabel>
                        From <InputSpan>*</InputSpan>{" "}
                      </InputLabel>
                      <Input
                        readOnly={update}
                        type="date"
                        {...register("from", {
                          required: {
                            value: true,
                            message: "Required",
                          },
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
                        To <InputSpan>*</InputSpan>
                      </InputLabel>
                      <Input
                        readOnly={update}
                        type="date"
                        {...register("to", {
                          required: {
                            value: true,
                            message: " Required",
                          },
                          onChange: (fieldValue) => {
                            const startDateValue = getValues("from");

                            const endDateValue = getValues("to");

                            if (endDateValue && startDateValue) {
                              const endDate = new Date(endDateValue);
                              const startDate = new Date(startDateValue);
                              if (startDate > endDate) {
                                return setError("to", {
                                  type: "custom",
                                  message:
                                    "End date must not be earlier than start date",
                                });
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
                        Leave Type <InputSpan>*</InputSpan>{" "}
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
                            {leaveType?.map((data) => (
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
                        Hours <InputSpan>*</InputSpan>
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
                            setDetailsLength(500 - value.target.value.length);
                          },
                        })}
                      />
                      <InputPara>
                        {" "}
                        {
                          <Errors>{errors.requesterComment?.message}</Errors>
                        }{" "}
                        <span style={{ justifySelf: "flex-end" }}>
                          {" "}
                          {detailsLength > -1 ? detailsLength : 0} characters
                          left
                        </span>
                      </InputPara>
                    </FlexColumnForm>
                  </FlexContaierForm>
                  <FlexContaierForm>
                    <FlexColumnForm>
                      <InputLabel>
                        Send Leave Request to <InputSpan>*</InputSpan>
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

                  <ButtonBlue type="submit"> Submit</ButtonBlue>
                </ModalFormContainer>
              </form>
            </>
          )}
        </Box>
      </Modal>
      {/* thanks modal for leaves */}
      <Modal
        open={openThanks}
        onClose={handleCloseThanks}
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
            <ButtonBlue>Thanks</ButtonBlue>
          </ModalThanks>
        </Box>
      </Modal>
      <DevTool control={control} />
    </div>
  );
};

export default ManagerLeaves;
