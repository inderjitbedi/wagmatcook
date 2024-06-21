import React, { useState, useEffect } from "react";
import {
  LeaveDiv,
  TabelDiv,
  TabelDarkPara,
  TabelParaContainer,
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
  Input,
  FlexContaierForm,
  FlexColumnForm,
  InputLabel,
  Errors,
  TextArea,
} from "./ViewEmployeeStyle";
import { useForm, Controller } from "react-hook-form";

import { ButtonBlue } from "../AddEmployee/AddEmployeeStyles";
import { PaginationDiv } from "../../Disciplinary/DisciplinaryStyles";
import ROLES from "../../constants/roles";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import { RotatingLines, ThreeDots } from "react-loader-spinner";
import httpClient from "../../api/httpClient";
import { toast } from "react-toastify";
import API_URLS from "../../constants/apiUrls";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";

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
  height: "40rem",
  overflowY: "scroll",
};

const LeaveAdjustmentTable = ({
  userType,
  userstyle,
  isAccount,
  leaveBalance,
  GetLeaveAlloaction,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { employeeid } = useParams();
  const [leaveAdjustment, setLeaveAdjustment] = useState([]);
  const [selectedLeaveBalance, setSelectedLeaveBalance] = useState(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    clearErrors();
    reset({});
    setOpen(false);
    setSelectedLeaveBalance(null);
  };
  const [page, setPage] = useState(1);
  const HandleChangePage = (event, value) => {
    setPage(value);
  };
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    reset,
    setError,
    clearErrors,
  } = useForm({ mode: "all" });
  const onSubmit = (data) => {
    if (Object.keys(errors).length === 0) {
      HandleSubmit(data);
    }
  };
  const HandleSubmit = (data) => {
    // e.preventDefault();
    setIsLoading(true);
    let url = API_URLS.LeaveAdjustment.replace(":id", employeeid);

    let dataCopy = data;
    httpClient({
      method: "put",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          handleClose();
          reset();
          GetLeaveAlloaction();
          GetLeaveAdjustments();
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
  const GetLeaveAdjustments = () => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      // GetLeavesType();
      let url = API_URLS.LeaveAdjustment.replace(":id", employeeid).replace(
        "Page",
        page
      );
      httpClient({
        method: "get",
        url,
      })
        .then(({ result, error }) => {
          if (result) {
            setLeaveAdjustment(result);
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
    GetLeaveAdjustments();
  }, [page]);
  console.log("errors in leave adjustment:", errors);
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
        <>
          <LeaveDiv style={userType === ROLES.EMPLOYEE ? userstyle : {}}>
            Leave Adjustment
            {(userType === ROLES.HR ||
              userType === ROLES.ORG_ADMIN ||
              userType === ROLES.PAYROLL) && (
              <ButtonBlue onClick={() => handleOpen()}>Adjust</ButtonBlue>
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
                    Adjusted&nbsp;by
                  </TableCell>

                  <TableCell
                    sx={{ ...CellStyle, maxWidth: "40rem" }}
                    align="left"
                  >
                    Hours
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!leaveAdjustment.leaveAdjustment?.length && (
                  <TableRow sx={{ height: "20rem" }}>
                    <TableCell align="center" sx={Celllstyle2} colSpan={4}>
                      No Leave Adjustment Found
                    </TableCell>
                  </TableRow>
                )}
                {leaveAdjustment?.leaveAdjustment?.map((data, index) => (
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
                      {data.isAdjustedBySystem
                        ? "System"
                        : (data.adjustedBy?.personalInfo?.firstName
                            ? data.adjustedBy?.personalInfo?.firstName
                            : " - ") +
                          " " +
                          (data.adjustedBy?.personalInfo?.lastName
                            ? data.adjustedBy?.personalInfo?.lastName
                            : " ")}
                    </TableCell>

                    <TableCell align="left" sx={Celllstyle2}>
                      <span
                        style={{
                          color:
                            data.nature !== "subtraction"
                              ? "#0D7D0B"
                              : "#EA4335",
                        }}
                      >
                        {data.nature === "subtraction" ? "-" : "+"}
                        {data.numberOfHr || "0"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {leaveAdjustment?.totalPages > 1 && (
            <PaginationDiv>
              <Pagination
                count={leaveAdjustment?.totalPages}
                variant="outlined"
                shape="rounded"
                page={page}
                onChange={HandleChangePage}
              />
            </PaginationDiv>
          )}
        </>
      )}

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
                <ModalHeading>Leave Adjustment</ModalHeading>
                <ModalIcon
                  onClick={handleClose}
                  src="/images/icons/Alert-Circle.svg"
                />
              </ModalContainer>

              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalFormContainer>
                  <FlexColumnForm>
                    <InputLabel>
                      Leave Type <InputSpan>*</InputSpan>
                    </InputLabel>

                    <Controller
                      name="allocationId"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Required",
                        },
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Select
                          value={value}
                          onChange={(e) => {
                            onChange(e);
                            const selectedValue = e.target.value;
                            setValue("allocationId", selectedValue);
                            const selectedLeave = leaveBalance.find(
                              (item) => item._id === selectedValue
                            );
                            if (selectedLeave) {
                              setSelectedLeaveBalance(selectedLeave.balance);
                            } else {
                              setSelectedLeaveBalance(null);
                            }
                          }}
                        >
                          <Option value="" disabled selected>
                            Select
                          </Option>
                          {leaveBalance?.map((data) => (
                            <Option value={data._id}>
                              {data.leaveType?.name}
                            </Option>
                          ))}
                        </Select>
                      )}
                    />
                    {errors.allocationId && (
                      <Errors>{errors.allocationId?.message}</Errors>
                    )}
                  </FlexColumnForm>
                  {selectedLeaveBalance && (
                    <FlexColumnForm>
                      <InputLabel>Balance</InputLabel>
                      <Input
                        type="text"
                        readOnly={true}
                        value={selectedLeaveBalance}
                      />
                    </FlexColumnForm>
                  )}

                  <FlexColumnForm>
                    <InputLabel>
                      Adjustment Type <InputSpan>*</InputSpan>
                    </InputLabel>

                    <Controller
                      name="nature"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Required",
                        },
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Select
                          value={value}
                          onChange={(e) => {
                            onChange(e);
                            const adType = e.target.value;
                            setValue("nature", e.target.value);
                            const Hrs = getValues("numberOfHr");
                            if (
                              adType === "subtraction" &&
                              selectedLeaveBalance <= Hrs
                            ) {
                              setError("numberOfHr", {
                                type: "manual",
                                message:
                                  "Number of hours cannot be greater than the selected leave balance",
                              });
                            } else {
                              clearErrors("numberOfHr");
                            }
                          }}
                        >
                          <Option value={null} disabled selected>
                            Select
                          </Option>
                          <Option value="addition">Addition</Option>

                          <Option value="subtraction">Subtraction</Option>
                        </Select>
                      )}
                    />
                    {errors.nature && <Errors>{errors.nature?.message}</Errors>}
                  </FlexColumnForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Hours <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="text"
                      // readOnly={update}
                      {...register("numberOfHr", {
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
                      onChange={(e) => {
                        const Hrs = e.target.value;
                        const adType = getValues("nature");

                        // Apply validation
                        if (
                          adType === "subtraction" &&
                          selectedLeaveBalance <= Hrs
                        ) {
                          setError("numberOfHr", {
                            type: "custom",
                            message:
                              "Number of hours cannot be greater than the selected leave balance",
                          });
                        } else {
                          clearErrors("numberOfHr");
                        }
                      }}
                    />
                    {errors.numberOfHr && (
                      <Errors>{errors.numberOfHr?.message}</Errors>
                    )}
                  </FlexColumnForm>

                  <ButtonBlue
                    type="submit"
                    style={{ marginTop: "2.5rem" }}
                    disabled={errors.numberOfHr}
                  >
                    Submit
                  </ButtonBlue>
                </ModalFormContainer>
              </form>
            </>
          )}
        </Box>
      </Modal>
    </>
    // leave adjustment modal
  );
};

export default LeaveAdjustmentTable;
