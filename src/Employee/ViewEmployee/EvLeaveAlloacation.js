import React, { useState, useEffect } from "react";
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
import { RotatingLines, ThreeDots } from "react-loader-spinner";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import DeleteModal from "../../Modals/DeleteModal";
import httpClient from "../../api/httpClient";
import { toast } from "react-toastify";
import ROLES from "../../constants/roles";

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
  IconContainer,
  Select,
  Option,
} from "./ViewEmployeeStyle";
import API_URLS from "../../constants/apiUrls";
import CommenHeader from "./CommenHeader";

const CellStyle = {
  color: "#8F9BB3",
  padding: "1.6rem 8px",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "1.6rem",
};
const Celllstyle2 = {
  color: "#222B45",
  padding: "1.6rem 8px",
  fontSize: "1.4rem",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "1.5rem",
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "44.6rem",
  bgcolor: "background.paper",
  border: "1px solid #EFF4FA",
  boxShadow: 45,
  padding: "2rem 0rem",
  borderRadius: "8px",
};
const EvLeaveAlloacation = () => {
  let API_URL = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const [userType, setUserType] = useState("");
  const [isAccount, setIsAccount] = useState(false);
  const [open, setOpen] = useState(false);
  const { employeeid } = useParams();
  const Navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    clearErrors();
    reset({});
  };
  const [Id, setId] = useState("");
  const [update, setUpdate] = useState(false);
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [leaveType, setLeaveType] = useState([]);
  const rows = [1, 2, 3, 4];
  const [openDelete, setOpenDelete] = useState(false);
  const HandleOpenDelete = () => setOpenDelete(true);
  const HandleCloseDelete = () => setOpenDelete(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    clearErrors,
    setValue,
    setError,
  } = useForm({
    mode: "all",
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
    if (isEmptyObject(errors) && !update) {
      HandleSubmit(data);
    } else if (update) {
      HandleUpdate(data);
    }
  };
  const GetLeavesType = () => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      let url = API_URLS.getEmployeeLeaveList.replace(
        ":employeeid",
        employeeid
      );
      httpClient({
        method: "get",
        url,
      })
        .then(({ result, error }) => {
          if (result) {
            setLeaveType(result.leaveTypes);
            resolve(result);
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
  const GetLeaveAllocation = () => {
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
  const HandleSubmit = (data) => {
    // e.preventDefault();
    setIsLoading(true);
    let url = API_URLS.submitEmployeeAllocation.replace(
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
          toast.success(result.message, {
            className: "toast",
          });
          GetLeaveAllocation();
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
  const HandleDelete = () => {
    setIsDeleting(true);
    let url = API_URLS.deleteEmployeeAllocation
      .replace(":employeeid", employeeid)
      .replace(":id", Id);
    httpClient({
      method: "put",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          HandleCloseDelete();
          setId("");
          GetLeaveAllocation();
          toast.success(result.message, {
            className: "toast",
          }); //Benefit deleted successfully.");
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error Deleting Benefits. Please try again.");
        setIsDeleting(false);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };
  const HandleUpdate = (data) => {
    setIsLoading(true);
    let dataCopy = data;

    let url = API_URLS.getEmployeeAllocation
      .replace(":employeeid", employeeid)
      .replace(":id", Id);

    httpClient({
      method: "put",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          setId("");
          GetLeaveAllocation();
          setUpdate(false);
          handleClose();
          reset();

          toast.success(result.message, {
            className: "toast",
          }); //Entry Updated Successfully");
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error Updating Benefits . Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    Promise.all([GetLeavesType(), GetLeaveAllocation()]);

    if (location.pathname.indexOf("manager") > -1) {
      setUserType(ROLES.MANAGER);
    } else if (location.pathname.indexOf("hr") > -1) {
      setUserType(ROLES.HR);
    } else if (location.pathname.indexOf("user") > -1) {
      setUserType(ROLES.EMPLOYEE);
    }
    if (location.pathname.indexOf("account") > -1) {
      setIsAccount(true);
    }
  }, []);
  const HandleUpdateAction = (data) => {
    setUpdate(true);
    setId(data._id);
    reset({
      leaveType: data.leaveType,
      totalAllocation: data.totalAllocation,
    });
    handleOpen();
  };
  const HandleOpenAddNewAction = () => {
    setUpdate(false);
    handleOpen();
    reset({});
    clearErrors();
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
          <FlexSpaceBetween style={{ alignItems: "center" }}>
            {/* <CommenHeader employeeid={employeeid} /> */}
          </FlexSpaceBetween>
          <LeaveDiv>
            Leave Alloactions
            {userType === ROLES.EMPLOYEE ? (
              " "
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
                    Total&nbsp;Allocation (Hrs)
                  </TableCell>

                  <TableCell sx={{ ...CellStyle }} align="left">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { !result?.allocations?.length && (
                  <TableRow sx={{ height: "20rem" }}>
                    <TableCell align="center" sx={Celllstyle2} colSpan={4}>
                      No leave allocations found
                    </TableCell>
                  </TableRow>
                )}
                {result?.allocations?.map((data, index) => (
                  <TableRow
                    key={data.name}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                    style={{ background: "#fff" }}
                  >
                    <TableCell align="left" sx={Celllstyle2}>
                      {index + 1}
                    </TableCell>
                    <TableCell align="left" sx={Celllstyle2}>
                      {data?.leaveType?.name}
                    </TableCell>
                    <TableCell align="left" sx={Celllstyle2}>
                      {data.totalAllocation}
                    </TableCell>

                    <TableCell align="center" sx={Celllstyle2}>
                      <IconContainer>
                        {/* {userType === ROLES.EMPLOYEE || isAccount ? (
                          ""
                        ) : (
                          <Icons
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              HandleUpdateAction(data);
                            }}
                            src="/images/icons/Pendown.svg"
                          />
                        )} */}
                        {userType === ROLES.EMPLOYEE ||
                        userType === ROLES.MANAGER ||
                        isAccount ? (
                          " "
                        ) : (
                          <Icons
                            onClick={() => {
                              setId(data._id);
                              HandleOpenDelete();
                            }}
                            src="/images/icons/Trash-2.svg"
                          />
                        )}
                      </IconContainer>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

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
                      {!update
                        ? " Add Leave Alloaction"
                        : "Update Leaves Alloaction"}
                    </ModalHeading>
                    <ModalIcon
                      onClick={handleClose}
                      src="/images/icons/Alert-Circle.svg"
                    />
                  </ModalContainer>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalFormContainer>
                      <FlexContaierForm>
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
                              <Select {...field}>
                                <Option>Select</Option>
                                {leaveType?.map((data) => (
                                  <Option value={data._id}>{data.name}</Option>
                                ))}
                              </Select>
                            )}
                          />
                          {<Errors>{errors.leaveType?.message}</Errors>}
                        </FlexColumnForm>
                      </FlexContaierForm>
                      <FlexColumnForm>
                        <InputLabel>
                          Total Allocation (Hrs) <InputSpan>*</InputSpan>
                        </InputLabel>
                        <Input
                          type="text"
                          {...register("totalAllocation", {
                            required: {
                              value: true,
                              message: "Required",
                            },
                            pattern: {
                              value: /^[+]?\d+(\.\d+)?$/,
                              message: "Please enter valid Allocation",
                            },
                            validate: (fieldValue) => {
                              return (
                                (!isNaN(parseFloat(fieldValue)) &&
                                  isFinite(fieldValue)) ||
                                " Must be a number "
                              );
                            },
                          })}
                        />
                        {<Errors>{errors.totalAllocation?.message}</Errors>}
                      </FlexColumnForm>
                      <ButtonBlue type="submit">
                        {!update ? "Submit" : "Update"}
                      </ButtonBlue>
                    </ModalFormContainer>
                  </form>
                </>
              )}
            </Box>
          </Modal>
        </MainBodyContainer>
      )}
      <DeleteModal
        openDelete={openDelete}
        message="Are you sure you want to delete this 
        leave Allocation?"
        HandleCloseDelete={HandleCloseDelete}
        isLoading={isDeleting}
        HandleDelete={HandleDelete}
      />
    </>
  );
};

export default EvLeaveAlloacation;
