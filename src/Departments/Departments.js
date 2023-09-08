import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import httpClient from "../api/httpClient";
import { toast } from "react-toastify";
import DeleteModal from "../Modals/DeleteModal";
import { RotatingLines } from "react-loader-spinner";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router";
import {
  Dashboard,
  DashNav,
  DashMain,
  DashHeader,
  DashHeaderTitle,
  SearchBox,
  SearchInput,
  DashHeaderSearch,
  SearchIcon,
} from "../Dashboard/OADashboard/OADashBoardStyles";
import SideBar from "../Dashboard/OADashboard/SideBar";
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
} from "./DepartmentsStyles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 374,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 45,
  padding: "20px 0px",
  borderRadius: "8px",
};

const Departments = () => {
  const Navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const HandleOpen = () => setOpen(true);
  const HandleClose = () => setOpen(false);
  //Delete Modal Delete
  const [openDelete, setOpenDelete] = useState(false);
  const HandleOpenDelete = () => setOpenDelete(true);
  const HandleCloseDelete = () => setOpenDelete(false);
  //update modal variable
  const [openEdit, setOpenEdit] = useState(false);
  const HandleOpenEdit = () => setOpenEdit(true);
  const HandleCloseEdit = () => setOpenEdit(false);
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [openThanks, setOpenThanks] = useState(false);
  const HandleOpenThanks = () => setOpenThanks(true);
  const HandleCloseThanks = () => setOpenThanks(false);
  // menu state
  const [anchorEl, setAnchorEl] = useState(null);
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
  const [delayedSearchValue, setDelayedSearchValue] = useState("");
  const delayDuration = 1000; // Set the delay duration in milliseconds
  let searchTimer;
  const [departmentData, setDepartmentData] = useState([]);
  const [Id, setId] = useState("");

  const [page, setPage] = useState(1);
  const HandleSearchCahnge = (e) => {
    setSearchValue(e.target.value);
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      setDelayedSearchValue(e.target.value);
    }, delayDuration);
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

  const HandleLoadMore = () => {
    const nextPage = result.currentPage + 1;

    setPage(nextPage);
  };
  const HandleChange = (e) => {
    const { value, name } = e.target;

    // Validation for the Name field
    if (name === "name") {
      if (!value) {
        setErrors({ ...errors, nameError: "Name cannot be empty" });
      } else if (!/^[A-Za-z\s]+$/.test(value)) {
        setErrors({
          ...errors,
          nameError: "Name must not contain numbers or special characters",
        });
      } else {
        setErrors({ ...errors, nameError: "" });
      }
    }
    if (name === "description") {
      // Example validation: Description should not be empty and should have a minimum length of 10 characters
      if (!value) {
        setErrors({
          ...errors,
          descriptionError: "Description cannot be empty",
        });
      } else if (value.length < 10) {
        setErrors({
          ...errors,
          descriptionError: "Description should be at least 10 characters long",
        });
      } else {
        setErrors({ ...errors, descriptionError: "" });
      }
    }

    setFormData({ ...formData, [name]: value });
  };
  // const isSubmitDisabled = errors.nameError || errors.descriptionError;
  const HandleChangeEdit = (e) => {
    const { value, name } = e.target;
    // Validation for the Name field
    if (name === "name") {
      if (!value) {
        setErrors({ ...errors, nameError: "Name cannot be empty" });
      } else if (!/^[A-Za-z\s]+$/.test(value)) {
        setErrors({
          ...errors,
          nameError: "Name must not contain numbers or special characters",
        });
      } else {
        setErrors({ ...errors, nameError: "" });
      }
    }
    if (name === "description") {
      //validation: Description should not be empty and should have a minimum length of 10 characters
      if (!value) {
        setErrors({
          ...errors,
          descriptionError: "Description cannot be empty",
        });
      } else if (value.length < 10) {
        setErrors({
          ...errors,
          descriptionError: "Description should be at least 10 characters long",
        });
      } else {
        setErrors({ ...errors, descriptionError: "" });
      }
    }
    setUpDateData({ ...upDateData, [name]: value });
  };
  const GetDepartments = () => {
    setIsLoading(true);

    let url = `/department/list?page=${page}&limit=2&searchKey=${searchValue}`;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result }) => {
        if (result) {
          setResult(result);
          if (page === 1) {
            console.log("page 1");
            setDepartmentData(result.departments);
          } else {
            console.log("page is not 1 now ");
            setDepartmentData((prevState) => [
              ...prevState,
              ...result.departments,
            ]);
          }
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
    // let isLoggedIn = localStorage.getItem("isLoggedIn");
    // if (!isLoggedIn) {
    //   Navigate("/");
    // } else {
      GetDepartments();
    // }
  }, []);
  console.log(departmentData, "this is out data looks like ");

  const HandleSubmit = (e) => {
    e.preventDefault();
    let dataCopy = { ...formData };
    let url = "/department/create";

    if (!formData.name) {
      setErrors((prevState) => {
        return {
          ...prevState,
          nameError: "Name cannot be empty",
        };
      });
      if (!formData.description) {
        setErrors((prevState) => {
          return {
            ...prevState,

            descriptionError: "Description cannot be empty",
          };
        });
      } else {
        setErrors("");
      }
      // console.log("in handel submit ", errors);
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
        .then(({ result }) => {
          if (result?.department) {
            HandleClose();
            HandleOpenThanks();
            GetDepartments();
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

    let url = `/department/update/${Id}`;
    if (!upDateData.name) {
      setErrors((prevState) => {
        return {
          ...prevState,
          nameError: "Name cannot be empty",
        };
      });
      if (!upDateData.description) {
        setErrors((prevState) => {
          return {
            ...prevState,

            descriptionError: "Description cannot be empty",
          };
        });
      } else {
        setErrors("");
      }
      // console.log("in handel submit ", errors);
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
        .then(({ result }) => {
          if (result?.department) {
            const indexToReplace = departmentData.findIndex(
              (obj) => (obj._id = result.department._id)
            );
            if (indexToReplace !== -1) {
              const UpdatedData = departmentData;
              UpdatedData[indexToReplace] = result.department;
              setDepartmentData(UpdatedData);
              console.log(UpdatedData, "is working");
            }
            HandleCloseEdit();
            // GetDepartments();
            setId("");
            setUpDateData("");
            setErrors("");
            toast.success("Entry Updated Successfully");
            console.log(result?.department, "updated entry");
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
    let url = `/department/delete/${Id}`;
    httpClient({
      method: "put",
      url,
    })
      .then(({ result }) => {
        if (result) {
          // HandleOpenThanks();
          GetDepartments();
          setId("");
          HandleCloseDelete();

          toast.success("Entry Deleted successfully");
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
      requiredBcr: data.requiredBcr,
    });
    HandleOpenEdit();
  };
  const HandleLogout = () => {
    localStorage.clear();
    handleCloseMenu();
    Navigate("/");
  };
  return (
    <>
      <>
        <DashHeader>
          <DashHeaderDepartment>
            <DashHeaderTitle>Dashboard</DashHeaderTitle>
            <DashHeaderSearch>
              <SearchBox>
                <SearchInput
                  type="text"
                  placeholder="Search..."
                  onChange={HandleSearchCahnge}
                  value={searchValue}
                ></SearchInput>
                <SearchIcon src="/images/icons/searchIcon.svg" />
              </SearchBox>
            </DashHeaderSearch>
          </DashHeaderDepartment>
          <DepartmentIconContainer>
            <DepartmentIconImg src="/images/icons/Messages.svg" />
            <DepartmentIconImg src="/images/icons/Notifications.svg" />

            <DepartmentIconImg
              style={{ cursor: "pointer" }}
              onClick={(event) => handleClickMenu(event)}
              src="/images/icons/PersonIcon.svg"
            />
          </DepartmentIconContainer>
        </DashHeader>
        <Menu
          sx={{ margin: "0px" }}
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={HandleLogout}>Logout</MenuItem>
        </Menu>
        <DepartmentFilterContainer>
          {/* <DepartmentFilterdiv>
            {FilterData.map((data) => (
              <DepartmentFilterButton>{data}</DepartmentFilterButton>
            ))}
          </DepartmentFilterdiv> */}
          <AddNewButton onClick={HandleOpen}>Add New</AddNewButton>
          <Modal
            open={open}
            onClose={HandleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
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
                <Input
                  placeholder="Department Name"
                  onChange={HandleChange}
                  value={formData.name}
                  name="name"
                  type="text"
                />
                <Errors>{errors.nameError}</Errors>
                <TextArea
                  placeholder="Description"
                  onChange={HandleChange}
                  value={formData.description}
                  type="text"
                  name="description"
                />

                <Errors>{errors.descriptionError}</Errors>
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
                <CancelButton onClick={HandleClose}>Cancel</CancelButton>
              </ModalBottom>
            </Box>
          </Modal>
          <Modal
            open={openThanks}
            onClose={HandleCloseThanks}
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
          <DepartmentCardContainer>
            {departmentData?.map((data) => (
              <DepartmentCardDiv>
                <DepartmentCardImg />
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
                    <img src="/images/icons/Pendown.svg" />
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
        )}
        {result.totalPages > result.currentPage && (
          <AddNewButton onClick={HandleLoadMore} style={{ marginTop: "10px" }}>
            Load More
          </AddNewButton>
        )}{" "}
      </>
      {/* modal to edit  */}
      <Modal
        open={openEdit}
        onClose={HandleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ModalUpperDiv>
            <ModalHeading>Edit Department</ModalHeading>
            <ModalIcon
              onClick={() => {
                HandleCloseEdit();
                setErrors("");
              }}
              src="/images/icons/alert-circle.svg"
            />
          </ModalUpperDiv>
          <ModalUpperMid>
            <Input
              // placeholder={nameEdit}
              onChange={HandleChangeEdit}
              value={upDateData.name}
              name="name"
              type="text"
            />
            <Errors>{errors.nameError}</Errors>
            <TextArea
              // placeholder={descriptionEdit}
              onChange={HandleChangeEdit}
              value={upDateData.description}
              type="text"
              name="description"
            />
            <Errors>{errors.descriptionError}</Errors>
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
        </Box>
      </Modal>
      {/* Delete Modal  */}
      <DeleteModal
        openDelete={openDelete}
        HandleCloseDelete={HandleCloseDelete}
        HandleDelete={HandleDelete}
        isLoading={isLoading}
      />
    </>
  );
};

export default Departments;
