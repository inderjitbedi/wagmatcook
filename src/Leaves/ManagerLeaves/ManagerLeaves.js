import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";


import {
  DashHeader,
  DashHeaderTitle,
  SearchBox,
  SearchInput,
  DashHeaderSearch,
  SearchIcon,
  Pagination,
  PaginationButton,
} from "../../Dashboard/OADashboard/OADashBoardStyles";
import {
  DashHeaderDepartment,
  DepartmentIconContainer,
  DepartmentIconImg,
  DepartmentFilterContainer,
  AddNewButton,
  DepartmentFilterdiv,
  DepartmentFilterButton,
  DepartmentCardContainer,
  DepartmentCardDiv,
  DepartmentCardImg,
  DepartmentCardPara,
  DepartmentCardParaLit,
  DepartmentCardButtoncolor,
  DepartmentCardButtongrey,
  DepartmentButtonContainer,
  ModalUpperDiv,
  ModalHeading,
  ModalIcon,
  ModalUpperMid,
  ModalBottom,
  CancelButton,
  Input,
  TextArea,
  ModalThanks,
  ModalThanksImg,
  ModalThanksHeading,
  Errors,
  LoadMore,
  InputPara,
} from "../../Departments/DepartmentsStyles";
import {
  InputLabel,
  InputSpan,
  DisciplinaryDiv,
  DisciplinaryHeading,
  MenuIcon,
  MenuIconDiv,
  ActionIconDiv,
  ActionIcons,
  HeaderDiv,
  HeaderTitle,
  TabelDarkPara,
  TabelLightPara,
  TabelDiv,
  TabelImg,
} from "../../Disciplinary/DisciplinaryStyles";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 446,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 45,
  padding: "0px 0px",
  borderRadius: "8px",
};
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
  background: "#C8FFC7",
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
const ManagerLeaves = () => {
  const Navigate = useNavigate();

  const Data = [1, 2, 3, 4, 5, 6, 7, 8];
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div>
      <DashHeader>
        <DashHeaderDepartment>
          <DashHeaderTitle>Leaves</DashHeaderTitle>
        </DashHeaderDepartment>

        <DepartmentIconContainer>
          <DashHeaderSearch>
            <SearchBox>
              <SearchInput
                type="text"
                placeholder="Search..."
                onChange={HandleSearchCahnge}
                value={searchValue}
              ></SearchInput>
              <SearchIcon src="/images/icons/searchIcon.svg" />
            </SearchBox>
          </DashHeaderSearch>
          {/* <DepartmentIconImg src="/images/icons/Messages.svg" /> */}
          <DepartmentIconImg src="/images/icons/Notifications.svg" />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              gap: "5px",
            }}
            onClick={(event) => handleClickMenu(event)}
          >
            {" "}
            <DepartmentIconImg src="/images/icons/Logout.svg" />
            <img
              src="/images/icons/arrowdown.svg"
              style={{
                width: "5px",
                height: "9px",
                transform: anchorEl ? "rotate(180deg)" : undefined,
              }}
            />
          </div>
        </DepartmentIconContainer>
      </DashHeader>
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
        <MenuItem
          style={{
            color: "#222B45",
            fontFamily: "Inter",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "20px",
          }}
        >
          Settings
        </MenuItem>
        <MenuItem
          onClick={HandleLogout}
          style={{
            color: "#EA4335",
            fontFamily: "Inter",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "20px",
          }}
        >
          Logout
        </MenuItem>
      </Menu>
      <HeaderDiv>
        <HeaderTitle>All Leaves</HeaderTitle>
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
                  Department
                </TableCell>
                <TableCell
                  sx={{ ...CellStyle, maxWidth: "114px" }}
                  align="left"
                >
                  From
                </TableCell>
                <TableCell sx={{ ...CellStyle, maxWidth: "88px" }} align="left">
                  To
                </TableCell>
                <TableCell
                  sx={{ ...CellStyle, maxWidth: "105px" }}
                  align="left"
                >
                  Leave&nbsp;Type
                </TableCell>
                <TableCell sx={{ ...CellStyle }} align="left">
                  Hours
                </TableCell>
                <TableCell sx={{ ...CellStyle }} align="left">
                  Status
                </TableCell>
                <TableCell sx={{ ...CellStyle }} align="left">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Data?.length == 0 && (
                <TableRow sx={{ height: "200px" }}>
                  <TableCell align="center" colSpan={7}>
                    No Leaves found
                  </TableCell>
                </TableRow>
              )}
              {Data?.map((data, index) => (
                <TableRow
                  key={data.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  style={{ background: "#fff" }}
                >
                  <TableCell align="center" sx={CellStyle2}>
                    {index + 1}
                  </TableCell>
                  <TableCell align="left" sx={CellStyle2}>
                    <TabelDiv>
                      <TabelImg src={"/images/User.jpg"} />
                      <div>
                        <TabelDarkPara> Baki Hanma</TabelDarkPara>
                        <TabelLightPara style={{ textTransform: "none" }}>
                          Smaple@email.com
                        </TabelLightPara>
                      </div>
                    </TabelDiv>
                  </TableCell>
                  <TableCell align="left" sx={CellStyle2}>
                    Design
                  </TableCell>
                  <TableCell align="left" sx={CellStyle2}>
                    20/09/2002
                  </TableCell>
                  <TableCell align="left" sx={CellStyle2}>
                    20/09/2022
                  </TableCell>
                  <TableCell align="left" sx={CellStyle2}>
                    Lieu Time
                  </TableCell>
                  <TableCell align="left" sx={CellStyle2}>
                    2
                  </TableCell>
                  <TableCell align="left" sx={CellStyle2}>
                    <span style={ApprovedStyles}>Approved</span>
                  </TableCell>
                  <TableCell align="left" sx={CellStyle2}>
                    <ActionIconDiv style={{ justifyContent: "center" }}>
                      <ActionIcons
                        // onClick={() =>
                        //   Navigate(
                        //     `/organization-admin/employee/details/personal-info/${data._id}`
                        //   )
                        // }
                        src="/images/icons/eye.svg"
                      />
                    </ActionIconDiv>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default ManagerLeaves;
