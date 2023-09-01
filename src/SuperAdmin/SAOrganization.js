import React, { useState } from 'react';
import SASideBar from "./SASideBar";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Dashboard,
  DashNav,
  DashMain,
  DashHeader,
  DashHeaderSearch,
  DashHeaderTitle,
  DashNotification,
  SearchBox,
  SearchIcon,
  SearchInput,
  DashHeading,
  DepartmentFilterContainer,
  AddNewButton,
  MenuIconDiv,
  MenuIcon,
  ActionIconDiv,
  ActionIcons,
  DisciplinaryDiv,
  DisciplinaryHeading,
  ModalUpperDiv,
  ModalHeading,
  ModalIcon,
  ModalUpperMid,
  InputLabel,
  Input,
  InputSpan,
  TextArea,
  InputPara,

} from "./SAStyles";

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
const SAOrganization = () => {
   const [open, setOpen] = useState(false);
   const HandleOpen = () => setOpen(true);
   const HandleClose = () => setOpen(false);
  const disciplinaryData = [
    {
      _id: "64f015b3f1b4113adc352819",
      name: "test user ",
      description: "no 4 ",
      requiredBcr: true,
      order: 1,
    },
    {
      _id: "64f015b3f1b4113adc352819",
      name: "test user ",
      description: "no 4 ",
      requiredBcr: true,
      order: 1,
    },
    {
      _id: "64f015b3f1b4113adc352819",
      name: "test user ",
      description: "no 4 ",
      requiredBcr: true,
      order: 1,
    },

    {
      _id: "64f015b3f1b4113adc352819",
      name: "test user ",
      description: "no 4 ",
      requiredBcr: true,
      order: 1,
    },
    {
      _id: "64f015b3f1b4113adc352819",
      name: "test user ",
      description: "no 4 ",
      requiredBcr: true,
      order: 1,
    },
  ];
  //name email and status 
  return (
    <Dashboard>
      <DashNav>
        <SASideBar />
      </DashNav>
      <DashMain>
        <DashHeader>
          <DashHeaderTitle>Organization List</DashHeaderTitle>
          <DashHeaderSearch>
            <SearchBox>
              <SearchInput
                type="text"
                placeholder="Search..."
                // value={searchValue}
                // onChange={(e) => setSearchValue(e.target.value)}
              ></SearchInput>
              <SearchIcon src="/images/icons/searchIcon.svg" />
            </SearchBox>
            <DashNotification src="/images/icons/Notifications.svg" />
          </DashHeaderSearch>
        </DashHeader>
        <DisciplinaryDiv>
          <DisciplinaryHeading>All Organizations</DisciplinaryHeading>
          <AddNewButton onClick={HandleOpen}>Add New</AddNewButton>
          <Modal
            open={open}
            onClose={HandleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <ModalUpperDiv>
                <ModalHeading>Add New Members</ModalHeading>
                <ModalIcon
                  onClick={() => {
                    HandleClose();
                  }}
                  src="/images/icons/Alert-Circle.svg"
                />
              </ModalUpperDiv>
              <ModalUpperMid>
                <InputLabel>
                  Organization Name <InputSpan>*</InputSpan>
                </InputLabel>
                <Input
                  type="text"
                  name="name"
                  // onChange={HandleChanges}
                  // value={formData.name}
                  placeholder="name"
                />
                {/* <Errors>{errors.nameError}</Errors> */}
                <InputLabel>
                  Email <InputSpan>*</InputSpan>
                </InputLabel>
                <Input
                  type="Email"
                  name="name"
                  // onChange={HandleChanges}
                  // value={formData.name}
                  placeholder="name"
                />
                <AddNewButton
                  onClick={(e) => {
                    HandleClose();
                    // HandleSubmit(e);
                  }}
                >
                  Add 
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
             
                <TableCell sx={{...CellHeadStyles, minWidth: "250px" }}  align="left">
                  Name
                </TableCell>
                <TableCell sx={{...CellHeadStyles, minWidth: "180px" }}  align="left">
                  Email
                </TableCell>
                <TableCell sx={{...CellHeadStyles, minWidth: "150px" }}  align="left">
                  Status
                </TableCell>
                <TableCell sx={{...CellHeadStyles, minWidth: "150px" }}  align="left">
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
                        // onClick={() => {
                        //   HandleOpenEdit();
                        //   setId(data._id);
                        //   setDescription(data.description);
                        //   setRequiredBcr(data.requiredBcr);
                        //   setName(data.name);
                        // }}
                        src="/images/icons/Pendown.svg"
                      />
                      <ActionIcons
                        // onClick={() => {
                        //   HandleOpenDelete();
                        //   setId(data._id);
                        // }}
                        src="/images/icons/Trash-2.svg"
                      />
                    </ActionIconDiv>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <AddNewButton onClick={HandleLoadMore} style={{ marginTop: "10px" }}>
          Load More
        </AddNewButton> */}
      </DashMain>
    </Dashboard>
  );
}

export default SAOrganization;