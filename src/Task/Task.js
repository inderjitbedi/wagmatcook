import React, { useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import CommenDashHeader from "../Dashboard/CommenDashHeader";
import { useForm, Controller } from "react-hook-form";
import httpClient from "../api/httpClient";
import API_URLS from "../constants/apiUrls";
import Box from "@mui/material/Box";
import { useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";

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
import moment from "moment";
import Pagination from "@mui/material/Pagination";
import ROLES from "../constants/roles";

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
  PendingStyle,
  ApproveStyle,
  PaginationDiv,
} from "../Disciplinary/DisciplinaryStyles";

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
  const [taskLsit, setTaskList] = useState([]);
  const [result, setResult] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [page, setPage] = useState(1);
  const [userType, setUserType] = useState("");

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
      HandleSubmit(data);
    } else if (update && isEmptyObject(errors)) {
      HandleUpdate(data);
    }
  };
  const HandleUpdateAction = (data) => {
    setUpdate(true);
    setId(data._id);
    setDetailsLength(500 - data?.description?.length);
    reset({
      title: data.title,
      description: data.description,
      assignedto: data.assignee._id,
      dueDate: data.dueDate
        ? new Date(data.dueDate).toISOString().split("T")[0]
        : null,
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

  const GetAssignees = () => {
    setIsLoading(true);
    let url = API_URLS.getAssignees;

    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setAssignees(result.assignees);
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
  const HandleDelete = () => {
    setIsDeleting(true);
    let url = API_URLS.deleteTask.replace(":id", Id);

    httpClient({
      method: "put",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          HandleCloseDelete();
          setId("");
          GetTaskList();

          toast.success(result.message, {
            className: "toast",
          });
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        //console.error("Error:", error);
        toast.error("Error Deleting Benefits. Please try again.");
        setIsDeleting(false);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };
  const GetTaskList = () => {
    setIsLoading(true);
    let url = API_URLS.getTaskList.replace("Page", page);

    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setResult(result);
          setTaskList(result.tasks);
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
  const HandleSubmit = (data) => {
    // e.preventDefault();
    setIsLoading(true);
    let url = API_URLS.createTask;

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
          toast.success(result.message, {
            className: "toast",
          });
          GetTaskList();
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
  const HandleUpdate = (data) => {
    //console.log("update Data:", data);
    setIsLoading(true);
    let dataCopy = data;

    let url = API_URLS.updateTask.replace(":id", Id);

    httpClient({
      method: "put",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          setId("");
          setUpdate(false);
          reset();
          GetAssignees();
          HandleClose();
          toast.success(result.message, {
            className: "toast",
          }); //Entry Updated Successfully");
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        //console.error("Error:", error);
        toast.error("Error Updating Benefits . Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
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

  useEffect(() => {
    GetTaskList();
    GetAssignees();
    if (location.pathname.indexOf("manager") > -1) {
      setUserType(ROLES.MANAGER);
    } else if (location.pathname.indexOf("hr") > -1) {
      setUserType(ROLES.HR);
    } else if (location.pathname.indexOf("user") > -1) {
      setUserType(ROLES.EMPLOYEE);
    }
  }, [page]);
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
                      name="assignee"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Required",
                        },
                      }}
                      render={({ field }) => (
                        <Select {...field}>
                          <Option>Select</Option>
                          {assignees?.map((data) => (
                            <Option value={data._id}>
                              {[
                                data.personalInfo[0]?.firstName,
                                data.personalInfo[0]?.lastName,
                              ].join(" ")}
                            </Option>
                          ))}
                        </Select>
                      )}
                    />
                    {errors.assignedto && (
                      <Errors>{errors.assignee?.message}</Errors>
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
        <>
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
                    SNo.
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "12rem" }}
                    align="left"
                  >
                    Task Title
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "15rem" }}
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
                    style={{ minWidth: "30rem" }}
                    align="left"
                  >
                    Description
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "10rem" }}
                    align="left"
                  >
                    Status
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "12rem" }}
                    align="left"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {!taskLsit?.length && (
                  <TableRow sx={{ height: "20rem" }}>
                    <TableCell align="center" sx={CellStyle2} colSpan={3}>
                      No tasks found
                    </TableCell>
                  </TableRow>
                )}
                {taskLsit?.map((data, index) => (
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                      background: "#fff",
                    }}
                    key={data._id}
                  >
                    <TableCell sx={CellStyle2} align="left">
                      <MenuIconDiv>{index + 1}</MenuIconDiv>
                    </TableCell>
                    <TableCell sx={CellStyle} align="left">
                      {data.title || " - "}
                    </TableCell>
                    <TableCell sx={CellStyle2} align="left">
                      {[
                        data?.assignee?.personalInfo?.firstName,
                        data?.assignee?.personalInfo?.lastName,
                      ].join(" ") || " - "}
                    </TableCell>
                    <TableCell sx={CellStyle} align="left">
                      {data.dueDate
                        ? moment(data.dueDate).format("DD/MM/YYYY")
                        : " -"}
                    </TableCell>
                    <TableCell sx={CellStyle2} align="left">
                      {data.description || " - "}
                    </TableCell>
                    <TableCell sx={CellStyle2} align="left">
                      {data.isCompleted ? (
                        <ApproveStyle>Completed</ApproveStyle>
                      ) : (
                        <PendingStyle>Pending</PendingStyle>
                      )}
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
                            if (userType === ROLES.HR) {
                              Navigate(
                                `/manager-management/tasks-view/${data._id}`
                              );
                            } else if (userType === ROLES.MANAGER) {
                              Navigate(
                                `/manager-management/tasks-view/${data._id}`
                              );
                            } else {
                              Navigate(
                                `/organization-admin/tasks-view/${data._id}`
                              );
                            }
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
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
        message="Are you sure you want to delete this task?"
        isLoading={isDeleting}
      />
    </>
  );
};

export default Task;
