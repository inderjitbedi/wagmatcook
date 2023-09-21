import React, { useState, useEffect } from "react";
import httpClient from "../../api/httpClient";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteModal from "../../Modals/DeleteModal";
import {
  DashHeader,
  DashHeaderTitle,
  DashHeaderSearch,
  SearchBox,
  SearchInput,
  SearchIcon,
  DashNotification,
} from "../../Dashboard/OADashboard/OADashBoardStyles";

import {
  AddNewButton,
  DisciplinaryDiv,
  DisciplinaryHeading,
  MenuIcon,
  MenuIconDiv,
  ActionIconDiv,
  ActionIcons,
  ModalUpperDiv,
  ModalHeading,
  ModalIcon,
  ModalUpperMid,
  Input,
  TextArea,
  InputLabel,
  InputSpan,
  InputPara,
  Select,
  Option,
  Errors,
  LoadMore,
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
  textTransform: "capitalize",
};
const CellStyle2 = {
  color: "#222B45",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "15px",
};
const EmployeeTypes = () => {
  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [detailsLength, setDetailsLength] = useState(500);

  const [result, setResult] = useState([]);
  const [Id, setId] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [delayedSearchValue, setDelayedSearchValue] = useState("");
  const delayDuration = 1000; // Set the delay duration in milliseconds
  let searchTimer;

  const [openDelete, setOpenDelete] = useState(false);
  const HandleOpenDelete = () => setOpenDelete(true);
  const HandleCloseDelete = () => setOpenDelete(false);
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
  const {
    register,
    clearErrors,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      name:""
    },
  });

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
    } else if (update && isEmptyObject(errors)) {
      HandleUpdate(data);
    }
  };
  const GetEmployeeTypes = () => {
    setIsLoading(true);
    let url = `/employee-type/list?page=1&limit=10&searchKey=${searchValue}`;
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
  const [open, setOpen] = useState(false);
  const HandleOpen = () => setOpen(true);
  const HandleClose = () => {
    setOpen(false);
    setDetailsLength(500);
    clearErrors();
    reset({});
    console.log("working");
  };
  const HandleUpdateAction = (data) => {
    setUpdate(true);
    setId(data._id);
    setDetailsLength(500 - data?.description?.length);
    reset({name:data.name});
    HandleOpen();
  };
  const HandleOpenAddNewAction = () => {
    HandleOpen();
    reset({});
    clearErrors();
    setDetailsLength(500);
  };
  const HandleSubmit = (data) => {
    // e.preventDefault();
    setIsLoading(true);
    let url = "/employee-type/create";

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
          reset();
          toast.success(result.message); //Benefit created successfully.");
          GetEmployeeTypes();
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error feteching benefits. Please try again.");
        HandleClose();
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const HandleDelete = () => {
    setIsLoading(true);
    let url = `/employee-type/delete/${Id}`;
    httpClient({
      method: "put",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          HandleCloseDelete();
          setId("");
          GetEmployeeTypes();
          toast.success(result.message); //Benefit deleted successfully.");
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error Deleting Benefits. Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const HandleUpdate = (data) => {
    let dataCopy = data;

    let url = `/employee-type/update/${Id}`;

    setIsLoading(true);

    httpClient({
      method: "put",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          setId("");
          GetEmployeeTypes();
          setUpdate(false);
          HandleClose();
          reset();
          toast.success(result.message); //Entry Updated Successfully");
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
  useEffect(() => {
    GetEmployeeTypes();
  }, [delayedSearchValue]);
  return (
    <>
      <DashHeader>
        <DashHeaderTitle>Employee Types</DashHeaderTitle>
        <DashHeaderSearch>
          <SearchBox>
            <SearchInput
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => HandleSearchCahnge(e)}
            ></SearchInput>
            <SearchIcon src="/images/icons/searchIcon.svg" />
          </SearchBox>
          <DashNotification src="/images/icons/Notifications.svg" />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              gap: "5px",
            }}
            onClick={(event) => handleClickMenu(event)}
          >
            <DashNotification src="/images/icons/Logout.svg" />
            <img
              src="/images/icons/arrowdown.svg"
              style={{
                width: "5px",
                height: "9px",
                transform: anchorEl ? "rotate(180deg)" : undefined,
              }}
            />
          </div>
        </DashHeaderSearch>
      </DashHeader>
      <DisciplinaryDiv>
        <DisciplinaryHeading>All Employee Types</DisciplinaryHeading>
        <AddNewButton
          onClick={() => {
            HandleOpenAddNewAction();
          }}
        >
          Add New
        </AddNewButton>
        <Modal
          open={open}
          onClose={() => {
            HandleClose();
            clearErrors();
            reset({});
            setUpdate(false);
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
                <ModalUpperDiv>
                  <ModalHeading>
                    {!update ? "Add Employee Type" : "Update Employee Type"}
                  </ModalHeading>
                  <ModalIcon
                    onClick={() => {
                      HandleClose();
                      setUpdate(false);
                      clearErrors();
                      reset({});
                    }}
                    src="/images/icons/Alert-Circle.svg"
                  />
                </ModalUpperDiv>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <ModalUpperMid>
                    <InputLabel>
                      Employee Type <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="text"
                      {...register("name", {
                        required: {
                          value: true,
                          message: "Required",
                        },
                      })}
                    />
                    {errors.name && <Errors>{errors.name?.message}</Errors>}
                    {/* <InputLabel>
                  Description  <InputSpan>*</InputSpan>
                </InputLabel>
                <TextArea
                  type="text"
                  {...register("description", {
                    required: {
                      value: true,
                      message: "Required",
                    },
                    maxLength: {
                      value: 500,
                      message: "Details exceeds 500 characters ",
                    },

                    onChange: (value) => {
                      setDetailsLength(500 - value.target.value.length);
                    },
                  })}
                />

                <InputPara>
                  {" "}
                  {<Errors>{errors.description?.message}</Errors>}{" "}
                  <span style={{ justifySelf: "flex-end" }}>
                    {" "}
                    {detailsLength > -1 ? detailsLength : 0} characters left
                  </span>
                </InputPara> */}

                    {!update ? (
                      <AddNewButton
                        type="submit"
                        disabled={isLoading}
                        style={{ marginTop: "25px" }}
                      >
                        Submit
                      </AddNewButton>
                    ) : (
                      <AddNewButton
                        type="submit"
                        disabled={isLoading}
                        style={{ marginTop: "25px" }}
                      >
                        Update
                      </AddNewButton>
                    )}
                  </ModalUpperMid>
                </form>
              </>
            )}
          </Box>
        </Modal>
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
                  style={{ minWidth: "300px" }}
                  align="left"
                >
                  Employee Type
                </TableCell>
                <TableCell
                  sx={CellHeadStyles}
                  style={{ minWidth: "500px" }}
                  align="left"
                >
                  {/* Description */}
                </TableCell>

                <TableCell
                  sx={CellHeadStyles}
                  style={{ minWidth: "100px" }}
                  align="left"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!result.employeeTypes?.length && (
                <TableRow sx={{ height: "200px" }}>
                  <TableCell align="center" colSpan={3}>
                    No Employee Types Found
                  </TableCell>
                </TableRow>
              )}
              {result?.employeeTypes?.map((data, index) => (
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                    background: "#fff",
                  }}
                  key={data._id}
                >
                  <TableCell sx={CellStyle} align="left">
                    {data.name}
                  </TableCell>
                  <TableCell sx={CellStyle2} align="left">
                    {/* {data.description} */}
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
      )}
      <DeleteModal
        openDelete={openDelete}
        HandleCloseDelete={HandleCloseDelete}
        HandleDelete={HandleDelete}
        message="Are you sure you want to delete this Employee Type?"
        isLoading={isLoading}
      />
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
    </>
  );
};

export default EmployeeTypes;
