import React, { useState, useEffect } from "react";
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
import httpClient from "../api/httpClient";
import { toast } from "react-toastify";

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
  MenuIconDiv,
  MenuIcon,
  ActionIconDiv,
  ActionIcons,
  DisciplinaryDiv,
  DisciplinaryHeading,
  ModalUpperDiv,
  ModalHeading,
  ModalIcon,
  ModalUpperMid,
  InputLabel,
  Input,
  InputSpan,
  TextArea,
  InputPara,
  Errors,
} from "./SAStyles";
import { Outlet } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "44.6rem",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 45,
  padding: "2rem 0rem",
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
const SALayout = () => {
  return (
    <Dashboard>
      <DashNav>
        <SASideBar />
      </DashNav>
      <DashMain>
        <Outlet />
      </DashMain>
    </Dashboard>
  );
};

export default SALayout;
