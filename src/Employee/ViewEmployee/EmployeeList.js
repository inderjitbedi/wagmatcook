import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Moment from "react-moment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate, useLocation } from "react-router";
import DeleteModal from "../../Modals/DeleteModal";
import AddNewEmployeeModal from "../AddEmployee/AddNewEmployeeModal";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import httpClient from "../../api/httpClient";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import ROLES from "../../constants/roles";
import moment from "moment";
import { useForm, Controller } from "react-hook-form";
import CommenDashHeader from "../../Dashboard/CommenDashHeader";
import API_URLS from "../../constants/apiUrls";
import Pagination from "@mui/material/Pagination";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BiSortAlt2 } from "react-icons/bi";
import { FaLongArrowAltDown } from "react-icons/fa";
import { FaLongArrowAltUp } from "react-icons/fa";
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
  DepartmentFilterButton,
  AddNewButton,
  HeaderDiv,
  HeaderTitle,
  IconContainer,
  Icons,
  TabelDarkPara,
  TabelLightPara,
  TabelImg,
  TabelDiv,
  TabelParaContainer,
  Input,
  ButtonBlue,
  FlexContaierForm,
  FlexColumnForm,
  InputLabel,
  Errors,
  ModalContainer,
  ModalHeading,
  ModalIcon,
  ModalFormContainer,
} from "./ViewEmployeeStyle";
import { PaginationDiv } from "../../Disciplinary/DisciplinaryStyles";
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
const SortArrow = {
  fontSize: "2rem",
};
const UPDownArrow = {
  color: "#222B45",
};
const UnderlineHoverEffect = styled.div`
  cursor: pointer;
  display: flex;
  gap: 0.8rem;
  align-items: center;
  &:hover {
    ${TabelDarkPara} {
      text-decoration: underline;
    }
  }
`;
const Employee = () => {
  let API_URL = process.env.REACT_APP_API_URL;

  const Navigate = useNavigate();
  const location = useLocation();
  const [userType, setUserType] = useState("");
  const [user, setUser] = useState();

  const [searchValue, setSearchValue] = useState("");
  const [delayedSearchValue, setDelayedSearchValue] = useState("");

  const HandleSearchCahnge = (e) => {
    setSearchValue(e.target.value);
  };
  useEffect(() => {
    const delayDuration = 1500;

    const searchTimer = setTimeout(() => {
      setDelayedSearchValue(searchValue);
    }, delayDuration);

    return () => clearTimeout(searchTimer);
  }, [searchValue]);

  const [openDelete, setOpenDelete] = useState(false);
  const HandleOpenDelete = () => setOpenDelete(true);
  const HandleCloseDelete = () => setOpenDelete(false);

  const [openEmployee, setOpenEmployee] = useState(false);
  const HandleOpenEmployee = () => setOpenEmployee(true);
  const HandleCloseEmployee = () => setOpenEmployee(false);
  const [page, setPage] = useState(1);
  const HandleChangePage = (event, value) => {
    setPage(value);
  };
  const [openWelcome, setOpenWelcome] = useState(false);
  const HandleOpenWelcome = () => setOpenWelcome(true);
  const HandleCloseWelcome = () => {
    reset({});
    clearErrors();
    setOpenWelcome(false);
  };
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const HandleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prevOrder) => {
        switch (prevOrder) {
          case "asc":
            return "desc";
          case "desc":
            return "";
          default:
            return "asc"; // Start with ascending if unsorted
        }
      });
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };
  const {
    register,
    clearErrors,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });

  //variable to fetch and get api data
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);

  // get employees
  const GetEmployees = (user) => {
    setIsLoading(true);

    let url = API_URLS.getEmployeeList
      .replace("Page", page)
      .replace("searchValue", searchValue);
    const sortField =
      sortBy === "name"
        ? "personalInfo.firstName"
        : sortBy === "department"
        ? "departmentInfo.name"
        : "role";

    const sortOrders = sortOrder === "asc" ? 1 : sortOrder === "desc" ? -1 : 0;

    url += `&sortBy=${sortField}&sortOrder=${sortOrders}`;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setResult(result);
          const filterData = result?.employees.filter(
            (data) => data._id !== user?._id
          );
          setEmployeeList(filterData);
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        // console.error("Error:", error);
        toast.error("Error creating Employee. Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const GetEmployeesManager = (user) => {
    setIsLoading(true);

    let url = API_URLS.getManagerEmployeeList
      .replace("Page", page)
      .replace("searchValue", searchValue);
    const sortField =
      sortBy === "name"
        ? "personalInfo.firstName"
        : sortBy === "department"
        ? "departmentInfo.name"
        : "role";

    const sortOrders = sortOrder === "asc" ? 1 : sortOrder === "desc" ? -1 : 0;

    url += `&sortBy=${sortField}&sortOrder=${sortOrders}`;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setResult(result);
          const filterData = result?.employees.filter(
            (data) => data._id !== user?._id
          );
          setEmployeeList(filterData);
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        // console.error("Error:", error);
        toast.error("Error creating Employee. Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // send welocme email

  useEffect(() => {
    if (location.pathname.indexOf("manager") > -1) {
      setUserType(ROLES.MANAGER);
    } else if (location.pathname.indexOf("hr") > -1) {
      setUserType(ROLES.HR);
    } else if (location.pathname.indexOf("payroll") > -1) {
      setUserType(ROLES.PAYROLL);
    } else if (location.pathname.indexOf("user") > -1) {
      setUserType(ROLES.EMPLOYEE);
    } else if (location.pathname.indexOf("organization-admin") > -1) {
      setUserType(ROLES.ORG_ADMIN);
    }
    let user = localStorage.getItem("user");

    if (user) {
      let parsedUser = JSON.parse(user);
      setUser(parsedUser);

      if (parsedUser.role == "MANAGER") {
        GetEmployeesManager(parsedUser);
      } else {
        GetEmployees(parsedUser);
      }
    }
  }, [page, delayedSearchValue, sortBy, sortOrder]);
  const HandleSubmitData = (data) => {
    return data;
  };
  // //console.log("submit data ", HandleSubmitData());
  // Add New Employee Post api  user name and email

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
      // HandleAddEmployee(data);
    }
  };
  const [anchorEl, setAnchorEl] = useState(false);
  const openMenu = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const HandleLogout = () => {
    localStorage.clear();
    handleCloseMenu();
    Navigate("/");
  };
  const HandleDelete = () => {
    setIsLoading(true);
    let url = API_URLS.deleteEmployeeList.replace("Id", Id);
    httpClient({
      method: "put",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          HandleCloseDelete();
          GetEmployees();
          toast.success(result.message, {
            className: "toast",
          }); //Entry Deleted successfully");
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        // console.error("Error:", error);
        toast.error("Error in deleting employee. Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const [Id, setId] = useState("");

  const HandleSearchCahnge2 = () => {};

  return (
    <>
      <CommenDashHeader onSearch={HandleSearchCahnge2} text="Employee" />

      <DepartmentFilterContainer>
        <DepartmentFilterdiv>
          {/* {FilterData.map((data) => (
            <DepartmentFilterButton>{data}</DepartmentFilterButton>
          ))} */}
        </DepartmentFilterdiv>

        {userType === ROLES.MANAGER || userType === ROLES.EMPLOYEE ? (
          " "
        ) : (
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            {userType === ROLES.ORG_ADMIN && (
              <AddNewButton
                onClick={() =>
                  Navigate("/organization-admin/employee/send-welcome")
                }
              >
                Send Welcome Emails
              </AddNewButton>
            )}
            {<AddNewButton onClick={HandleOpenEmployee}>Add New</AddNewButton>}
          </div>
        )}
      </DepartmentFilterContainer>
      <Modal
        open={openWelcome}
        sx={{
          backgroundColor: "rgb(27, 27, 27, 0.75)",
          backdropFilter: "blur(8px)",
        }}
        // onClose={() => {
        //   HandleCloseWelcome();
        //   clearErrors();
        //   reset();
        // }}
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
                <ModalHeading>Welcome New Employee</ModalHeading>
                <ModalIcon
                  onClick={() => {
                    HandleCloseWelcome();
                  }}
                  src="/images/icons/Alert-Circle.svg"
                />
              </ModalContainer>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalFormContainer>
                  <FlexContaierForm>
                    <FlexColumnForm>
                      <InputLabel>Email Address</InputLabel>
                      <Input
                        type="email"
                        {...register("email", {
                          required: {
                            value: true,
                            message: "Required",
                          },
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Please enter a valid email",
                          },
                        })}
                      />
                      {errors.email && (
                        <Errors> {errors.email?.message} </Errors>
                      )}
                    </FlexColumnForm>
                  </FlexContaierForm>

                  <ButtonBlue style={{ marginTop: "25px" }} type="submit">
                    Submit
                  </ButtonBlue>
                </ModalFormContainer>
              </form>
            </>
          )}
        </Box>
      </Modal>
      <HeaderDiv>
        <HeaderTitle>Employee List</HeaderTitle>
        <DashHeaderSearch>
          <SearchBox>
            <SearchInput
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => HandleSearchCahnge(e)}
            ></SearchInput>
            <SearchIcon src="/images/icons/searchIcon.svg" />
          </SearchBox>
        </DashHeaderSearch>
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
        <>
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
                    sx={{ ...CellStyle, minWidth: "8rem", cursor: "pointer" }}
                    align="left"
                    onClick={() => HandleSort("name")}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span
                        style={
                          result?.sortBy === "personalInfo.firstName"
                            ? result?.sortOrder
                              ? { color: "#222B45" }
                              : {}
                            : {}
                        }
                      >
                        {" "}
                        Name
                      </span>
                      {result?.sortBy === "personalInfo.firstName" ? (
                        result?.sortOrder === 1 ? (
                          <FaLongArrowAltUp style={UPDownArrow} />
                        ) : (
                          <FaLongArrowAltDown style={UPDownArrow} />
                        )
                      ) : (
                        <BiSortAlt2 style={SortArrow} />
                      )}
                    </div>
                  </TableCell>
                  <TableCell
                    sx={{ ...CellStyle, minWidth: "10rem", cursor: "pointer" }}
                    align="left"
                    onClick={() => HandleSort("department")}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span
                        style={
                          result?.sortBy === "departmentInfo.name"
                            ? result?.sortOrder
                              ? { color: "#222B45" }
                              : {}
                            : {}
                        }
                      >
                        {" "}
                        Department
                      </span>
                      {result?.sortBy === "departmentInfo.name" ? (
                        result?.sortOrder === 1 ? (
                          <FaLongArrowAltUp style={UPDownArrow} />
                        ) : (
                          <FaLongArrowAltDown style={UPDownArrow} />
                        )
                      ) : (
                        <BiSortAlt2 style={SortArrow} />
                      )}
                    </div>
                  </TableCell>
                  <TableCell
                    sx={{ ...CellStyle, maxWidth: "84px" }}
                    align="left"
                  >
                    Employee&nbsp;Id
                  </TableCell>
                  <TableCell
                    sx={{ ...CellStyle, maxWidth: "114px" }}
                    align="left"
                  >
                    Phone
                  </TableCell>
                  <TableCell
                    sx={{ ...CellStyle, maxWidth: "88px" }}
                    align="left"
                  >
                    Join&nbsp;Date
                  </TableCell>
                  <TableCell
                    sx={{ ...CellStyle, maxWidth: "105px", cursor: "pointer" }}
                    align="left"
                    onClick={() => HandleSort("role")}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span
                        style={
                          result?.sortBy === "role"
                            ? result?.sortOrder
                              ? { color: "#222B45" }
                              : {}
                            : {}
                        }
                      >
                        {" "}
                        Role
                      </span>
                      {result?.sortBy === "role" ? (
                        result?.sortOrder === 1 ? (
                          <FaLongArrowAltUp style={UPDownArrow} />
                        ) : (
                          <FaLongArrowAltDown style={UPDownArrow} />
                        )
                      ) : (
                        <BiSortAlt2 style={SortArrow} />
                      )}
                    </div>
                  </TableCell>
                  <TableCell sx={{ ...CellStyle }} align="left">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!employeeList?.length && (
                  <TableRow sx={{ height: "20rem" }}>
                    <TableCell align="center" sx={Celllstyle2} colSpan={7}>
                      No employee found
                    </TableCell>
                  </TableRow>
                )}
                {employeeList?.map((data, index) => (
                  <TableRow
                    key={data.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    style={{ background: "#fff" }}
                  >
                    <TableCell align="center" sx={Celllstyle2}>
                      {index + 1}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={Celllstyle2}
                      style={{ minWidth: "150px" }}
                    >
                      <UnderlineHoverEffect
                        onClick={() => {
                          if (userType === ROLES.MANAGER) {
                            Navigate(
                              `/manager-management/employee-details/personal-info/${data._id}`
                            );
                          } else if (userType === ROLES.HR) {
                            Navigate(
                              `/hr-management/employee-details/personal-info/${data._id}`
                            );
                          } else if (userType === ROLES.PAYROLL) {
                            Navigate(
                              `/payroll-management/employee-details/personal-info/${data._id}`
                            );
                          } else {
                            Navigate(
                              `/organization-admin/employee/details/personal-info/${data._id}`
                            );
                          }
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <TabelImg
                          src={
                            data.photoInfo && data.photoInfo.length
                              ? API_URL + data.photoInfo[0]?.path
                              : "/images/User.jpg"
                          }
                        />
                        <TabelParaContainer>
                          <TabelDarkPara>
                            {data.personalInfo?.firstName}{" "}
                            {data.personalInfo?.lastName}
                          </TabelDarkPara>
                          <TabelLightPara style={{ textTransform: "none" }}>
                            {data.email || " - "}
                          </TabelLightPara>
                        </TabelParaContainer>
                      </UnderlineHoverEffect>
                    </TableCell>
                    <TableCell align="left" sx={Celllstyle2}>
                      {data?.departmentInfo?.name || " - "}
                    </TableCell>
                    <TableCell align="left" sx={Celllstyle2}>
                      {data.personalInfo.employeeId || " - "}
                    </TableCell>
                    <TableCell align="left" sx={Celllstyle2}>
                      {data.personalInfo.homePhone || " - "}
                    </TableCell>
                    <TableCell align="left" sx={Celllstyle2}>
                      {/* <Moment format="YYYY/MM/DD"> */}{" "}
                      {data.positions?.startDate
                        ? moment
                            .utc(data.positions?.startDate)
                            .format("D MMM, YYYY")
                        : " - "}
                      {/* </Moment> */}
                    </TableCell>
                    <TableCell align="left" sx={Celllstyle2}>
                      {(data.role === ROLES.EMPLOYEE
                        ? "USER"
                        : data.role === ROLES.HR
                        ? " HR"
                        : data.role === ROLES.PAYROLL
                        ? "Payroll"
                        : data.role) || " - "}
                    </TableCell>
                    <TableCell align="left" sx={Celllstyle2}>
                      <IconContainer>
                        <Icons
                          onClick={() => {
                            if (userType === ROLES.MANAGER) {
                              Navigate(
                                `/manager-management/employee-details/personal-info/${data._id}`
                              );
                            } else if (userType === ROLES.HR) {
                              Navigate(
                                `/hr-management/employee-details/personal-info/${data._id}`
                              );
                            } else if (userType === ROLES.PAYROLL) {
                              Navigate(
                                `/payroll-management/employee-details/personal-info/${data._id}`
                              );
                            } else {
                              Navigate(
                                `/organization-admin/employee/details/personal-info/${data._id}`
                              );
                            }
                          }}
                          src="/images/icons/eye.svg"
                        />
                        {userType === ROLES.MANAGER ? (
                          ""
                        ) : (
                          <Icons
                            onClick={() => {
                              if (userType === ROLES.HR) {
                                Navigate(
                                  `/hr-management/personal-info/${data._id}`
                                );
                              } else if (userType === ROLES.PAYROLL) {
                                Navigate(
                                  `/payroll-management/personal-info/${data._id}`
                                );
                              } else {
                                Navigate(
                                  `/organization-admin/employee/personal-info/${data._id}`
                                );
                              }
                            }}
                            src="/images/icons/Pendown.svg"
                          />
                        )}
                        {userType === ROLES.MANAGER ? (
                          ""
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
      <DeleteModal
        openDelete={openDelete}
        message="Are you sure you want to delete this employee?"
        HandleCloseDelete={HandleCloseDelete}
        isLoading={isLoading}
        HandleDelete={HandleDelete}
      />
      <AddNewEmployeeModal
        openEmployee={openEmployee}
        HandleCloseEmployee={HandleCloseEmployee}
        HandleSubmitData={HandleSubmitData}
        userType={userType}
      />
    </>
  );
};

export default Employee;
