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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { RotatingLines } from "react-loader-spinner";

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
import API_URLS from "../constants/apiUrls";
import { useNavigate } from "react-router-dom";
import { DepartmentIconImg } from "../Departments/DepartmentsStyles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 446,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 45,
  padding: "20px 0px",
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
const SAOrganization = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const HandleOpen = () => {
    setErrors({
      nameError: "",
      emailError: "",
    });
    setOpen(true);
  };
  const HandleClose = () => setOpen(false);
  // const [organizationData, setOrganization] = useState([]);
  const [result, setResult] = useState([]);
  // getting list of organization list from a api
  const [formData, setFormData] = useState([
    {
      name: "",
      email: "",
    },
  ]);
  const [errors, setErrors] = useState([
    {
      nameError: "",
      emailError: "",
    },
  ]);
  const HandleChanges = (e) => {
    const { value, name } = e.target;

    if (name === "name") {
      if (!value) {
        setErrors({ ...errors, nameError: "Required" });
        // } else if (!/^[A-Za-z\s]+$/.test(value)) {
        //   setErrors({
        //     ...errors,
        //     nameError: "Name must not contain numbers or special characters",
        //   });
      } else {
        setErrors({ ...errors, nameError: "" });
      }
    }

    if (name === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailPattern.test(value);
      if (!value) {
        setErrors({ ...errors, emailError: "Required" });
      } else if (isValid) {
        setErrors({ ...errors, emailError: "" });
      } else {
        setErrors({ ...errors, emailError: "Invalid email address" });
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  const GetOrganizationList = () => {
    setIsLoading(true);

    console.log("called");
    let url = `${API_URLS.adminOrganizationList}?page=1&limit=10`;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setResult(result);
          setIsLoading(false);
        } else {
          //toast.warn("something went wrong ");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error creating department. Please try again.");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    GetOrganizationList();
  }, []);

  const HandleSubmit = (e) => {
    e.preventDefault();
    let url = API_URLS.adminInviteOrganizationAdmin;
    if (!formData.name) {
      setErrors((prevState) => {
        return {
          ...prevState,
          nameError: "Required",
        };
      });
    } else {
      setErrors({ ...errors, nameError: "" });
    }
    if (!formData.email) {
      setErrors((prevState) => {
        return {
          ...prevState,

          emailError: "Required",
        };
      });
    } else {
      setErrors({ ...errors, emailError: "" });
    }
    if (
      formData.name &&
      formData.email &&
      !errors.nameError &&
      !errors.emailError
    ) {
      setIsLoading(true);

      let dataCopy = formData;
      httpClient({
        method: "post",
        url,
        data: dataCopy,
      })
        .then(({ result, error }) => {
          if (result) {
            HandleClose();
            GetOrganizationList();
            setFormData("");
            setErrors("");
            toast.success(result.message);
            setIsLoading(false);
          } else {
            //toast.warn("Something went wrong.");
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Error creating Disciplinary. Please try again.");
          setIsLoading(false);
        });
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
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
    navigate("/");
  };
  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "380px",
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
        <>
          <DashHeader>
            <DashHeaderTitle>Organization List</DashHeaderTitle>
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
              <DepartmentIconImg
                style={{ cursor: "pointer" }}
                onClick={(event) => handleClickMenu(event)}
                src="/images/icons/PersonIcon.svg"
              />
            </DashHeaderSearch>
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
            <MenuItem onClick={HandleLogout}>Logout</MenuItem>
          </Menu>
          <DisciplinaryDiv>
            <DisciplinaryHeading>All Organizations</DisciplinaryHeading>
            <AddNewButton onClick={HandleOpen}>Add New</AddNewButton>
            <Modal
              open={open}
              onClose={HandleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                {isLoading ? (
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      height: "380px",
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
                  <>
                    <ModalUpperDiv>
                      <ModalHeading>Invite Organization Admin</ModalHeading>
                      <ModalIcon
                        onClick={() => {
                          HandleClose();
                        }}
                        src="/images/icons/Alert-Circle.svg"
                      />
                    </ModalUpperDiv>
                    <ModalUpperMid>
                      <InputLabel>
                        Organization Name <InputSpan>*</InputSpan>
                      </InputLabel>
                      <Input
                        type="text"
                        name="name"
                        onChange={HandleChanges}
                        value={formData.name}
                        placeholder="Organization Name"
                      />
                      {errors.nameError && (
                        <span className="error">{errors.nameError}</span>
                      )}
                      <InputLabel>
                        Email <InputSpan>*</InputSpan>
                      </InputLabel>
                      <Input
                        type="Email"
                        name="email"
                        onChange={HandleChanges}
                        value={formData.email}
                        placeholder="email@gmail.com"
                      />
                      {errors.emailError && (
                        <span className="error">{errors.emailError}</span>
                      )}
                      <AddNewButton
                        onClick={(e) => {
                          HandleSubmit(e);
                        }}
                      >
                        Invite
                      </AddNewButton>
                    </ModalUpperMid>
                  </>
                )}
              </Box>
            </Modal>
          </DisciplinaryDiv>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow
                  sx={{
                    background: "#FBFBFB",
                  }}
                >
                  <TableCell
                    sx={{ ...CellHeadStyles, minWidth: "250px" }}
                    align="left"
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{ ...CellHeadStyles, minWidth: "180px" }}
                    align="left"
                  >
                    Email
                  </TableCell>
                  <TableCell
                    sx={{ ...CellHeadStyles, minWidth: "150px" }}
                    align="left"
                  >
                    Has Signed Up?
                  </TableCell>
                  {/* <TableCell
                sx={{ ...CellHeadStyles, minWidth: "150px" }}
                align="left"
              >
                Action
              </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {result?.organizations?.length == 0 && (
                  <TableRow>
                    <TableCell rowSpan={3}>No organizations found</TableCell>
                  </TableRow>
                )}
                {result.organizations?.map((data) => (
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      background: "#fff",
                    }}
                  >
                    <TableCell sx={CellStyle} align="left">
                      {data.name}
                    </TableCell>
                    <TableCell sx={CellStyle2} align="left">
                      {data.primaryUser?.email || "-"}
                    </TableCell>
                    <TableCell sx={CellStyle} align="left">
                      {data.primaryUser?.isSignedup ? "Yes" : "No"}
                    </TableCell>
                    {/* <TableCell sx={CellStyle2} align="left">
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
                </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <AddNewButton onClick={HandleLoadMore} style={{ marginTop: "10px" }}>
          Load More
        </AddNewButton> */}
        </>
      )}
    </>
  );
};

export default SAOrganization;
