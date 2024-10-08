import React, { useState } from "react";
import SASideBar from "./SideBar/SASideBar";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Dashboard,
  DashNav,
  DashMain,
  DashHeader,
  DashHeaderSearch,
  DashHeaderTitle,
  DashNotification,
  SearchBox,
  SearchIcon,
  SearchInput,
  DashHeading,
  DepartmentFilterContainer,
  AddNewButton,
  DepartmentFilterButton,
  MenuIconDiv,
  MenuIcon,
  ActionIconDiv,
  ActionIcons,
  DepartmentFilterdiv,
} from "./SAStyles";

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
const SAUserList = () => {
  const FilterData = ["Org Admins", "Managers", "HUMAN_RESOURCE", "Employees"];
  const disciplinaryData = [
    {
      _id: "64f015b3f1b4113adc352819",
      name: "test user ",
      description: "no 4 ",
      requiredBcr: true,
      order: 1,
    },
    {
      _id: "64f015b3f1b4113adc352819",
      name: "test user ",
      description: "no 4 ",
      requiredBcr: true,
      order: 1,
    },
    {
      _id: "64f015b3f1b4113adc352819",
      name: "test user ",
      description: "no 4 ",
      requiredBcr: true,
      order: 1,
    },
    {
      _id: "64f015b3f1b4113adc352819",
      name: "test user ",
      description: "no 4 ",
      requiredBcr: true,
      order: 1,
    },
    {
      _id: "64f015b3f1b4113adc352819",
      name: "test user ",
      description: "no 4 ",
      requiredBcr: true,
      order: 1,
    },
    {
      _id: "64f015b3f1b4113adc352819",
      name: "test user ",
      description: "no 4 ",
      requiredBcr: true,
      order: 1,
    },
    {
      _id: "64f015b3f1b4113adc352819",
      name: "test user ",
      description: "no 4 ",
      requiredBcr: true,
      order: 1,
    },

    {
      _id: "64f015b3f1b4113adc352819",
      name: "test user ",
      description: "no 4 ",
      requiredBcr: true,
      order: 1,
    },
    {
      _id: "64f015b3f1b4113adc352819",
      name: "test user ",
      description: "no 4 ",
      requiredBcr: true,
      order: 1,
    },
  ];
  //name org department status
  // change the button login - otp otp - login
  return (
    <Dashboard>
      <DashNav>
        <SASideBar />
      </DashNav>
      <DashMain>
        <DashHeader>
          <DashHeaderTitle>User List</DashHeaderTitle>
          <DashHeaderSearch>
            <SearchBox>
              <SearchInput
                type="text"
                placeholder="Search..."
                // value={searchValue}
                // onChange={(e) => setSearchValue(e.target.value)}
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
          {/* <AddNewButton onClick={HandleOpen}>Add New</AddNewButton> */}
        </DepartmentFilterContainer>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{
                  background: "#FBFBFB",
                }}
              >
                <TableCell sx={CellHeadStyles} align="left">
                  Name
                </TableCell>
                <TableCell sx={CellHeadStyles} align="left">
                  Organization
                </TableCell>
                <TableCell sx={CellHeadStyles} align="left">
                  Status
                </TableCell>
                <TableCell sx={CellHeadStyles} align="left">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {disciplinaryData?.map((data) => (
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    background: "#fff",
                  }}
                >
                  <TableCell sx={CellStyle} align="left">
                    {" "}
                    {data.name}{" "}
                  </TableCell>
                  <TableCell sx={CellStyle2} align="left">
                    {" "}
                    {data.description}{" "}
                  </TableCell>
                  <TableCell sx={CellStyle} align="left">
                    {" "}
                    {data.requiredBcr === false ? "No" : "Yes"}{" "}
                  </TableCell>
                  <TableCell sx={CellStyle2} align="left">
                    {" "}
                    <ActionIconDiv>
                      <ActionIcons
                        // onClick={() => {
                        //   HandleOpenEdit();
                        //   setId(data._id);
                        //   setDescription(data.description);
                        //   setRequiredBcr(data.requiredBcr);
                        //   setName(data.name);
                        // }}
                        src="/images/icons/Pendown.svg"
                      />
                      <ActionIcons
                        // onClick={() => {
                        //   HandleOpenDelete();
                        //   setId(data._id);
                        // }}
                        src="/images/icons/Trash-2.svg"
                      />
                    </ActionIconDiv>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <AddNewButton onClick={HandleLoadMore} style={{ marginTop: "10rem" }}>
          Load More
        </AddNewButton> */}
      </DashMain>
    </Dashboard>
  );
};

export default SAUserList;
