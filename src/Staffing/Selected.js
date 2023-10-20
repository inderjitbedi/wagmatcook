import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import Modal from "@mui/material/Modal";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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
import InputMask from "react-input-mask";

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
const Selected = () => {
  const Navigate = useNavigate();
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
  const [userType, setUserType] = useState("");
  const [departmentData, setDepartmentData] = useState([]);
  const HandleChangePage = (event, value) => {
    setPage(value);
  };
  const {
    register,
    control,
    clearErrors,
    handleSubmit,
    reset,
    setError,
    setValue,
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
      <DisciplinaryDiv>
        <DisciplinaryHeading>Selected List</DisciplinaryHeading>
      </DisciplinaryDiv>
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
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow
                  sx={{
                    background: "#FBFBFB",
                  }}
                >
                  <TableCell
                    sx={CellHeadStyles}
                    align="left"
                    style={{ width: "1rem" }}
                  >
                    Sr.&nbsp;No.
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "12rem" }}
                    align="left"
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "6rem" }}
                    align="left"
                  >
                    Email
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "9rem" }}
                    align="left"
                  >
                    Phone
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "12rem" }}
                    align="left"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {!jobPosting?.length && (
                  <TableRow sx={{ height: "20rem" }}>
                    <TableCell align="center" sx={CellStyle2} colSpan={7}>
                      No job posting found
                    </TableCell>
                  </TableRow>
                )}
                {jobPosting?.map((data, index) => (
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                      background: "#fff",
                    }}
                    key={data._id}
                  >
                    <TableCell sx={CellStyle2} align="left">
                      <MenuIconDiv>{index + 1}</MenuIconDiv>
                    </TableCell>
                    <TableCell sx={CellStyle} align="left">
                      {data.title || " - "}
                    </TableCell>
                    <TableCell sx={CellStyle2} align="left">
                      {data.duration}
                    </TableCell>
                    <TableCell sx={CellStyle} align="left">
                      {data.department}
                    </TableCell>
                    <TableCell sx={CellStyle2} align="left">
                      {" "}
                      <ActionIconDiv>
                        {userType === ROLES.EMPLOYEE ? (
                          " "
                        ) : (
                          <ActionIcons
                            onClick={() => {
                              HandleUpdateAction(data);
                            }}
                            src="/images/icons/Pendown.svg"
                          />
                        )}
                        {userType === ROLES.EMPLOYEE ? (
                          " "
                        ) : (
                          <ActionIcons
                            onClick={() => {
                              HandleOpenDelete();
                              setId(data._id);
                            }}
                            src="/images/icons/Trash-2.svg"
                          />
                        )}
                      </ActionIconDiv>
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
        </>
      )}
    </>
  );
};

export default Selected;
