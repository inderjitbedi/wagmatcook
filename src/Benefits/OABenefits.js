import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import httpClient from "../api/httpClient";
import { toast } from "react-toastify";
import DeleteModal from "../Modals/DeleteModal";
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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import API_URLS from "../constants/apiUrls";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CommenDashHeader from "../Dashboard/CommenDashHeader";
import Pagination from "@mui/material/Pagination";

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
  PaginationDiv,
} from "../Disciplinary/DisciplinaryStyles";
const OABenefits = () => {
  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [Id, setId] = useState("");
  const [update, setUpdate] = useState(false);
  const [page, setPage] = useState(1);
  const HandleChangePage = (event, value) => {
    setPage(value);
  };
  // add new modal
  const [open, setOpen] = useState(false);
  const HandleOpen = () => setOpen(true);
  const HandleClose = () => {
    setOpen(false);
    setDetailsLength(500);
    clearErrors();
    reset({});
  };
  //Delete Modal Delete
  const [openDelete, setOpenDelete] = useState(false);
  const HandleOpenDelete = () => setOpenDelete(true);
  const HandleCloseDelete = () => setOpenDelete(false);
  const [detailsLength, setDetailsLength] = useState(500);

  const [searchValue, setSearchValue] = useState("");

  const HandleSearchCahnge = (data) => {
    setSearchValue(data);
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
      name: "",
      description: "",
    },
  });
  const [benefits, setBenefits] = useState([]);
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
  const HandleReorder = (reOrder) => {
    console.log(reOrder, "this reorder");
    let url = API_URLS.reorderBenefits;

    httpClient({
      method: "put",
      url,
      data: { benefits: reOrder },
    })
      .then(({ result, error }) => {
        if (result) {
          GetBenefits();
        } else {
          ////toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error creating department. Please try again.");
      });
  };
  const GetBenefits = () => {
    setIsLoading(true);
    let url = API_URLS.getOaBenefits
      .replace("searchValue", searchValue)
      .replace("Page", page);
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setResult(result);
          setBenefits(result.benefits);
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
    GetBenefits();
  }, [searchValue, page]);

  const HandleSubmit = (data) => {
    // e.preventDefault();
    setIsLoading(true);
    let url = API_URLS.createBenefits;

    setIsLoading(true);
    let dataCopy = { ...data, order: benefits?.length + 1 };
    httpClient({
      method: "post",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          HandleClose();
          reset();
          toast.success(result.message);
          GetBenefits();
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
    let url = API_URLS.deleteBenefits.replace(":id", Id);
    httpClient({
      method: "put",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          let FilteredArray = benefits.filter((data) => data._id !== Id);
          let ReorderArray = FilteredArray.map((data) => data._id);
          HandleReorder(ReorderArray);
          HandleCloseDelete();
          setId("");
          GetBenefits();
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
    console.log("update Data:", data);
    let dataCopy = data;

    let url = API_URLS.updateBenefits.replace(":id", Id);

    setIsLoading(true);

    httpClient({
      method: "put",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          setId("");
          GetBenefits();
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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 446,
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 45,
    padding: "2rem 0rem",
    borderRadius: "0.8rem",
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

  const HandleUpdateAction = (data) => {
    setUpdate(true);
    setId(data._id);
    setDetailsLength(500 - data?.description?.length);
    reset({ name: data.name, description: data.description });
    HandleOpen();
  };
  const HandleOpenAddNewAction = () => {
    setUpdate(false);
    HandleOpen();
    reset({});
    clearErrors();
    setDetailsLength(500);
  };
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedData = Array.from(benefits);
    const [movedItem] = reorderedData.splice(result.source.index, 1);
    reorderedData.splice(result.destination.index, 0, movedItem);
    console.log("drag is working ");
    setBenefits(reorderedData);
    HandleReorder(reorderedData.map((item) => item._id));
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    margin: "0 1rem 0 0 ",
    background: isDragging ? "#279AF1" : "#fff",

    // styles we need to apply on draggables
    ...draggableStyle,
  });
  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "#fff" : "#fff",
    padding: "2px",
  });
  return (
    <>
      <CommenDashHeader onSearch={HandleSearchCahnge} text={"Benefits"} />

      <DisciplinaryDiv>
        <DisciplinaryHeading>All Benefits</DisciplinaryHeading>
        <AddNewButton
          onClick={() => {
            HandleOpenAddNewAction();
          }}
        >
          Add New
        </AddNewButton>
        <Modal
          open={open}
          sx={{
            backgroundColor: "rgb(27, 27, 27, 0.75)",
            backdropFilter: "blur(0.8rem)",
          }}
          // onClose={() => {
          //   HandleClose();
          //   clearErrors();
          //   reset({});
          //   setUpdate(false);
          // }}
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
                    {!update ? "Add Benefit" : "Update Benefit"}
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
                      Benefit Name <InputSpan>*</InputSpan>
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
                          message: "Details exceeds 500 characters ",
                        },
                        // minLength: {
                        //   value: 10,
                        //   message: "Atleast write  10 characters ",
                        // },
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
                    </InputPara>

                    {!update ? (
                      <AddNewButton
                        type="submit"
                        disabled={isLoading}
                        style={{ marginTop: "2.5rem" }}
                      >
                        Submit
                      </AddNewButton>
                    ) : (
                      <AddNewButton
                        type="submit"
                        disabled={isLoading}
                        style={{ marginTop: "2.5rem" }}
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
        <>
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
                      style={{ width: "2rem" }}
                    >
                      Order&nbsp;No.
                    </TableCell>
                    <TableCell
                      sx={CellHeadStyles}
                      style={{ minWidth: "20rem" }}
                      align="left"
                    >
                      Benefit Name
                    </TableCell>
                    <TableCell
                      sx={CellHeadStyles}
                      style={{ minWidth: "45rem" }}
                      align="left"
                    >
                      Description
                    </TableCell>

                    <TableCell
                      sx={CellHeadStyles}
                      style={{ minWidth: "10rem" }}
                      align="left"
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
                      {!result.benefits?.length && (
                        <TableRow sx={{ height: "20rem" }}>
                          <TableCell align="center" colSpan={3}>
                            No benefits found
                          </TableCell>
                        </TableRow>
                      )}
                      {benefits?.map((data, index) => (
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
                              key={data._id}
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
                                {data.name}
                              </TableCell>
                              <TableCell sx={CellStyle2} align="left">
                                {data.description}
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
                          )}
                        </Draggable>
                      ))}
                    </TableBody>
                  )}
                </Droppable>
              </Table>
            </TableContainer>
          </DragDropContext>
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

      <DeleteModal
        openDelete={openDelete}
        HandleCloseDelete={HandleCloseDelete}
        HandleDelete={HandleDelete}
        message="Are you sure you want to delete this benefit?"
        isLoading={isLoading}
      />
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
    </>
  );
};

export default OABenefits;
