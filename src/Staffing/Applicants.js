import React, { useEffect, useState, useRef } from "react";
import Table from "@mui/material/Table";
import { DevTool } from "@hookform/devtools";

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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import moment from "moment";
import interviewed from "../constants/interviewed";
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
  RejectStyle,
  PaginationDiv,
} from "../Disciplinary/DisciplinaryStyles";
import {
  EditButton,
  ButtonIcon,
  LightPara,
  FlexSpaceBetween,
  FlexSpaceBetweenmobile,
  FlexColumn,
  FlexColumnForm,
  FlexContaierForm,
  AlignFlex,
  UploadFile,
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
  maxHeight: "55rem",
  overflowY: "scroll",
};
const Applicants = ({ jobid, Tabvalue }) => {
  const anchorRef = useRef(null);
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
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSelect, setIsSelect] = useState(false);
  const [selectedApplicants, setSelectedApplicants] = useState([]);
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
    getValues,
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
    console.log("on submit data:", data);
    function isEmptyObject(obj) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          return false;
        }
      }
      return true;
    }
    if (isEmptyObject(errors) && !update) {
      if (uploadedFiles) {
        const documentIds = uploadedFiles.map((file) => file._id);
        data.documents = documentIds;
      }
      HandleSubmit(data);
    } else if (update && isEmptyObject(errors)) {
      if (uploadedFiles) {
        const documentIds = uploadedFiles.map((file) => file._id);
        data.documents = documentIds;
      }
      HandleUpdate(data);
    }
  };
  const HandleUpdateAction = (data) => {
    setUpdate(true);
    setId(data?._id);
    reset({
      name: data.name,
      interviewed: data.interviewed,
      assignedto: data.assignee?._id,
      appliedOn: data.appliedOn
        ? new Date(data.appliedOn).toISOString().split("T")[0]
        : null,
      interviewDate: data.interviewDate
        ? new Date(data.interviewDate).toISOString().split("T")[0]
        : null,
      isEligibile: data.isEligibile,
      isSelected: data.isSelected,
      file: data.documents,
      selectionOrder: data?.selectionOrder,
    });
    setUploadedFiles(data.documents);
    if (data.interviewed === interviewed.YES) {
      setIsShow(true);
    } else {
      setIsShow(false);
      setValue("isSelected", false);
    }
    if (data.isEligibile) {
      setIsVisible(true);
    }
    if (data.isSelected) {
      setIsSelect(true);
    }
    // setValue(
    //   "file",
    //   data.documents.map((file) => file._id)
    // );

    HandleOpen();
  };

  const HandleOpenAddNewAction = () => {
    setUpdate(false);
    HandleOpen();
    reset({
      isEligibile: false,
      interviewDate: "",
      interviewed: "",
    });
    clearErrors();
    setIsShow(false);
    setDetailsLength(500);
    setUploadedFiles([]);
    setIsShow(false);
    setIsVisible(false);
    setIsSelect(false);
  };

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
            setUploadedFiles([...uploadedFiles, data?.result?.file]);
            setFile(null);

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
  // console.log("this is array of files :", uploadedFiles);
  const removeFile = (e) => {
    setFile(null);
    setValue("file", null);
  };
  const handleDeleteFile = (index, fileId) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
    const updatedDocuments = getValues("file").filter((id) => id !== fileId);
    setValue("file", updatedDocuments);
  };
  const HandleSubmit = (data) => {
    // e.preventDefault();
    setIsLoading(true);
    let url = API_URLS.createApplicants.replace(":jobid", jobid);
    if (data.selectionOrder) {
      // const currentIndex = selectedApplicants.findIndex(
      //   (applicant) => applicant._id === data._id
      // );
      const Target = data.selectionOrder - 1;
      // if (currentIndex !== -1) {
      // selectedApplicants.splice(currentIndex, 1);
      selectedApplicants.splice(Target, 0, data);
      // }
      const ids = selectedApplicants.map((applicant) => applicant._id);
      HandleReorder(ids);
    } else {
      data.selectionOrder = selectedApplicants.length + 1;
    }

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
          GetApplicants();
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
    setIsDeleting(true);
    let url = API_URLS.deleteApplicants
      .replace(":jobid", jobid)
      .replace(":id", Id);
    httpClient({
      method: "put",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          let FilteredArray = applicants.filter((data) => data._id !== Id);
          let ReorderArray = FilteredArray.map((data) => data._id);
          // HandleReorder(ReorderArray);
          HandleCloseDelete();
          setId("");
          GetApplicants();
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
        setIsDeleting(false);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };
  const HandleUpdate = (data) => {
    let dataCopy = data;
    if (data.selectionOrder) {
      data.selectionOrder = selectedApplicants.length;
    }
    let url = API_URLS.updateApplicants
      .replace(":jobid", jobid)
      .replace(":id", Id);

    setIsLoading(true);

    httpClient({
      method: "put",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          const currentIndex = selectedApplicants.findIndex(
            (applicant) => applicant._id === result.applicant._id
          );
          const Target = data.selectionOrder - 1;
          if (currentIndex !== -1) {
            selectedApplicants.splice(currentIndex, 1);
            selectedApplicants.splice(Target, 0, result.applicant);
          }
          const ids = selectedApplicants.map((applicant) => applicant._id);
          HandleReorder(ids);
          setId("");
          GetApplicants();
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
  const GetApplicants = () => {
    setIsLoading(true);
    let url = API_URLS.listApplicants.replace(":jobid", jobid);
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setResult(result);
          const SelectedApplicants = result.applicants.filter(
            (applicant) => applicant.isSelected
          );
          setSelectedApplicants(SelectedApplicants);
          if (Tabvalue === 0) {
            setApplicants(result.applicants);
          } else if (Tabvalue === 1) {
            const eligibleApplicants = result.applicants.filter(
              (applicant) => applicant.isEligibile
            );
            setApplicants(eligibleApplicants);
          } else if (Tabvalue === 2) {
            const eligibleApplicants = result.applicants.filter(
              (applicant) => applicant.interviewed === "YES"
            );
            setApplicants(eligibleApplicants);
          } else if (Tabvalue === 3) {
            // isSelected
            const eligibleApplicants = result.applicants.filter(
              (applicant) => applicant.isSelected
            );
            setApplicants(eligibleApplicants);
          }
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
  const HandleReorder = (reOrder) => {
    let url = API_URLS.reorderApplicants.replace(":jobid", jobid);

    httpClient({
      method: "put",
      url,
      data: { applicants: reOrder },
    })
      .then(({ result, error }) => {
        if (result) {
          // GetApplicants();
        } else {
          ////toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error creating department. Please try again.");
      });
  };
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedData = Array.from(applicants);
    const [movedItem] = reorderedData.splice(result.source.index, 1);
    reorderedData.splice(result.destination.index, 0, movedItem);
    setApplicants(reorderedData);
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

  useEffect(() => {
    GetApplicants();
    if (location.pathname.indexOf("manager") > -1) {
      setUserType(ROLES.MANAGER);
    } else if (location.pathname.indexOf("hr") > -1) {
      setUserType(ROLES.HR);
    } else if (location.pathname.indexOf("user") > -1) {
      setUserType(ROLES.EMPLOYEE);
    }
  }, [Tabvalue]);

  const handleDownload = (documents) => {
    let API_URL = process.env.REACT_APP_API_URL;
    // Create an anchor element
    documents.forEach((document) => {
      const fileUrl = API_URL + document?.path;
      console.log(fileUrl, document);
      anchorRef.current.href = fileUrl;
      anchorRef.current.target = "_blank";
      anchorRef.current.download = document.originalName;

      anchorRef.current.click();
    });
  };

  return (
    <>
      <DisciplinaryDiv>
        <DisciplinaryHeading>
          {Tabvalue === 0
            ? "Applicant List"
            : Tabvalue === 1
            ? "Meets Eligibility "
            : Tabvalue === 2
            ? " Interviewed"
            : Tabvalue === 3
            ? "Selections "
            : " - "}
        </DisciplinaryHeading>

        {Tabvalue === 0 && (
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
                    <FlexColumnForm>
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
                    </FlexColumnForm>
                    <FlexContaierForm style={{ alignItems: "flex-start" }}>
                      <FlexColumnForm>
                        <InputLabel>
                          Applied On <InputSpan>*</InputSpan>
                        </InputLabel>
                        <Input
                          type="date"
                          {...register("appliedOn", {
                            required: {
                              value: true,
                              message: "Required",
                            },
                            onChange: (e) => {
                              const endDate = getValues("interviewDate");

                              const startDate = new Date(e.target.value);

                              if (startDate >= new Date(endDate) && endDate) {
                                setError("expiryDate", {
                                  type: "custom",
                                  message:
                                    "Must not be earlier than  applied on",
                                });
                              } else {
                                setError("interviewDate", {
                                  type: "custom",
                                  message: "",
                                });
                              }
                            },
                          })}
                        />
                        {errors.appliedOn && (
                          <Errors>{errors.appliedOn?.message}</Errors>
                        )}
                      </FlexColumnForm>
                    </FlexContaierForm>
                    <FlexColumnForm
                      style={{ margin: " 0.6rem 0rem 1rem 0rem" }}
                    >
                      <AlignFlex>
                        <input
                          type="checkbox"
                          defaultChecked={false}
                          {...register(`isEligibile`, {
                            onChange: (e) => {
                              let Value = e.target.checked;
                              if (Value) {
                                setIsVisible(true);
                              } else {
                                setIsVisible(false);
                              }
                            },
                          })}
                          id={`isEligibile`}
                        />
                        <InputLabel
                          htmlFor={`isEligibile`}
                          style={{
                            marginBottom: "0rem",
                            cursor: "pointer",
                          }}
                        >
                          Is Eligible?{" "}
                        </InputLabel>
                      </AlignFlex>
                    </FlexColumnForm>

                    {isVisible ? (
                      <>
                        {" "}
                        <FlexColumnForm>
                          <InputLabel>Interview Date</InputLabel>
                          <Input
                            type="date"
                            {...register("interviewDate", {
                              // required: {
                              //   value: true,
                              //   message: "Required",
                              // },
                              validate: (fieldValue) => {
                                const startDateValue = getValues("appliedOn");

                                const endDateValue = getValues("interviewDate");

                                if (endDateValue && startDateValue) {
                                  const endDate = new Date(endDateValue);
                                  const startDate = new Date(startDateValue);
                                  if (startDate > endDate) {
                                    return "Interview date must not be earlier than applied on";
                                  } else {
                                    return clearErrors("interviewDate");
                                  }
                                }
                              },
                            })}
                          />
                          {errors.interviewDate && (
                            <Errors>{errors.interviewDate?.message}</Errors>
                          )}
                        </FlexColumnForm>
                        <FlexColumnForm>
                          <InputLabel>Interviewed</InputLabel>
                          <Controller
                            name={`interviewed`}
                            control={control}
                            rules={{
                              // required: {
                              //   value: true,
                              //   message: "Required",
                              // },
                              onChange: (e) => {
                                let interviewValue = e.target.value;
                                if (interviewValue === interviewed.YES) {
                                  setIsShow(true);
                                } else {
                                  setIsShow(false);
                                  setValue("isSelected", false);
                                  setIsSelect(false);
                                  setValue("selectionOrder", " ");
                                }
                              },
                            }}
                            render={({ field }) => (
                              <Select {...field}>
                                <Option>Select</Option>
                                <Option value={interviewed.YES}> YES </Option>
                                <Option value={interviewed.NO}> NO </Option>
                                <Option value={interviewed.DID_NOT_ATTEND}>
                                  Did not attend
                                </Option>
                              </Select>
                            )}
                          />
                          {errors.interviewed && (
                            <Errors> {errors.interviewed?.message}</Errors>
                          )}
                        </FlexColumnForm>
                        <FlexContaierForm style={{ marginBottom: "1rem" }}>
                          {isShow ? (
                            <FlexColumnForm>
                              <AlignFlex>
                                <input
                                  type="checkbox"
                                  {...register(`isSelected`, {
                                    onChange: (e) => {
                                      let Value = e.target.checked;
                                      if (Value) {
                                        setIsSelect(true);
                                      } else {
                                        setIsSelect(false);
                                      }
                                    },
                                  })}
                                  id={`isSelected`}
                                />
                                <InputLabel
                                  htmlFor={`isSelected`}
                                  style={{
                                    marginBottom: "0rem",
                                    cursor: "pointer",
                                  }}
                                >
                                  Is Selected
                                </InputLabel>
                              </AlignFlex>
                            </FlexColumnForm>
                          ) : (
                            "  "
                          )}
                        </FlexContaierForm>
                        {isSelect && (
                          <FlexColumnForm>
                            <InputLabel>Select Order</InputLabel>
                            <Controller
                              name="selectionOrder"
                              control={control}
                              render={({ field }) => (
                                <Select {...field}>
                                  <Option value={0}>Select</Option>
                                  {selectedApplicants.length === 0 && (
                                    <Option value={1}>1</Option>
                                  )}
                                  {update
                                    ? selectedApplicants.map((data, index) => (
                                        <Option key={index} value={index + 1}>
                                          {index + 1}
                                        </Option>
                                      ))
                                    : selectedApplicants.length > 0 &&
                                      Array.from(
                                        {
                                          length: selectedApplicants.length + 1,
                                        },
                                        (_, index) => (
                                          <Option key={index} value={index + 1}>
                                            {index + 1}
                                          </Option>
                                        )
                                      )}
                                </Select>
                              )}
                            />
                            {errors.selectionOrder && (
                              <Errors>{errors.selectionOrder?.message}</Errors>
                            )}
                          </FlexColumnForm>
                        )}
                      </>
                    ) : (
                      " "
                    )}

                    <input
                      style={{ width: "50%" }}
                      type="file"
                      {...register(`file`, {
                        required: {
                          value: uploadedFiles.length === 0 ? true : false,
                          message: "Required",
                        },
                        onChange: (e) => {
                          handleFileChange(e);
                        },
                      })}
                      id="upload"
                      className="custom"
                      disabled={isUploading}
                    />
                    <div
                      style={{
                        display: "flex",
                        gap: "1.6rem",
                        alignItems: "center",
                        marginBottom: "2rem",
                        marginTop: "2rem",
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
                        ) : (
                          "Upload Document "
                        )}
                      </EditButton>

                      {file && (
                        <LightPara onClick={removeFile}>Remove</LightPara>
                      )}
                    </div>
                    {errors.file && <Errors> {errors.file?.message} </Errors>}

                    {uploadedFiles &&
                      uploadedFiles.map((data, index) => (
                        <UploadFile>
                          <span>{data?.originalName}</span>
                          <ActionIcons
                            onClick={() => {
                              handleDeleteFile(data._id);
                            }}
                            src="/images/icons/Trash-2.svg"
                          />
                        </UploadFile>
                      ))}
                    {!update ? (
                      <AddNewButton
                        type="submit"
                        disabled={isUploading}
                        style={{ marginTop: "2.5rem" }}
                      >
                        Submit
                      </AddNewButton>
                    ) : (
                      <AddNewButton
                        type="submit"
                        disabled={isUploading}
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
                  {/* <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "9rem" }}
                    align="left"
                  >
                    Phone
                  </TableCell> */}
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
                    style={{ minWidth: "9rem" }}
                    align="left"
                  >
                    Meets&nbsp;Eligibility
                  </TableCell>

                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "10rem" }}
                    align="left"
                  >
                    Interviewed
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "8rem" }}
                    align="left"
                  >
                    Selected
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
                {!applicants?.length && (
                  <TableRow sx={{ height: "20rem" }}>
                    <TableCell align="center" sx={CellStyle2} colSpan={8}>
                      No job applicants found
                    </TableCell>
                  </TableRow>
                )}
                {applicants?.map((data, index) => (
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
                      <MenuIconDiv>
                        {/* <MenuIcon
                          src="/images/icons/Menu Dots.svg "
                          style={{ cursor: "grab" }}
                        /> */}
                        {index + 1}
                      </MenuIconDiv>
                    </TableCell>
                    <TableCell sx={CellStyle} align="left">
                      {data.name || " - "}
                    </TableCell>
                    {/* <TableCell sx={CellStyle2} align="left">
                      {data.duration}
                    </TableCell> */}
                    {/* <TableCell sx={CellStyle} align="left">
                      {data.phone}
                    </TableCell> */}
                    <TableCell sx={CellStyle2} align="left">
                      {data?.appliedOn
                        ? moment(data.appliedOn).format("D MMM, YYYY")
                        : " - "}
                    </TableCell>
                    <TableCell sx={CellStyle2} align="left">
                      {data?.interviewDate
                        ? moment(data.interviewDate).format("D MMM, YYYY")
                        : " - "}
                    </TableCell>
                    <TableCell sx={CellStyle2} align="left">
                      {data?.isEligibile ? "Yes" : "No"}
                    </TableCell>

                    <TableCell sx={CellStyle2} align="left">
                      {data.interviewed
                        ? data.interviewed === interviewed.NO
                          ? "No"
                          : data.interviewed === interviewed.YES
                          ? "Yes"
                          : data.interviewed === interviewed.DID_NOT_ATTEND
                          ? "Did not attend"
                          : " - "
                        : " - "}
                    </TableCell>
                    <TableCell sx={CellStyle2} align="left">
                      {data?.isSelected ? "Yes" : "No"}
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
                        <>
                          <ActionIcons
                            onClick={() => {
                              handleDownload(data.documents);
                            }}
                            src="/images/icons/Download.svg"
                          />
                          <a ref={anchorRef} style={{ display: "none" }}></a>
                        </>
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
        HandleDelete={HandleDelete}
      />
      <DevTool control={control} />
    </>
  );
};

export default Applicants;
