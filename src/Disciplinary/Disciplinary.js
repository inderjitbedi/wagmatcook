import React from "react";
import {
  DashMain,
  Dashboard,
  DashNav,
  DashHeader,
  DashHeaderTitle,
  DashHeaderSearch,
  SearchBox,
  SearchInput,
  SearchIcon,
  DashNotification,
} from "../Dashboard/OADashboard/OADashBoardStyles";
import SideBar from "../Dashboard/OADashboard/SideBar";
import {
  AddNewButton,
  DisciplinaryDiv,
  DisciplinaryHeading,
  MenuIcon,
  MenuIconDiv,
  ActionIconDiv,
  ActionIcons,
} from "./DisciplinaryStyles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Disciplinary = () => {
const CellHeadStyles = {
  color: "#8F9BB3",
  fontFamily: "Inter",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "16px",
    };
    
    const CellStyle = {
      color: "#222B45",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: 600,
      lineHeight: "15px",
    };
    const CellStyle2 = {
      color: "#222B45",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "15px",
    };
   
    const CellData = ["Order No." ,"Name" ,"Description","Requires BCR" ,"Action"]
    const rows = [
      {
        orderno: 1,
        name: "Verbal warning ",
        description: "this is the description text ",
        requirebcr: "yes",
      },
      {
        orderno: 2,
        name: "Verbal warning ",
        description: "this is the description text ",
        requirebcr: "yes",
      },
      {
        orderno: 3,
        name: "Verbal warning ",
        description: "this is the description text ",
        requirebcr: "yes",
      },
      {
        orderno: 4,
        name: "Verbal warning ",
        description: "this is the description text ",
        requirebcr: "no",
      },
      {
        orderno: 5,
        name: "Verbal warning ",
        description: "this is the description text ",
        requirebcr: "yes",
      },
    ];
  return (
    <Dashboard>
      <DashNav>
        <SideBar />
      </DashNav>
      <DashMain>
        <DashHeader>
          <DashHeaderTitle>Disciplinary</DashHeaderTitle>
          <DashHeaderSearch>
            <SearchBox>
              <SearchInput type="text" placeholder="Search..."></SearchInput>
              <SearchIcon src="/icons/searchIcon.png" />
            </SearchBox>
            <DashNotification src="/icons/Notifications.png" />
          </DashHeaderSearch>
        </DashHeader>
        <DisciplinaryDiv>
          <DisciplinaryHeading>All Disciplinary</DisciplinaryHeading>
          <AddNewButton>Add New</AddNewButton>
        </DisciplinaryDiv>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{
                  background: "#FBFBFB",
                }}
              >
                <TableCell sx={CellHeadStyles} align="left">
                  Order No.
                </TableCell>
                <TableCell sx={CellHeadStyles} align="left">
                  Name
                </TableCell>
                <TableCell sx={CellHeadStyles} align="left">
                  Description
                </TableCell>
                <TableCell sx={CellHeadStyles} align="left">
                  Requires BCR
                </TableCell>
                <TableCell sx={CellHeadStyles} align="left">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((data) => (
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    background: "#fff",
                  }}
                >
                  <TableCell sx={CellStyle2} align="left">
                    <MenuIconDiv>
                      <MenuIcon src="/icons/Menu Dots.png " />
                      {data.orderno}
                    </MenuIconDiv>
                  </TableCell>
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
                    {data.requirebcr}{" "}
                  </TableCell>
                  <TableCell sx={CellStyle2} align="left">
                    {" "}
                    <ActionIconDiv>
                      <ActionIcons src="/icons/Pendown.png"  />
                      <ActionIcons src="/icons/trash-2.png" />
                    </ActionIconDiv>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DashMain>
    </Dashboard>
  );
};

export default Disciplinary;
