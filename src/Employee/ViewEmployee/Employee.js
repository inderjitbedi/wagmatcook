import React, { useState } from "react";
import SideBar from "../../Dashboard/OADashboard/SideBar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router";
import DeleteModal from "../../Modals/DeleteModal";
import {
  Dashboard,
  DashMain,
  DashNav,
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
  const rows = [
    {
      name: "Victoria perez",
      email: "KumarName@gamil.com",
      employeeid: "LA-0239",
      phone: "+265 - 696 - 3453",
      joindate: "30 Apr,2020",
      role: "web Developer",
    },
    {
      name: "Victoria perez",
      email: "KumarName@gamil.com",
      employeeid: "LA-0239",
      phone: "+265 - 696 - 3453",
      joindate: "30 Apr,2020",
      role: "web Developer",
    },
    {
      name: "Victoria perez",
      email: "KumarName@gamil.com",
      employeeid: "LA-0239",
      phone: "+265 - 696 - 3453",
      joindate: "30 Apr,2020",
      role: "web Developer",
    },
    {
      name: "Victoria perez",
      email: "KumarName@gamil.com",
      employeeid: "LA-0239",
      phone: "+265 - 696 - 3453",
      joindate: "30 Apr,2020",
      role: "web Developer",
    },
    {
      name: "Victoria perez",
      email: "KumarName@gamil.com",
      employeeid: "LA-0239",
      phone: "+265 - 696 - 3453",
      joindate: "30 Apr,2020",
      role: "web Developer",
    },
    {
      name: "Victoria perez",
      email: "KumarName@gamil.com",
      employeeid: "LA-0239",
      phone: "+265 - 696 - 3453",
      joindate: "30 Apr,2020",
      role: "web Developer",
    },
    {
      name: "Victoria perez",
      email: "KumarName@gamil.com",
      employeeid: "LA-0239",
      phone: "+265 - 696 - 3453",
      joindate: "30 Apr,2020",
      role: "web Developer",
    },
    {
      name: "Victoria perez",
      email: "KumarName@gamil.com",
      employeeid: "LA-0239",
      phone: "+265 - 696 - 3453",
      joindate: "30 Apr,2020",
      role: "web Developer",
    },
  ];
  return (
    <>
      <DashHeader>
        <DashHeaderTitle>Employee</DashHeaderTitle>
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
          <DashNotification src="/images/icons/Notifications.svg" />
        </DashHeaderSearch>
      </DashHeader>
      <DepartmentFilterContainer>
        <DepartmentFilterdiv>
          {FilterData.map((data) => (
            <DepartmentFilterButton>{data}</DepartmentFilterButton>
          ))}
        </DepartmentFilterdiv>
        <AddNewButton>Add New</AddNewButton>
      </DepartmentFilterContainer>
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
              <TableCell sx={{ ...CellStyle, maxWidth: "114px" }} align="left">
                Phone
              </TableCell>
              <TableCell sx={{ ...CellStyle, maxWidth: "88px" }} align="left">
                Join&nbsp;Date
              </TableCell>
              <TableCell sx={{ ...CellStyle, maxWidth: "105px" }} align="left">
                Role
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
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
                      <TabelLightPara>{data.email}</TabelLightPara>
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
                  <IconContainer>
                    <Icons
                      onClick={() => Navigate("/employee-details/personal")}
                      src="/images/icons/eye.svg"
                    />
                    <Icons
                      onClick={() =>
                        Navigate("/add-new-employee/personal-info")
                      }
                      src="/images/icons/Pendown.svg"
                    />
                    <Icons onClick={()=>  HandleOpenDelete()} src="/images/icons/Trash-2.svg" />
                  </IconContainer>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteModal
        openDelete={openDelete}
        HandleCloseDelete={HandleCloseDelete}
        // HandleDelete={HandleDelete}
      />
    </>
  );
};

export default Employee;
