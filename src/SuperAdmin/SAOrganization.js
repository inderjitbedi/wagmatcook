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
import CommenDashHeader from "../Dashboard/CommenDashHeader";
import { useForm, Controller } from "react-hook-form";
import DeleteModal from "../Modals/DeleteModal";
import styled from "styled-components";

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
  SearchBarWrapper,
  SearchInputMobile,
  SearchButton,
} from "./SAStyles";
import API_URLS from "../constants/apiUrls";
import { useNavigate } from "react-router-dom";
import { DepartmentIconImg } from "../Departments/DepartmentsStyles";
import { HiOutlineMenu } from "react-icons/hi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: " 44.6rem",
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
const SAOrganization = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const HandleOpenDelete = () => setOpenDelete(true);
  const HandleCloseDelete = () => setOpenDelete(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [Id, setId] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const toggleSearchBar = () => {
    setExpanded(!expanded);
    setSearchValue("");
  };
  const HandleOpen = () => {
    setOpen(true);
  };
  const {
    register,
    clearErrors,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  const HandleClose = () => {
    reset({});
    clearErrors();
    setOpen(false);
  };
  // const [organizationData, setOrganization] = useState([]);
  const [result, setResult] = useState([]);
  const [userId, setUserId] = useState("");
  // getting list of organization list from a api
  const onSubmit = (data) => {
    function isEmptyObject(obj) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          return false;
        }
      }
      return true;
    }
    if (isEmptyObject(errors) && !update) {
      HandleSubmit(data);
    } else if (update) {
      HandleUpdate(data);
    }
  };

  const GetOrganizationList = () => {
    setIsLoading(true);

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
  const HandleUpdate = (data) => {
    setIsLoading(true);
    let dataCopy = data;

    let url = API_URLS.updateSuperAdmin
      .replace(":organizationid", Id)
      .replace(":userid", userId);

    httpClient({
      method: "put",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          setId("");
          GetOrganizationList();
          setUserId("");
          setUpdate(false);
          HandleClose();
          reset();
          toast.success(result.message, {
            className: "toast",
          }); //Entry Updated Successfully");
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error Updating Benefits . Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const HandleSubmit = (data) => {
    let url = API_URLS.adminInviteOrganizationAdmin;

    setIsLoading(true);

    let dataCopy = data;
    httpClient({
      method: "post",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          HandleClose();
          GetOrganizationList();
          toast.success(result.message, {
            className: "toast",
          });
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
  };

  const HandleUpdateAction = (data) => {
    setUpdate(true);
    setId(data?._id);
    setUserId(data?.primaryUser?._id);
    reset({
      name: data?.name,
      email: data?.primaryUser?.email,
    });
    HandleOpen();
  };
  const HandleOpenAddNewAction = () => {
    setUpdate(false);
    HandleOpen();
    reset({});
    clearErrors();
    setId("");
    setUserId("");
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
  const SidebarWrapper = styled.div`
    display: none;
    @media only screen and (max-width: 1200px) {
      display: block;
      width: 25rem;
      background-color: #ffffff;
      height: 100vh;
      position: fixed;
      top: 0;
      right: 0;
      transition: width 0.3s;
      z-index: 100000;
      overflow-y: scroll;
    }
  `;
  const SidebarContainer = () => {
    return (
      <SidebarWrapper>
        {" "}
        <SASideBar
          ToggleSidebar={ToggleSidebar}
          screenWidth={screenWidth}
        />{" "}
      </SidebarWrapper>
    );
  };
  useEffect(() => {
    GetOrganizationList();
  }, []);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const ToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "38rem",
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
          {isSidebarOpen && <SidebarContainer />}
          <DashHeader>
            <DashHeaderTitle>
              {screenWidth < 1200 ? (
                <span>Wagmatcook</span>
              ) : (
                "Organization List"
              )}{" "}
            </DashHeaderTitle>
            <DashHeaderSearch>
              {screenWidth < 600 ? (
                <SearchBarWrapper expanded={expanded}>
                  <SearchInputMobile
                    type="text"
                    placeholder="Search..."
                    expanded={expanded}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <SearchButton onClick={toggleSearchBar}>
                    {expanded ? (
                      <SearchIcon src="/images/icons/Alert-Circle.svg" />
                    ) : (
                      <SearchIcon src="/images/icons/searchIcon.svg" />
                    )}
                  </SearchButton>
                </SearchBarWrapper>
              ) : (
                <SearchBox>
                  <SearchInput
                    type="text"
                    placeholder="Search..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  ></SearchInput>
                  <SearchIcon src="/images/icons/searchIcon.svg" />
                </SearchBox>
              )}
              {/* <DashNotification src="/images/icons/Notifications.svg" /> */}
              {screenWidth < 1200 ? (
                ""
              ) : (
                <DepartmentIconImg
                  style={{ cursor: "pointer" }}
                  onClick={(event) => handleClickMenu(event)}
                  src="/images/icons/PersonIcon.svg"
                />
              )}
              {screenWidth < 1200 && (
                <HiOutlineMenu
                  onClick={ToggleSidebar}
                  style={{ width: "3rem", height: "3rem", cursor: "pointer" }}
                />
              )}
            </DashHeaderSearch>
          </DashHeader>
          <Menu
            sx={{ margin: "0rem" }}
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
                fontSize: "1.4rem",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "2rem",
              }}
            >
              Settings
            </MenuItem>
            <MenuItem
              onClick={HandleLogout}
              style={{
                color: "#EA4335",
                fontFamily: "Inter",
                fontSize: "1.4rem",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "2rem",
              }}
            >
              Logout
            </MenuItem>
          </Menu>
          <DisciplinaryDiv>
            <DisciplinaryHeading>All Organizations</DisciplinaryHeading>
            <AddNewButton
              onClick={HandleOpenAddNewAction}
              style={{ margin: 0 }}
            >
              Add New
            </AddNewButton>
          </DisciplinaryDiv>
          <Modal
            open={open}
            // onClose={HandleClose}
            sx={{
              backgroundColor: "rgb(27, 27, 27, 0.75)",
              backdropFilter: "blur(8px)",
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {isLoading ? (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    height: "38rem",
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
                    <ModalHeading>
                      {update
                        ? "Update Organization Admin "
                        : "Invite Organization Admin "}
                    </ModalHeading>
                    <ModalIcon
                      onClick={() => {
                        HandleClose();
                      }}
                      src="/images/icons/Alert-Circle.svg"
                    />
                  </ModalUpperDiv>
                  <ModalUpperMid>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <InputLabel>
                        Organization Name <InputSpan>*</InputSpan>
                      </InputLabel>
                      <Input
                        type="text"
                        {...register("name", {
                          required: {
                            value: true,
                            message: "Required",
                          },
                        })}
                        placeholder="Organization Name"
                      />
                      {errors.name && (
                        <span className="error">{errors.name.message}</span>
                      )}
                      <InputLabel>
                        Email <InputSpan>*</InputSpan>
                      </InputLabel>
                      <Input
                        type="text"
                        {...register("email", {
                          required: {
                            value: true,
                            message: "Required",
                          },
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Please enter a valid email",
                          },
                        })}
                        placeholder="email@gmail.com"
                      />
                      {errors.email && (
                        <span className="error">{errors.email.message}</span>
                      )} 
                      <AddNewButton>
                        {update ? "Update" : "Invite"}
                      </AddNewButton>
                    </form>
                  </ModalUpperMid>
                </>
              )}
            </Box>
          </Modal>
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
                    Sr.&nbsp;No.
                  </TableCell>
                  <TableCell
                    sx={{ ...CellHeadStyles, minWidth: "25rem" }}
                    align="left"
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{ ...CellHeadStyles, minWidth: "18rem" }}
                    align="left"
                  >
                    Email
                  </TableCell>
                  <TableCell
                    sx={{ ...CellHeadStyles, minWidth: "15rem" }}
                    align="left"
                  >
                    Has Signed Up?
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "12rem" }}
                    align="left"
                  >
                    Action
                  </TableCell>
                  {/* <TableCell
                sx={{ ...CellHeadStyles, minWidth: "150rem" }}
                align="left"
              >
                Action
              </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {result?.organizations?.length === 0 && (
                  <TableRow>
                    <TableCell rowSpan={5}>No organizations found</TableCell>
                  </TableRow>
                )}
                {result?.organizations?.map((data, index) => (
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      background: "#fff",
                    }}
                  >
                    <TableCell sx={CellStyle2} align="left">
                      {index + 1}
                    </TableCell>
                    <TableCell sx={CellStyle} align="left">
                      {data.name}
                    </TableCell>
                    <TableCell sx={CellStyle2} align="left">
                      {data.primaryUser?.email || "-"}
                    </TableCell>
                    <TableCell sx={CellStyle} align="left">
                      {data.primaryUser?.isSignedup ? "Yes" : "No"}
                    </TableCell>
                    <TableCell sx={CellStyle2} align="left">
                      {" "}
                      <ActionIconDiv>
                        <ActionIcons
                          onClick={() => {
                            HandleUpdateAction(data);
                          }}
                          src="/images/icons/Pendown.svg"
                        />

                        <ActionIcons
                          onClick={() => {
                            HandleOpenDelete();
                            setId(data._id);
                          }}
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
        </>
      )}
      <DeleteModal
        openDelete={openDelete}
        message="Are you sure you want to delete this organization admin?"
        HandleCloseDelete={HandleCloseDelete}
        isLoading={isDeleting}
        // HandleDelete={HandleDelete}
      />
    </>
  );
};

export default SAOrganization;
