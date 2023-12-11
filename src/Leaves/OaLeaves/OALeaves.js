import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import CommenDashHeader from "../../Dashboard/CommenDashHeader";
import Pagination from "@mui/material/Pagination";
import ROLES from "../../constants/roles";
import LeaveInterval from "../../constants/leaveInterval";
import RenewalOption from "../../constants/renewalOption";
import {
  DashHeaderDepartment,
  DepartmentIconContainer,
  DepartmentIconImg,
  DepartmentFilterContainer,
  AddNewButton,
  ModalUpperDiv,
  ModalHeading,
  ModalIcon,
  ModalUpperMid,
  Input,
  TextArea,
  ModalThanks,
  ModalThanksImg,
  ModalThanksHeading,
  Errors,
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
  PaginationDiv,
} from "../../Disciplinary/DisciplinaryStyles";
import API_URLS from "../../constants/apiUrls";
import {
  FlexContaierForm,
  Select,
  Option,
} from "../../Employee/AddEmployee/AddEmployeeStyles";
import {
  ModalContainer,
  ModalFormContainer,
} from "../../Employee/ViewEmployee/ViewEmployeeStyle";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "44.6rem",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 45,
  padding: "0rem 0rem",
  borderRadius: "8px",
  height: "50rem",
  overflowY: "scroll",
};
const CellHeadStyles = {
  color: "#8F9BB3",
  fontFamily: "Inter",
  fontSize: "1.4rem",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "16px",
};

const CellStyle = {
  color: "#222B45",
  fontSize: "1.4rem",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "15px",
};
const CellStyle2 = {
  color: "#222B45",
  fontSize: "1.4rem",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "15px",
};
const PendingStyle = {
  borderRadius: "1rem",
  background: "#FFF1DD",

  display: "inline-flex",
  padding: "2px 12px",
  alignItems: "center",
  color: "#E88B00",
  textAlign: "center",
  fontFamily: "Inter",
  fontSize: "1.4rem",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "24px",
};
const ApprovedStyles = {
  borderRadius: "1rem",
  background: "#C8FFC7",
  display: "inline-flex",
  padding: "2px 12px",
  alignItems: "center",
  color: "var(--green-90, #0D7D0B)",
  textAlign: "center",
  fontFamily: "Inter",
  fontSize: "1.4rem",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "24px",
};
const OALeaves = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const [userType, setUserType] = useState("");
  const [open, setOpen] = useState(false);
  const HandleOpen = () => {
    setOpen(true);
  };
  const HandleClose = () => {
    setOpen(false);

    setdescriptionLength(500);
    clearErrors();
    reset({});
    setIsRenew(false);
    setIsRenewalOption(false);
    setIsRenewal(false);
  };
  //Delete Modal Delete
  const [openDelete, setOpenDelete] = useState(false);
  const HandleOpenDelete = () => setOpenDelete(true);
  const HandleCloseDelete = () => setOpenDelete(false);
  const [update, setUpdate] = useState(false);

  const [leavesData, setLeavesData] = useState([]);
  const [page, setPage] = useState(1);
  const HandleChangePage = (event, value) => {
    setPage(value);
  };
  const [isRenew, setIsRenew] = useState(false);
  const [isRenewal, setIsRenewal] = useState(false);

  const [isRenewalOption, setIsRenewalOption] = useState(false);

  // const [isInterval, setIsInterval] = useState(false);

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

  const [Id, setId] = useState("");
  const HandleSearchCahnge = (data) => {
    setSearchValue(data);
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
    setLeaves(reorderedData);
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
      // data.isLieuTime = true;
      HandleSubmitLeavesType(data);
    } else if (update && isEmptyObject(errors)) {
      // data.isLieuTime = true;

      HandleUpdate(data);
    }
  };
  const GetLeavesType = (role) => {
    setIsLoading(true);
    var url = "";
    if (role === ROLES.SUPER_ADMIN) {
      url = API_URLS.getSALeaveType
        .replace("searchValue", searchValue)
        .replace("Page", page);
    } else {
      url = API_URLS.getLeaveType
        .replace("searchValue", searchValue)
        .replace("Page", page);
    }

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
    if (userType === ROLES.SUPER_ADMIN) {
      data.isDefault = true;
    }

    let dataCopy = { ...data, order: leaves?.length + 1 };
    let url = API_URLS.createLeaveType;

    setIsLoading(true);

    httpClient({
      method: "post",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          HandleClose();
          GetLeavesType(userType);
          toast.success(result.message, {
            className: "toast",
          });
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
    if (userType === ROLES.SUPER_ADMIN) {
      data.isDefault = true;
    }
    // data.nature = "ADDITION"
    let dataCopy = data;

    let url = API_URLS.updateLeaveType.replace(":id", Id);

    setIsLoading(true);

    httpClient({
      method: "put",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          setId("");
          GetLeavesType(userType);
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
  const HandleDelete = () => {
    setIsLoading(true);
    let url = API_URLS.deleteLeaveType.replace(":id", Id);
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
          GetLeavesType(userType);
          toast.success(result.message, {
            className: "toast",
          }); //Benefit deleted successfully.");
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
    //console.log(reOrder, "this reorder");
    let url = API_URLS.reorderLeaveType;

    httpClient({
      method: "put",
      url,
      data: { leaveTypes: reOrder },
    })
      .then(({ result, error }) => {
        if (result) {
          GetLeavesType(userType);
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
    reset({
      name: data.name,
      description: data.description,
      maxCarryOver: data.maxCarryOver,
      isActive: data.isActive,
      renew: data.renew,
      interval: data.interval,
      renewalDate: data.renewalDate
        ? new Date(data.renewalDate).toISOString().split("T")[0]
        : null,
      renewalOption: data.renewalOption,
    });
    if (data.renew) {
      setIsRenew(true);
    }
    if (data.interval === LeaveInterval.ANNUALLY) {
      setIsRenewal(true);
      setIsRenewalOption(false);
    } else {
      setIsRenewal(false);
      setIsRenewalOption(true);
    }
    HandleOpen();
  };
  const HandleOpenAddNewAction = () => {
    setUpdate(false);
    HandleOpen();
    reset({});
    clearErrors();
    setdescriptionLength(500);
    setIsRenew(false);
    setIsRenewalOption(false);
    setIsRenewal(false);
  };
  useEffect(() => {
    if (location.pathname.indexOf("manager") > -1) {
      setUserType(ROLES.MANAGER);
      GetLeavesType(ROLES.MANAGER);
    } else if (location.pathname.indexOf("hr") > -1) {
      setUserType(ROLES.HR);
      GetLeavesType(ROLES.HR);
    } else if (location.pathname.indexOf("user") > -1) {
      setUserType(ROLES.EMPLOYEE);
      GetLeavesType(ROLES.EMPLOYEE);
    } else if (location.pathname.indexOf("organization-admin") > -1) {
      setUserType(ROLES.ORG_ADMIN);
      GetLeavesType(ROLES.ORG_ADMIN);
    } else if (location.pathname.indexOf("super-admin") > -1) {
      setUserType(ROLES.SUPER_ADMIN);
      GetLeavesType(ROLES.SUPER_ADMIN);
    }
  }, [searchValue, page]);
  return (
    <div>
      <CommenDashHeader onSearch={HandleSearchCahnge} text="Leave Types" />

      <DisciplinaryDiv>
        <DisciplinaryHeading>All Leave Types </DisciplinaryHeading>

        <AddNewButton onClick={() => HandleOpenAddNewAction()}>
          Add New
        </AddNewButton>
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
                <ModalContainer>
                  <ModalHeading>
                    {!update ? "Add New Leave" : "Update Leave Type"}
                  </ModalHeading>
                  <ModalIcon
                    onClick={() => {
                      HandleClose();
                    }}
                    src="/images/icons/Alert-Circle.svg"
                  />
                </ModalContainer>
                <ModalFormContainer>
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
                  {userType === ROLES.SUPER_ADMIN ? (
                    " "
                  ) : (
                    <>
                      <InputLabel>
                        Max carry-over(Hrs) <InputSpan>*</InputSpan>
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
                            if (fieldValue) {
                              return (
                                (!isNaN(parseFloat(fieldValue)) &&
                                  isFinite(fieldValue)) ||
                                "Must be a number "
                              );
                            }
                          },
                        })}
                        type="text"
                      />
                      <Errors>{errors.maxCarryOver?.message}</Errors>
                      <FlexContaierForm>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                            marginBottom: "25px",
                            marginTop: "1rem",
                          }}
                        >
                          <input
                            type="checkbox"
                            {...register("isActive", {})}
                            id="isEligible"
                            defaultChecked={true}
                          />
                          <InputLabel
                            htmlFor="isEligible"
                            style={{
                              marginBottom: "0rem",
                              cursor: "pointer",
                            }}
                          >
                            Is Active
                          </InputLabel>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                            marginBottom: "25px",
                            marginTop: "1rem",
                          }}
                        >
                          <input
                            type="checkbox"
                            {...register("renew", {})}
                            id="renew"
                            // defaultChecked={true}

                            onChange={(e) => {
                              let Value = e.target.checked;

                              if (Value) {
                                setIsRenew(true);
                                console.log(Value, "this is the checkbox");
                              } else {
                                setIsRenew(false);
                                setValue("interval", null);
                                setValue("renewalDate", null);
                                setValue("renewalOption", null);
                                setIsRenewalOption(false);
                                setIsRenewal(false);
                              }
                            }}
                          />
                          <InputLabel
                            htmlFor="renew"
                            style={{
                              marginBottom: "0rem",
                              cursor: "pointer",
                            }}
                          >
                            Renew
                          </InputLabel>
                        </div>
                      </FlexContaierForm>
                      {isRenew && (
                        <>
                          <InputLabel>
                            Interval <InputSpan>*</InputSpan>
                          </InputLabel>
                          <Controller
                            name={`interval`}
                            control={control}
                            rules={{
                              required: {
                                value: isRenew,
                                message: "Required",
                              },
                              onChange: (e) => {
                                let Value = e.target.value;
                                console.log(Value, "this is the value");
                                if (Value === LeaveInterval.ANNUALLY) {
                                  setIsRenewal(true);
                                  setIsRenewalOption(false);
                                  setValue("renewalOption", null);
                                } else {
                                  setIsRenewal(false);
                                  setIsRenewalOption(true);
                                  setValue("renewalDate", null);
                                }
                              },
                            }}
                            render={({ field }) => (
                              <Select {...field}>
                                <Option value="">Select</Option>
                                <Option value={LeaveInterval.ANNUALLY}>
                                  Annually
                                </Option>
                                <Option value={LeaveInterval.MONTHLY}>
                                  Monthly
                                </Option>
                              </Select>
                            )}
                          />
                          {<Errors> {errors.interval?.message}</Errors>}
                        </>
                      )}

                      {isRenewal && (
                        <>
                          <InputLabel>
                            Renewal Date <InputSpan>*</InputSpan>
                          </InputLabel>
                          <Input
                            // readOnly={update}
                            type="date"
                            {...register("renewalDate", {
                              required: {
                                value: isRenew,
                                message: "Required",
                              },
                            })}
                          />
                          {<Errors>{errors.renewalDate?.message}</Errors>}
                        </>
                      )}
                      {isRenewalOption && (
                        <>
                          <InputLabel>
                            Select Renewal Option: <InputSpan>*</InputSpan>
                          </InputLabel>
                          <Controller
                            name={`renewalOption`}
                            control={control}
                            rules={{
                              required: {
                                value: isRenew,
                                message: "Required",
                              },
                            }}
                            render={({ field }) => (
                              <Select {...field}>
                                <Option value="">Select</Option>
                                <Option value={RenewalOption.BEGINNING}>
                                  First of the Month
                                </Option>
                                <Option value={RenewalOption.END}>
                                  End of the Month
                                </Option>
                              </Select>
                            )}
                          />
                          {<Errors>{errors.renewalOption?.message}</Errors>}
                        </>
                      )}
                    </>
                  )}

                  {!update ? (
                    <AddNewButton
                      type="submit"
                      disabled={isLoading}
                      style={{ marginTop: "1rem" }}
                    >
                      Add New
                    </AddNewButton>
                  ) : (
                    <AddNewButton
                      type="submit"
                      disabled={isLoading}
                      style={{ marginTop: "1rem" }}
                    >
                      Update
                    </AddNewButton>
                  )}
                </ModalFormContainer>
              </form>
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
                      style={{ minWidth: "1rem" }}
                    >
                      Order&nbsp;No.
                    </TableCell>
                    <TableCell
                      sx={CellHeadStyles}
                      align="left"
                      style={{ width: "15rem" }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      sx={CellHeadStyles}
                      align="left"
                      style={{ minWidth: "35rem" }}
                    >
                      Description
                    </TableCell>
                    {userType === ROLES.SUPER_ADMIN ? (
                      " "
                    ) : (
                      <TableCell
                        sx={CellHeadStyles}
                        align="left"
                        style={{ width: "9rem" }}
                      >
                        Max&nbsp;Carry&nbsp;Over
                      </TableCell>
                    )}
                    {userType === ROLES.SUPER_ADMIN ? (
                      " "
                    ) : (
                      <TableCell
                        sx={CellHeadStyles}
                        align="left"
                        style={{ width: "3rem" }}
                      >
                        Status
                      </TableCell>
                    )}
                    <TableCell
                      sx={CellHeadStyles}
                      align="center"
                      style={{ width: "3rem" }}
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
                        <TableRow sx={{ height: "20rem" }}>
                          <TableCell
                            align="center"
                            sx={CellStyle2}
                            colSpan={userType === ROLES.SUPER_ADMIN ? 4 : 6}
                          >
                            No leaves found
                          </TableCell>
                        </TableRow>
                      )}
                      {leaves?.map((data, index) => (
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
                                  {data.order || " - "}
                                </MenuIconDiv>
                              </TableCell>
                              <TableCell sx={CellStyle} align="left">
                                {" "}
                                {data.name || " - "}{" "}
                              </TableCell>
                              <TableCell sx={CellStyle2} align="left">
                                {" "}
                                {data.description || " - "}{" "}
                              </TableCell>
                              {userType === ROLES.SUPER_ADMIN ? (
                                " "
                              ) : (
                                <TableCell sx={CellStyle} align="left">
                                  {" "}
                                  {data.maxCarryOver || " - "}{" "}
                                </TableCell>
                              )}
                              {userType === ROLES.SUPER_ADMIN ? (
                                " "
                              ) : (
                                <TableCell sx={CellStyle2} align="left">
                                  {" "}
                                  <span
                                    style={
                                      data.isActive
                                        ? ApprovedStyles
                                        : PendingStyle
                                    }
                                  >
                                    {data.isActive ? "Active" : "Inactive"}
                                  </span>{" "}
                                </TableCell>
                              )}
                              <TableCell
                                sx={CellStyle2}
                                align="center"
                                //   style={{ maxWidth: "1rem" }}
                              >
                                {" "}
                                <ActionIconDiv
                                  style={{ justifyContent: "center" }}
                                >
                                  {!data.isLieuTime && (
                                    <ActionIcons
                                      onClick={() => {
                                        HandleUpdateAction(data);
                                      }}
                                      src="/images/icons/Pendown.svg"
                                    />
                                  )}
                                  {!data.isLieuTime && (
                                    <ActionIcons
                                      onClick={() => {
                                        HandleOpenDelete();
                                        setId(data._id);
                                      }}
                                      src="/images/icons/Trash-2.svg"
                                    />
                                  )}
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
