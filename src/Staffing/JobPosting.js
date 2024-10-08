import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import Pagination from "@mui/material/Pagination";
import { useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import { useForm, Controller } from "react-hook-form";
import { RotatingLines, ThreeDots } from "react-loader-spinner";
import CommenDashHeader from "../Dashboard/CommenDashHeader";
import DeleteModal from "../Modals/DeleteModal";
import API_URLS from "../constants/apiUrls";
import ROLES from "../constants/roles";
import httpClient from "../api/httpClient";
import { AiOutlinePrinter } from "react-icons/ai";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BiSortAlt2 } from "react-icons/bi";
import { FaLongArrowAltDown } from "react-icons/fa";
import { FaLongArrowAltUp } from "react-icons/fa";
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
  TabelDarkPara,
  ButtonIcon,
  LightPara,
  EditButton,
} from "../Employee/ViewEmployee/ViewEmployeeStyle";
import { FlexContaier } from "../Dashboard/OADashboard/OADashBoardStyles";

const UnderlineHoverEffect = styled.div`
  cursor: pointer;
  display: flex;
  gap: 0.8rem;
  align-items: center;
  &:hover {
    ${TabelDarkPara} {
      text-decoration: underline;
    }
  }
`;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: " 44.6rem",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 45,
  // padding: "2rem 0rem",
  borderRadius: "8px",
  // height: "55rem",
  // overflowY: "scroll",
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
const SortArrow = {
  fontSize: "2rem",
};
const UPDownArrow = {
  color: "#222B45",
};
const JobPosting = () => {
  let API_URL = process.env.REACT_APP_API_URL;

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
  const [sort, setSort] = useState(false);

  const HandleChangePage = (event, value) => {
    setPage(value);
  };
  // sorting variables
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const HandleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prevOrder) => {
        switch (prevOrder) {
          case "asc":
            return "desc";
          case "desc":
            return "";
          default:
            return "asc"; // Start with ascending if unsorted
        }
      });
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };
  console.log("sorting variables ", sortBy, sortOrder);
  const {
    register,
    control,
    clearErrors,
    handleSubmit,
    reset,
    getValues,
    setValue,
    setError,
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
    setFile(null);
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
      if (file) {
        data.file = file._id;
      } else {
        data.file = null;
      }
      HandleSubmit(data);
    } else if (update && isEmptyObject(errors)) {
      if (file) {
        data.file = file._id;
      } else {
        data.file = null;
      }
      HandleUpdate(data);
    }
  };
  const HandleUpdateAction = (data) => {
    setUpdate(true);
    setId(data?._id);
    reset({
      title: data.title,
      department: data.department?._id,
      closingDate: data.closingDate
        ? new Date(data.closingDate).toISOString().split("T")[0]
        : null,
      postingDate: data.postingDate
        ? new Date(data.postingDate).toISOString().split("T")[0]
        : null,
      boardMembers: data.boardMembers,
      disciplinary: data.disciplinary?._id,
      file: data?.file ? data?.file?._id : null,
    });
    if (data.file) {
      setFile(data.file);
    }
    HandleOpen();
  };

  const HandleOpenAddNewAction = () => {
    setUpdate(false);
    reset({});
    clearErrors();
    setDetailsLength(500);
    setFile(null);
    HandleOpen();
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
  const GetJobPostings = () => {
    setIsLoading(true);
    const sortField =
      sortBy === "title"
        ? "title"
        : sortBy === "department"
        ? "department.name"
        : "closingDate";

    const sortOrders = sortOrder === "asc" ? 1 : sortOrder === "desc" ? -1 : 0;
    let url = API_URLS.listJobs
      .replace("Page", page)
      .replace("searchValue", searchValue)
      .replace("Sort", sort);
    url += `&sortBy=${sortField}&sortOrder=${sortOrders}`;

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
        toast.error("Error creating department. Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const HandleSubmit = (data) => {
    setIsLoading(true);
    let dataCopy = data;

    let url = API_URLS.createJobs;
    httpClient({
      method: "post",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          HandleClose();
          GetJobPostings();
          toast.success(result.message, {
            className: "toast",
          }); //Employee disciplinary added successfully");
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        toast.error("Error Adding New Disciplinary . Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const HandleUpdate = (data) => {
    setIsLoading(true);
    let dataCopy = data;

    let url = API_URLS.updateJobs.replace(":id", Id);

    httpClient({
      method: "put",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          setId("");
          GetJobPostings();
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
    setIsDeleting(true);
    let url = API_URLS.deleteJobs.replace(":id", Id);
    httpClient({
      method: "put",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          HandleCloseDelete();
          setId("");
          GetJobPostings();

          toast.success(result.message, {
            className: "toast",
          });
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error Deleting Benefits. Please try again.");
        setIsDeleting(false);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    // const inputString = e.target.files[0].type;
    // const parts = inputString?.split("/");
    // const type = parts[parts?.length - 1];

    let type = await getFileType(e.target.files[0]);
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
        data: binary,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((data) => {
          if (data?.result) {
            setFile(data?.result?.file);
            //  insert(index, { file: data?.result?.file?._id });
            // setFormData({ ...formData, file: data?.result.file._id });
            setIsUploading(false);
          } else {
            //console.log(data.error);
            toast.error(data.error.error);
            // setErrors({ ...errors, fileError: data?.error?.error });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setIsUploading(false);
        })
        .finally(() => {
          setIsUploading(false);
        });
    }
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

  const removeFile = (e) => {
    setFile(null);
    setValue("file", null);
  };
  useEffect(() => {
    GetJobPostings();
  }, [page, searchValue, sortBy, sortOrder, sort]);
  useEffect(() => {
    GetDepartments();

    if (location.pathname.indexOf("manager") > -1) {
      setUserType(ROLES.MANAGER);
    } else if (location.pathname.indexOf("hr") > -1) {
      setUserType(ROLES.HR);
    } else if (location.pathname.indexOf("payroll") > -1) {
      setUserType(ROLES.PAYROLL);
    } else if (location.pathname.indexOf("user") > -1) {
      setUserType(ROLES.EMPLOYEE);
    }
  }, []);
  const HandleSortActive = () => {
    setSort(!sort);
  };
  return (
    <>
      <CommenDashHeader onSearch={HandleSearchCahnge} text={"Staffing"} />
      <DisciplinaryDiv>
        <DisciplinaryHeading>
          {" "}
          {sort ? "Ongoing" : "Completed"} Jobs
        </DisciplinaryHeading>
        <FlexContaier>
          <AddNewButton
            onClick={() => HandleSortActive(true)}
            disabled={isLoading}
          >
            {isLoading ? (
              <ThreeDots
                height="8"
                width="80"
                radius="9"
                color="#fff"
                ariaLabel="three-dots-loading"
                visible={true}
              />
            ) : (
              "View " + (sort ? "Completed" : "Ongoing")
            )}
          </AddNewButton>
          {userType === ROLES.MANAGER ? (
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
        </FlexContaier>

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
                    {!update ? "Add Job" : "Update Job"}
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
                      Job Title <InputSpan>*</InputSpan>
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
                      Department <InputSpan>*</InputSpan>
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
                      render={({ field }) => (
                        <Select {...field}>
                          <Option>Select</Option>
                          {departmentData?.map((data) => (
                            <Option value={data._id}>{data.name}</Option>
                          ))}
                        </Select>
                      )}
                    />
                    {errors.department && (
                      <Errors>{errors.department?.message}</Errors>
                    )}
                    <InputLabel>
                      Posting Date <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="date"
                      {...register("postingDate", {
                        required: {
                          value: true,
                          message: "Required",
                        },
                        onChange: (e) => {
                          const endDate = getValues("closingDate");

                          const startDate = new Date(e.target.value);

                          if (startDate >= new Date(endDate) && endDate) {
                            setError("expiryDate", {
                              type: "custom",
                              message: "Must not be earlier than posting date",
                            });
                          } else {
                            setError("closingDate", {
                              type: "custom",
                              message: "",
                            });
                          }
                        },
                      })}
                    />
                    {<Errors>{errors.postingDate?.message}</Errors>}
                    <InputLabel>
                      Closing Date <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="date"
                      {...register("closingDate", {
                        required: {
                          value: true,
                          message: "Required",
                        },
                        validate: (fieldValue) => {
                          const startDateValue = getValues("postingDate");

                          const endDateValue = getValues("closingDate");

                          if (endDateValue && startDateValue) {
                            const endDate = new Date(endDateValue);
                            const startDate = new Date(startDateValue);
                            if (startDate > endDate) {
                              return "Closing date must not be earlier than posting date";
                            } else {
                              return clearErrors("closingDate");
                            }
                          }
                        },
                      })}
                    />
                    {<Errors>{errors.closingDate?.message}</Errors>}
                    <InputLabel>
                      Board Members<InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="text"
                      {...register("boardMembers", {
                        required: {
                          value: true,
                          message: "Required",
                        },
                      })}
                    />
                    <input
                      style={{ width: "50%" }}
                      type="file"
                      // accept="image/*,capture=camera"
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
                          file?.originalName.substring(0, 30) + "..."
                        )}
                      </EditButton>
                      {file && (
                        <LightPara onClick={removeFile}>Remove</LightPara>
                      )}
                    </div>
                    {errors.file && <Errors> {errors.file?.message} </Errors>}

                    {<Errors>{errors.boardMembers?.message}</Errors>}

                    {!update ? (
                      <AddNewButton
                        type="submit"
                        disabled={isLoading || isUploading}
                        style={{ marginTop: "2.5rem" }}
                      >
                        Submit
                      </AddNewButton>
                    ) : (
                      <AddNewButton
                        type="submit"
                        disabled={isLoading || isUploading}
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
                    align="left"
                    style={{ width: "12rem", cursor: "pointer" }}
                    onClick={() => HandleSort("title")}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span
                        style={
                          result?.sortBy === "title"
                            ? result?.sortOrder
                              ? { color: "#222B45" }
                              : {}
                            : {}
                        }
                      >
                        Job Title
                      </span>
                      {result?.sortBy === "title" ? (
                        result?.sortOrder === 1 ? (
                          <FaLongArrowAltUp style={UPDownArrow} />
                        ) : (
                          <FaLongArrowAltDown style={UPDownArrow} />
                        )
                      ) : (
                        <BiSortAlt2 style={SortArrow} />
                      )}
                    </div>
                  </TableCell>
                  {/* <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "6rem" }}
                    align="left"
                  >
                    Duration
                  </TableCell> */}
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "9rem", cursor: "pointer" }}
                    align="left"
                    onClick={() => HandleSort("department")}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span
                        style={
                          result?.sortBy === "department.name"
                            ? result?.sortOrder
                              ? { color: "#222B45" }
                              : {}
                            : {}
                        }
                      >
                        Department
                      </span>
                      {result?.sortBy === "department.name" ? (
                        result?.sortOrder === 1 ? (
                          <FaLongArrowAltUp style={UPDownArrow} />
                        ) : (
                          <FaLongArrowAltDown style={UPDownArrow} />
                        )
                      ) : (
                        <BiSortAlt2 style={SortArrow} />
                      )}
                    </div>
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "6rem" }}
                    align="left"
                  >
                    Posting&nbsp;Date
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "6rem", cursor: "pointer" }}
                    align="left"
                    onClick={() => HandleSort("closingDate")}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span
                        style={
                          result?.sortBy === "closingDate"
                            ? result?.sortOrder
                              ? { color: "#222B45" }
                              : {}
                            : {}
                        }
                      >
                        Closing&nbsp;Date
                      </span>
                      {result?.sortBy === "closingDate" ? (
                        result?.sortOrder === 1 ? (
                          <FaLongArrowAltUp style={UPDownArrow} />
                        ) : (
                          <FaLongArrowAltDown style={UPDownArrow} />
                        )
                      ) : (
                        <BiSortAlt2 style={SortArrow} />
                      )}
                    </div>
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "10rem" }}
                    align="left"
                  >
                    Board Members
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "2rem" }}
                    align="left"
                  >
                    Applicants
                  </TableCell>

                  {/* <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "7rem" }}
                    align="left"
                  >
                    Posting&nbsp;Date
                  </TableCell> */}
                  {/* <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "18rem" }}
                    align="left"
                  >
                    Description
                  </TableCell> */}
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
                {!result?.jobs?.length && (
                  <TableRow sx={{ height: "20rem" }}>
                    <TableCell align="center" sx={CellStyle2} colSpan={8}>
                      No job posting found
                    </TableCell>
                  </TableRow>
                )}
                {result?.jobs?.map((data, index) => (
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
                      <MenuIconDiv
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          if (userType === ROLES.HR) {
                            Navigate(
                              `/hr-management/job-posting/details/${data._id}`
                            );
                          } else if (userType === ROLES.MANAGER) {
                            Navigate(
                              `/manager-management/job-posting/details/${data._id}`
                            );
                          } else if (userType === ROLES.PAYROLL) {
                            Navigate(
                              `/payroll-management/job-posting/details/${data._id}`
                            );
                          } else if (userType === ROLES.EMPLOYEE) {
                            Navigate(
                              `/user-management/job-posting/details/${data._id}`
                            );
                          } else {
                            Navigate(
                              `/organization-admin/job-posting/details/${data._id}`
                            );
                          }
                        }}
                      >
                        <UnderlineHoverEffect>
                          <TabelDarkPara>{data.title || " - "}</TabelDarkPara>
                        </UnderlineHoverEffect>
                      </MenuIconDiv>
                    </TableCell>
                    {/* <TableCell sx={CellStyle2} align="left">
                      {data.duration}
                    </TableCell> */}
                    <TableCell sx={CellStyle} align="left">
                      {data?.department?.name}
                    </TableCell>
                    <TableCell sx={CellStyle} align="left">
                      {data?.postingDate
                        ? moment.utc(data.postingDate).format("D MMM, YYYY")
                        : " - "}
                    </TableCell>
                    <TableCell sx={CellStyle} align="left">
                      {data?.closingDate
                        ? moment.utc(data.closingDate).format("D MMM, YYYY")
                        : " - "}
                    </TableCell>
                    {/* <TableCell sx={CellStyle2} align="left">
                      {data.Position || " - "}
                    </TableCell> */}
                    {/* <TableCell sx={CellStyle2} align="left">
                      {data.postingDate || " - "}
                      {data.dueDate
                          ? moment.utc(data.dueDate).format("D MMM, YYYY")
                          : " -"}
                    </TableCell> */}
                    <TableCell sx={CellStyle2} align="left">
                      {data.boardMembers || " - "}
                    </TableCell>
                    <TableCell sx={CellStyle2} align="left">
                      {data.applicants?.length || " - "}
                    </TableCell>
                    <TableCell sx={CellStyle2} align="left">
                      {data.isCompleted ? (
                        <ApproveStyle>Ongoing</ApproveStyle>
                      ) : (
                        <PendingStyle>Completed</PendingStyle>
                      )}
                    </TableCell>
                    <TableCell sx={CellStyle2} align="left">
                      {" "}
                      <ActionIconDiv>
                        <ActionIcons
                          onClick={() => {
                            if (userType === ROLES.HR) {
                              Navigate(
                                `/hr-management/job-posting/details/${data._id}`
                              );
                            } else if (userType === ROLES.MANAGER) {
                              Navigate(
                                `/manager-management/job-posting/details/${data._id}`
                              );
                            } else if (userType === ROLES.PAYROLL) {
                              Navigate(
                                `/payroll-management/job-posting/details/${data._id}`
                              );
                            } else if (userType === ROLES.EMPLOYEE) {
                              Navigate(
                                `/user-management/job-posting/details/${data._id}`
                              );
                            } else {
                              Navigate(
                                `/organization-admin/job-posting/details/${data._id}`
                              );
                            }
                          }}
                          src="/images/icons/eye.svg"
                        />
                        {userType === ROLES.EMPLOYEE ||
                        userType === ROLES.MANAGER ? (
                          " "
                        ) : (
                          <ActionIcons
                            onClick={() => {
                              HandleUpdateAction(data);
                            }}
                            src="/images/icons/Pendown.svg"
                          />
                        )}
                        {/* <AiOutlinePrinter
                          style={{
                            width: "2rem",
                            height: "2rem",
                            cursor: "pointer",
                            color: "#279AF1",
                          }}
                        /> */}
                        {userType === ROLES.EMPLOYEE ||
                        userType === ROLES.MANAGER ? (
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
                        {data?.file && (
                          <Link
                            to={API_URL + data?.file?.path}
                            target="_blank"
                            download
                            style={{
                              textDecoration: "none",
                              marginTop: ".6rem",
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
      <DeleteModal
        openDelete={openDelete}
        HandleCloseDelete={HandleCloseDelete}
        HandleDelete={HandleDelete}
        message="Are you sure you want to delete this job posting?"
        isLoading={isDeleting}
      />
    </>
  );
};

export default JobPosting;
