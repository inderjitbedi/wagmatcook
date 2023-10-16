import React,{useState,useEffect} from 'react'
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
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
import Pagination from "@mui/material/Pagination";
import httpClient from "../api/httpClient";
import API_URLS from "../constants/apiUrls";
import DeleteModal from "../Modals/DeleteModal";
import CommenDashHeader from "../Dashboard/CommenDashHeader";
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
  PaginationDiv,
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
  textTransform: "capitalize",
};
const CellStyle2 = {
  color: "#222B45",
  fontSize: "1.4rem",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "1.5rem",
};
const DocumentsTags = () => {
      const [isLoading, setIsLoading] = useState(false);
      const [update, setUpdate] = useState(false);
      const [page, setPage] = useState(1);
      const HandleChangePage = (event, value) => {
        setPage(value);
      };
      const [result, setResult] = useState([]);
      const [Id, setId] = useState("");
      const [searchValue, setSearchValue] = useState("");

      const HandleSearchCahnge = (data) => {
        setSearchValue(data);
      };
      const [tagsList, setTagsList] = useState([]);
      const [openDelete, setOpenDelete] = useState(false);
      const HandleOpenDelete = () => setOpenDelete(true);
      const HandleCloseDelete = () => setOpenDelete(false);
      const [open, setOpen] = useState(false);
      const HandleOpen = () => setOpen(true);
      const HandleClose = () => {
        setOpen(false);
        //   setDetailsLength(500);
        clearErrors();
        reset({});
        console.log("working");
      };
      const HandleUpdateAction = (data) => {
        setUpdate(true);
        setId(data._id);
        //   setDetailsLength(500 - data?.description?.length);
        reset({ name: data.name });
        HandleOpen();
      };
      const HandleOpenAddNewAction = () => {
        HandleOpen();
        reset({});
        clearErrors();
        //   setDetailsLength(500);
      };
      const {
        register,
        clearErrors,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        mode: "all",
        defaultValues: {
          name: "",
        },
      });
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
          // HandleSubmit(data);
        } else if (update && isEmptyObject(errors)) {
          // HandleUpdate(data);
        }
      };
      useEffect(() => {
        // GetEmployeeTypes();
      }, [searchValue, page]);
    return (
      <>
        <CommenDashHeader onSearch={HandleSearchCahnge} text="Document Tags" />
        <DisciplinaryDiv>
          <DisciplinaryHeading>All Document Tags</DisciplinaryHeading>
          <AddNewButton
            onClick={() => {
              HandleOpenAddNewAction();
            }}
          >
            Add New
          </AddNewButton>
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
                    height: "3rem",
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
                  <ModalUpperDiv>
                    <ModalHeading>
                      {!update ? "Add Document Tag" : "Update Document Tag"}
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
                        Tag<InputSpan>*</InputSpan>
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
                      {/* <InputLabel>
                  Description  <InputSpan>*</InputSpan>
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
                      message: "Details exceeds 500 characters ",
                    },

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
                    {detailsLength > -1 ? detailsLength : 0} characters left
                  </span>
                </InputPara> */}

                      {!update ? (
                        <AddNewButton
                          type="submit"
                          disabled={isLoading}
                          style={{ marginTop: "2.5rem" }}
                        >
                          Submit
                        </AddNewButton>
                      ) : (
                        <AddNewButton
                          type="submit"
                          disabled={isLoading}
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
                      style={{ width: "8rem" }}
                    >
                      S&nbsp;No.
                    </TableCell>
                    <TableCell
                      sx={CellHeadStyles}
                      style={{ minWidth: "15rem" }}
                      align="left"
                    >
                      Document Tag
                    </TableCell>
                    <TableCell
                      sx={CellHeadStyles}
                      style={{ minWidth: "35rem" }}
                      align="left"
                    >
                      {/* Description */}
                    </TableCell>
                    <TableCell
                      sx={CellHeadStyles}
                      style={{ minWidth: "10rem" }}
                      align="left"
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {!tagsList?.length && (
                    <TableRow sx={{ height: "20rem" }}>
                      <TableCell align="center" sx={CellStyle2} colSpan={3}>
                        No Document Tags Found
                      </TableCell>
                    </TableRow>
                  )}
                  {tagsList?.map((data, index) => (
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
                        <MenuIconDiv>{data?.order}</MenuIconDiv>
                      </TableCell>
                      <TableCell sx={CellStyle} align="left">
                        {data.name}
                      </TableCell>
                      <TableCell sx={CellStyle2} align="left">
                        {/* {data.description} */}
                      </TableCell>
                      <TableCell sx={CellStyle2} align="left">
                        {" "}
                        <ActionIconDiv>
                          <ActionIcons
                            onClick={() => {
                              HandleUpdateAction(data);
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
          // HandleDelete={HandleDelete}
          message="Are you sure you want to delete this employee type?"
          isLoading={isLoading}
        />
      </>
    );
}

export default DocumentsTags