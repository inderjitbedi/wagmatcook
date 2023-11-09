import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import httpClient from "../api/httpClient";
import { toast } from "react-toastify";
import DeleteModal from "../Modals/DeleteModal";
import { RotatingLines } from "react-loader-spinner";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate, useLocation } from "react-router";
import ReactPaginate from "react-paginate";
import API_URLS from "../constants/apiUrls";
import CommenDashHeader from "../Dashboard/CommenDashHeader";
import Pagination from "@mui/material/Pagination";
import ROLES from "../constants/roles";
import {
  DashHeaderDepartment,
  DepartmentIconContainer,
  DepartmentIconImg,
  DepartmentFilterContainer,
  AddNewButton,
  DepartmentFilterdiv,
  DepartmentFilterButton,
  DepartmentCardContainer,
  DepartmentCardDiv,
  DepartmentCardImg,
  DepartmentCardPara,
  DepartmentCardParaLit,
  DepartmentCardButtoncolor,
  DepartmentCardButtongrey,
  DepartmentButtonContainer,
  ModalUpperDiv,
  ModalHeading,
  ModalIcon,
  ModalUpperMid,
  ModalBottom,
  CancelButton,
  Input,
  TextArea,
  ModalThanks,
  ModalThanksImg,
  ModalThanksHeading,
  Errors,
  InputPara,
} from "./DepartmentsStyles";
import {
  InputLabel,
  InputSpan,
  PaginationDiv,
  DisciplinaryHeading,
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
  padding: "2rem 0rem",
  borderRadius: "8px",
};

const Departments = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const [userType, setUserType] = useState("");
  const [open, setOpen] = useState(false);
  const HandleOpen = () => {
    setFormData({
      name: "",
      description: "",
    });
    setErrors("");
    setOpen(true);
  };
  const HandleClose = () => {
    setOpen(false);
    setErrors("");
    setdescriptionLength(500);
  };
  //Delete Modal Delete
  const [openDelete, setOpenDelete] = useState(false);
  const HandleOpenDelete = () => setOpenDelete(true);
  const HandleCloseDelete = () => setOpenDelete(false);
  //update modal variable
  const [openEdit, setOpenEdit] = useState(false);
  const HandleOpenEdit = () => setOpenEdit(true);
  const HandleCloseEdit = () => {
    setErrors("");
    setdescriptionLength(500);
    setOpenEdit(false);
  };
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [descriptionLength, setdescriptionLength] = useState(500);

  const [openThanks, setOpenThanks] = useState(false);
  const HandleOpenThanks = () => setOpenThanks(true);
  const HandleCloseThanks = () => setOpenThanks(false);
  // menu state
  const [anchorEl, setAnchorEl] = useState(false);
  const openMenu = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const FilterData = [
    "All",
    "Full-time Perm",
    "Full-time",
    "Part-time",
    "Contract",
    "Term",
    "Students",
    "Other",
  ];
  // const TempData = [1, 2, 3, 4, 5];
  const [searchValue, setSearchValue] = useState("");

  const HandleSearchCahnge = (data) => {
    setSearchValue(data);
  };
  const [departmentData, setDepartmentData] = useState([]);
  const [Id, setId] = useState("");

  const [page, setPage] = useState(1);
  const HandleChangePage = (event, value) => {
    setPage(value);
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    nameError: "",
    descriptionError: "",
  });
  const [upDateData, setUpDateData] = useState({
    name: "",
    description: "",
  });

  const HandleChange = (e) => {
    const { value, name } = e.target;

    // Validation for the Name field
    if (name === "name") {
      if (!value) {
        setErrors({ ...errors, nameError: "Required" });
      } else {
        setErrors({ ...errors, nameError: "" });
      }
    }
    if (name === "description") {
      setdescriptionLength(500 - value.length);

      if (!value) {
        setErrors({
          ...errors,
          descriptionError: "Required",
        });
      } else {
        setErrors({ ...errors, descriptionError: "" });
      }
    }

    setFormData({ ...formData, [name]: value });
  };
  const HandleChangeEdit = (e) => {
    const { value, name } = e.target;
    // Validation for the Name field
    if (name === "name") {
      if (!value) {
        setErrors({ ...errors, nameError: "Required" });
      } else {
        setErrors({ ...errors, nameError: "" });
      }
    }
    if (name === "description") {
      setdescriptionLength(value.length);

      if (!value) {
        setErrors({
          ...errors,
          descriptionError: "Required",
        });
      } else {
        setErrors({ ...errors, descriptionError: "" });
      }
    }
    setUpDateData({ ...upDateData, [name]: value });
  };
  const GetDepartments = (role) => {
    setIsLoading(true);
    var url = "";
    if (role === ROLES.SUPER_ADMIN) {
      url = API_URLS.getSADpartments
        .replace("searchValue", searchValue)
        .replace("Page", page);
    } else {
      url = API_URLS.getDpartments
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
          setDepartmentData(result.departments);
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
      GetDepartments(ROLES.MANAGER);
    } else if (location.pathname.indexOf("hr") > -1) {
      setUserType(ROLES.HR);
      GetDepartments(ROLES.HR);
    } else if (location.pathname.indexOf("user") > -1) {
      setUserType(ROLES.EMPLOYEE);
      GetDepartments(ROLES.EMPLOYEE);
    } else if (location.pathname.indexOf("organization-admin") > -1) {
      setUserType(ROLES.ORG_ADMIN);
      GetDepartments(ROLES.ORG_ADMIN);
    } else if (location.pathname.indexOf("super-admin") > -1) {
      setUserType(ROLES.SUPER_ADMIN);
      GetDepartments(ROLES.SUPER_ADMIN);
    }
  }, [page, searchValue]);

  const HandleSubmit = (e) => {
    e.preventDefault();
    let dataCopy = { ...formData };
    if (userType === ROLES.SUPER_ADMIN) {
      dataCopy = { ...formData, isDefault: true };
    }

    let url = API_URLS.createDepartments;

    if (!formData.name) {
      setErrors((prevState) => {
        return {
          ...prevState,
          nameError: "Required",
        };
      });
      if (!formData.description) {
        setErrors((prevState) => {
          return {
            ...prevState,

            descriptionError: "Required",
          };
        });
      } else {
        setErrors("");
      }
    }
    if (
      formData.name &&
      formData.description &&
      !errors.nameError &&
      !errors.descriptionError
    ) {
      setIsLoading(true);

      httpClient({
        method: "post",
        url,
        data: dataCopy,
      })
        .then(({ result, error }) => {
          if (result?.department) {
            HandleClose();
            HandleOpenThanks();
            GetDepartments(userType);
            setFormData("");
            setErrors("");
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
    }
  };
  const HandleUpdate = () => {
    let dataCopy = { ...upDateData };

    if (userType === ROLES.SUPER_ADMIN) {
      dataCopy = { ...upDateData, isDefault: true };
    }

    let url = API_URLS.updateDepartments.replace(":id", Id);
    if (!upDateData.name) {
      setErrors((prevState) => {
        return {
          ...prevState,
          nameError: "Required",
        };
      });
      if (!upDateData.description) {
        setErrors((prevState) => {
          return {
            ...prevState,

            descriptionError: "Required",
          };
        });
      } else {
        setErrors("");
      }
    }
    if (
      upDateData.description &&
      upDateData.name &&
      !errors.nameError &&
      !errors.descriptionError
    ) {
      setIsLoading(true);

      httpClient({
        method: "put",
        url,
        data: dataCopy,
      })
        .then(({ result, error }) => {
          if (result?.department) {
            // const indexToReplace = departmentData.findIndex(
            //   (obj) => (obj._id = result.department._id)
            // );
            // if (indexToReplace !== -1) {
            //   const UpdatedData = departmentData;
            //   UpdatedData[indexToReplace] = result.department;
            //   setDepartmentData(UpdatedData);
            // }
            HandleCloseEdit();
            GetDepartments(userType);
            setId("");
            setUpDateData("");
            setErrors("");
            toast.success(result.message, {
              className: "toast",
            }); //Departments Updated Successfully");
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
    }
  };
  const HandleDelete = () => {
    setIsLoading(true);
    let url = API_URLS.deleteDepartments.replace(":id", Id);
    httpClient({
      method: "put",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          // HandleOpenThanks();
          GetDepartments(userType);
          setId("");
          HandleCloseDelete();

          toast.success(result.message, {
            className: "toast",
          }); //Entry Deleted successfully");
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
  const PopulateUpdateForm = (data) => {
    setUpDateData({
      name: data.name,
      description: data.description,
      // requiredBcr: data.requiredBcr,
    });
    setdescriptionLength(data.description.length);
    HandleOpenEdit();
  };

  return (
    <div style={{ height: "100%" }}>
      <>
        <CommenDashHeader onSearch={HandleSearchCahnge} text="Departments" />

        <DepartmentFilterContainer>
          <DisciplinaryHeading>Departments</DisciplinaryHeading>
          {/* <DepartmentFilterdiv>
            {FilterData.map((data) => (
              <DepartmentFilterButton>{data}</DepartmentFilterButton>
            ))}
          </DepartmentFilterdiv> */}
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
                  <ModalUpperDiv>
                    <ModalHeading>Add New Department</ModalHeading>
                    <ModalIcon
                      onClick={() => {
                        HandleClose();
                        setErrors("");
                      }}
                      src="/images/icons/Alert-Circle.svg"
                    />
                  </ModalUpperDiv>

                  <ModalUpperMid>
                    <InputLabel>
                      Department Name <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      placeholder="Department Name"
                      onChange={HandleChange}
                      value={formData.name}
                      name="name"
                      type="text"
                    />
                    <Errors>{errors.nameError}</Errors>

                    <InputLabel>
                      Description <InputSpan>*</InputSpan>
                    </InputLabel>
                    <TextArea
                      placeholder="Description"
                      onChange={HandleChange}
                      value={formData.description}
                      type="text"
                      name="description"
                    />
                    <InputPara>
                      {" "}
                      <Errors>{errors.descriptionError}</Errors>{" "}
                      {descriptionLength > -1 ? descriptionLength : 0}{" "}
                      characters left
                    </InputPara>
                  </ModalUpperMid>
                  <ModalBottom>
                    <AddNewButton
                      type="submit"
                      onClick={(e) => {
                        HandleSubmit(e);
                      }}
                      disabled={isLoading}
                    >
                      Add New
                    </AddNewButton>
                    <CancelButton
                      onClick={HandleClose}
                      style={{ cursor: "pointer" }}
                    >
                      Cancel
                    </CancelButton>
                  </ModalBottom>
                </>
              )}
            </Box>
          </Modal>
          <Modal
            open={openThanks}
            sx={{
              backgroundColor: "rgb(27, 27, 27, 0.75)",
              backdropFilter: "blur(8px)",
            }}
            // onClose={HandleCloseThanks}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <ModalThanks>
                <ModalThanksImg src="/images/success.jpg" />
                <ModalThanksHeading>
                  Department added successfully.
                </ModalThanksHeading>
                <AddNewButton
                  onClick={() => {
                    HandleCloseThanks();
                    setFormData({ name: "", description: "" });
                  }}
                >
                  {" "}
                  Thanks
                </AddNewButton>
              </ModalThanks>
            </Box>
          </Modal>
        </DepartmentFilterContainer>
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
            <DepartmentCardContainer>
              {departmentData.length === 0 && (
                <div
                  style={{
                    width: "100%",
                    height: "50rem",
                    textAlign: "center",
                    margin: "10rem auto",
                  }}
                >
                  No departments found
                </div>
              )}
              {departmentData?.map((data) => (
                <DepartmentCardDiv>
                  <DepartmentCardImg src="/images/User.jpg" />
                  <DepartmentCardPara>{data.name}</DepartmentCardPara>
                  <DepartmentCardParaLit>
                    {" "}
                    {data.description}{" "}
                  </DepartmentCardParaLit>
                  <DepartmentButtonContainer>
                    <DepartmentCardButtoncolor
                      onClick={() => {
                        setId(data._id);
                        PopulateUpdateForm(data);
                        HandleOpenEdit();
                      }}
                    >
                      <img src="/images/icons/Pen-empty.svg" />
                    </DepartmentCardButtoncolor>
                    <DepartmentCardButtongrey
                      onClick={() => {
                        HandleOpenDelete();
                        setId(data._id);
                      }}
                    >
                      <img src="/images/icons/Trash-2.svg" />
                    </DepartmentCardButtongrey>
                  </DepartmentButtonContainer>
                </DepartmentCardDiv>
              ))}
            </DepartmentCardContainer>

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
      {/* modal to edit  */}
      <Modal
        open={openEdit}
        sx={{
          backgroundColor: "rgb(27, 27, 27, 0.75)",
          backdropFilter: "blur(8px)",
        }}
        // onClose={HandleCloseEdit}
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
                <ModalHeading>Edit Department</ModalHeading>
                <ModalIcon
                  onClick={() => {
                    HandleCloseEdit();
                  }}
                  src="/images/icons/alert-circle.svg"
                />
              </ModalUpperDiv>
              <ModalUpperMid>
                <InputLabel>
                  Department Name <InputSpan>*</InputSpan>
                </InputLabel>
                <Input
                  onChange={HandleChangeEdit}
                  value={upDateData.name}
                  name="name"
                  type="text"
                />
                <Errors>{errors.nameError}</Errors>
                <InputLabel>
                  Description <InputSpan>*</InputSpan>
                </InputLabel>
                <TextArea
                  onChange={HandleChangeEdit}
                  value={upDateData.description}
                  type="text"
                  name="description"
                />
                <InputPara>
                  {" "}
                  <Errors>{errors.descriptionError}</Errors>{" "}
                  {descriptionLength > -1 ? 500 - descriptionLength : 0}{" "}
                  characters left
                </InputPara>
              </ModalUpperMid>
              <ModalBottom>
                <AddNewButton
                  onClick={(e) => {
                    HandleUpdate();
                  }}
                  disabled={isLoading}
                >
                  Update
                </AddNewButton>
                <CancelButton onClick={HandleCloseEdit}>Cancel</CancelButton>
              </ModalBottom>
            </>
          )}
        </Box>
      </Modal>
      {/* Delete Modal  */}
      <DeleteModal
        openDelete={openDelete}
        HandleCloseDelete={HandleCloseDelete}
        HandleDelete={HandleDelete}
        message="Are you sure you want to delete this department?"
        isLoading={isLoading}
      />
    </div>
  );
};

export default Departments;
