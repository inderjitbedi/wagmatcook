import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { RotatingLines, ThreeDots } from "react-loader-spinner";
import httpClient from "../api/httpClient";
import ROLES from "../constants/roles";
import API_URLS from "../constants/apiUrls";
import { toast } from "react-toastify";
import Pagination from "@mui/material/Pagination";
import moment from "moment";
import { AiOutlinePrinter } from "react-icons/ai";

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
  FilterDiv,
  FilterContainer,
  Select,
  Option,
  FlexSpaceBetween,
  FlexSpaceBetweenmobile,
  FlexContaier,
  FlexColumn,
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

const ReportsLeaves = ({ searchValue, Tabvalue, count, onObjectPassed }) => {
  let API_URL = process.env.REACT_APP_API_URL;

  const [userType, setUserType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [leaveTypeList, setLeaveTypeList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [page, setPage] = useState(1);
  const [isUploading, setIsUploading] = useState(false);

  const HandleChangePage = (event, value) => {
    setPage(value);
  };

  const [leaveType, setLeaveType] = useState("");
  const [department, setDepartment] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleLeaveTypeChange = (event) => {
    setLeaveType(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };
  const handleFilterButtonClick = () => {
    const filters = {
      leaveType: leaveType,
      department: department,
      startDate: startDate,
      endDate: endDate,
    };

    GetAllLeaveList(filters);
  };
  const clearFilters = () => {
    setLeaveType("");
    setDepartment("");
    setStartDate("");
    setEndDate("");
    const filters = {
      leaveType: null,
      department: null,
      startDate: null,
      endDate: null,
    };
    GetAllLeaveList(filters);
  };

  const GetAllLeaveList = (filters) => {
    setIsLoading(true);

    let url = API_URLS.getALLLeaves
      .replace("Page", page)
      .replace("searchValue", searchValue);
    if (filters?.leaveType) {
      url += `&leaveType=${filters.leaveType}`;
    }
    if (filters?.department) {
      url += `&department=${filters.department}`;
    }
    if (filters?.startDate) {
      url += `&startDate=${filters.startDate}`;
    }
    if (filters?.endDate) {
      url += `&endDate=${filters.endDate}`;
    }
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setResult(result);

          setLeaves(result.leaves);
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
  const GetAllLeaveTypeList = () => {
    // setIsLoading(true);

    let url = API_URLS.getLeaveTypeList;

    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setLeaveTypeList(result.leaveTypes);
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        // console.error("Error:", error);
        toast.error("Error creating Employee. Please try again.");
        // setIsLoading(false);
      });
  };
  const GetDepartmentList = () => {
    // setIsLoading(true);

    let url = API_URLS.getDepartmentsList;

    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setDepartmentList(result.departments);
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        // console.error("Error:", error);
        toast.error("Error creating Employee. Please try again.");
        // setIsLoading(false);
      });
  };
  const GetGeneratePdf = (filters) => {
    let url = API_URLS.generateLeavePdf;
    setIsUploading(true);
    if (filters?.leaveType) {
      url += `&leaveType=${filters.leaveType}`;
    }
    if (filters?.department) {
      url += `&department=${filters.department}`;
    }
    if (filters?.startDate) {
      url += `&startDate=${filters.startDate}`;
    }
    if (filters?.endDate) {
      url += `&endDate=${filters.endDate}`;
    }
    httpClient({
      method: "get",
      url,
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(({ result, error }) => {
        if (result) {
          const blob = new Blob([result], { type: "application/pdf" });
          const pdfURL = window.URL.createObjectURL(blob);
          setIsUploading(false);
          window.open(pdfURL, "_blank");
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error creating department. Please try again.");
        setIsUploading(false);
      });
  };
  const filters = {
    leaveType: leaveType,
    department: department,
    startDate: startDate,
    endDate: endDate,
  };
  // GetGeneratePdf(filters);

  useEffect(() => {
    GetAllLeaveList();
  }, [page, searchValue]);
  useEffect(() => {
    GetAllLeaveTypeList();
    GetDepartmentList();
  }, []);
  const areFiltersEmpty = !!(leaveType || department || startDate || endDate);
  return (
    <div>
      <FlexSpaceBetweenmobile
        style={{ alignItems: "flex-end", margin: "0rem" }}
      >
        <FilterDiv>
          <FilterContainer>
            <InputLabel>Leave Type</InputLabel>
            <Select value={leaveType} onChange={handleLeaveTypeChange}>
              <Option value="">Select</Option>
              {leaveTypeList?.map((data, index) => (
                <Option value={data._id}>{data.name}</Option>
              ))}
            </Select>
          </FilterContainer>
          <FilterContainer>
            <InputLabel>Department</InputLabel>
            <Select value={department} onChange={handleDepartmentChange}>
              <Option value="">Select</Option>

              {departmentList?.map((data, index) => (
                <Option value={data._id}>{data.name}</Option>
              ))}
            </Select>
          </FilterContainer>
          <FilterContainer>
            <InputLabel>Start Date</InputLabel>
            <Input
              type="date"
              name="startDate"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </FilterContainer>{" "}
          <FilterContainer>
            <InputLabel>End Date</InputLabel>
            <Input
              type="date"
              name="endDate"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </FilterContainer>
        </FilterDiv>
        <FlexColumn style={{ width: "max-content", alignItems: "flex-end" }}>
          <div style={{ marginBottom: "1rem", marginRight: "1rem" }}>
            {isUploading ? (
              <ThreeDots
                height="8"
                width="80"
                radius="9"
                color="#279AF1"
                ariaLabel="three-dots-loading"
                visible={true}
              />
            ) : (
              <AiOutlinePrinter
                onClick={() => GetGeneratePdf(filters)}
                style={{
                  width: "2rem",
                  height: "2rem",
                  cursor: "pointer",
                  color: "#279AF1",
                }}
              />
            )}
          </div>

          <FlexContaier>
            <AddNewButton
              onClick={handleFilterButtonClick}
              style={{ marginBottom: "20px" }}
              disabled={!areFiltersEmpty}
            >
              Filter
            </AddNewButton>
            {areFiltersEmpty && (
              <AddNewButton
                onClick={clearFilters}
                style={{ marginBottom: "20px" }}
                disabled={!areFiltersEmpty}
              >
                Clear
              </AddNewButton>
            )}
          </FlexContaier>
        </FlexColumn>
      </FlexSpaceBetweenmobile>

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
                    Leave Type
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "4rem" }}
                    align="left"
                  >
                    Hours
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "10rem" }}
                    align="left"
                  >
                    Start Date
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "10rem" }}
                    align="left"
                  >
                    End Date
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
                {!leaves?.length && (
                  <TableRow sx={{ height: "20rem" }}>
                    <TableCell align="center" sx={CellStyle2} colSpan={6}>
                      No leaves found
                    </TableCell>
                  </TableRow>
                )}

                {leaves?.map((data, index) => (
                  <TableRow>
                    <TableCell sx={CellStyle2} align="left">
                      {index + 1}
                    </TableCell>
                    <TableCell sx={CellStyle} align="left">
                      <TabelDiv>
                        {/* <TabelImg
                          src={
                            data?.photo && data?.photo.length
                              ? API_URL + data?.photo?.path
                              : "/images/User.jpg"
                          }
                        /> */}
                        <TabelParaContainer>
                          <TabelDarkPara>
                            {data?.personalInfo?.firstName}{" "}
                            {data?.personalInfo?.lastName}
                          </TabelDarkPara>
                          {/* <TabelLightPara style={{ textTransform: "none" }}>
                            {data?.employeeData?.email || " - "}
                          </TabelLightPara> */}
                        </TabelParaContainer>
                      </TabelDiv>
                    </TableCell>
                    <TableCell sx={CellStyle2} align="left">
                      {data?.leaveType?.name || " - "}
                    </TableCell>{" "}
                    <TableCell sx={CellStyle2} align="left">
                      {data?.hours || " - "}
                    </TableCell>{" "}
                    <TableCell sx={CellStyle2} align="left">
                      {data?.from
                        ? moment.utc(data.from).format("D MMM, YYYY")
                        : " - "}
                    </TableCell>{" "}
                    <TableCell sx={CellStyle2} align="left">
                      {data?.to
                        ? moment.utc(data.to).format("D MMM, YYYY")
                        : " - "}
                    </TableCell>{" "}
                    <TableCell sx={CellStyle2} align="left">
                      {data?.departmentsData?.name || " - "}
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

export default ReportsLeaves;
