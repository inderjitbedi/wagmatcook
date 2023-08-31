import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import httpClient from "../api/httpClient";
import { toast } from "react-toastify";
import DeleteModal from "../Modals/DeleteModal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import {
  DashMain,
  Dashboard,
  DashNav,
  DashHeader,
  DashHeaderTitle,
  DashHeaderSearch,
  SearchBox,
  SearchInput,
  SearchIcon,
  DashNotification,
} from "../Dashboard/OADashboard/OADashBoardStyles";
import SideBar from "../Dashboard/OADashboard/SideBar";
import {
  AddNewButton,
  DisciplinaryDiv,
  DisciplinaryHeading,
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
} from "./DisciplinaryStyles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 446,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 45,
  padding: "20px 0px",
  borderRadius: "8px",
};
const CellHeadStyles = {
  color: "#8F9BB3",
  fontFamily: "Inter",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "16px",
};

const CellStyle = {
  color: "#222B45",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "15px",
};
const CellStyle2 = {
  color: "#222B45",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "15px",
};

const Disciplinary = () => {
  const [open, setOpen] = useState(false);
  const HandleOpen = () => setOpen(true);
  const HandleClose = () => setOpen(false);
  // update modal var
  const [openEdit, setOpenEdit] = useState(false);
  const HandleOpenEdit = () => setOpenEdit(true);
  const HandleCloseEdit = () => setOpenEdit(false);
  //Delete Modal Delete
  const [openDelete, setOpenDelete] = useState(false);
  const HandleOpenDelete = () => setOpenDelete(true);
  const HandleCloseDelete = () => setOpenDelete(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [requiredBcr, setRequiredBcr] = useState("");
  const [page, setPage] = useState(1);
  const [Id, setId] = useState("");

  const [searchValue, setSearchValue] = useState("");
  const [disciplinaryData, setDisciplinaryData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    requiredBcr: "",
  });

  const [errors, setErrors] = useState({
    nameError: "",
    descriptionError: "",
    requiredBcrError: "",
  });

  const [upDateData, setupDateData] = useState({
    name: name,
    description: description,
    requiredBcr: requiredBcr,
  });


  const HandleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
  };
  //Delete function
  const HandleDelete = () => {
    let url = `/disciplinary/delete/${Id}`;
    httpClient({
      method: "put",
      url,
    })
      .then(({ result }) => {
        if (result) {
          let FilteredArray = disciplinaryData.filter(
            (data) => data._id !== Id
          );
          let ReorderArray = FilteredArray.map((data) => data._id);
          HandleReorder(ReorderArray);
          GetDisciplinary();
          setId("");
          toast.success("Entry Deleted Successfully");
        } else {
          toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error creating department. Please try again.");
      });
  };
  // get disciplinary
  const GetDisciplinary = () => {
    let url = `/disciplinary/list?page=${page}&limit=10&searchKey=${searchValue}`;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result }) => {
        if (result) {
          if (page === 1) {
            setDisciplinaryData(result.disciplinaries);
          } else {
            setDisciplinaryData((prevState) => {
              return [...prevState, ...result.disciplinaries];
            });
          }
          // setDisciplinaryData(result.disciplinaries);
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
    GetDisciplinary();
    // HandleReorder();
  }, [searchValue, page]);

  //create new enter in table
  const HandleSubmit = (e) => {
    e.preventDefault();
    let dataCopy = {
      ...formData,
      order: disciplinaryData?.length + 1,
    };
    let url = "/disciplinary/create";
    httpClient({
      method: "post",
      url,
      data: dataCopy,
    })
      .then(({ result }) => {
        if (result) {
          GetDisciplinary();
          setFormData("");
          setErrors("");
          toast.success("Entry Added Successfully");
        } else {
          toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error creating Disciplinary. Please try again.");
      });
  };
  // handel updates
  const HandleUpdate = () => {
    let dataCopy = { ...upDateData };

    let url = `/disciplinary/update/${Id}`;
    httpClient({
      method: "put",
      url,
      data: dataCopy,
    })
      .then(({ result }) => {
        if (result) {
          GetDisciplinary();
          setId("");
          setDescription("");
          setRequiredBcr("");
          setName("");
          setupDateData("");
          setErrors("");
          toast.success("Entry Updated Successfully");
        } else {
          toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error creating Disciplinary. Please try again.");
      });
  };
  // Handle changes here
  const HandleChanges = (e) => {
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
          descriptionError: "Details cannot be empty",
        });
      } else if (value.length < 10) {
        setErrors({
          ...errors,
          descriptionError: "Details should be at least 10 characters long",
        });
      } else if (formData.description.length > 500) {
        setErrors({
          ...errors,
          descriptionError: "Details cannot exceed 500 characters",
        });
      } else {
        setErrors({ ...errors, descriptionError: "" });
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const HandleChangesEdit = (e) => {
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
          descriptionError: "Details cannot be empty",
        });
      } else if (value.length < 10) {
        setErrors({
          ...errors,
          descriptionError: "Details should be at least 10 characters long",
        });
      } else if (formData.description.length > 500) {
        setErrors({
          ...errors,
          descriptionError: "Details cannot exceed 500 characters",
        });
      } else {
        setErrors({ ...errors, descriptionError: "" });
      }
    }
    setupDateData({ ...upDateData, [name]: value });
  };

  // Handle reorder
  const HandleReorder = (reOrder) => {
    console.log(reOrder, "this reorder");
    let url = "/disciplinary/reorder";

    httpClient({
      method: "put",
      url,
      data: { disciplinaries: reOrder },
    })
      .then(({ result }) => {
        if (result) {
          // At Present Nothing
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
          <DashHeaderTitle>Disciplinary</DashHeaderTitle>
          <DashHeaderSearch>
            <SearchBox>
              <SearchInput
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              ></SearchInput>
              <SearchIcon src="/images/icons/searchIcon.svg" />
            </SearchBox>
            <DashNotification src="/images/icons/Notifications.svg" />
          </DashHeaderSearch>
        </DashHeader>
        <DisciplinaryDiv>
          <DisciplinaryHeading>All Disciplinary</DisciplinaryHeading>
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
                    setFormData("");
                  }}
                  src="/images/icons/Alert-Circle.svg"
                />
              </ModalUpperDiv>
              <ModalUpperMid>
                <InputLabel>
                  Disciplinary Name <InputSpan>*</InputSpan>
                </InputLabel>
                <Input
                  type="text"
                  name="name"
                  onChange={HandleChanges}
                  value={formData.name}
                  placeholder="name"
                />
                <Errors>{errors.nameError}</Errors>
                <InputLabel>
                  Details <InputSpan>*</InputSpan>
                </InputLabel>
                <TextArea
                  type="text"
                  name="description"
                  onChange={HandleChanges}
                  value={formData.description}
                  placeholder="Write Something.."
                />
                <Errors>{errors.descriptionError}</Errors>
                <InputPara> Max 500 characters</InputPara>
                <InputLabel>
                  Requires BCR? <InputSpan>*</InputSpan>
                </InputLabel>

                <Select
                  value={formData.requiredBcr}
                  name="requiredBcr"
                  onChange={HandleChanges}
                >
                  <Option value="">Select an option</Option>
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
                {/* <Errors>{errors.requiredBcrError}</Errors> */}
                <AddNewButton
                  onClick={(e) => {
                   
                      HandleClose();
                      HandleSubmit(e);
                  
                  }}
                >
                  Submit
                </AddNewButton>
              </ModalUpperMid>
            </Box>
          </Modal>
        </DisciplinaryDiv>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{
                  background: "#FBFBFB",
                }}
              >
                <TableCell sx={CellHeadStyles} align="left">
                  Order No.
                </TableCell>
                <TableCell sx={CellHeadStyles} align="left">
                  Name
                </TableCell>
                <TableCell sx={CellHeadStyles} align="left">
                  Description
                </TableCell>
                <TableCell sx={CellHeadStyles} align="left">
                  Requires BCR
                </TableCell>
                <TableCell sx={CellHeadStyles} align="left">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {disciplinaryData?.map((data) => (
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    background: "#fff",
                  }}
                >
                  <TableCell sx={CellStyle2} align="left">
                    <MenuIconDiv>
                      <MenuIcon src="/images/icons/Menu Dots.svg " />
                      {data.order}
                    </MenuIconDiv>
                  </TableCell>
                  <TableCell sx={CellStyle} align="left">
                    {" "}
                    {data.name}{" "}
                  </TableCell>
                  <TableCell sx={CellStyle2} align="left">
                    {" "}
                    {data.description}{" "}
                  </TableCell>
                  <TableCell sx={CellStyle} align="left">
                    {" "}
                    {data.requiredBcr === false ? "No" : "Yes"}{" "}
                  </TableCell>
                  <TableCell sx={CellStyle2} align="left">
                    {" "}
                    <ActionIconDiv>
                      <ActionIcons
                        onClick={() => {
                          HandleOpenEdit();
                          setId(data._id);
                          setDescription(data.description);
                          setRequiredBcr(data.requiredBcr);
                          setName(data.name);
                        }}
                        src="/images/icons/Pendown.svg"
                      />
                      <ActionIcons
                        onClick={() => {
                          HandleOpenDelete();
                          setId(data._id);
                        }}
                        src="/images/icons/Trash-2.svg"
                      />
                    </ActionIconDiv>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <AddNewButton onClick={HandleLoadMore} style={{ marginTop: "10px" }}>
          Load More
        </AddNewButton>
      </DashMain>
      {/* modal fo editing  */}
      <Modal
        open={openEdit}
        onClose={HandleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ModalUpperDiv>
            <ModalHeading> Update Disciplinary</ModalHeading>
            <ModalIcon
              onClick={() => {
                HandleCloseEdit();
                setErrors("");
              }}
              src="/images/icons/Alert-Circle.svg"
            />
          </ModalUpperDiv>
          <ModalUpperMid>
            <InputLabel>
              Disciplinary Name <InputSpan>*</InputSpan>
            </InputLabel>
            <Input
              type="text"
              name="name"
              onChange={HandleChangesEdit}
              value={upDateData.name}
              placeholder={name}
            />
            <Errors>{errors.nameError}</Errors>
            <InputLabel>
              Details <InputSpan>*</InputSpan>
            </InputLabel>
            <TextArea
              type="text"
              name="description"
              onChange={HandleChangesEdit}
              value={upDateData.description}
              placeholder={description}
            />
            <Errors style={{ display: "inline-block" }}>
              {errors.descriptionError}
            </Errors>
            <InputPara> Max 500 characters</InputPara>
            <InputLabel>
              Requires BCR? <InputSpan>*</InputSpan>
            </InputLabel>
            <Select
              value={upDateData.requiredBcr}
              name="requiredBcr"
              onChange={HandleChangesEdit}
            >
              <Option value="" disabled hidden>
                {requiredBcr}
              </Option>
              <Option value={true}>Yes</Option>
              <Option value={false}>No</Option>
            </Select>
            <AddNewButton
              onClick={() => {
              
                  HandleUpdate();
                  HandleCloseEdit();
                
              }}
            >
              Update
            </AddNewButton>
          </ModalUpperMid>
        </Box>
      </Modal>
      <DeleteModal
        openDelete={openDelete}
        HandleCloseDelete={HandleCloseDelete}
        HandleDelete={HandleDelete}
        HandleReorder={HandleReorder}
      />
    </Dashboard>
  );
};

export default Disciplinary;
