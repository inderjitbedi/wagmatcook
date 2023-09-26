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
import { useNavigate, useParams, Link } from "react-router-dom";
import moment from "moment";
import {
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
  SearchBox,
  SearchInput,
  SearchIcon,
  ModalThanks,
  ModalIconDelete,
  ModalThanksImg,
  ModalThanksHeading,
  Select,
  Option,
} from "./ViewEmployeeStyle";
const CellStyle = {
  color: "#8F9BB3",
  padding: "16px 8px",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "16px",
};
const Celllstyle2 = {
  color: "#222B45",
  padding: "16px 8px",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "15px",
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 446,
  bgcolor: "background.paper",
  border: "1px solid #EFF4FA",
  boxShadow: 45,
  padding: "20px 0px",
  borderRadius: "8px",
};
const rows = [
  {
    name: "Victoria perez",
    email: "KumarName@gamil.com",
    employeeid: "LA-0239",
    phone: "28 Apr,2020",
    joindate: "30 Apr,2020",
    role: "8",
    status: "Approved",
  },
  {
    name: "Victoria perez",
    email: "KumarName@gamil.com",
    employeeid: "LA-0239",
    phone: "28 Apr,2020",
    joindate: "30 Apr,2020",
    role: "8",
    status: "Approved",
  },
  {
    name: "Victoria perez",
    email: "KumarName@gamil.com",
    employeeid: "LA-0239",
    phone: "28 Apr,2020",
    joindate: "30 Apr,2020",
    role: "8",
    status: "Pending",
  },
  {
    name: "Victoria perez",
    email: "KumarName@gamil.com",
    employeeid: "LA-0239",
    phone: "28 Apr,2020",
    joindate: "30 Apr,2020",
    role: "8",
    status: "Approved",
  },
  {
    name: "Victoria perez",
    email: "KumarName@gamil.com",
    employeeid: "LA-0239",
    phone: "28 Apr,2020",
    joindate: "30 Apr,2020",
    role: "8",
    status: "Approved",
  },
  {
    name: "Victoria perez",
    email: "KumarName@gamil.com",
    employeeid: "LA-0239",
    phone: "30 Apr,2020",
    joindate: "30 Apr,2020",
    role: "8",
    status: "Approved",
  },
  {
    name: "Victoria perez",
    email: "KumarName@gamil.com",
    employeeid: "LA-0239",
    phone: "28 Apr,2020",
    joindate: "30 Apr,2020",
    status: "Approved",
    role: "8",
  },
  {
    name: "Victoria perez",
    email: "KumarName@gamil.com",
    employeeid: "LA-0239",
    phone: "28 Apr,2020",
    joindate: "30 Apr,2020",
    status: "Pending",
    role: "8",
  },
];
const PendingStyle = {
  borderRadius: "100px",
  background: "#FFF1DD",
  display: "inline-flex",
  padding: "2px 12px",
  alignItems: "center",
  color: "#E88B00",
  textAlign: "center",
  fontFamily: "Inter",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "24px",
};
const ApprovedStyles = {
  borderRadius: "100px",
  background: "var(--green-20, #C8FFC7)",
  display: "inline-flex",
  padding: "2px 12px",
  alignItems: "center",
  color: "var(--green-90, #0D7D0B)",
  textAlign: "center",
  fontFamily: "Inter",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "24px",
};
const EVLeaveHistory = () => {
  const [open, setOpen] = useState(false);
  const [Id, setId] = useState("");
  const [update, setUpdate] = useState(false);
  const [detailsLength, setDetailsLength] = useState(500);
  const { employeeid } = useParams();
  const Navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setUpdate(false)
    clearErrors()
    reset({})
    setOpen(false)
  };
  const [openThanks, setOpenThanks] = useState(false);
  const handleOpenThanks = () => setOpenThanks(true);
  const handleCloseThanks = () => setOpenThanks(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);

  const [formData, setFormData] = useState([]);
  const [reportList, setReportList] = useState([]);
  const [leaveType, setLeaveType] = useState([]);

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
  const HandleUpdateAction = (data) => {
    setUpdate(true);
    setId(data._id);
    setDetailsLength(500 - data?.description?.length);
    reset({
      leaveType: data.leaveType._id,
      from: new Date(data.from).toISOString().split("T")[0],
      to: new Date(data.to).toISOString().split("T")[0],
      hours: data.hours,
      requesterComment: data.requesterComment,
      approver: data.approver?._id,
      status: data.status,
    });
    handleOpen();
  };
  const HandleOpenAddNewAction = () => {
    handleOpen();
    reset({});
    clearErrors();
    setDetailsLength(500);
  };
  const [headerData, setHeaderData] = useState([]);
  const GetHeadersData = () => {
    // setIsLoading(true);
    const trimid = employeeid.trim();
    let url = `/employee/header-info/${trimid}`;
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
  const GetReportList = () => {
    setIsLoading(true);
    let url = `/employee/reports-to-list/`;
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
                name: `${firstName} ${lastName}`,
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
  const GetLeavesType = () => {
    setIsLoading(true);
    let url = `/leave-type/employee-list/${employeeid}`;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setLeaveType(result.leaveTypes);
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
  const HandleSubmit = (data) => {
    // e.preventDefault();
    setIsLoading(true);
    let url = `/employee/leave-history/${employeeid}/request`;

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
          toast.success(result.message); //Benefit created successfully.");
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
    GetHeadersData();

    setIsLoading(true);
    const trimid = employeeid.trim();
    let url = `/employee/leave-history/${trimid}`;
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
        toast.error("Error Adding Benefits. Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    GetReportList();
    GetLeavesType();
    GetLeaveHistory();
  }, []);
  let API_URL = process.env.REACT_APP_API_URL;

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
          <FlexSpaceBetween style={{ alignItems: "center" }}>
            <PersonalInfo>
              <PersonalImg
                src={
                  headerData.personalInfo?.photo
                    ? API_URL + headerData.personalInfo.photo?.path
                    : "/images/User.jpg"
                }
              />
              <FlexColumn>
                <PersonalName>
                  {[
                    headerData.personalInfo?.firstName,
                    headerData.personalInfo?.lastName,
                  ].join(" ")}
                </PersonalName>
                <PersonalTitle>
                  {headerData?.position?.title || "-"}
                </PersonalTitle>
                <PersonalDepartment>
                  {headerData.position?.department?.name || "-"}
                </PersonalDepartment>
              </FlexColumn>
            </PersonalInfo>
          </FlexSpaceBetween>
          <LeaveDiv>
            Leaves History
            <ButtonBlue onClick={() => HandleOpenAddNewAction()}>
              New Request
            </ButtonBlue>
          </LeaveDiv>
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
                    sx={{ ...CellStyle, maxWidth: "128" }}
                    align="left"
                  >
                    Leave&nbsp;Type
                  </TableCell>
                  <TableCell
                    sx={{ ...CellStyle, maxWidth: "184px" }}
                    align="left"
                  >
                    Applied&nbsp;to
                  </TableCell>
                  <TableCell
                    sx={{ ...CellStyle, maxWidth: "100px" }}
                    align="left"
                  >
                    from
                  </TableCell>
                  <TableCell
                    sx={{ ...CellStyle, maxWidth: "100px" }}
                    align="left"
                  >
                    To
                  </TableCell>
                  <TableCell
                    sx={{ ...CellStyle, maxWidth: "40px" }}
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
                {result.history?.length == 0 && (
                  <TableRow sx={{ height: "200px" }}>
                    <TableCell align="center" colSpan={8}>
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
                      {data.approver?.name || " - "}
                    </TableCell>
                    <TableCell align="left" sx={Celllstyle2}>
                      {data.from
                        ? moment(data.from).format("DD/MM/YYYY")
                        : " - "}
                    </TableCell>
                    <TableCell align="left" sx={Celllstyle2}>
                      {data.to ? moment(data.to).format("DD/MM/YYYY") : " - "}
                    </TableCell>
                    <TableCell align="left" sx={Celllstyle2}>
                      {data.hours || " - "}
                    </TableCell>
                    <TableCell align="left" sx={Celllstyle2}>
                      <span
                        style={
                          data.status === "PENDING"
                            ? PendingStyle
                            : ApprovedStyles
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
          {/* modal applying leaves  */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
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
                  {/* <SearchBox style={{ marginBottom: "16px" }}>
                    <SearchIcon src="/images/icons/searchIcon.svg" />
                    <SearchInput
                      type="text"
                      placeholder="Search..."
                    ></SearchInput>
                  </SearchBox> */}
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
                            const endDate = new Date(getValues("to"));
                            const startDate = new Date(e.target.value);
                            if (startDate >= endDate && endDate) {
                              setError("to", {
                                type: "custom",
                                message: "Must not be earlier than Start Date",
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
                              <Option value={data._id}>{data.name}</Option>
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
                      <Input
                        type="text"
                        readOnly={update}
                        {...register("requesterComment", {
                          // required: {
                          //   value: true,
                          //   message: "Required",
                          // },
                        })}
                      />
                      <Errors> {errors.requesterComment?.message} </Errors>
                    </FlexColumnForm>
                  </FlexContaierForm>
                  <FlexContaierForm>
                    <FlexColumnForm>
                      <InputLabel>
                        Send Leave Request to <InputSpan>*</InputSpan>
                      </InputLabel>
                      <Controller
                        name="approver"
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
                      {<Errors>{errors.approver?.message}</Errors>}
                    </FlexColumnForm>
                  </FlexContaierForm>
                  {!update ? (
                    <ButtonBlue type="submit"> Submit</ButtonBlue>
                  ) : (
                    <span
                      style={
                        rows[0].status === "Pending"
                          ? PendingStyle
                          : ApprovedStyles
                      }
                    >
                      {" "}
                      {rows[0].status}{" "}
                    </span>
                  )}
                </ModalFormContainer>
              </form>
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
        </MainBodyContainer>
      )}
      {/* <DevTool control={control} /> */}
    </>
  );
};

export default EVLeaveHistory;
