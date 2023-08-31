import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import httpClient from "../api/httpClient";
import { toast } from "react-toastify";
import DeleteModal from "../Modals/DeleteModal";
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

  const [openThanks, setOpenThanks] = useState(false);
  const HandleOpenThanks = () => setOpenThanks(true);
  const HandleCloseThanks = () => setOpenThanks(false);
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
  const [departmentData, setDepartmentData] = useState([]);
  const [Id, setId] = useState("");
  const [nameEdit, setNameEdit] = useState("");
  const [descriptionEdit, setDescriptionEdit] = useState("");
  const [page, setPage] = useState(1);
  const HandleSearchCahnge = (e) => {
    setSearchValue(e.target.value);
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
    name: nameEdit,
    description: descriptionEdit,
  });

  const HandleLoadMore = () => {
    const nextPage = page + 1;
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

    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
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
    setUpDateData({ ...upDateData, [name]: value });
  };
  const GetDepartments = () => {
    let url = `/department/list?page=${page}&limit=10&searchKey= ${searchValue}`;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result }) => {
        if (result) {
          if (page === 1) {
            setDepartmentData(result.departments);
          } else {
            setDepartmentData((prevState) => {
              return [...prevState, ...result.departments];
            });
          }
        } else {
          toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error creating department. Please try again.");
      });
  };
  useEffect(() => {
    GetDepartments();
  }, [searchValue, page]);

  const HandleSubmit = (e) => {
    e.preventDefault();
    let dataCopy = { ...formData };
    let url = "/department/create";
    if (!errors.nameError && !errors.descriptionError) {
      httpClient({
        method: "post",
        url,
        data: dataCopy,
      })
        .then(({ result }) => {
          if (result?.department) {
            HandleOpenThanks();
            GetDepartments();
            setFormData("");
            setErrors("");
          } else {
            toast.warn("something went wrong ");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Error creating department. Please try again.");
        });
    }
  };
  const HandleUpdate = () => {
    let dataCopy = { ...upDateData };

    let url = `/department/update/${Id}`;
    if (!errors.nameError && !errors.descriptionError) {
      httpClient({
        method: "put",
        url,
        data: dataCopy,
      })
        .then(({ result }) => {
          if (result?.department) {
            // HandleOpenThanks();
            GetDepartments();
            setId("");
            setNameEdit("");
            setDescriptionEdit("");
            setUpDateData("");
            setErrors("");
            toast.success("Entry Updated Successfully");
          } else {
            toast.warn("Something Went Wrong ");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Error creating department. Please try again.");
        });
    }
  };
  const HandleDelete = () => {
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
          toast.success("Entry Deleted successfully");
        } else {
          toast.warn("Something Went Wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error creating department. Please try again.");
      });
  };
  // validation functions
  // const validateForm = (formData) => {
  //   const namePattern = /^[A-Za-z\s]+$/;

  //   if (!formData.name || !formData.name.match(namePattern)) {
  //     setErrors({ ...errors, nameError: "InValid Name or Empty . Plaese Try Again" });
  //   }
  //   else if (!formData.description) {
  //     setErrors({ ...errors, descriptionError: "Description is Empty" });
  //   } else {
  //     return true;
  //   }

  // };
  return (
    <Dashboard>
      <DashNav>
        <SideBar />
      </DashNav>
      <DashMain>
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
            <DepartmentIconImg src="/images/icons/PersonIcon.svg" />
          </DepartmentIconContainer>
        </DashHeader>
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
                    HandleClose();
                  }}
                  // disabled={isSubmitDisabled}
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
                    setDescriptionEdit(data.description);
                    setNameEdit(data.name);
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
        <AddNewButton onClick={HandleLoadMore}>Load More</AddNewButton>
      </DashMain>
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
              placeholder={nameEdit}
              onChange={HandleChangeEdit}
              value={upDateData.name}
              name="name"
              type="text"
            />
            <Errors>{errors.nameError}</Errors>
            <TextArea
              placeholder={descriptionEdit}
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
                HandleCloseEdit();
              }}
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
      />
    </Dashboard>
  );
};

export default Departments;
