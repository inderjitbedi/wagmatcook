import React, { useState, useEffect } from "react";

import Moment from "react-moment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router";
import DeleteModal from "../../Modals/DeleteModal";
import AddNewEmployeeModal from "../AddEmployee/AddNewEmployeeModal";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import httpClient from "../../api/httpClient";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import moment from "moment";
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

const Employee = () => {
  let API_URL = process.env.REACT_APP_API_URL;

  const Navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [delayedSearchValue, setDelayedSearchValue] = useState("");
  const delayDuration = 1000; // Set the delay duration in milliseconds
  let searchTimer;
  const HandleSearchCahnge = (e) => {
    setSearchValue(e.target.value);
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      setDelayedSearchValue(e.target.value);
    }, delayDuration);
  };
  const [openDelete, setOpenDelete] = useState(false);
  const HandleOpenDelete = () => setOpenDelete(true);
  const HandleCloseDelete = () => setOpenDelete(false);

  const [openEmployee, setOpenEmployee] = useState(false);
  const HandleOpenEmployee = () => setOpenEmployee(true);
  const HandleCloseEmployee = () => setOpenEmployee(false);

  //variable to fetch and get api data
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);

  // get employees
  const GetEmployees = () => {
    setIsLoading(true);

    let url = `employee/list?page=1&limit=10`;
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
        toast.error("Error creating Employee. Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  console.log("result of the fetch api ", result);
  // caling the fetch employee list api
  useEffect(() => {
    GetEmployees();
  }, []);

  const HandleSubmitData = (data) => {
    return data;
  };
  console.log("submit data ", HandleSubmitData());
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
    let url = `/employee/delete/${Id}`;
    httpClient({
      method: "put",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          HandleCloseDelete();
          GetEmployees();
          toast.success(result.message);//Entry Deleted successfully");
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error in deleting employee. Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const [Id, setId] = useState("");

  return (
    <>
      <DashHeader>
        <DashHeaderTitle>Employee</DashHeaderTitle>
        <DashHeaderSearch>
          {/* <SearchBox>
            <SearchInput
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => HandleSearchCahnge(e)}
            ></SearchInput>
            <SearchIcon src="/images/icons/searchIcon.svg" />
          </SearchBox> */}
          <DashNotification src="/images/icons/Notifications.svg" />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              gap: "5px",
            }}
            onClick={(event) => handleClickMenu(event)}
          >
            <DashNotification src="/images/icons/Logout.svg" />
            <img
              src="/images/icons/arrowdown.svg"
              style={{
                width: "5px",
                height: "9px",
                transform: anchorEl ? "rotate(180deg)" : undefined,
              }}
            />
          </div>
        </DashHeaderSearch>
        <Menu
          sx={{ margin: "0px" }}
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={HandleLogout}>Logout</MenuItem>
        </Menu>
      </DashHeader>
      <DepartmentFilterContainer>
        <DepartmentFilterdiv>
          {/* {FilterData.map((data) => (
            <DepartmentFilterButton>{data}</DepartmentFilterButton>
          ))} */}
        </DepartmentFilterdiv>
        <AddNewButton onClick={HandleOpenEmployee}>Add New</AddNewButton>
      </DepartmentFilterContainer>
      <HeaderDiv>
        <HeaderTitle>Employee List</HeaderTitle>
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
                  Employee&nbsp;Id
                </TableCell>
                <TableCell
                  sx={{ ...CellStyle, maxWidth: "114px" }}
                  align="left"
                >
                  Phone
                </TableCell>
                <TableCell sx={{ ...CellStyle, maxWidth: "88px" }} align="left">
                  Join&nbsp;Date
                </TableCell>
                <TableCell
                  sx={{ ...CellStyle, maxWidth: "105px" }}
                  align="left"
                >
                  Role
                </TableCell>
                <TableCell sx={{ ...CellStyle }} align="left">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {result.employees?.length == 0 && (
                <TableRow sx={{ height: "200px" }}>
                  <TableCell align="center" colSpan={7}>
                    No employee found
                  </TableCell>
                </TableRow>
              )}
              {result.employees?.map((data, index) => (
                <TableRow
                  key={data.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  style={{ background: "#fff" }}
                >
                  <TableCell align="center" sx={Celllstyle2}>
                    {index + 1}
                  </TableCell>
                  <TableCell align="left" sx={Celllstyle2}>
                    <TabelDiv>
                      <TabelImg
                        src={
                          data.personalInfo[0]?.photo
                            ? API_URL + data.personalInfo[0]?.photo?.path
                            : "/images/User.jpg"
                        }
                      />
                      <TabelParaContainer>
                        <TabelDarkPara>
                          {data.personalInfo[0]?.firstName}{" "}
                          {data.personalInfo[0]?.lastName}
                        </TabelDarkPara>
                        <TabelLightPara style={{ textTransform: "none" }}>
                          {data.email || " - "}
                        </TabelLightPara>
                      </TabelParaContainer>
                    </TabelDiv>
                  </TableCell>
                  <TableCell align="left" sx={Celllstyle2}>
                    {data.personalInfo[0].employeeId || " - "}
                  </TableCell>
                  <TableCell align="left" sx={Celllstyle2}>
                    {data.personalInfo[0].homePhone || " - "}
                  </TableCell>
                  <TableCell align="left" sx={Celllstyle2}>
                    {/* <Moment format="YYYY/MM/DD"> */}{" "}
                    {moment(data.jobDetails[0]?.startDate).format(
                      "DD/MM/YYYY"
                    ) || " - "}
                    {/* </Moment> */}
                  </TableCell>
                  <TableCell align="left" sx={Celllstyle2}>
                    {data.role || " - "}
                  </TableCell>
                  <TableCell align="left" sx={Celllstyle2}>
                    <IconContainer>
                      <Icons
                        onClick={() =>
                          Navigate(
                            `/organization-admin/employee/details/personal-info/${data._id}`
                          )
                        }
                        src="/images/icons/eye.svg"
                      />
                      <Icons
                        onClick={() =>
                          Navigate(
                            `/organization-admin/employee/personal-info/${data._id}`
                          )
                        }
                        src="/images/icons/Pendown.svg"
                      />
                      <Icons
                        onClick={() => {
                          setId(data._id);
                          HandleOpenDelete();
                        }}
                        src="/images/icons/Trash-2.svg"
                      />
                    </IconContainer>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
      />
    </>
  );
};

export default Employee;
