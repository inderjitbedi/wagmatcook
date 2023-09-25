import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteModal from "../../Modals/DeleteModal";
import { RotatingLines } from "react-loader-spinner";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import httpClient from "../../api/httpClient";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useForm, Controller } from "react-hook-form";

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
const OALeaves = () => {
  const Navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const HandleOpen = () => {
    setOpen(true);
  };
  const HandleClose = () => {
    setOpen(false);

    setdescriptionLength(500);
    clearErrors();
    reset({});
  };
  //Delete Modal Delete
  const [openDelete, setOpenDelete] = useState(false);
  const HandleOpenDelete = () => setOpenDelete(true);
  const HandleCloseDelete = () => setOpenDelete(false);
  const [update, setUpdate] = useState(false);

  const [leavesData, setLeavesData] = useState([]);

  const [result, setResult] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [descriptionLength, setdescriptionLength] = useState(500);
  const [openThanks, setOpenThanks] = useState(false);
  const HandleOpenThanks = () => setOpenThanks(true);
  const HandleCloseThanks = () => setOpenThanks(false);
  const [anchorEl, setAnchorEl] = useState(false);
  const openMenu = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const FilterData = ["All", "Vacation", "Sick", "Time in Lieu", "Other"];
  const [searchValue, setSearchValue] = useState("");
  const [delayedSearchValue, setDelayedSearchValue] = useState("");
  const delayDuration = 1000; // Set the delay duration in milliseconds
  let searchTimer;
  const [Id, setId] = useState("");
  const HandleSearchCahnge = (e) => {
    setSearchValue(e.target.value);
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      setDelayedSearchValue(e.target.value);
    }, delayDuration);
  };
  const HandleLogout = () => {
    localStorage.clear();
    handleCloseMenu();
    Navigate("/");
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedData = Array.from(leaves);
    const [movedItem] = reorderedData.splice(result.source.index, 1);
    reorderedData.splice(result.destination.index, 0, movedItem);
    console.log("drag is working ");
    setLeaves(reorderedData);
    HandleReorder(reorderedData.map((item) => item._id)); // Update the API with the new order
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    margin: "0 10px 0 0 ",
    background: isDragging ? "#279AF1" : "#fff",

    // styles we need to apply on draggables
    ...draggableStyle,
  });
  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "#fff" : "#fff",
    padding: "2px",
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    reset,
    clearErrors,
  } = useForm({
    mode: "all",
    defaultValues: {
      name: "",
      description: "",
      maxCarryOver: "",
      isActive: false,
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
      HandleSubmitLeavesType(data);
    } else if (update && isEmptyObject(errors)) {
      HandleUpdate(data);
    }
    console.log("form submmited", data);
  };
  const GetLeavesType = () => {
    setIsLoading(true);
    let url = `/leave-type/list?page=1&limit=10&searchKey=${searchValue}`;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setResult(result);
          setLeaves(result.leaveTypes);
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error creating department. Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const HandleSubmitLeavesType = (data) => {
    let dataCopy = { ...data, order: leaves?.length + 1 };
    let url = `/leave-type/create`;

    setIsLoading(true);

    httpClient({
      method: "post",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          HandleClose();
          GetLeavesType();
          toast.success(result.message);
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error Submiting Job Details. Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const HandleUpdate = (data) => {
    let dataCopy = data;

    let url = `/leave-type/update/${Id}`;

    setIsLoading(true);

    httpClient({
      method: "put",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          setId("");
          GetLeavesType();
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
  const HandleDelete = () => {
    setIsLoading(true);
    let url = `/leave-type/delete/${Id}`;
    httpClient({
      method: "put",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          let FilteredArray = leaves.filter((data) => data._id !== Id);
          let ReorderArray = FilteredArray.map((data) => data._id);
          HandleReorder(ReorderArray);
          HandleCloseDelete();
          setId("");
          GetLeavesType();
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
  const HandleReorder = (reOrder) => {
    console.log(reOrder, "this reorder");
    let url = "/leave-type/reorder";

    httpClient({
      method: "put",
      url,
      data: { leaveTypes: reOrder },
    })
      .then(({ result, error }) => {
        if (result) {
          GetLeavesType();
        } else {
          ////toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error creating department. Please try again.");
      });
  };
  const HandleUpdateAction = (data) => {
    setUpdate(true);
    setId(data._id);
    setdescriptionLength(500 - data?.description?.length);
    reset({ name: data.name, description: data.description, maxCarryOver: data.maxCarryOver, isActive: data.isActive });
    HandleOpen();
  };
  const HandleOpenAddNewAction = () => {
    setUpdate(false);
    HandleOpen();
    reset({});
    clearErrors();
    setdescriptionLength(500);
  };
  useEffect(() => {
    GetLeavesType();
  }, [delayedSearchValue]);
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
        <MenuItem onClick={HandleLogout}>Logout</MenuItem>
      </Menu>
      <DepartmentFilterContainer style={{ marginBottom: "20px" }}>
        {/* <DepartmentFilterdiv>
            {FilterData.map((data) => (
              <DepartmentFilterButton>{data}</DepartmentFilterButton>
            ))}
          </DepartmentFilterdiv> */}
        <AddNewButton onClick={() => HandleOpenAddNewAction()}>
          Add New
        </AddNewButton>
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalUpperDiv style={{ padding: " 10px 16px 10px 35px" }}>
                  <ModalHeading>
                    {!update ? "Add New Leave" : "Update Leave Type"}
                  </ModalHeading>
                  <ModalIcon
                    onClick={() => {
                      HandleClose();
                    }}
                    src="/images/icons/Alert-Circle.svg"
                  />
                </ModalUpperDiv>

                <ModalUpperMid style={{ border: "none" }}>
                  <InputLabel>
                    Leave Type <InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Required",
                      },
                    })}
                    type="text"
                  />
                  <Errors>{errors.name?.message}</Errors>

                  <InputLabel>
                    Description <InputSpan>*</InputSpan>
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
                        message: "Details exceeds  500 characters ",
                      },
                      onChange: (value) => {
                        setdescriptionLength(500 - value.target.value.length);
                      },
                    })}
                  />
                  <InputPara>
                    {" "}
                    <Errors>{errors.description?.message}</Errors>{" "}
                    {descriptionLength > -1 ? descriptionLength : 0} characters
                    left
                  </InputPara>
                  <InputLabel>
                    Max carry-over <InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input
                    {...register("maxCarryOver", {
                      required: {
                        value: true,
                        message: "Required",
                      },
                      pattern: {
                        value: /^[+]?\d+(\.\d+)?$/,
                        message: "Please enter valid carry over",
                      },
                      validate: (fieldValue) => {
                        return (
                          (!isNaN(parseFloat(fieldValue)) &&
                            isFinite(fieldValue)) ||
                          "Must be a number "
                        );
                      },
                    })}
                    type="text"
                  />
                  <Errors>{errors.maxCarryOver?.message}</Errors>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "25px",
                      marginTop: "10px",
                    }}
                  >
                    <input
                      type="checkbox"
                      {...register("isActive", {})}
                      id="isEligible"
                    />
                    <InputLabel
                      htmlFor="isEligible"
                      style={{ marginBottom: "0px" }}
                    >
                      Is Active
                    </InputLabel>
                  </div>

                  {!update ? (
                    <AddNewButton
                      type="submit"
                      disabled={isLoading}
                      style={{ marginTop: "10px" }}
                    >
                      Add New
                    </AddNewButton>
                  ) : (
                    <AddNewButton
                      type="submit"
                      disabled={isLoading}
                      style={{ marginTop: "10px" }}
                    >
                      Update
                    </AddNewButton>
                  )}
                </ModalUpperMid>
              </form>
            )}
          </Box>
        </Modal>

        <Modal
          open={openThanks}
          onClose={HandleCloseThanks}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ModalThanks>
              <ModalThanksImg src="/images/success.jpg" />
              <ModalThanksHeading>
                Department added successfully.
              </ModalThanksHeading>
              <AddNewButton
                onClick={() => {
                  HandleCloseThanks();
                }}
              >
                {" "}
                Thanks
              </AddNewButton>
            </ModalThanks>
          </Box>
        </Modal>
      </DepartmentFilterContainer>
      <HeaderDiv>
        <HeaderTitle>Leaves List</HeaderTitle>
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
        <DragDropContext onDragEnd={onDragEnd}>
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
                    style={{ width: "20px" }}
                  >
                    Order&nbsp;No.
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    align="left"
                    style={{ width: "140px" }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    align="left"
                    style={{ width: "320px" }}
                  >
                    Description
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    align="left"
                    style={{ width: "90px" }}
                  >
                    Max&nbsp;Carry&nbsp;Over
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    align="left"
                    style={{ width: "30px" }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    align="center"
                    style={{ width: "30px" }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <Droppable droppableId="table">
                {(provided, snapshot) => (
                  <TableBody
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {leaves?.length === 0 && (
                      <TableRow sx={{ height: "200px" }}>
                        <TableCell align="center" colSpan={6}>
                          No leaves found
                        </TableCell>
                      </TableRow>
                    )}
                    {leaves?.map((data, index) => (
                      <Draggable
                        key={data._id}
                        draggableId={data._id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <TableRow
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                              background: "#fff",
                            }}
                          >
                            <TableCell sx={CellStyle2} align="left">
                              <MenuIconDiv>
                                <MenuIcon
                                  {...provided.dragHandleProps}
                                  src="/images/icons/Menu Dots.svg "
                                  style={{ cursor: "grab" }}
                                />
                                {data.order}
                              </MenuIconDiv>
                            </TableCell>
                            <TableCell sx={CellStyle} align="left">
                              {" "}
                              {data.name}{" "}
                            </TableCell>
                            <TableCell sx={CellStyle2} align="left">
                              {" "}
                              {data.description}{" "}
                            </TableCell>
                            <TableCell sx={CellStyle} align="left">
                              {" "}
                              {data.maxCarryOver}{" "}
                            </TableCell>
                            <TableCell sx={CellStyle2} align="left">
                              {" "}
                              <span
                                style={
                                  data.isActive ? ApprovedStyles : PendingStyle
                                }
                              >
                                {data.isActive ? "Active" : "Inactive"}
                              </span>{" "}
                            </TableCell>
                            <TableCell
                              sx={CellStyle2}
                              align="center"
                            //   style={{ maxWidth: "10px" }}
                            >
                              {" "}
                              <ActionIconDiv
                                style={{ justifyContent: "center" }}
                              >
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
                            {provided.placeholder}
                          </TableRow>
                        )}
                      </Draggable>
                    ))}
                  </TableBody>
                )}
              </Droppable>
            </Table>
          </TableContainer>
        </DragDropContext>
      )}
      <DeleteModal
        openDelete={openDelete}
        HandleCloseDelete={HandleCloseDelete}
        HandleDelete={HandleDelete}
        message="Are you sure you want to delete this leave type?"
        isLoading={isLoading}
      />
    </div>
  );
};

export default OALeaves;
