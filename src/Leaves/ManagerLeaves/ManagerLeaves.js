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
import LeaveActionModal from "./LeaveActionModal";

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
  width: "44.6rem",
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
    setOptions([]);
  };
  const [openThanks, setOpenThanks] = useState(false);
  const handleOpenThanks = () => setOpenThanks(true);
  const handleCloseThanks = () => setOpenThanks(false);
  const [reportList, setReportList] = useState([]);
  const [openAuto, setOpenAuto] = useState(false);
  const [user, setUser] = useState();
  const [options, setOptions] = React.useState([]);
  const [leaveType, setLeaveType] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const HandleCloseDelete = () => setOpenDelete(false);
  const [modalProps, setModalProps] = useState({});
  const HandleOpenDelete = (action, message) => {
    if (action === "Reject") {
      setModalProps({
        src: "/svg/Calendar Mark.svg",
        message: message,
        buttonValue: "Ok",
      });
    }
    setOpenDelete(true);
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
    setValue,
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
    console.log("this our data :", data);
  };
  const HandleSubmit = (data) => {
    // e.preventDefault();
    setIsLoading(true);
    let url = API_URLS.submitEmployeeLeaveHistory.replace(
      ":employeeid",
      data.employee
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
          GetLeavesHistory();
          toast.success(result.message, {
            className: "toast",
          });
        } else {
          HandleOpenDelete("Reject", error.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // toast.error("Error feteching benefits. Please try again.");
        handleClose();
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
              (obj) => obj._id !== user._id
            );
            setReportList(filteredArray);
            console.log("ideal data :", filteredArray);
          } else {
            //toast.warn("something went wrong ");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // toast.error("Error creating department. Please try again.");
          setIsLoading(false);
          reject(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  };
  const GetLeaveAlloaction = (id) => {
    setOptionLoading(true);

    let url = API_URLS.EmployeeAllocation.replace(":employeeid", id);
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setLeaveType(result.allocations);
        } else {
          //toast.warn("something went wrong ");
        }
        setOptionLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error Adding Benefits. Please try again.");
        setOptionLoading(false);
      })
      .finally(() => {
        setOptionLoading(false);
      });
  };

  const GetLeavesHistory = () => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      let url = API_URLS.getLeaves;
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
          //  toast.error("Error creating department. Please try again.");
          setIsLoading(false);
          reject(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
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
    Promise.all([GetLeavesHistory(), GetReportList()]);

    if (location.pathname.indexOf("manager") > -1) {
      setUserType(ROLES.MANAGER);
    } else if (location.pathname.indexOf("hr") > -1) {
      setUserType(ROLES.HR);
    } else if (location.pathname.indexOf("user") > -1) {
      setUserType(ROLES.EMPLOYEE);
    }

    let user = localStorage.getItem("user");
    if (user) {
      let parsedUser = JSON.parse(user);
      setUser(parsedUser);
    }
  }, [searchValue]);

  useEffect(() => {
    // if (!openAuto) {
    //   setOptions([]);
    // }
    let employeeid = getValues("employee")?.toString();
    if (openAuto) {
      GetActiveUser();
    }
    if (employeeid) {
      GetLeaveAlloaction(employeeid);
    }
  }, [openAuto]);

  let API_URL = process.env.REACT_APP_API_URL;

  return (
    <div>
      <CommenDashHeader onSearch={HandleSearchCahnge} text="Leaves" />
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
        <ButtonBlue onClick={() => handleOpen()}>Add New</ButtonBlue>
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
                <TableCell
                  sx={{ ...CellStyle, maxWidth: "188px" }}
                  align="left"
                >
                  Name
                </TableCell>
                <TableCell sx={{ ...CellStyle, maxWidth: "84px" }} align="left">
                  Department
                </TableCell>
                <TableCell
                  sx={{ ...CellStyle, maxWidth: "11.4rem" }}
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
                <TableRow sx={{ height: "20rem" }}>
                  <TableCell align="center" sx={CellStyle2} colSpan={7}>
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
                    {data.from
                      ? moment(data.from).format("D MMM, YYYY")
                      : " - "}
                  </TableCell>
                  <TableCell align="left" sx={CellStyle2}>
                    {data.to ? moment(data.to).format("D MMM, YYYY") : " - "}
                  </TableCell>
                  <TableCell align="left" sx={CellStyle2}>
                    {data.leaveType?.name}
                  </TableCell>
                  <TableCell align="left" sx={CellStyle2}>
                    {data.hours}
                  </TableCell>
                  <TableCell align="left" sx={CellStyle2}>
                    {data.status === "PENDING" ? (
                      <PendingStyle style={{ padding: "4px 0rem" }}>
                        {data.status}
                      </PendingStyle>
                    ) : data.status === "APPROVED" ? (
                      <ApproveStyle style={{ padding: "4px 0rem" }}>
                        {data.status}
                      </ApproveStyle>
                    ) : data.status === "REJECTED" ? (
                      <RejectedStyle style={{ padding: "4px 0rem" }}>
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
        // onClose={handleClose}
        sx={{
          backgroundColor: "rgb(27, 27, 27, 0.75)",
          backdropFilter: "blur(8px)",
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
                  {!update ? "Applying for Leave" : "View Leaves"}
                </ModalHeading>
                <ModalIcon
                  onClick={handleClose}
                  src="/images/icons/Alert-Circle.svg"
                />
              </ModalContainer>

              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalFormContainer>
                  <FlexColumnForm>
                    <InputLabel>
                      Select Employee <InputSpan>*</InputSpan>{" "}
                    </InputLabel>
                    <Controller
                      name="employee"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Required",
                        },
                      }}
                      render={({ field: { onChange, value, ref } }) => (
                        <Autocomplete
                          value={
                            value
                              ? options.find((option) => {
                                  return value === option.user;
                                }) ?? null
                              : null
                          }
                          onChange={(event, newValue) => {
                            onChange(newValue ? newValue.user : null);
                          }}
                          id="asynchronous-demo"
                          sx={{ width: " 100% " }}
                          open={openAuto}
                          onOpen={() => {
                            setOpenAuto(true);
                          }}
                          onClose={() => {
                            setOpenAuto(false);
                          }}
                          isOptionEqualToValue={(option, value) =>
                            option.user === value.user
                          }
                          getOptionLabel={(option) =>
                            option.personalInfo &&
                            `${option.personalInfo?.firstName} ${option.personalInfo?.lastName}`
                          }
                          PaperComponent={(props) => (
                            <Paper
                              sx={{
                                fontSize: "1.6rem !important",
                              }}
                              {...props}
                            />
                          )}
                          options={options}
                          loading={loading}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              inputRef={ref}
                              InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                  <React.Fragment>
                                    {loading ? (
                                      <CircularProgress
                                        color="inherit"
                                        size={20}
                                      />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                  </React.Fragment>
                                ),
                              }}
                            />
                          )}
                        />
                      )}
                    />

                    {<Errors>{errors.employee?.message}</Errors>}
                  </FlexColumnForm>
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
                          validate: (fieldValue) => {
                            const selectedDate = Date.parse(fieldValue);
                            const currentDate = new Date().setHours(0, 0, 0, 0);
                            if (selectedDate < currentDate) {
                              return "From must not be smaller  than today's date";
                            }
                            return true;
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
                          <Select {...field} disabled={!getValues("employee")}>
                            <Option>Select</Option>
                            {loading ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : (
                              <>
                                {leaveType?.map((data) => (
                                  <Option value={data.leaveType?._id}>
                                    {data.leaveType?.name}
                                  </Option>
                                ))}
                              </>
                            )}
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
        // onClose={handleCloseThanks}
        sx={{
          backgroundColor: "rgb(27, 27, 27, 0.75)",
          backdropFilter: "blur(8px)",
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
      {/* <DevTool control={control} /> */}
      <LeaveActionModal
        {...modalProps}
        openDelete={openDelete}
        HandleCloseDelete={HandleCloseDelete}
      />
    </div>
  );
};

export default ManagerLeaves;
