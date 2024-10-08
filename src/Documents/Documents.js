import React, { useState, useEffect } from "react";
import { RotatingLines, ThreeDots } from "react-loader-spinner";
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
import { DevTool } from "@hookform/devtools";
import styled from "styled-components";
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
  FlexContaier,
  RadioLabel,
  RadioButtonContainer,
  RadioButton,
  RadioSpan,
} from "../Disciplinary/DisciplinaryStyles";
import {
  EditButton,
  LightPara,
  ButtonIcon,
  TabelDarkPara,
  FlexSpaceBetweenmobile,
  FilterDiv,
  FilterContainer,
} from "../Employee/ViewEmployee/ViewEmployeeStyle";
import { Link } from "react-router-dom";

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
  lineHeight: "2rem",
};
const CellStyle2 = {
  color: "#222B45",
  fontSize: "1.4rem",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "2rem",
};
const SortArrow = {
  fontSize: "2rem",
};
const UPDownArrow = {
  color: "#222B45",
};
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

const Documents = () => {
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
  const [suggestions, setSuggestions] = useState([]);
  const [filter, setFilter] = useState();

  const HandleChangePage = (event, value) => {
    setPage(value);
  };
  // sorting variables
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const HandleSort = (field) => {
    if (sortBy === field) {
      const selectedIds = keywords.map((item) => item.id);

      const filters = {
        keywords: selectedIds,
        department: department,
      };
      setFilter(filters);
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
      const newTags = data?.tags
        .filter((tag) => tag.id === tag.text)
        .map((tag) => tag.text);
      data.tags = data.tags
        .filter((tag) => tag.id !== tag.text)
        .map((tag) => tag.id);
      data.newTags = newTags;
      if (file) {
        data.file = file._id;
      } else {
        data.file = null;
      }
      // //console.log("form data", data);

      HandleSubmit(data);
    } else if (update && isEmptyObject(errors)) {
      const newTags = data?.tags
        .filter((tag) => tag.id === tag.text)
        .map((tag) => tag.text);
      data.tags = data.tags
        .filter((tag) => tag.id !== tag.text)
        .map((tag) => tag.id);
      data.newTags = newTags;
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
    setId(data._id);
    setDetailsLength(500 - data?.description?.length);
    reset({
      title: data.title,
      departments: data.departments?.map((data) => data._id),
      tags: data.tags?.map((data) => ({
        id: data?._id,
        text: data?.name,
      })),
      file: data?.versions[data?.versions?.length - 1]?.file?._id,
    });
    // setValue("departments;",data.departments)
    setFile(data?.versions[data?.versions?.length - 1]?.file);
    HandleOpen();
  };

  const HandleOpenAddNewAction = () => {
    setUpdate(false);
    HandleOpen();
    reset({});
    clearErrors();
    setFile(null);
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
    } else if (location.pathname.indexOf("payroll") > -1) {
      setUserType(ROLES.PAYROLL);
    } else if (location.pathname.indexOf("user") > -1) {
      setUserType(ROLES.EMPLOYEE);
    }
    GetDepartments();
    GetDocumentTagsList();
  }, []);
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
  const GetDocumentTagsList = () => {
    setIsLoading(true);
    let url = API_URLS.getDocumentTagsList;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          const suggestions = result?.documentTags?.map((data) => ({
            id: data?._id,
            text: data?.name,
          }));
          setSuggestions(suggestions);
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
  const GetDocuments = (filters) => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);

      let url = API_URLS.getDocuments
        .replace("searchValue", searchValue)
        .replace("Page", page);

      const hasKeywords = filters?.keywords;
      const hasDepartment = filters?.department;
      const hasSort = sortBy && sortOrder;
      console.log("ths is the filter ", filters);
      if (hasKeywords || hasDepartment || hasSort) {
        // At least one of keywords, department, or sort is present
        url += "&";

        if (hasKeywords) {
          url += `keywords=${filters.keywords}`;
          if (hasDepartment || hasSort) {
            url += "&";
          }
        }

        if (hasDepartment) {
          url += `department=${filters.department}`;
          if (hasSort) {
            url += "&";
          }
        }

        if (hasSort) {
          const sortField =
            sortBy === "title"
              ? "title"
              : sortBy === "department"
              ? "departments[0].name"
              : "updatedAt";

          const sortOrders =
            sortOrder === "asc" ? 1 : sortOrder === "desc" ? -1 : 0;

          url += `sortBy=${sortField}&sortOrder=${sortOrders}`;
        }
      }
      httpClient({
        method: "get",
        url,
      })
        .then(({ result, error }) => {
          if (result) {
            setResult(result);
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
  const HandleSubmit = (data) => {
    // e.preventDefault();
    setIsLoading(true);
    let url = API_URLS.createDocument;

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
          GetDocuments();

          toast.success(result.message, {
            className: "toast",
          });
          // GetBenefits();
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
    ////console.log("update Data:", data);
    setIsLoading(true);
    let dataCopy = data;

    let url = API_URLS.updateDocument.replace(":id", Id);

    httpClient({
      method: "put",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          setId("");
          GetDocuments();
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
        //console.error("Error:", error);
        toast.error("Error Updating Benefits . Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const HandleDelete = () => {
    setIsDeleting(true);
    let url = API_URLS.deleteDocument.replace(":id", Id);
    httpClient({
      method: "put",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          HandleCloseDelete();
          setId("");
          GetDocuments();

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
  useEffect(() => {
    GetDocuments(filter);
  }, [page, searchValue, sortBy, sortOrder]);
  // //console.log("this is our suggestions :", suggestions);
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  // };

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
  const [department, setDepartment] = useState("");

  const [keywords, setKeywords] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };
  const handleDelete = (i) => {
    setKeywords(keywords.filter((tag, index) => index !== i));
  };
  const handleAddition = (tag) => {
    const isTagInSuggestions = suggestions.some(
      (suggestion) => suggestion.text === tag.text
    );
    if (isTagInSuggestions) {
      setKeywords([...keywords, tag]);
    }
  };
  const handleDrag = (tag, currPos, newPos) => {
    const newTags = keywords.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setKeywords(newTags);
  };
  const handleKeywordsChange = (event, newValue) => {
    setSelectedKeywords(newValue);
    const selectedIds = newValue.map((item) => item.id);

    setKeywords(selectedIds);
  };
  const handleFilterButtonClick = () => {
    const selectedIds = keywords.map((item) => item.id);

    const filters = {
      keywords: selectedIds,
      department: department,
    };
    setFilter(filters);
    GetDocuments(filters);
  };
  const clearFilters = () => {
    setDepartment("");
    setKeywords([]);
    setSelectedKeywords([]);
    const filters = {
      keywords: null,
      department: null,
    };
    setFilter(filters);

    GetDocuments(filters);
  };
  const areFiltersEmpty = !!(keywords.length || department);

  console.log("this the suggestions", keywords, department, sortBy, sortOrder);
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
                    {!update ? "Add Document" : "Update Document"}
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
                      name="departments"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Required",
                        },
                      }}
                      render={({ field: { onChange, value, ref } }) => {
                        // Add an "All" option to select all departments
                        const departmentsWithAll = [
                          { _id: "all", name: "All Departments" }, // Add the "All" option
                          ...departmentData,
                        ];

                        return (
                          <Autocomplete
                            multiple
                            limitTags={2}
                            id="tags-standard"
                            value={
                              value
                                ? departmentsWithAll.filter((option) =>
                                    value.includes(option._id)
                                  ) ?? []
                                : []
                            }
                            onChange={(event, newValue) => {
                              if (newValue.some((item) => item._id === "all")) {
                                // If "All Departments" is selected, set all department IDs except "all"
                                onChange(
                                  departmentData.map((item) => item._id)
                                );
                              } else {
                                onChange(
                                  newValue
                                    ? newValue.map((item) => item._id)
                                    : []
                                );
                              }
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
                            options={departmentsWithAll} // Use the modified array with "All" option
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                inputRef={ref}
                                placeholder="Select Departments"
                              />
                            )}
                          />
                        );
                      }}
                    />

                    {errors.departments && (
                      <Errors>{errors.departments?.message}</Errors>
                    )}
                    <InputLabel>
                      Keywords <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Controller
                      name="tags"
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
                          autofocus={false}
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
                    {errors.tags && <Errors>{errors.tags?.message}</Errors>}
                    <InputLabel>
                      Version <InputSpan>*</InputSpan>
                    </InputLabel>
                    <RadioButtonContainer>
                      <FlexContaier>
                        <RadioLabel htmlFor="major">
                          <RadioButton
                            type="radio"
                            id="major"
                            value="MAJOR"
                            name="version"
                            {...register("version", {
                              required: {
                                value: true,
                                message: " Required",
                              },
                            })}
                          />
                          <RadioSpan />
                          Major
                        </RadioLabel>
                      </FlexContaier>
                      <FlexContaier>
                        <RadioLabel htmlFor="minor">
                          <RadioButton
                            type="radio"
                            id="minor"
                            value="MINOR"
                            name="version"
                            {...register("version", {
                              required: {
                                value: true,
                                message: " Required",
                              },
                            })}
                          />
                          <RadioSpan />
                          Minor
                        </RadioLabel>
                      </FlexContaier>
                    </RadioButtonContainer>
                    {errors.version && (
                      <Errors>{errors.version?.message}</Errors>
                    )}
                    <input
                      style={{ width: "50%", marginTop: "1.5rem" }}
                      type="file"
                      {...register(`file`, {
                        required: {
                          value: file ? false : true,
                          message: "Required",
                        },
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
      <FlexSpaceBetweenmobile
        style={{
          background: "#fff",
          padding: "1rem 2rem",
          margin: "0rem",
          alignItems: "flex-end",
        }}
      >
        <FilterDiv style={{ alignItems: "flex-start" }}>
          <FilterContainer style={{ flex: " 0 1 35%" }}>
            <InputLabel>Department</InputLabel>
            <Select value={department} onChange={handleDepartmentChange}>
              <Option value="">Select</Option>

              {departmentData?.map((data, index) => (
                <Option value={data._id}>{data.name}</Option>
              ))}
            </Select>
          </FilterContainer>
          <FilterContainer style={{ flex: " 0 1 35%" }}>
            <InputLabel>Keywords</InputLabel>
            <ReactTags
              name="completedBy"
              tags={keywords}
              autofocus={false}
              suggestions={suggestions}
              delimiters={delimiters}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              handleDrag={handleDrag}
              // handleTagClick={handleTagClick}
              inputFieldPosition="top"
              autocomplete
              placeholder={keywords.length ? "Add More " : "Add"}
              // editable
            />
          </FilterContainer>
        </FilterDiv>
        <FlexContaier>
          {areFiltersEmpty && (
            <AddNewButton
              onClick={clearFilters}
              style={{ marginBottom: "20px" }}
              disabled={!areFiltersEmpty}
            >
              Clear
            </AddNewButton>
          )}
          <AddNewButton
            onClick={handleFilterButtonClick}
            style={{ marginBottom: "20px" }}
            disabled={!areFiltersEmpty}
          >
            Filter
          </AddNewButton>
        </FlexContaier>
      </FlexSpaceBetweenmobile>
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
                  {/* <TableCell
                    sx={CellHeadStyles}
                    align="left"
                    style={{ minwidth: "4rem" }}
                  >
                    Sr.&nbsp;No.
                  </TableCell> */}
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "12rem", cursor: "pointer" }}
                    align="left"
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
                        Title
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
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "15rem", cursor: "pointer" }}
                    align="left"
                    onClick={() => HandleSort("department")}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span
                        style={
                          result?.sortBy === "departments[0].name"
                            ? result?.sortOrder
                              ? { color: "#222B45" }
                              : {}
                            : {}
                        }
                      >
                        {" "}
                        Department
                      </span>
                      {result?.sortBy === "departments[0].name" ? (
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
                    style={{ minWidth: "9rem" }}
                    align="left"
                  >
                    Keywords
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "5rem" }}
                    align="left"
                  >
                    Version
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "10rem" }}
                    align="left"
                  >
                    Original Name
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
                    style={{ minWidth: "10rem", cursor: "pointer" }}
                    align="left"
                    onClick={() => HandleSort("updatedAt")}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span
                        style={
                          result?.sortBy === "updatedAt"
                            ? result?.sortOrder
                              ? { color: "#222B45" }
                              : {}
                            : {}
                        }
                      >
                        {" "}
                        Last Updated
                      </span>
                      {result?.sortBy === "updatedAt" ? (
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
                    style={{ minWidth: "12rem" }}
                    align="left"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {!result?.document?.length && (
                  <TableRow sx={{ height: "20rem" }}>
                    <TableCell align="center" sx={CellStyle2} colSpan={8}>
                      No Documents found
                    </TableCell>
                  </TableRow>
                )}
                {result?.document?.map((data, index) => (
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                      background: "#fff",
                    }}
                    key={data._id}
                  >
                    {/* <TableCell sx={CellStyle2} align="left">
                      <MenuIconDiv>{index + 1}</MenuIconDiv>
                    </TableCell> */}
                    <TableCell
                      sx={{ ...CellStyle, cursor: "pointer" }}
                      align="left"
                      onClick={() => {
                        if (userType === ROLES.HR) {
                          Navigate(
                            `/hr-management/documents/history/${data._id}`
                          );
                        } else if (userType === ROLES.MANAGER) {
                          Navigate(
                            `/manager-management/documents/history/${data._id}`
                          );
                        } else if (userType === ROLES.PAYROLL) {
                          Navigate(
                            `/payroll-management/documents/history/${data._id}`
                          );
                        } else if (userType === ROLES.EMPLOYEE) {
                          Navigate(
                            `/user-management/documents/history/${data._id}`
                          );
                        } else {
                          Navigate(
                            `/organization-admin/documents/history/${data._id}`
                          );
                        }
                      }}
                    >
                      <UnderlineHoverEffect>
                        <TabelDarkPara>{data.title || " - "}</TabelDarkPara>
                      </UnderlineHoverEffect>
                    </TableCell>
                    <TableCell sx={CellStyle2} align="left">
                      {data?.departments
                        ?.map((department) => department.name)
                        .join(", ")}
                    </TableCell>
                    <TableCell sx={CellStyle2} align="left">
                      {data?.tags?.map((tag) => tag.name).join(", ")}
                    </TableCell>
                    <TableCell sx={CellStyle} align="left">
                      {data?.versions[0]?.version !== undefined
                        ? data.versions[0].version.toFixed(1)
                        : " - "}
                    </TableCell>
                    <TableCell sx={CellStyle2} align="left">
                      {data?.versions[0]?.file?.originalName?.length <= 15
                        ? data?.versions[0]?.file?.originalName
                        : data?.versions[0]?.file?.originalName?.substring(
                            0,
                            15
                          ) + "..." || " - "}
                    </TableCell>
                    <TableCell sx={CellStyle} align="left">
                      {[
                        data?.lastUpdatedBy?.personalInfo?.firstName,
                        data?.lastUpdatedBy?.personalInfo?.lastName,
                      ].join(" ") || " - "}
                    </TableCell>
                    <TableCell sx={CellStyle2} align="left">
                      {data?.updatedAt
                        ? moment(data?.updatedAt)
                            .local()
                            .format("D MMM, YYYY hh:mm A")
                        : " -"}
                      {/* {moment.tz(data?.updatedAt, 'America/Toronto',
                      true).format("D MMM, YYYY hh:mm A")} */}
                    </TableCell>
                    <TableCell sx={CellStyle2} align="left">
                      {" "}
                      <ActionIconDiv>
                        <ActionIcons
                          onClick={() => {
                            if (userType === ROLES.HR) {
                              Navigate(
                                `/hr-management/documents/history/${data._id}`
                              );
                            } else if (userType === ROLES.MANAGER) {
                              Navigate(
                                `/manager-management/documents/history/${data._id}`
                              );
                            } else if (userType === ROLES.PAYROLL) {
                              Navigate(
                                `/payroll-management/documents/history/${data._id}`
                              );
                            } else if (userType === ROLES.EMPLOYEE) {
                              Navigate(
                                `/user-management/documents/history/${data._id}`
                              );
                            } else {
                              Navigate(
                                `/organization-admin/documents/history/${data._id}`
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
                        <Link
                          to={API_URL + data?.versions[0]?.file?.path}
                          target="_blank"
                          download
                          style={{ textDecoration: "none", marginTop: ".6rem" }}
                        >
                          <ActionIcons src="/images/icons/Download.svg" />
                        </Link>
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
        message="Are you sure you want to delete this document?"
        isLoading={isDeleting}
      />
      {/* <DevTool control={control} /> */}
    </>
  );
};

export default Documents;
