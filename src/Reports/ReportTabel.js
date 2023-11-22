import React, { useState, useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { RotatingLines } from "react-loader-spinner";
import httpClient from "../api/httpClient";
import ROLES from "../constants/roles";
import API_URLS from "../constants/apiUrls";
import { toast } from "react-toastify";
import moment from "moment";
import Pagination from "@mui/material/Pagination";

import {
  TabelDarkPara,
  TabelLightPara,
  TabelImg,
  TabelDiv,
  TabelParaContainer,
} from "../Employee/ViewEmployee/ViewEmployeeStyle";
import { PaginationDiv } from "../Disciplinary/DisciplinaryStyles";

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

const ReportTabel = ({ searchValue, Tabvalue }) => {
  let API_URL = process.env.REACT_APP_API_URL;

  const [userType, setUserType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [user, setUser] = useState();

  const [page, setPage] = useState(1);
  const HandleChangePage = (event, value) => {
    setPage(value);
  };
  const [employeeList, setEmployeeList] = useState([]);

  const GetBebEligibleEmployeeList = (user) => {
    setIsLoading(true);

    let url = API_URLS.getBebEligibleEmployeeList
      .replace("Page", page)
      .replace("searchValue", searchValue);
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
  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      let parsedUser = JSON.parse(user);
      setUser(parsedUser);
      if (parsedUser) {
        GetBebEligibleEmployeeList(parsedUser);
      }
    }
  }, [page, searchValue]);
  return (
    <div>
      {" "}
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
                    style={{ minWidth: "12rem" }}
                    align="left"
                  >
                    Name
                  </TableCell>

                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "12rem" }}
                    align="left"
                  >
                    Employee&nbsp;Id
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "10rem" }}
                    align="left"
                  >
                    Phone
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "10rem" }}
                    align="left"
                  >
                    Join&nbsp;Date
                  </TableCell>

                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "12rem" }}
                    align="left"
                  >
                    Role
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "12rem" }}
                    align="left"
                  >
                    Department
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!employeeList?.length && (
                  <TableRow sx={{ height: "20rem" }}>
                    <TableCell align="center" sx={CellStyle2} colSpan={7}>
                      No employee found
                    </TableCell>
                  </TableRow>
                )}
                {employeeList?.map((data, index) => (
                  <TableRow>
                    <TableCell sx={CellStyle2} align="left">
                      {index + 1}
                    </TableCell>
                    <TableCell sx={CellStyle} align="left">
                      <TabelDiv>
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
                      </TabelDiv>
                    </TableCell>
                    <TableCell sx={CellStyle2} align="left">
                      {data.personalInfo.employeeId || " - "}
                    </TableCell>{" "}
                    <TableCell sx={CellStyle2} align="left">
                      {data.personalInfo.homePhone || " - "}
                    </TableCell>
                    <TableCell sx={CellStyle2} align="left">
                      {data.positions[0]?.startDate
                        ? moment
                            .utc(data.positions[0]?.startDate)
                            .format("D MMM, YYYY")
                        : " - "}
                    </TableCell>{" "}
                    <TableCell sx={CellStyle2} align="left">
                      {(data.role === ROLES.EMPLOYEE
                        ? "USER"
                        : data.role === ROLES.HR
                        ? " HR"
                        : data.role) || " - "}
                    </TableCell>{" "}
                    <TableCell sx={CellStyle2} align="left">
                      {data?.departmentInfo?.name}
                    </TableCell>{" "}
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
    </div>
  );
};

export default ReportTabel;
