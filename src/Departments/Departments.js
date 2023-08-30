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
  DeleteButton,
  ModalIconDelete,
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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //Delete Modal Delete
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);
  //update modal variable
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const [openThanks, setOpenThanks] = useState(false);
  const handleOpenThanks = () => setOpenThanks(true);
  const handleCloseThanks = () => setOpenThanks(false);
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
  const TempData = [1, 2, 3, 4, 5];
  const [searchValue, setSearchValue] = useState("");
  const [departmentData, setDepartmentData] = useState([]);
  const [Id, setId] = useState("");
  const [nameEdit, setNameEdit] = useState("");
  const [descriptionEdit, setDescriptionEdit] = useState("");

  const handleSearchCahnge = (e) => {
    setSearchValue(e.target.value);
  };
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [upDateData, setUpDateData] = useState({
    name: "",
    description: "",
  });
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
    console.log(formData, "hey data is pickuped ");
  };
  const handleChangeEdit = (e) => {
    const { value, name } = e.target;
    setUpDateData({ ...upDateData, [name]: value });
  };
  const GetDepartments = () => {
    let url = `/department/list?page=1&limit=10&searchKey= ${searchValue}`;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result }) => {
        if (result) {
          setDepartmentData(result.departments);
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
  }, [searchValue]);
  console.log(departmentData, "this is the data");

  const handleSubmit = (e) => {
    e.preventDefault();
    let dataCopy = { ...formData };
    let url = "/department/create";
    httpClient({
      method: "post",
      url,
      data: dataCopy,
    })
      .then(({ result }) => {
        if (result?.department) {
          handleOpenThanks();
          GetDepartments();
        } else {
          toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error creating department. Please try again.");
      });
  };
  const HandleUpdate = () => {
    let dataCopy = { ...upDateData };

    let url = `/department/update/${Id}`;
    httpClient({
      method: "put",
      url,
      data: dataCopy,
    })
      .then(({ result }) => {
        if (result?.department) {
          // handleOpenThanks();
          GetDepartments();
           setId("");

          toast.success("update successfull");
        } else {
          toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error creating department. Please try again.");
      });
  };
  const HandleDelete = () => {

     let url = `/department/delete/${Id}`;
     httpClient({
       method: "put",
       url,
     })
       .then(({ result }) => {
         if (result) {
           // handleOpenThanks();
           GetDepartments();
           setId("");
           toast.success("update successfull");
         } else {
           toast.warn("something went wrong ");
         }
       })
       .catch((error) => {
         console.error("Error:", error);
         toast.error("Error creating department. Please try again.");
       });
  };

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
                  onChange={handleSearchCahnge}
                  value={searchValue}
                ></SearchInput>
                <SearchIcon src="/images/icons/searchIcon.png" />
              </SearchBox>
            </DashHeaderSearch>
          </DashHeaderDepartment>
          <DepartmentIconContainer>
            <DepartmentIconImg src="/images/icons/Messages.png" />
            <DepartmentIconImg src="/images/icons/Notifications.png" />
            <DepartmentIconImg src="/images/icons/PersonIcon.png" />
          </DepartmentIconContainer>
        </DashHeader>
        <DepartmentFilterContainer>
          {/* <DepartmentFilterdiv>
            {FilterData.map((data) => (
              <DepartmentFilterButton>{data}</DepartmentFilterButton>
            ))}
          </DepartmentFilterdiv> */}
          <AddNewButton onClick={handleOpen}>Add New</AddNewButton>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <ModalUpperDiv>
                <ModalHeading>Add New Department</ModalHeading>
                <ModalIcon
                  onClick={handleClose}
                  src="/images/icons/alert-circle.png"
                />
              </ModalUpperDiv>
              <ModalUpperMid>
                <Input
                  placeholder="Department Name"
                  onChange={handleChange}
                  value={formData.name}
                  name="name"
                  type="text"
                />
                <TextArea
                  placeholder="Description"
                  onChange={handleChange}
                  value={formData.description}
                  type="text"
                  name="description"
                />
              </ModalUpperMid>
              <ModalBottom>
                <AddNewButton
                  onClick={(e) => {
                    handleClose();
                    handleSubmit(e);
                  }}
                >
                  Add New
                </AddNewButton>
                <CancelButton onClick={handleClose}>Cancel</CancelButton>
              </ModalBottom>
            </Box>
          </Modal>
          <Modal
            open={openThanks}
            onClose={handleCloseThanks}
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
                    handleCloseThanks();
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
                    handleOpenEdit();
                  }}
                >
                  <img src="/images/icons/alert-circle-fill.png" />
                </DepartmentCardButtoncolor>
                <DepartmentCardButtongrey
                  onClick={() => {
                    handleOpenDelete();
                    setId(data._id);
                  }}
                >
                  <img src="/images/icons/trash-2.png" />
                </DepartmentCardButtongrey>
              </DepartmentButtonContainer>
            </DepartmentCardDiv>
          ))}
        </DepartmentCardContainer>
      </DashMain>
      {/* modal to edit  */}
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ModalUpperDiv>
            <ModalHeading>Edit Department</ModalHeading>
            <ModalIcon
              onClick={handleCloseEdit}
              src="/images/icons/alert-circle.png"
            />
          </ModalUpperDiv>
          <ModalUpperMid>
            <Input
              placeholder="Department Name"
              onChange={handleChangeEdit}
              value={upDateData.name}
              name="name"
              type="text"
            />
            <TextArea
              placeholder="Description"
              onChange={handleChangeEdit}
              value={upDateData.description}
              type="text"
              name="description"
            />
          </ModalUpperMid>
          <ModalBottom>
            <AddNewButton
              onClick={(e) => {
                handleCloseEdit();
                HandleUpdate();
              }}
            >
              Update
            </AddNewButton>
            <CancelButton onClick={handleCloseEdit}>Cancel</CancelButton>
          </ModalBottom>
        </Box>
      </Modal>
      {/* Delete Modal  */}
      <DeleteModal
        openDelete={openDelete}
        handleCloseDelete={handleCloseDelete}
        HandleDelete={HandleDelete}
      />
    </Dashboard>
  );
};

export default Departments;
