import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import Modal from "@mui/material/Modal";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import { useNavigate, useLocation, useParams } from "react-router";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import { useForm, Controller } from "react-hook-form";
import { RotatingLines, ThreeDots } from "react-loader-spinner";
import CommenDashHeader from "../Dashboard/CommenDashHeader";
import DeleteModal from "../Modals/DeleteModal";
import API_URLS from "../constants/apiUrls";
import ROLES from "../constants/roles";
import httpClient from "../api/httpClient";
import InputMask from "react-input-mask";

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
} from "../Disciplinary/DisciplinaryStyles";
import {
  EditButton,
  ButtonIcon,
  LightPara,
} from "../Employee/ViewEmployee/ViewEmployeeStyle";
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
const inputStyles = {
  fontSize: "1.3rem",
  fontWeight: 400,
  lineHeight: "1.6rem",
  width: "100%",
  border: "1px solid #dcdcdc",
  borderRadius: "8px",
  padding: "1em",
  marginBottom: "1rem",
  color: "#222b45",
  background: "#fff",
  boxSizing: "border-box",
  outline: "none", // Removed outline color
};
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
const Applicants = () => {
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
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const HandleChangePage = (event, value) => {
    setPage(value);
  };
  const {
    register,
    control,
    clearErrors,
    handleSubmit,
    reset,
    setError,
    setValue,
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
  const jobPosting = [
    {
      id: 1,
      title: "Developer",
      description: "works in js and react ",
      duration: "5 months",
      rate: "500",
      department: "IT",
      position: "head",
      postingDate: "22,Nov 2023",
    },
    {
      id: 2,
      title: "Developer",
      description: "works in js and react ",
      duration: "5 months",
      rate: "500",
      department: "IT",
      position: "head",
      postingDate: "22,Nov 2023",
    },
    {
      id: 3,
      title: "Developer",
      description: "works in js and react ",
      duration: "5 months",
      rate: "500",
      department: "IT",
      position: "head",
      postingDate: "22,Nov 2023",
    },

    {
      id: 4,
      title: "Developer",
      description: "works in js and react ",
      duration: "5 months",
      rate: "500",
      department: "IT",
      position: "head",
      postingDate: "22,Nov 2023",
    },
    {
      id: 5,
      title: "Developer",
      description: "works in js and react ",
      duration: "5 months",
      rate: "500",
      department: "IT",
      position: "head",
      postingDate: "22,Nov 2023",
    },
  ];
  const getFileType = (file) => {
    const fileExtension = file.name.split(".").pop().toLowerCase();

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
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    let type = await getFileType(e.target.files[0]);
    //console.log("this file type:", type);
    if (type != "unknown") {
      handleUpload(file, type);
    } else {
      toast.error("Unsuported file type.");
    }
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
          //console.log(data);

          if (data?.result) {
            //console.log(data?.result);
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
  return (
    <>
      <DisciplinaryDiv>
        <DisciplinaryHeading>Applicants List</DisciplinaryHeading>

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
                    {!update ? "Add Applicant" : "Update Applicant"}
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
                      Name <InputSpan>*</InputSpan>
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
                      Email <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="text"
                      {...register("email", {
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Please enter a valid email",
                        },
                      })}
                    />
                    {errors.email && <Errors> {errors.email?.message} </Errors>}
                    <InputLabel>
                      Phone No.<InputSpan>*</InputSpan>
                    </InputLabel>
                    <Controller
                      name="phone"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Required",
                        },
                      }}
                      render={({ field }) => (
                        <InputMask
                          {...field}
                          style={{ ...inputStyles }}
                          mask="(999) 999-9999"
                          onChange={(e) => {
                            const value = e.target.value;
                            const numericPhoneNumber = value.replace(/\D/g, "");
                            const numericValue = parseInt(
                              numericPhoneNumber,
                              10
                            );
                            const Length = numericValue.toString().length;
                            if (Length !== 10) {
                              setError("phone", {
                                type: "custom",
                                message: "Phone number must be 10 digits long",
                              });
                            } else clearErrors("phone");
                            setValue("phone", numericValue);
                          }}
                          id="phone"
                          type="text"
                          name="emergencyContactNumber"
                        />
                      )}
                    />

                    {<Errors> {errors.phone?.message} </Errors>}
                    <input
                      style={{ width: "50%" }}
                      type="file"
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
                      {file && (
                        <LightPara onClick={removeFile}>Remove</LightPara>
                      )}
                    </div>
                    {errors.file && <Errors> {errors.file?.message} </Errors>}
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
                    Sr.&nbsp;No.
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "12rem" }}
                    align="left"
                  >
                    Name
                  </TableCell>
                  {/* <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "6rem" }}
                    align="left"
                  >
                    Email
                  </TableCell> */}
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "9rem" }}
                    align="left"
                  >
                    Phone
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "9rem" }}
                    align="left"
                  >
                    Applied&nbsp;on
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "9rem" }}
                    align="left"
                  >
                    Interview&nbsp;Date
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
                {!jobPosting?.length && (
                  <TableRow sx={{ height: "20rem" }}>
                    <TableCell align="center" sx={CellStyle2} colSpan={7}>
                      No job posting found
                    </TableCell>
                  </TableRow>
                )}
                {jobPosting?.map((data, index) => (
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
                    {/* <TableCell sx={CellStyle2} align="left">
                      {data.duration}
                    </TableCell> */}
                    <TableCell sx={CellStyle} align="left">
                      {data.department}
                    </TableCell>
                    <TableCell sx={CellStyle} align="left">
                      {data.department}
                    </TableCell>
                    <TableCell sx={CellStyle} align="left">
                      {data.department}
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
                          onClick={() => {
                            // HandleOpenDelete();
                            // setId(data._id);
                          }}
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
        message="Are you sure you want to delete this applicant?"
        HandleCloseDelete={HandleCloseDelete}
        isLoading={isDeleting}
        // HandleDelete={HandleDelete}
      />
    </>
  );
};

export default Applicants;
