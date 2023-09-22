import React, { useState } from "react";
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openThanks, setOpenThanks] = useState(false);
  const handleOpenThanks = () => setOpenThanks(true);
  const handleCloseThanks = () => setOpenThanks(false);

  const [formData, setFormData] = useState([]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    setError,
    clearErrors,
  } = useForm({ mode: "all" });

  const onSubmit = (data) => {
    if (!errors) {
      setFormData(data);
      handleOpenThanks();
    }
    console.log("form submmited", data);
  };
  const HandleUpdateAction = (data) => {
    setUpdate(true);
    setId(data._id);
    setDetailsLength(500 - data?.description?.length);
    reset(data);
    handleOpen();
  };
  const HandleOpenAddNewAction = () => {
    handleOpen();
    reset({});
    clearErrors();
    setDetailsLength(500);
  };
  return (
    <MainBodyContainer>
      <FlexSpaceBetween style={{ alignItems: "center" }}>
        <PersonalInfo>
          <PersonalImg src="/images/User.jpg" />
          <FlexColumn style={{ gap: "5px" }}>
            <PersonalName>Hattie Watkins</PersonalName>
            <PersonalTitle>Team Manager</PersonalTitle>
            <PersonalDepartment>Design Department</PersonalDepartment>
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
              <TableCell sx={{ ...CellStyle, maxWidth: "128" }} align="left">
                Leave&nbsp;Type
              </TableCell>
              <TableCell sx={{ ...CellStyle, maxWidth: "184px" }} align="left">
                Applied&nbsp;to
              </TableCell>
              <TableCell sx={{ ...CellStyle, maxWidth: "100px" }} align="left">
                from
              </TableCell>
              <TableCell sx={{ ...CellStyle, maxWidth: "100px" }} align="left">
                To
              </TableCell>
              <TableCell sx={{ ...CellStyle, maxWidth: "40px" }} align="left">
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
            {rows.map((data, index) => (
              <TableRow
                key={data.name}
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
                    <TabelImg src="/images/Oval Copy 2.jpg" />
                    <TabelParaContainer>
                      <TabelDarkPara>{data.name}</TabelDarkPara>
                    </TabelParaContainer>
                  </TabelDiv>
                </TableCell>
                <TableCell align="left" sx={Celllstyle2}>
                  {data.employeeid}
                </TableCell>
                <TableCell align="left" sx={Celllstyle2}>
                  {data.phone}
                </TableCell>
                <TableCell align="left" sx={Celllstyle2}>
                  {data.joindate}
                </TableCell>
                <TableCell align="left" sx={Celllstyle2}>
                  {data.role}
                </TableCell>
                <TableCell align="left" sx={Celllstyle2}>
                  <span
                    style={
                      data.status === "Pending" ? PendingStyle : ApprovedStyles
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
              <SearchBox style={{ marginBottom: "16px" }}>
                <SearchIcon src="/images/icons/searchIcon.svg" />
                <SearchInput type="text" placeholder="Search..."></SearchInput>
              </SearchBox>
              <FlexContaierForm>
                <FlexColumnForm>
                  <InputLabel>
                    From <InputSpan>*</InputSpan>{" "}
                  </InputLabel>
                  <Input
                    type="date"
                    {...register("startDate", {
                      required: {
                        value: true,
                        message: "Required",
                      },
                      onChange: (e) => {
                        const endDate = new Date(getValues("endDate"));
                        const startDate = new Date(e.target.value);
                        if (startDate >= endDate && endDate) {
                          setError("endDate", {
                            type: "custom",
                            message: "Must not be earlier than Start Date",
                          });
                        } else {
                          setError("endDate", {
                            type: "custom",
                            message: "",
                          });
                        }
                      },
                    })}
                  />
                  {<Errors>{errors.startDate?.message}</Errors>}
                </FlexColumnForm>
                <FlexColumnForm>
                  <InputLabel>
                    To 
                  </InputLabel>
                  <Input
                    type="date"
                    {...register("endDate", {
                      // required: {
                      //   value: true,
                      //   message: " Required",
                      // },
                      validate: (fieldValue) => {
                        const startDate = new Date(getValues("startdate"));
                        const endDate = new Date(fieldValue);
                        if (startDate <= endDate && endDate) {
                          setError("endDate", {
                            type: "custom",
                            message:
                              "End date must not be earlier than start date   ",
                          });
                        } else {
                          setError("endDate", {
                            type: "custom",
                            message: "",
                          });
                        }
                      },
                    })}
                  />
                  {<Errors>{errors.endDate?.message}</Errors>}
                </FlexColumnForm>
              </FlexContaierForm>
              <FlexContaierForm>
                <FlexColumnForm>
                  <InputLabel>
                    Leave Type <InputSpan>*</InputSpan>{" "}
                  </InputLabel>
                  <Input
                    type="text"
                    {...register("type", {
                      required: {
                        value: true,
                        message: "Required",
                      },
                    })}
                  />
                  {<Errors>{errors.type?.message}</Errors>}
                </FlexColumnForm>
                <FlexColumnForm>
                  <InputLabel>
                    Hours <InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input
                    type="text"
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
                    })}
                  />
                  {<Errors>{errors.hours?.message}</Errors>}
                </FlexColumnForm>
              </FlexContaierForm>
              <FlexContaierForm>
                <FlexColumnForm>
                  <InputLabel>Description</InputLabel>
                  <Input type="text" name="firstname" />
                  <Errors></Errors>
                </FlexColumnForm>
              </FlexContaierForm>
              <FlexContaierForm>
                <FlexColumnForm>
                  <InputLabel>
                    Send Leave Request to <InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input
                    type="password"
                    {...register("reportTo", {
                      required: {
                        value: true,
                        message: "Required",
                      },
                    })}
                  />
                  {<Errors>{errors.reportTo?.message}</Errors>}
                </FlexColumnForm>
              </FlexContaierForm>
              {!update ? (
                <ButtonBlue type="submit">Submit</ButtonBlue>
              ) : (
                <span
                  style={
                    rows[0].status === "Pending" ? PendingStyle : ApprovedStyles
                  }
                >
                  {" "}
                  {rows[0].status}{" "}
                </span>
              )}{" "}
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
  );
};

export default EVLeaveHistory;
