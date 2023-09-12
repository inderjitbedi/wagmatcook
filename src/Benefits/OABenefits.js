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
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import {
  DashHeader,
  DashHeaderTitle,
  DashHeaderSearch,
  SearchBox,
  SearchInput,
  SearchIcon,
  DashNotification,
} from "../Dashboard/OADashboard/OADashBoardStyles";
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
  LoadMore,
} from "../Disciplinary/DisciplinaryStyles";
const OABenefits = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [Id, setId] = useState("");
  const [update, setUpdate] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [delayedSearchValue, setDelayedSearchValue] = useState("");
  const delayDuration = 1000; // Set the delay duration in milliseconds
  let searchTimer;
  // add new modal
  const [open, setOpen] = useState(false);
  const HandleOpen = () => setOpen(true);
  const HandleClose = () => setOpen(false);
  //Delete Modal Delete
  const [openDelete, setOpenDelete] = useState(false);
  const HandleOpenDelete = () => setOpenDelete(true);
  const HandleCloseDelete = () => setOpenDelete(false);
  const [detailsLength, setDetailsLength] = useState(500);

  const HandleSearchCahnge = (e) => {
    setSearchValue(e.target.value);
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      setDelayedSearchValue(e.target.value);
    }, delayDuration);
  };
  const {
    register,
    clearErrors,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });

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
      HandleSubmit(data);
    } else if (update) {
      HandleUpdate(data);
    }
    console.log("form submmited", data);
  };

  const GetBenefits = () => {
    setIsLoading(true);
    let url = `/benefit/list?page=1&limit=10&searchKey=${searchValue}`;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result }) => {
        if (result) {
          setResult(result);
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

  useEffect(() => {
    GetBenefits();
  }, [delayedSearchValue]);

  const HandleSubmit = (data) => {
    // e.preventDefault();

    let url = "/benefit/create";

    setIsLoading(true);
    let dataCopy = data;
    httpClient({
      method: "post",
      url,
      data: dataCopy,
    })
      .then(({ result }) => {
        if (result) {
          HandleClose();
          GetBenefits();
          toast.success("Entry Added Successfully");
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error creating Disciplinary. Please try again.");
        HandleClose();
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const HandleDelete = () => {
    setIsLoading(true);
    let url = `/benefit/delete/${Id}`;
    httpClient({
      method: "put",
      url,
    })
      .then(({ result }) => {
        if (result) {
          HandleCloseDelete();
          setId("");
          GetBenefits();
          toast.success("Entry Deleted successfully");
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error Deleting Benefits. Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const HandleUpdate = (data) => {
    let dataCopy = data;

    let url = `/benefit/update/${Id}`;

    setIsLoading(true);

    httpClient({
      method: "put",
      url,
      data: dataCopy,
    })
      .then(({ result }) => {
        if (result) {
          setId("");
          GetBenefits();
          setUpdate(false);
          HandleClose();
          reset();
          toast.success("Entry Updated Successfully");
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
  // console.log(result, "the benefits data");
  console.log(update, "this is the value ");

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
  return (
    <>
      <DashHeader>
        <DashHeaderTitle>Benefits</DashHeaderTitle>
        <DashHeaderSearch>
          <SearchBox>
            <SearchInput
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => HandleSearchCahnge(e)}
            ></SearchInput>
            <SearchIcon src="/images/icons/searchIcon.svg" />
          </SearchBox>
          <DashNotification src="/images/icons/Notifications.svg" />
          <DashNotification src="/images/icons/Logout.svg" />
        </DashHeaderSearch>
      </DashHeader>
      <DisciplinaryDiv>
        <DisciplinaryHeading>All Disciplinary</DisciplinaryHeading>
        <AddNewButton onClick={HandleOpen}>Add New</AddNewButton>
        <Modal
          open={open}
          onClose={() => {
            HandleClose();
            clearErrors();
            reset();
            setUpdate(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ModalUpperDiv>
              <ModalHeading>Add Benefits</ModalHeading>
              <ModalIcon
                onClick={() => {
                  HandleClose();
                  clearErrors();
                  reset();
                  setUpdate(false);
                }}
                src="/images/icons/Alert-Circle.svg"
              />
            </ModalUpperDiv>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalUpperMid>
                <InputLabel>
                  Benefits Category<InputSpan>*</InputSpan>
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
                <InputLabel>
                  Add Benefits <InputSpan>*</InputSpan>
                </InputLabel>
                <TextArea
                  type="text"
                  {...register("description", {
                    required: {
                      value: true,
                      message: "Required",
                    },
                    maxLength: {
                      value: 500,
                      message:
                        "Details exceeds the maximum length of 500 characters ",
                    },
                    // minLength: {
                    //   value: 10,
                    //   message: "Atleast write  10 characters ",
                    // },
                    onChange: (value) => {
                      setDetailsLength(500 - value.target.value.length);
                    },
                  })}
                />

                <InputPara>
                  {" "}
                  {<Errors>{errors.description?.message}</Errors>}{" "}
                  <span style={{ justifySelf: "flex-end" }}>
                    {" "}
                    Max {detailsLength} characters
                  </span>
                </InputPara>

                {!update ? (
                  <AddNewButton
                    type="submit"
                    disabled={isLoading}
                    style={{ marginTop: "25px" }}
                  >
                    Submit
                  </AddNewButton>
                ) : (
                  <AddNewButton
                    type="submit"
                    disabled={isLoading}
                    style={{ marginTop: "25px" }}
                  >
                    Update
                  </AddNewButton>
                )}
              </ModalUpperMid>
            </form>
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
                  style={{ minWidth: "300px" }}
                  align="left"
                >
                  Benefits Category
                </TableCell>
                <TableCell
                  sx={CellHeadStyles}
                  style={{ minWidth: "500px" }}
                  align="left"
                >
                  Benefits
                </TableCell>

                <TableCell
                  sx={CellHeadStyles}
                  style={{ minWidth: "100px" }}
                  align="left"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {result?.benefits?.map((data, index) => (
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                    background: "#fff",
                  }}
                  key={data._id}
                >
                  <TableCell sx={CellStyle} align="left">
                    {data.name}
                  </TableCell>
                  <TableCell sx={CellStyle2} align="left">
                    {data.description}
                  </TableCell>
                  <TableCell sx={CellStyle2} align="left">
                    {" "}
                    <ActionIconDiv>
                      <ActionIcons
                        onClick={() => {
                          setId(data._id);
                          setUpdate(true);
                          reset(data);
                          HandleOpen();
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
      )}
      <DeleteModal
        openDelete={openDelete}
        HandleCloseDelete={HandleCloseDelete}
        HandleDelete={HandleDelete}
        message="Are you sure you want to delete this Benefit?"
        isLoading={isLoading}
      />
    </>
  );
};

export default OABenefits;
