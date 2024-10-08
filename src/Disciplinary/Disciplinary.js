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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useNavigate, useLocation } from "react-router";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CommenDashHeader from "../Dashboard/CommenDashHeader";
import Pagination from "@mui/material/Pagination";
import ROLES from "../constants/roles";
import { useForm } from "react-hook-form";

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
} from "./DisciplinaryStyles";
import API_URLS from "../constants/apiUrls";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "44.6rem",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 45,
  // padding: "2rem 0rem",
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

const Disciplinary = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const [userType, setUserType] = useState("");

  //Delete Modal Delete
  const [openDelete, setOpenDelete] = useState(false);
  const HandleOpenDelete = () => setOpenDelete(true);
  const HandleCloseDelete = () => setOpenDelete(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const HandleChangePage = (event, value) => {
    setPage(value);
  };
  const [Id, setId] = useState("");
  const [result, setResult] = useState([]);
  const [detailsLength, setDetailsLength] = useState(500);
  const [update, setUpdate] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const [disciplinaryData, setDisciplinaryData] = useState([]);
  const [open, setOpen] = useState(false);
  const HandleOpen = () => setOpen(true);
  const HandleClose = () => {
    setOpen(false);
    setDetailsLength(500);
    clearErrors();
    reset({});
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
  //Delete function
  const HandleDelete = () => {
    setIsLoading(true);

    let url = API_URLS.deleteDisciplinary.replace(":id", Id);
    httpClient({
      method: "put",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          let FilteredArray = disciplinaryData.filter(
            (data) => data._id !== Id
          );
          let ReorderArray = FilteredArray.map((data) => data._id);
          HandleReorder(ReorderArray);
          setId("");
          HandleCloseDelete();

          toast.success(result.message, {
            className: "toast",
          }); //"Entry Deleted Successfully");
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
  // get disciplinary
  const GetDisciplinary = (role) => {
    setIsLoading(true);
    var url = "";
    if (role === ROLES.SUPER_ADMIN) {
      url = API_URLS.getSADisciplinary
        .replace("Page", page)
        .replace("searchValue", searchValue);
    } else {
      url = API_URLS.getDisciplinary
        .replace("Page", page)
        .replace("searchValue", searchValue);
    }

    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setResult(result);

          setDisciplinaryData(result.disciplinaries);
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
  useEffect(() => {
    if (location.pathname.indexOf("manager") > -1) {
      setUserType(ROLES.MANAGER);
      GetDisciplinary(ROLES.MANAGER);
    } else if (location.pathname.indexOf("hr") > -1) {
      setUserType(ROLES.HR);
      GetDisciplinary(ROLES.HR);
    } else if (location.pathname.indexOf("user") > -1) {
      setUserType(ROLES.EMPLOYEE);
      GetDisciplinary(ROLES.EMPLOYEE);
    }  else if (location.pathname.indexOf("payroll") > -1) {
      setUserType(ROLES.PAYROLL);
      GetDisciplinary(ROLES.PAYROLL);
    }else if (location.pathname.indexOf("organization-admin") > -1) {
      setUserType(ROLES.ORG_ADMIN);
      GetDisciplinary(ROLES.ORG_ADMIN);
    } else if (location.pathname.indexOf("super-admin") > -1) {
      setUserType(ROLES.SUPER_ADMIN);
      GetDisciplinary(ROLES.SUPER_ADMIN);
    }
  }, [searchValue, page]);

  //create new enter in table
  const HandleSubmit = (data) => {
    setIsLoading(true);
    let url = API_URLS.createDisciplinary;

    setIsLoading(true);
    if (userType === ROLES.SUPER_ADMIN) {
      data.isDefault = true;
    }
    let dataCopy = { ...data, order: disciplinaryData?.length + 1 };

    httpClient({
      method: "post",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          HandleClose();
          GetDisciplinary(userType);
          reset();

          toast.success(result.message, {
            className: "toast",
          }); //"Entry Added Successfully");
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error creating Disciplinary. Please try again.");
        HandleClose();
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // handel updates
  const HandleUpdate = (data) => {
    if (userType === ROLES.SUPER_ADMIN) {
      data.isDefault = true;
    }

    let dataCopy = data;
    let url = API_URLS.updateDisciplinary.replace(":id", Id);

    setIsLoading(true);

    httpClient({
      method: "put",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          GetDisciplinary(userType);
          setId("");
          setUpdate(false);
          HandleClose();
          reset();
          toast.success(result.message, {
            className: "toast",
          }); //"Entry Updated Successfully");
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error creating Disciplinary. Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // Handle changes here

  // Handle reorder
  const HandleReorder = (reOrder) => {
    //console.log(reOrder, "this reorder");
    let url = API_URLS.reorderDisciplinary;

    httpClient({
      method: "put",
      url,
      data: { disciplinaries: reOrder },
    })
      .then(({ result, error }) => {
        if (result) {
          GetDisciplinary(userType);
        } else {
          ////toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error creating department. Please try again.");
      });
  };

  const HandleSearchCahnge = (data) => {
    setSearchValue(data);
  };
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedData = Array.from(disciplinaryData);
    const [movedItem] = reorderedData.splice(result.source.index, 1);
    reorderedData.splice(result.destination.index, 0, movedItem);
    // //console.log("drag is working ");
    setDisciplinaryData(reorderedData);
    HandleReorder(reorderedData.map((item) => item._id)); // Update the API with the new order
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
      <>
        <CommenDashHeader
          onSearch={HandleSearchCahnge}
          text="Disciplinary Types"
        />
        <DisciplinaryDiv>
          <DisciplinaryHeading>All Disciplinary Types</DisciplinaryHeading>
          <AddNewButton onClick={HandleOpen}>Add New</AddNewButton>
          <Modal
            open={open}
            sx={{
              backgroundColor: "rgb(27, 27, 27, 0.75)",
              backdropFilter: "blur(8px)",
            }}
            // onClose={HandleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {isLoading ? (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    height: "38.6rem",
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
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalUpperDiv>
                      <ModalHeading>
                        {" "}
                        {!update ? "Add Disciplinary" : "Update Disciplinary"}
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
                    <ModalUpperMid>
                      <InputLabel>
                        Disciplinary Type Name <InputSpan>*</InputSpan>
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
                      <Errors>{errors.nameError}</Errors>
                      <InputLabel>
                        Details <InputSpan>*</InputSpan>
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
                          {detailsLength > -1 ? detailsLength : 0} characters
                          left
                        </span>
                      </InputPara>
                      {/* <InputLabel>
                  Requires BCR? <InputSpan>*</InputSpan>
                </InputLabel>

                <Select
                  value={formData.requiredBcr}
                  name="requiredBcr"
                  onChange={HandleChanges}
                >
                  <Option disabled>Select an option</Option>
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select> */}
                      {/* <Errors>{errors.requiredBcrError}</Errors> */}

                      <AddNewButton
                        disabled={isLoading}
                        style={{ marginTop: "2.5rem" }}
                      >
                        {!update ? "Submit" : "Update"}
                      </AddNewButton>
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
                        style={{ width: "8rem" }}
                      >
                        Order No.
                      </TableCell>
                      <TableCell
                        sx={CellHeadStyles}
                        align="left"
                        style={{ width: "15rem" }}
                      >
                        Name
                      </TableCell>
                      <TableCell sx={CellHeadStyles} align="left">
                        Description
                      </TableCell>
                      {/* <TableCell sx={CellHeadStyles} align="left">
                      Requires BCR
                    </TableCell> */}
                      <TableCell sx={CellHeadStyles} align="left">
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
                        {disciplinaryData?.length == 0 && (
                          <TableRow sx={{ height: "20rem" }}>
                            <TableCell
                              align="center"
                              sx={CellStyle2}
                              colSpan={5}
                            >
                              No disciplinary types found
                            </TableCell>
                          </TableRow>
                        )}
                        {disciplinaryData?.map((data, index) => (
                          <Draggable
                            key={data._id}
                            draggableId={data._id}
                            index={index}
                            isDragDisabled={searchValue.length !== 0}
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
                                {/* <TableCell sx={CellStyle} align="left">
                                {" "}
                                {data.requiredBcr === false ? "No" : "Yes"}{" "}
                              </TableCell> */}
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
      </>
      {/* modal fo editing  */}

      <DeleteModal
        openDelete={openDelete}
        HandleCloseDelete={HandleCloseDelete}
        HandleDelete={HandleDelete}
        HandleReorder={HandleReorder}
        message="Are you sure you want to delete this disciplinary type?"
        isLoading={isLoading}
      />
    </>
  );
};

export default Disciplinary;
