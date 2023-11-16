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
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
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
} from "../Disciplinary/DisciplinaryStyles";

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

const SendWelcome = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const [userType, setUserType] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selected, setSelected] = useState([]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      // const newSelected = rows.map((n) => n.id);
      // setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const HandleSearchCahnge = (data) => {
    setSearchValue(data);
  };
  const [page, setPage] = useState(1);
  const HandleChangePage = (event, value) => {
    setPage(value);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);

  const SendWelcomeEmail = () => {
    let url = API_URLS.sendWelcomeEmail;

    httpClient({
      method: "post",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
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
      .replace("Page", page);

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
        toast.error("Error Adding Benefits. Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    GetWelcomeEmployeeList();
  }, []);

  return (
    <>
      <CommenDashHeader onSearch={HandleSearchCahnge} text="Send Welcome" />

      <DisciplinaryDiv>
        <DisciplinaryHeading>Employees</DisciplinaryHeading>
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
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
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
                    <Checkbox color="primary" onChange={handleSelectAllClick} />
                  </TableCell>
                  <TableCell
                    sx={{ ...CellStyle, maxWidth: "188" }}
                    align="left"
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{ ...CellStyle, maxWidth: "105px" }}
                    align="left"
                  >
                    Role
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  // key={data.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  style={{ background: "#fff" }}
                >
                  <TableCell align="center" sx={CellStyle2}>
                    <Checkbox
                      color="primary"
                      // checked={handleClick}
                      onChange={handleClick}
                    />
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={CellStyle2}
                    style={{ minWidth: "150px" }}
                    >
                      name
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={CellStyle2}
                    style={{ minWidth: "150px" }}
                    >
                      role
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};

export default SendWelcome;
