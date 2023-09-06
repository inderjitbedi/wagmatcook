import React from 'react'
import SideBar from "../../Dashboard/OADashboard/SideBar";
import EmployeeSideBar from "./EmployeeSideBar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ButtonBlue } from "../AddEmployee/AddEmployeeStyles";

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
  FlexContaier,
  BackButton,
  IconsEmployee,
  EmployeeBody,
  BodyHeader,
  BodyHeading,
  BodyContainer,
  SideBarContainer,
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
  TabelLightPara,
  Icons,
  IconContainer,
} from "./ViewEmployeeStyle";
const CellStyle = {
  color: "#8F9BB3",
  padding:"16px 8px",
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
  return (
    <Dashboard>
      <DashNav>
        <SideBar />
      </DashNav>
      <DashMain>
        <DashHeader>
          <FlexContaier>
            <BackButton>
              <IconsEmployee src="/images/icons/ArrowLeft.svg" />
              Back
            </BackButton>
            <DashHeaderTitle>Employee</DashHeaderTitle>
          </FlexContaier>

          <DashHeaderSearch>
            <SearchBox>
              <SearchInput
                type="text"
                placeholder="Search..."
                // value={searchValue}
                // onChange={(e) => HandleSearchCahnge(e)}
              ></SearchInput>
              <SearchIcon src="/images/icons/searchIcon.svg" />
            </SearchBox>
            <DashNotification src="/images/icons/Notifications.svg" />
          </DashHeaderSearch>
        </DashHeader>
        <EmployeeBody>
          <BodyHeader>
            <BodyHeading>Employee Details</BodyHeading>
          </BodyHeader>
          <BodyContainer>
            <SideBarContainer>
              <EmployeeSideBar />
            </SideBarContainer>
            <MainBodyContainer>
              <FlexSpaceBetween style={{ alignItems: "center" }}>
                <PersonalInfo>
                  <PersonalImg src="/images/Oval Copy.jpg" />
                  <FlexColumn style={{ gap: "5px" }}>
                    <PersonalName>Hattie Watkins</PersonalName>
                    <PersonalTitle>Team Manager</PersonalTitle>
                    <PersonalDepartment>Design Department</PersonalDepartment>
                  </FlexColumn>
                </PersonalInfo>
              </FlexSpaceBetween>
              <LeaveDiv>
                Leaves History
                <ButtonBlue>New Request</ButtonBlue>
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
                      <TableCell
                        sx={{ ...CellStyle, maxWidth: "128" }}
                        align="left"
                      >
                        Leave&nbsp;Type
                      </TableCell>
                      <TableCell
                        sx={{ ...CellStyle, maxWidth: "184px" }}
                        align="left"
                      >
                        Applied&nbsp;to
                      </TableCell>
                      <TableCell
                        sx={{ ...CellStyle, maxWidth: "100px" }}
                        align="left"
                      >
                        from
                      </TableCell>
                      <TableCell
                        sx={{ ...CellStyle, maxWidth: "100px" }}
                        align="left"
                      >
                        To
                      </TableCell>
                      <TableCell
                        sx={{ ...CellStyle, maxWidth: "40px" }}
                        align="left"
                      >
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
                        <TableCell align="left" sx={Celllstyle2} >
                          <span style={ data.status === "Pending" ? PendingStyle: ApprovedStyles}> {data.status} </span>
                        </TableCell>
                        <TableCell align="center" sx={Celllstyle2}>
                          <Icons src="/images/icons/eye.svg" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </MainBodyContainer>
          </BodyContainer>
        </EmployeeBody>
      </DashMain>
    </Dashboard>
  );
}

export default EVLeaveHistory