import React, { useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useForm, Controller } from "react-hook-form";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import Pagination from "@mui/material/Pagination";
import API_URLS from "../constants/apiUrls";
import ROLES from "../constants/roles";
import httpClient from "../api/httpClient";
import DeleteModal from "../Modals/DeleteModal";
import CommenDashHeader from "../Dashboard/CommenDashHeader";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { WithContext as ReactTags } from "react-tag-input";

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
  PendingStyle,
  ApproveStyle,
  PaginationDiv,
  FlexContaier,
  RadioLabel,
  RadioButtonContainer,
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

const Documents = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const HandleOpenDelete = () => setOpenDelete(true);
  const HandleCloseDelete = () => setOpenDelete(false);
  const [Id, setId] = useState("");
  const [update, setUpdate] = useState(false);
  const [detailsLength, setDetailsLength] = useState(500);
  const [result, setResult] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [page, setPage] = useState(1);
  const [userType, setUserType] = useState("");
  const [departmentData, setDepartmentData] = useState([]);

  const HandleChangePage = (event, value) => {
    setPage(value);
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
      //  HandleSubmit(data);
    } else if (update && isEmptyObject(errors)) {
      //  HandleUpdate(data);
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
  useEffect(() => {
    // GetTaskList();
    if (!(location.pathname.indexOf("user") > -1)) {
      //   GetAssignees();
    }
    if (location.pathname.indexOf("manager") > -1) {
      setUserType(ROLES.MANAGER);
    } else if (location.pathname.indexOf("hr") > -1) {
      setUserType(ROLES.HR);
    } else if (location.pathname.indexOf("user") > -1) {
      setUserType(ROLES.EMPLOYEE);
    }
  }, [page]);
  const GetDepartments = () => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      let url = API_URLS.getDepartmentsList;

      httpClient({
        method: "get",
        url,
      })
        .then(({ result, error }) => {
          if (result) {
            setDepartmentData(result.departments);
            resolve(result.departments);
             const suggestions = result?.departments?.map((data) => ({
               id: data?.userData._id,
               text: data?.name,
             }));
            setSuggestions(suggestions);
            
            setIsLoading(false);

          } else {
            //toast.warn("something went wrong ");
            setIsLoading(false);

            reject("No data received from GetDepartments API");
          }
        })
        .catch((error) => {
          // toast.error("Error getting department. Please try again.");
          setIsLoading(false);
          reject(error);
        });
    });
  };
  useEffect(() => {
    GetDepartments();
  }, []);
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  const delimiters = [KeyCodes.comma, KeyCodes.enter];
  const [suggestions, setSuggestions] = useState([]);

  const TaskData = [
    {
      order: 1,
      title: "Mobile Responsive",
      department: "Mobile Responsive",
      keywords: "tags ",
      fileName: "Lalit Kumar",
      updatedby: "eren",
      updatedon: "22/9/2023",
    },
    {
      order: 2,
      title: "Mobile Responsive",
      department: "Mobile Responsive",
      keywords: "tags ",
      fileName: "Lalit Kumar",
      updatedby: "eren",
      updatedon: "22/9/2023",
    },
    {
      order: 3,
      title: "Mobile Responsive",
      department: "Mobile Responsive",
      keywords: "tags ",
      fileName: "Lalit Kumar",
      updatedby: "eren",
      updatedon: "22/9/2023",
    },
    {
      order: 4,
      title: "Mobile Responsive",
      department: "Mobile Responsive",
      keywords: "tags ",
      fileName: "Lalit Kumar",
      updatedby: "eren",
      updatedon: "22/9/2023",
    },
    {
      order: 5,
      title: "Mobile Responsive",
      department: "Mobile Responsive",
      keywords: "tags ",
      fileName: "Lalit Kumar",
      updatedby: "eren",
      updatedon: "22/9/2023",
    },
  ];
  return (
    <>
      <CommenDashHeader onSearch={HandleSearchCahnge} text="Documents" />
      <DisciplinaryDiv>
        <DisciplinaryHeading>All Documents</DisciplinaryHeading>
        {userType === ROLES.EMPLOYEE ? (
          " "
        ) : (
          <AddNewButton
            onClick={() => {
              HandleOpenAddNewAction();
            }}
          >
            Add New
          </AddNewButton>
        )}
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
                    {!update ? "Add Document" : "Update Documents"}
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
                      Title <InputSpan>*</InputSpan>
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
                    {errors.title && <Errors>{errors.title?.message}</Errors>}

                    <InputLabel>
                      Departments <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Controller
                      name="department"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Required",
                        },
                      }}
                      render={({ field: { onChange, value, ref } }) => (
                        <Autocomplete
                          multiple
                          id="tags-standard"
                          value={
                            value
                              ? departmentData.filter((option) =>
                                  value.includes(option._id)
                                ) ?? []
                              : []
                          }
                          onChange={(event, newValue) => {
                            onChange(
                              newValue ? newValue.map((item) => item._id) : []
                            );
                          }}
                          sx={{ width: " 100% " }}
                          isOptionEqualToValue={(option, value) =>
                            option._id === value._id
                          }
                          getOptionLabel={(option) =>
                            option.name && `${option.name}`
                          }
                          options={departmentData}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              inputRef={ref}
                              placeholder="Select Departments"
                            />
                          )}
                        />
                      )}
                    />

                    {errors.department && (
                      <Errors>{errors.department?.message}</Errors>
                    )}
                    <InputLabel>
                      Keywords <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Controller
                      name="keywords"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Required",
                        },
                      }}
                      render={({ field: { onChange, value, ref } }) => (
                        <ReactTags
                          inputRef={ref}
                          tags={value}
                          suggestions={suggestions}
                          delimiters={delimiters}
                          handleDelete={(i) => {
                            if (Array.isArray(value)) {
                              const updatedTags = [...value];
                              updatedTags.splice(i, 1);
                              onChange(updatedTags);
                            }
                          }}
                          handleAddition={(tag) => {
                            const updatedTags = Array.isArray(value)
                              ? [...value, tag]
                              : [tag];
                            onChange(updatedTags);
                          }}
                          handleDrag={(tag, currPos, newPos) => {
                            const updatedTags = Array.isArray(value)
                              ? [...value]
                              : [];
                            updatedTags.splice(currPos, 1);
                            updatedTags.splice(newPos, 0, tag);
                            onChange(updatedTags);
                          }}
                          inputFieldPosition="bottom"
                          autocomplete
                          placeholder={value?.length ? "Add More " : "Add"}
                          // editable
                        />
                      )}
                    />
                    {errors.keywords && (
                      <Errors>{errors.keywords?.message}</Errors>
                    )}
                    <InputLabel>
                      Versions <InputSpan>*</InputSpan>
                    </InputLabel>
                    <RadioButtonContainer>
                      <FlexContaier>
                        <Input
                          type="radio"
                          id="major"
                          name="version"
                          {...register("version", {
                            required: {
                              value: true,
                              message: " Required",
                            },
                          })}
                        />
                        <RadioLabel htmlFor="major">Major</RadioLabel>
                      </FlexContaier>
                      <FlexContaier>
                        <Input
                          type="radio"
                          id="minor"
                          name="version"
                          {...register("version", {
                            required: {
                              value: true,
                              message: " Required",
                            },
                          })}
                        />
                        <RadioLabel htmlFor="minor">Minor</RadioLabel>
                      </FlexContaier>
                    </RadioButtonContainer>
                    {errors.version && (
                      <Errors>{errors.version?.message}</Errors>
                    )}
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
                    Title
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "15rem" }}
                    align="left"
                  >
                    Department Name
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "9rem" }}
                    align="left"
                  >
                    Keywords
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "10rem" }}
                    align="left"
                  >
                    File Name
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "10rem" }}
                    align="left"
                  >
                    Updated By
                  </TableCell>{" "}
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "10rem" }}
                    align="left"
                  >
                    Updated On
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
                {!TaskData?.length && (
                  <TableRow sx={{ height: "20rem" }}>
                    <TableCell align="center" sx={CellStyle2} colSpan={7}>
                      No Documents found
                    </TableCell>
                  </TableRow>
                )}
                {TaskData?.map((data, index) => (
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
                      {data.department}
                    </TableCell>
                    <TableCell sx={CellStyle} align="left">
                      {data.keywords}
                    </TableCell>
                    <TableCell sx={CellStyle2} align="left">
                      {data.filename || " - "}
                    </TableCell>
                    <TableCell sx={CellStyle2} align="left">
                      {data.updatedby || " - "}
                    </TableCell>
                    <TableCell sx={CellStyle2} align="left">
                      {data.updatedon}
                    </TableCell>
                    <TableCell sx={CellStyle2} align="left">
                      {" "}
                      <ActionIconDiv>
                        {userType === ROLES.EMPLOYEE ? (
                          " "
                        ) : (
                          <ActionIcons
                            onClick={() => {
                              HandleUpdateAction(data);
                            }}
                            src="/images/icons/Pendown.svg"
                          />
                        )}
                        <ActionIcons
                          onClick={() => {
                            if (userType === ROLES.HR) {
                              Navigate(
                                `/manager-management/documents/history/${data._id}`
                              );
                            } else if (userType === ROLES.MANAGER) {
                              Navigate(
                                `/manager-management/documents/history/${data._id}`
                              );
                            } else {
                              Navigate(
                                `/organization-admin/documents/history/${data._id}`
                              );
                            }
                          }}
                          src="/images/icons/eye.svg"
                        />
                        {userType === ROLES.EMPLOYEE ? (
                          " "
                        ) : (
                          <ActionIcons
                            onClick={() => {
                              HandleOpenDelete();
                              setId(data._id);
                            }}
                            src="/images/icons/Trash-2.svg"
                          />
                        )}

                        <ActionIcons
                          onClick={() => {}}
                          src="/images/icons/Download.svg"
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
        //   HandleDelete={HandleDelete}
        message="Are you sure you want to delete this task?"
        isLoading={isDeleting}
      />
    </>
  );
};

export default Documents;
