import React, { useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import CommenDashHeader from "../Dashboard/CommenDashHeader";
import { useForm, Controller } from "react-hook-form";
import httpClient from "../api/httpClient";
import API_URLS from "../constants/apiUrls";
import Box from "@mui/material/Box";
import { useNavigate, useLocation } from "react-router";

import Modal from "@mui/material/Modal";
import DeleteModal from "../Modals/DeleteModal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {
  DisciplinaryDiv,
  DisciplinaryHeading,
  AddNewButton,
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
} from "../Disciplinary/DisciplinaryStyles";

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

const Task = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const HandleOpenDelete = () => setOpenDelete(true);
  const HandleCloseDelete = () => setOpenDelete(false);
  const [Id, setId] = useState("");
  const [update, setUpdate] = useState(false);
  const [detailsLength, setDetailsLength] = useState(500);
  // add new modal
  const [open, setOpen] = useState(false);
  const HandleOpen = () => setOpen(true);
  const HandleClose = () => {
    setOpen(false);
    setDetailsLength(500);
    clearErrors();
    reset({});
  };

  const HandleSearchCahnge = (data) => {
    setSearchValue(data);
  };
  const {
    register,
    control,
    clearErrors,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
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
      //   HandleSubmit(data);
    } else if (update && isEmptyObject(errors)) {
      //   HandleUpdate(data);
    }
  };
  const HandleUpdateAction = (data) => {
    setUpdate(true);
    setId(data._id);
    setDetailsLength(500 - data?.description?.length);
    reset({
      title: data.title,
      description: data.description,
      assignedto: data.assignedto,
      dueDate: data.dueDate,
    });
    HandleOpen();
  };
  const HandleOpenAddNewAction = () => {
    setUpdate(false);
    HandleOpen();
    reset({});
    clearErrors();
    setDetailsLength(500);
  };
  const data = [
    {
      _id: 1,
      name: "option1",
    },
    {
      _id: 2,
      name: "option2",
    },
    {
      _id: 3,
      name: "option3",
    },
  ];
  const TaskData = [
    {
      order: 1,
      title: "Mobile Responsive",
      assignedto: "Lalit Kumar",
      dueDate: "10/09/2023",
      description:
        "is composed by Arko Pravo Mukherjee, vocals by Ali Azmat and lyrics by Arko Pravo Mukherjee ",
    },
    {
      order: 2,
      title: "Mobile Responsive",
      assignedto: "Lalit Kumar",
      dueDate: "10/09/2023",
      description:
        "is composed by Arko Pravo Mukherjee, vocals by Ali Azmat and lyrics by Arko Pravo Mukherjee ",
    },
    {
      order: 3,
      title: "Mobile Responsive",
      assignedto: "Lalit Kumar",
      dueDate: "10/09/2023",
      description:
        "is composed by Arko Pravo Mukherjee, vocals by Ali Azmat and lyrics by Arko Pravo Mukherjee ",
    },
    {
      order: 4,
      title: "Mobile Responsive",
      assignedto: "Lalit Kumar",
      dueDate: "10/09/2023",
      description:
        "is composed by Arko Pravo Mukherjee, vocals by Ali Azmat and lyrics by Arko Pravo Mukherjee ",
    },
  ];
  const onDragEnd = (result) => {
    if (!result.destination) return;

    // const reorderedData = Array.from(benefits);
    // const [movedItem] = reorderedData.splice(result.source.index, 1);
    // reorderedData.splice(result.destination.index, 0, movedItem);
    // console.log("drag is working ");
    // setBenefits(reorderedData);
    // HandleReorder(reorderedData.map((item) => item._id));
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
      <CommenDashHeader onSearch={HandleSearchCahnge} text={"Tasks"} />
      <DisciplinaryDiv>
        <DisciplinaryHeading>All Tasks</DisciplinaryHeading>
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
            backdropFilter: "blur(8px)",
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
                    {!update ? "Add Tasks" : "Update Task"}
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
                      Task Title <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="text"
                      {...register("title", {
                        required: {
                          value: true,
                          message: "Required",
                        },
                      })}
                    />
                    {errors.taskTitle && (
                      <Errors>{errors.taskTitle?.message}</Errors>
                    )}
                    <InputLabel>
                      Assigned To <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Controller
                      name="assignedto"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Required",
                        },
                      }}
                      render={({ field }) => (
                        <Select {...field} disabled={update}>
                          <Option>Select</Option>
                          {data?.map((data) => (
                            <Option value={data._id}>{data.name}</Option>
                          ))}
                        </Select>
                      )}
                    />
                    {errors.assignedto && (
                      <Errors>{errors.assignedto?.message}</Errors>
                    )}
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

                    <InputLabel>
                      Due Date <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="date"
                      {...register("dueDate", {
                        required: {
                          value: true,
                          message: "Required",
                        },
                      })}
                    />
                    {<Errors>{errors.dueDate?.message}</Errors>}

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
                    style={{ minWidth: "15rem" }}
                    align="left"
                  >
                    Task Title
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "10rem" }}
                    align="left"
                  >
                    Assigned To
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "9rem" }}
                    align="left"
                  >
                    Due Date
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "35rem" }}
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
                    {!TaskData?.length && (
                      <TableRow sx={{ height: "20rem" }}>
                        <TableCell align="center" colSpan={3}>
                          No benefits found
                        </TableCell>
                      </TableRow>
                    )}
                    {TaskData?.map((data, index) => (
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
                              {data.title}
                            </TableCell>
                            <TableCell sx={CellStyle} align="left">
                              {data.assignedto}
                            </TableCell>
                            <TableCell sx={CellStyle} align="left">
                              {data.dueDate}
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
                                    Navigate("/organization-admin/tasks-view");
                                  }}
                                  src="/images/icons/eye.svg"
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
      )}
      <DeleteModal
        openDelete={openDelete}
        HandleCloseDelete={HandleCloseDelete}
        // HandleDelete={HandleDelete}
        message="Are you sure you want to delete this task?"
        isLoading={isLoading}
      />
    </>
  );
};

export default Task;
