import React, { useState, useEffect } from "react";
import httpClient from "../api/httpClient";
import API_URLS from "../constants/apiUrls";
import ROLES from "../constants/roles";
import CommenDashHeader from "../Dashboard/CommenDashHeader";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import Pagination from "@mui/material/Pagination";
import { useNavigate, useLocation } from "react-router";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Checkbox from "@mui/material/Checkbox";

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
} from "./ViewEmployee/ViewEmployeeStyle";
import {
  PaginationDiv,
  DisciplinaryHeading,
  DisciplinaryDiv,
  FlexContaier,
  PaginationDivExpand,
  PaginationPara,
  PaginationSelect,
  PaginationOption,
} from "../Disciplinary/DisciplinaryStyles";

const CellHeadStyles = {
  color: "#8F9BB3",
  fontFamily: "Inter",
  fontSize: "1.4rem",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "1.6rem",
  padding: "8px",
};

const CellStyle = {
  color: "#222B45",
  fontSize: "1.4rem",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "1.5rem",
  padding: "8px",
};
const CellStyle2 = {
  color: "#222B45",
  fontSize: "1.4rem",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "1.5rem",
  padding: "8px",
};

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const SendWelcome = () => {
  let API_URL = process.env.REACT_APP_API_URL;

  const Navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [userType, setUserType] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [unwelcomedUser, setUnwelcomedUser] = useState([]);
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelectedRows(unwelcomedUser);
    } else {
      setSelectedRows([]);
    }
  };
  const handleClick = (event, data) => {
    const selectedIndex = selectedRows.findIndex((row) => row._id === data._id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRows, data);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = newSelected.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1)
      );
    }

    setSelectedRows(newSelected);
  };
  console.log("selected row ", selectedRows);
  const HandleSearchCahnge = (data) => {
    setSearchValue(data);
  };
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const HandleChangePage = (event, value) => {
    setPage(value);
  };
  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = Number(event.target.value);
    setItemsPerPage(newItemsPerPage);
    setPage(1);
  };

  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(
    startItem + itemsPerPage - 1,
    result?.totalUsers || 0
  );

  const SendWelcomeEmail = () => {
    let url = API_URLS.sendWelcomeEmail;
    let user = selectedRows?.map((user) => user._id);
    let dataCopy = { users: user };
    httpClient({
      method: "post",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          GetWelcomeEmployeeList();
          setSelectedRows([]);
          toast.success(result.message, {
            className: "toast",
          });
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        // console.error("Error:", error);
        toast.error("Error creating Employee. Please try again.");
        setIsLoading(false);
      });
  };
  const GetWelcomeEmployeeList = () => {
    setIsLoading(true);
    var url = API_URLS.listWelcomeEmail
      .replace("searchValue", searchValue)
      .replace("Page", page)
      .replace("Limit", itemsPerPage);

    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setResult(result);
          setUnwelcomedUser(result.users);
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error Adding Benefits. Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    GetWelcomeEmployeeList();
  }, [page, itemsPerPage]);

  const rows = [
    {
      _id: "101",
      name: "lalit kumar ",
      role: "employee",
    },
    {
      _id: "202",
      name: "lalit sharma ",
      role: "Hr",
    },
    {
      _id: "303",
      name: "lalit bhatiwal ",
      role: "manager",
    },
    {
      _id: "404",
      name: "lalit verma ",
      role: "user",
    },
    {
      _id: "505",
      name: "lalit singh",
      role: "Hr",
    },
  ];

  return (
    <>
      <CommenDashHeader onSearch={HandleSearchCahnge} text="Send Welcome" />

      <DisciplinaryDiv>
        <DisciplinaryHeading>Employees</DisciplinaryHeading>
        {selectedRows.length > 0 && (
          <FlexContaier style={{ alignItems: "center", gap: "1.6rem" }}>
            <TabelLightPara>
              Selected Employees:{" "}
              <span style={{ color: "#222b45" }}> {selectedRows.length}</span>
            </TabelLightPara>
            <AddNewButton onClick={() => SendWelcomeEmail()}>
              Send Now
            </AddNewButton>
          </FlexContaier>
        )}
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
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-labelledby="simple table">
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
                    <Checkbox
                      color="primary"
                      className="resetStyle"
                      onChange={handleSelectAllClick}
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </TableCell>
                  <TableCell
                    sx={{ ...CellHeadStyles, maxWidth: "188" }}
                    align="left"
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{ ...CellHeadStyles, maxWidth: "105px" }}
                    align="left"
                  >
                    Role
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!unwelcomedUser?.length && (
                  <TableRow
                    sx={{ height: "20rem" }}
                    style={{ background: "#fff" }}
                  >
                    <TableCell align="center" sx={CellStyle2} colSpan={7}>
                      No employee found
                    </TableCell>
                  </TableRow>
                )}
                {unwelcomedUser?.map((data) => (
                  <TableRow
                    key={data.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    style={{ background: "#fff" }}
                  >
                    <TableCell align="center" sx={CellStyle2}>
                      <Checkbox
                        color="primary"
                        checked={selectedRows.some(
                          (row) => row._id === data._id
                        )}
                        onChange={(event) => handleClick(event, data)}
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                        className="resetStyle"
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={CellStyle}
                      style={{ minWidth: "150px" }}
                    >
                      <TabelDiv>
                        <TabelImg
                          src={
                            data.photo && data.photo.length
                              ? API_URL + data.photo?.path
                              : "/images/User.jpg"
                          }
                        />
                        <TabelParaContainer>
                          <TabelDarkPara>
                            {" "}
                            {data.name
                              ? data.name
                              : data?.personalInfo
                              ? [
                                  data?.personalInfo?.firstName,
                                  data?.personalInfo?.lastName,
                                ].join(" ")
                              : " - "}
                          </TabelDarkPara>
                          <TabelLightPara>{data.email || " - "}</TabelLightPara>
                        </TabelParaContainer>
                      </TabelDiv>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={CellStyle2}
                      style={{ minWidth: "150px" }}
                    >
                      {data.role}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {result?.totalPages > 1 && (
            <PaginationDivExpand>
              <FlexContaier style={{ alignItems: "center" }}>
                <PaginationPara>Items per page</PaginationPara>
                <PaginationSelect
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                >
                  <PaginationOption value={5}>5</PaginationOption>
                  <PaginationOption value={10}>10</PaginationOption>
                  <PaginationOption value={15}>15</PaginationOption>
                  <PaginationOption value={20}>20</PaginationOption>
                </PaginationSelect>
                <PaginationPara>{`${startItem}-${endItem} of ${
                  result?.totalUsers || 0
                }`}</PaginationPara>
              </FlexContaier>
              <Pagination
                count={result?.totalPages}
                variant="outlined"
                shape="rounded"
                page={page}
                onChange={HandleChangePage}
              />
            </PaginationDivExpand>
          )}
        </>
      )}
    </>
  );
};

export default SendWelcome;
