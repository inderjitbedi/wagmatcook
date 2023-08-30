import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import httpClient from "../api/httpClient";
import { toast } from "react-toastify";
import DeleteModal from "../Modals/DeleteModal";

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
} from "./DisciplinaryStyles";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Disciplinary = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // update modal var
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
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

  const CellData = [
    "Order No.",
    "Name",
    "Description",
    "Requires BCR",
    "Action",
  ];
  const rows = [
    {
      orderno: 1,
      name: "Verbal warning ",
      description: "this is the description text ",
      requirebcr: "yes",
    },
    {
      orderno: 2,
      name: "Verbal warning ",
      description: "this is the description text ",
      requirebcr: "yes",
    },
    {
      orderno: 3,
      name: "Verbal warning ",
      description: "this is the description text ",
      requirebcr: "yes",
    },
    {
      orderno: 4,
      name: "Verbal warning ",
      description: "this is the description text ",
      requirebcr: "no",
    },
    {
      orderno: 5,
      name: "Verbal warning ",
      description: "this is the description text ",
      requirebcr: "yes",
    },
  ];
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    requiredBcr: "",
  });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [requiredBcr, setRequiredBcr] = useState("");

  const [upDateData, setupDateData] = useState({
    name: name,
    description: description,
    requiredBcr: requiredBcr,
  });

  const [searchValue, setSearchValue] = useState("");
  const [disciplinaryData, setDisciplinaryData] = useState([]);
  const [Id, setId] = useState("");
  //Delete Modal Delete
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

    const HandleDelete = () => {
      let url = `/disciplinary/delete/${Id}`;
      httpClient({
        method: "put",
        url,
      })
        .then(({ result }) => {
          if (result) {
           
            GetDisciplinary();
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
  // get disciplinary
  const GetDisciplinary = () => {
    let url = `/disciplinary/list?page=1&limit=10&searchKey=${searchValue}`;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result }) => {
        if (result) {
          setDisciplinaryData(result);
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
  }, [searchValue]);
  // console.log(disciplinaryData,"dtata aa gya h ");
  //create new enter in table
  const handleSubmit = (e) => {
    e.preventDefault();
    let dataCopy = {
      ...formData,
      order: disciplinaryData.disciplinaries.length + 1,
    };
    let url = "/disciplinary/create";
    httpClient({
      method: "post",
      url,
      data: dataCopy,
    })
      .then(({ result }) => {
        if (result) {
          toast.success("Added successfull");
          GetDisciplinary();
        } else {
          toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error creating department. Please try again.");
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
  // handle changes here

  const handleChanges = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleChangesEdit = (e) => {
    const { value, name } = e.target;
    setupDateData({ ...upDateData, [name]: value });
  };
   const handleSearchCahnge = (e) => {
     setSearchValue(e.target.value);
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
              <SearchIcon src="/icons/searchIcon.png" />
            </SearchBox>
            <DashNotification src="/icons/Notifications.png" />
          </DashHeaderSearch>
        </DashHeader>
        <DisciplinaryDiv>
          <DisciplinaryHeading>All Disciplinary</DisciplinaryHeading>
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
                  src="/icons/alert-circle.png"
                />
              </ModalUpperDiv>
              <ModalUpperMid>
                <InputLabel>
                  Disciplinary Name <InputSpan>*</InputSpan>
                </InputLabel>
                <Input
                  type="text"
                  name="name"
                  onChange={handleChanges}
                  value={formData.name}
                  placeholder="name"
                />
                <InputLabel>
                  Details <InputSpan>*</InputSpan>
                </InputLabel>
                <TextArea
                  type="text"
                  name="description"
                  onChange={handleChanges}
                  value={formData.description}
                  placeholder="Write Something.."
                />
                <InputPara> Max 500 characters</InputPara>
                <InputLabel>
                  Requires BCR? <InputSpan>*</InputSpan>
                </InputLabel>

                <Select
                  value={formData.requiredBcr}
                  name="requiredBcr"
                  onChange={handleChanges}
                >
                  <Option value="">Select an option</Option>
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
                <AddNewButton
                  onClick={(e) => {
                    handleClose();
                    handleSubmit(e);
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
              {disciplinaryData.disciplinaries?.map((data) => (
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    background: "#fff",
                  }}
                >
                  <TableCell sx={CellStyle2} align="left">
                    <MenuIconDiv>
                      <MenuIcon src="/icons/Menu Dots.png " />
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
                    {data.requiredBcr === false ? "NO" : "yes"}{" "}
                  </TableCell>
                  <TableCell sx={CellStyle2} align="left">
                    {" "}
                    <ActionIconDiv>
                      <ActionIcons
                        onClick={() => {
                          handleOpenEdit();
                          setId(data._id);
                          setDescription(data.description);
                          setRequiredBcr(data.requiredBcr);
                          setName(data.name);
                        }}
                        src="/icons/Pendown.png"
                      />
                      <ActionIcons
                        onClick={() => {
                          handleOpenDelete();
                          setId(data._id);
                        }}
                        src="/icons/trash-2.png"
                      />
                    </ActionIconDiv>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DashMain>
      {/* modal fo editing  */}
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ModalUpperDiv>
            <ModalHeading> Update Department</ModalHeading>
            <ModalIcon
              onClick={handleCloseEdit}
              src="/icons/alert-circle.png"
            />
          </ModalUpperDiv>
          <ModalUpperMid>
            <InputLabel>
              Disciplinary Name <InputSpan>*</InputSpan>
            </InputLabel>
            <Input
              type="text"
              name="name"
              onChange={handleChangesEdit}
              value={upDateData.name}
              placeholder={name}
            />
            <InputLabel>
              Details <InputSpan>*</InputSpan>
            </InputLabel>
            <TextArea
              type="text"
              name="description"
              onChange={handleChangesEdit}
              value={upDateData.description}
              placeholder={description}
            />
            <InputPara> Max 500 characters</InputPara>
            <InputLabel>
              Requires BCR? <InputSpan>*</InputSpan>
            </InputLabel>

            <Select
              value={upDateData.requiredBcr}
              name="requiredBcr"
              onChange={handleChangesEdit}
            >
              <Option value="">{requiredBcr}</Option>
              <Option value={true}>Yes</Option>
              <Option value={false}>No</Option>
            </Select>
            <AddNewButton
              onClick={() => {
                handleCloseEdit();
                HandleUpdate();
              }}
            >
              Update
            </AddNewButton>
          </ModalUpperMid>
        </Box>
      </Modal>
      <DeleteModal
        openDelete={openDelete}
        handleCloseDelete={handleCloseDelete}
        HandleDelete={HandleDelete}
      />
    </Dashboard>
  );
};

export default Disciplinary;
