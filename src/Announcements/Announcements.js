import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import { RotatingLines, ThreeDots } from "react-loader-spinner";
import { useNavigate, useLocation } from "react-router";
import Pagination from "@mui/material/Pagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useForm, Controller } from "react-hook-form";
import httpClient from "../api/httpClient";
import API_URLS from "../constants/apiUrls";
import ROLES from "../constants/roles";
import CommenDashHeader from "../Dashboard/CommenDashHeader";
import DeleteModal from "../Modals/DeleteModal";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import moment from "moment";
import { Link } from "react-router-dom";

import {
  EditButton,
  ButtonIcon,
  LightPara,
  ModalContainer,
  ModalFormContainer,
} from "../Employee/ViewEmployee/ViewEmployeeStyle";
import {
  AddNewButton,
  ModalUpperDiv,
  ModalHeading,
  ModalIcon,
  ModalUpperMid,
  ModalBottom,
  CancelButton,
  Input,
  TextArea,
  Errors,
  InputPara,
} from "../Departments/DepartmentsStyles";
import {
  InputLabel,
  InputSpan,
  PaginationDiv,
  DisciplinaryHeading,
  DisciplinaryDiv,
  ActionIcons,
  ActionIconDiv,
} from "../Disciplinary/DisciplinaryStyles";

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
  maxHeight: "59.7rem",
  overflowY: "scroll",
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

const Announcements = () => {
  let API_URL = process.env.REACT_APP_API_URL;

  const Navigate = useNavigate();
  const location = useLocation();
  const [userType, setUserType] = useState("");
  //Delete Modal Delete
  const [openDelete, setOpenDelete] = useState(false);
  const HandleOpenDelete = () => setOpenDelete(true);
  const HandleCloseDelete = () => setOpenDelete(false);
  const [departmentData, setDepartmentData] = useState([]);

  const [detailsLength, setDetailsLength] = useState(500);
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const [Announcements, setAnnouncements] = useState([]);
  const HandleSearchCahnge = (data) => {
    setSearchValue(data);
  };
  const [Id, setId] = useState("");

  const [page, setPage] = useState(1);
  const HandleChangePage = (event, value) => {
    setPage(value);
  };
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    GetDepartments();
    GetAnnouncements();
    if (location.pathname.indexOf("manager") > -1) {
      setUserType(ROLES.MANAGER);
    } else if (location.pathname.indexOf("hr") > -1) {
      setUserType(ROLES.HR);
    } else if (location.pathname.indexOf("user") > -1) {
      setUserType(ROLES.EMPLOYEE);
    } else if (location.pathname.indexOf("organization-admin") > -1) {
      setUserType(ROLES.ORG_ADMIN);
    } else if (location.pathname.indexOf("super-admin") > -1) {
      setUserType(ROLES.SUPER_ADMIN);
    }
  }, [page, searchValue]);
  const {
    register,
    control,
    clearErrors,
    handleSubmit,
    reset,
    setValue,
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
    if (file) {
      data.attachment = file;
    }
    if (isEmptyObject(errors) && !update) {
      HandleSubmit(data);
    } else if (update && isEmptyObject(errors)) {
      // HandleUpdate(data);
    }
  };
  const [open, setOpen] = useState(false);
  const HandleOpen = () => setOpen(true);
  const HandleClose = () => {
    setOpen(false);
    setDetailsLength(500);
    clearErrors();
    reset({});
  };
  const HandleUpdateAction = (data) => {
    setUpdate(true);
    setId(data._id);
    setDetailsLength(500 - data?.description?.length);
    reset({
      title: data.title,
      description: data.description,
      departments: data.departments?.map((data) => data._id),
      announcementDate: data.announcementDate
        ? new Date(data.announcementDate).toISOString().split("T")[0]
        : null,
    });
    setFile(data?.attachment);

    HandleOpen();
  };
  const HandleOpenAddNewAction = () => {
    setUpdate(false);
    HandleOpen();
    reset({});
    clearErrors();
    setDetailsLength(500);
  };
  const getFileType = (file) => {
    if (file) {
      const fileExtension = file?.name?.split(".").pop().toLowerCase();

      if (["jpg", "jpeg", "png", "gif", "tiff"].includes(fileExtension)) {
        return "image";
      } else if (["mp4", "ogg", "webm"].includes(fileExtension)) {
        return "video";
      } else if (fileExtension === "pdf") {
        return "pdf";
      } else if (fileExtension === "xlsx" || fileExtension === "xls") {
        return "xlsx";
      } else if (fileExtension === "doc" || fileExtension === "docx") {
        return "doc";
      } else {
        return "unknown";
      }
    }
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    let type = await getFileType(e.target.files[0]);
    ////console.log("this file type:", type);
    if (type != "unknown") {
      handleUpload(file, type);
    } else {
      toast.error("Unsuported file type.");
    }
  };
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
  const handleUpload = (file, type) => {
    setIsUploading(true);

    if (file) {
      const binary = new FormData();
      binary.append("file", file);

      httpClient({
        method: "post",
        url: API_URLS.uploadDocuments.replace(":type", type),
        data: binary, // Use 'data' to send the FormData
        headers: {
          "Content-Type": "multipart/form-data", // Set the Content-Type header to 'multipart/form-data'
        },
      })
        .then((data) => {
          ////console.log(data);

          if (data?.result) {
            ////console.log(data?.result);
            setFile(data?.result?.file);

            setIsUploading(false);
          } else {
            // setErrors({ ...errors, fileError: data?.error?.error });
          }
        })
        .catch((error) => {
          //console.error("Error:", error);
          setIsUploading(false);
        });
    }
  };
  const removeFile = (e) => {
    setFile(null);
    setValue("file", null);
  };

  const HandleDelete = () => {
    setIsDeleting(true);
    let url = API_URLS.deleteAnnouncement.replace(":id", Id);
    httpClient({
      method: "put",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          HandleCloseDelete();
          setId("");
          GetAnnouncements();

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
  const HandleSubmit = (data) => {
    let dataCopy = data;

    setIsLoading(true);

    let url = API_URLS.createAnnouncement.replace(":id", Id);
    httpClient({
      method: "post",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          HandleClose();
          setFile(null);
          GetAnnouncements();
          reset();

          toast.success(result.message, {
            className: "toast",
          }); //Employee proformance added successfully");
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        toast.error("Error Adding review . Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const GetAnnouncements = () => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      let url = API_URLS.getAnnouncement
        .replace("searchValue", searchValue)
        .replace("Page", page);
      httpClient({
        method: "get",
        url,
      })
        .then(({ result, error }) => {
          if (result) {
            setResult(result);
            setAnnouncements(result.announcements);
            resolve(result);
          } else {
            //toast.warn("something went wrong ");
          }
        })
        .catch((error) => {
          //console.error("Error:", error);
          toast.error("Error creating department. Please try again.");
          setIsLoading(false);
          reject(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  };
  return (
    <>
      <CommenDashHeader onSearch={HandleSearchCahnge} text="Announcements" />

      <DisciplinaryDiv>
        <DisciplinaryHeading>Announcements</DisciplinaryHeading>
     { userType === ROLES.ORG_ADMIN &&  <AddNewButton onClick={() => HandleOpenAddNewAction()}>
          Add New
        </AddNewButton>}
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
                  height: "44.1rem",
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
                <ModalContainer>
                  <ModalHeading>
                    {!update ? "Add Announcement" : "Update Announcement"}
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
                </ModalContainer>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ModalFormContainer>
                    <InputLabel>
                      Announcement Title{" "}
                      {update ? "" : <InputSpan>*</InputSpan>}
                    </InputLabel>
                    <Input
                      readOnly={update}
                      {...register("title", {
                        required: {
                          value: true,
                          message: "Required",
                        },
                      })}
                      type="text"
                    />
                    {errors.title && <Errors>{errors.title?.message}</Errors>}
                    <InputLabel>
                      Date of Announcement{" "}
                      {update ? "" : <InputSpan>*</InputSpan>}
                    </InputLabel>
                    <Input
                      readOnly={update}
                      type="date"
                      {...register("announcementDate", {
                        required: {
                          value: true,
                          message: "Required",
                        },
                      })}
                    />
                    {errors.announcementDate && (
                      <Errors>{errors.announcementDate?.message}</Errors>
                    )}
                    <InputLabel>
                      Departments {update ? "" : <InputSpan>*</InputSpan>}
                    </InputLabel>
                    <Controller
                      name="departments"
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
                          disabled={update}
                          disabledItemsFocusable={update}
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
                          PaperComponent={(props) => (
                            <Paper
                              sx={{
                                fontSize: "1.6rem !important",
                              }}
                              {...props}
                            />
                          )}
                          options={departmentData}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              disabled={update}
                              inputRef={ref}
                              placeholder="Select Departments"
                            />
                          )}
                        />
                      )}
                    />

                    {errors.departments && (
                      <Errors>{errors.departments?.message}</Errors>
                    )}
                    <InputLabel>
                      Description {update ? "" : <InputSpan>*</InputSpan>}
                    </InputLabel>
                    <TextArea
                      readOnly={update}
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
                    <input
                      style={{ width: "50%" }}
                      type="file"
                      disabled={update}
                      {...register(`file`, {
                        // required: {
                        //   value: update ? false : true,
                        //   message: "Required",
                        // },
                        onChange: (e) => {
                          handleFileChange(e);
                        },
                      })}
                      id="upload"
                      className="custom"
                    />
                    <div
                      style={{
                        display: "flex",
                        gap: "1.6rem",
                        alignItems: "center",
                        marginBottom: "2rem",
                      }}
                    >
                      <EditButton
                        htmlFor="upload"
                        style={{ width: "max-content" }}
                      >
                        {" "}
                        <ButtonIcon src="/images/icons/BlueUpload.svg" />{" "}
                        {isUploading ? (
                          <ThreeDots
                            height="8"
                            width="80"
                            radius="9"
                            color="#279AF1"
                            ariaLabel="three-dots-loading"
                            visible={true}
                          />
                        ) : !file ? (
                          "Upload Document "
                        ) : file?.originalName.length <= 32 ? (
                          file?.originalName
                        ) : (
                          file?.originalName?.substring(0, 30) + "..."
                        )}
                      </EditButton>
                      {update
                        ? " "
                        : file && (
                            <LightPara onClick={removeFile}>Remove</LightPara>
                          )}
                    </div>
                    {errors.file && <Errors> {errors.file?.message} </Errors>}
                    {!update ? (
                      <AddNewButton type="submit" disabled={isUploading}>
                        Submit
                      </AddNewButton>
                    ) : (
                      " "
                    )}
                  </ModalFormContainer>
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
                    style={{ width: "2rem" }}
                  >
                    Sr&nbsp;No.
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "15rem" }}
                    align="left"
                  >
                    Title
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "12rem" }}
                    align="left"
                  >
                    Date
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "15rem" }}
                    align="left"
                  >
                    Department
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "25rem" }}
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

              <TableBody>
                {!Announcements?.length && (
                  <TableRow sx={{ height: "20rem" }}>
                    <TableCell align="center" colSpan={5} sx={CellStyle2}>
                      No announcements found
                    </TableCell>
                  </TableRow>
                )}
                {Announcements?.map((data, index) => (
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
                      {index + 1}
                    </TableCell>
                    <TableCell sx={CellStyle} align="left">
                      {data.title || " - "}
                    </TableCell>
                    <TableCell sx={CellStyle2} align="left">
                      {data.announcementDate
                        ? moment
                            .utc(data?.announcementDate)
                            .format("D MMM, YYYY")
                        : " -"}
                    </TableCell>
                    <TableCell sx={CellStyle2} align="left">
                      {data.departments
                        ? data?.departments
                            ?.map((department) => department.name)
                            .join(", ")
                        : " - "}
                    </TableCell>
                    <TableCell sx={CellStyle2} align="left">
                      {data.description || " - "}
                    </TableCell>
                    <TableCell sx={CellStyle2} align="left">
                      {" "}
                      <ActionIconDiv>
                        <ActionIcons
                          onClick={() => {
                            HandleUpdateAction(data);
                          }}
                          src="/images/icons/eye.svg"
                        />
                       {userType === ROLES.ORG_ADMIN &&  <ActionIcons
                          onClick={() => {
                            HandleOpenDelete();
                            setId(data._id);
                          }}
                          src="/images/icons/Trash-2.svg"
                        />}
                        {data.attachment && (
                          <Link
                            to={API_URL + data?.attachment?.path}
                            target="_blank"
                            download
                            style={{
                              textDecoration: "none",
                              marginTop: "0rem",
                            }}
                          >
                            <ActionIcons src="/images/icons/Download.svg" />
                          </Link>
                        )}
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
      {/* Delete Modal  */}
      <DeleteModal
        openDelete={openDelete}
        HandleCloseDelete={HandleCloseDelete}
        HandleDelete={HandleDelete}
        message="Are you sure you want to delete this department?"
        isLoading={isLoading}
      />
    </>
  );
};

export default Announcements;
