import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import httpClient from "../api/httpClient";
import { toast } from "react-toastify";
import DeleteModal from "../Modals/DeleteModal";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useLocation } from "react-router";
import API_URLS from "../constants/apiUrls";
import CommenDashHeader from "../Dashboard/CommenDashHeader";
import Pagination from "@mui/material/Pagination";
import ROLES from "../constants/roles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useForm } from "react-hook-form";

import {
  AddNewButton,
  ModalUpperDiv,
  ModalHeading,
  ModalIcon,
  ModalUpperMid,
  ModalBottom,
  CancelButton,
  Input,
  TextArea,
  Errors,
  InputPara,
} from "./DepartmentsStyles";
import {
  InputLabel,
  InputSpan,
  PaginationDiv,
  DisciplinaryHeading,
  DisciplinaryDiv,
  ActionIcons,
  ActionIconDiv,
} from "../Disciplinary/DisciplinaryStyles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "44.6rem",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 45,
  // padding: "2rem 0rem",
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
const Departments = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const [userType, setUserType] = useState("");
  //Delete Modal Delete
  const [openDelete, setOpenDelete] = useState(false);
  const HandleOpenDelete = () => setOpenDelete(true);
  const HandleCloseDelete = () => setOpenDelete(false);
  const [detailsLength, setDetailsLength] = useState(500);

  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const FilterData = [
    "All",
    "Full-time Perm",
    "Full-time",
    "Part-time",
    "Contract",
    "Term",
    "Students",
    "Other",
  ];
  // const TempData = [1, 2, 3, 4, 5];
  const [searchValue, setSearchValue] = useState("");

  const HandleSearchCahnge = (data) => {
    setSearchValue(data);
  };
  const [departmentData, setDepartmentData] = useState([]);
  const [Id, setId] = useState("");

  const [page, setPage] = useState(1);
  const HandleChangePage = (event, value) => {
    setPage(value);
  };
  const [update, setUpdate] = useState(false);

  const GetDepartments = (role) => {
    setIsLoading(true);
    var url = "";
    if (role === ROLES.SUPER_ADMIN) {
      url = API_URLS.getSADpartments
        .replace("searchValue", searchValue)
        .replace("Page", page);
    } else {
      url = API_URLS.getDpartments
        .replace("Page", page)
        .replace("searchValue", searchValue);
    }

    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setResult(result);
          setDepartmentData(result.departments);
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
    if (location.pathname.indexOf("manager") > -1) {
      setUserType(ROLES.MANAGER);
      GetDepartments(ROLES.MANAGER);
    } else if (location.pathname.indexOf("hr") > -1) {
      setUserType(ROLES.HR);
      GetDepartments(ROLES.HR);
    } else if (location.pathname.indexOf("user") > -1) {
      setUserType(ROLES.EMPLOYEE);
      GetDepartments(ROLES.EMPLOYEE);
    } else if (location.pathname.indexOf("organization-admin") > -1) {
      setUserType(ROLES.ORG_ADMIN);
      GetDepartments(ROLES.ORG_ADMIN);
    } else if (location.pathname.indexOf("super-admin") > -1) {
      setUserType(ROLES.SUPER_ADMIN);
      GetDepartments(ROLES.SUPER_ADMIN);
    }
  }, [page, searchValue]);

  const HandleSubmit = (data) => {
    if (userType === ROLES.SUPER_ADMIN) {
      data.isDefault = true;
    }
    let dataCopy = data;

    let url = API_URLS.createDepartments;

    setIsLoading(true);

    httpClient({
      method: "post",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result?.department) {
          HandleClose();
          reset();
          toast.success(result.message, {
            className: "toast",
          });
          GetDepartments(userType);
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
  const HandleUpdate = (data) => {
    let url = API_URLS.updateDepartments.replace(":id", Id);
    if (userType === ROLES.SUPER_ADMIN) {
      data.isDefault = true;
    }

    let dataCopy = data;

    setIsLoading(true);

    httpClient({
      method: "put",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result?.department) {
          GetDepartments(userType);
          setId("");
          setUpdate(false);
          HandleClose();
          reset();
          toast.success(result.message, {
            className: "toast",
          }); //Departments Updated Successfully");
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
  const HandleDelete = () => {
    setIsLoading(true);
    let url = API_URLS.deleteDepartments.replace(":id", Id);
    httpClient({
      method: "put",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          // HandleOpenThanks();
          GetDepartments(userType);
          setId("");
          HandleCloseDelete();

          toast.success(result.message, {
            className: "toast",
          }); //Entry Deleted successfully");
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
  const {
    register,
    clearErrors,
    handleSubmit,
    reset,
    formState: { errors },
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
    } else if (update && isEmptyObject(errors)) {
      HandleUpdate(data);
    }
  };
  const [open, setOpen] = useState(false);
  const HandleOpen = () => setOpen(true);
  const HandleClose = () => {
    setOpen(false);
    setDetailsLength(500);
    clearErrors();
    reset({});
  };
  const HandleUpdateAction = (data) => {
    setUpdate(true);
    setId(data._id);
    setDetailsLength(500 - data?.description?.length);
    reset({ name: data.name, description: data.description });
    HandleOpen();
  };
  const HandleOpenAddNewAction = () => {
    setUpdate(false);
    HandleOpen();
    reset({});
    clearErrors();
    setDetailsLength(500);
  };
  return (
    <div style={{ height: "100%" }}>
      <>
        <CommenDashHeader onSearch={HandleSearchCahnge} text="Departments" />

        <DisciplinaryDiv>
          <DisciplinaryHeading>Departments</DisciplinaryHeading>
          {/* <DepartmentFilterdiv>
            {FilterData.map((data) => (
              <DepartmentFilterButton>{data}</DepartmentFilterButton>
            ))}
          </DepartmentFilterdiv> */}
          <AddNewButton onClick={() => HandleOpenAddNewAction()}>
            Add New
          </AddNewButton>
          <Modal
            open={open}
            sx={{
              backgroundColor: "rgb(27, 27, 27, 0.75)",
              backdropFilter: "blur(8px)",
            }}
            // onClose={HandleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {isLoading ? (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    height: "44.1rem",
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
                  <ModalUpperDiv>
                    <ModalHeading>
                      {!update ? "Add Department" : "Update Department"}
                    </ModalHeading>
                    <ModalIcon
                      onClick={() => {
                        HandleClose();
                        setUpdate(false);
                        clearErrors();
                        reset({});
                      }}
                      src="/images/icons/Alert-Circle.svg"
                    />
                  </ModalUpperDiv>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalUpperMid>
                      <InputLabel>
                        Department Name <InputSpan>*</InputSpan>
                      </InputLabel>
                      <Input
                        placeholder="Department Name"
                        {...register("name", {
                          required: {
                            value: true,
                            message: "Required",
                          },
                        })}
                        type="text"
                      />
                      {errors.name && <Errors>{errors.name?.message}</Errors>}
                      <InputLabel>
                        Description <InputSpan>*</InputSpan>
                      </InputLabel>
                      <TextArea
                        type="text"
                        {...register("description", {
                          required: {
                            value: true,
                            message: "Required",
                          },
                          maxLength: {
                            value: 500,
                            message: "Details exceeds 500 characters ",
                          },
                          // minLength: {
                          //   value: 10,
                          //   message: "Atleast write  10 characters ",
                          // },
                          onChange: (value) => {
                            setDetailsLength(500 - value.target.value.length);
                          },
                        })}
                      />
                      <InputPara>
                        {" "}
                        {<Errors>{errors.description?.message}</Errors>}{" "}
                        <span style={{ justifySelf: "flex-end" }}>
                          {" "}
                          {detailsLength > -1 ? detailsLength : 0} characters
                          left
                        </span>
                      </InputPara>
                    </ModalUpperMid>
                    <ModalBottom>
                      {!update ? (
                        <AddNewButton type="submit" disabled={isLoading}>
                          Submit
                        </AddNewButton>
                      ) : (
                        <AddNewButton type="submit" disabled={isLoading}>
                          Update
                        </AddNewButton>
                      )}
                    </ModalBottom>
                  </form>
                </>
              )}
            </Box>
          </Modal>
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
                      style={{ width: "2rem" }}
                    >
                      Sr&nbsp;No.
                    </TableCell>
                    <TableCell
                      sx={CellHeadStyles}
                      style={{ minWidth: "20rem" }}
                      align="left"
                    >
                      Department Name
                    </TableCell>
                    <TableCell
                      sx={CellHeadStyles}
                      style={{ minWidth: "45rem" }}
                      align="left"
                    >
                      Description
                    </TableCell>

                    <TableCell
                      sx={CellHeadStyles}
                      style={{ minWidth: "10rem" }}
                      align="left"
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {!departmentData?.length && (
                    <TableRow sx={{ height: "20rem" }}>
                      <TableCell align="center" colSpan={4} sx={CellStyle2}>
                        No department found
                      </TableCell>
                    </TableRow>
                  )}
                  {departmentData?.map((data, index) => (
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
                        {index + 1}
                      </TableCell>
                      <TableCell sx={CellStyle} align="left">
                        {data.name}
                      </TableCell>
                      <TableCell sx={CellStyle2} align="left">
                        {data.description}
                      </TableCell>
                      <TableCell sx={CellStyle2} align="left">
                        {" "}
                        <ActionIconDiv>
                          <ActionIcons
                            onClick={() => {
                              HandleUpdateAction(data);
                            }}
                            src="/images/icons/Pendown.svg"
                          />
                          <ActionIcons
                            onClick={() => {
                              HandleOpenDelete();
                              setId(data._id);
                            }}
                            src="/images/icons/Trash-2.svg"
                          />
                        </ActionIconDiv>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {departmentData.length === 0 && (
              <div
                style={{
                  width: "100%",
                  height: "50rem",
                  textAlign: "center",
                  margin: "10rem auto",
                }}
              >
                No departments found
              </div>
            )}

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

      {/* Delete Modal  */}
      <DeleteModal
        openDelete={openDelete}
        HandleCloseDelete={HandleCloseDelete}
        HandleDelete={HandleDelete}
        message="Are you sure you want to delete this department?"
        isLoading={isLoading}
      />
    </div>
  );
};

export default Departments;
