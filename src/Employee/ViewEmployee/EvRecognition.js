import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useForm, Controller } from "react-hook-form";
import httpClient from "../../api/httpClient";
import { toast } from "react-toastify";
import { RotatingLines, ThreeDots } from "react-loader-spinner";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import Paper from "@mui/material/Paper";
import ROLES from "../../constants/roles";
import DeleteModal from "../../Modals/DeleteModal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  MainBodyContainer,
  Input,
  ButtonBlue,
  FlexContaierForm,
  FlexColumnForm,
  InputLabel,
  Errors,
  ModalHeading,
  ModalContainer,
  ModalIcon,
  ModalFormContainer,
  InputSpan,
  IconContainer,
  Icons,
  TextArea,
  LeaveDiv,
} from "./ViewEmployeeStyle";
import API_URLS from "../../constants/apiUrls";
import CommenHeader from "./CommenHeader";
import { InputPara } from "./ViewEmployeeStyle";
import InputEmoji from "react-input-emoji";
import EmojiPicker from "emoji-picker-react";
import { TbRuler2 } from "react-icons/tb";

const CellStyle = {
  color: "#8F9BB3",
  padding: "1.6rem 8px",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "1.6rem",
};
const Celllstyle2 = {
  color: "#222B45",
  padding: "1.6rem 8px",
  fontSize: "1.4rem",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "1.5rem",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "44.6rem",
  bgcolor: "background.paper",
  border: "1px solid #EFF4FA",
  boxShadow: 45,
  // padding: "2rem 0rem",
  borderRadius: "8px",
  height: "54.7rem",
  overflowY: "scroll",
};

const EVRecognition = () => {
  let API_URL = process.env.REACT_APP_API_URL;

  const { employeeid } = useParams();
  const Navigate = useNavigate();
  const location = useLocation();
  const [userType, setUserType] = useState("");
  const [isAccount, setIsAccount] = useState(false);
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const HandleOpenDelete = () => setOpenDelete(true);
  const HandleCloseDelete = () => setOpenDelete(false);
  const [detailsLength, setDetailsLength] = useState(500);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [emoji, setEmoji] = useState("");

  const handleClose = () => {
    reset({});
    clearErrors();
    setOpen(false);
    setDetailsLength(500);
    setEmoji("");
  };
  const [Id, setId] = useState("");

  const [update, setUpdate] = useState(false);
  const HandleUpdateAction = (data) => {
    setUpdate(true);
    setId(data._id);
    reset({
      title: data.title,
      description: data.description,
      emojiIcon: data.emojiIcon,
    });
    setDetailsLength(500 - data?.description?.length);
    setEmoji(data.emojiIcon);
    console.log(data);
    handleOpen();
  };
  const HandleOpenAddNewAction = () => {
    setUpdate(false);
    handleOpen();
    reset({});
    clearErrors();
    setEmoji("");
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    clearErrors,
    setValue,
    setError,
  } = useForm({
    mode: "all",
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
      AddNewRecognition(data);
    } else if (update) {
      HandleUpdate(data);
    }
  };

  const GetEmployeesRecognition = () => {
    setIsLoading(true);
    const trimid = employeeid.trim();
    let url = API_URLS.getEmployeeRecognition.replace(
      ":employeeid",
      employeeid
    );
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setResult(result);
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

  const AddNewRecognition = (data) => {
    setIsLoading(true);
    let dataCopy = data;

    let url = API_URLS.addSingleEmployeeRecognition.replace(
      ":employeeid",
      employeeid
    );
    httpClient({
      method: "post",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          handleClose();
          GetEmployeesRecognition();
          reset();
          toast.success(result.message, {
            className: "toast",
          }); //Employee certificate added successfully");
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        toast.error("Error Adding New Position . Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const HandleUpdate = (data) => {
    setIsLoading(true);
    let dataCopy = data;

    let url = API_URLS.updateEmployeeRecognition
      .replace(":employeeid", employeeid)
      .replace(":id", Id);

    httpClient({
      method: "put",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          setId("");
          GetEmployeesRecognition();
          setUpdate(false);
          handleClose();
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
    let url = API_URLS.deleteEmployeeRecognition
      .replace(":employeeid", employeeid)
      .replace(":id", Id);
    httpClient({
      method: "put",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          HandleCloseDelete();
          setId("");
          GetEmployeesRecognition();

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
    GetEmployeesRecognition();
    if (location.pathname.indexOf("manager") > -1) {
      setUserType(ROLES.MANAGER);
    } else if (location.pathname.indexOf("hr") > -1) {
      setUserType(ROLES.HR);
    } else if (location.pathname.indexOf("payroll") > -1) {
      setUserType(ROLES.PAYROLL);
    } else if (location.pathname.indexOf("user") > -1) {
      setUserType(ROLES.EMPLOYEE);
    } else if (location.pathname.indexOf("organization-admin") > -1) {
      setUserType(ROLES.ORG_ADMIN);
    }
    if (location.pathname.indexOf("account") > -1) {
      setIsAccount(true);
    }
  }, []);
  const EmojiInput = ({ control, name, rules }) => {
    const onEmojiClick = (event, emojiObject) => {
      setEmoji((prevEmoji) => prevEmoji + event.emoji);
      setValue(name, emoji + event.emoji);
    };

    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <div>
            <Input
              {...field}
              value={emoji}
              onChange={(e) => {
                setEmoji(e.target.value);
                field.onChange(e.target.value);
              }}
              // placeholder="add emoji"
            />
            <EmojiPicker
              onEmojiClick={onEmojiClick}
              reactionsDefaultOpen={true}
              skinTonesDisabled={true}
              searchDisabled={true}
              height={280}
              width={"100%"}
              allowExpandReactions={true}
              previewConfig={{ showPreview: false }}
            />
          </div>
        )}
      />
    );
  };
  return (
    <>
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
        <MainBodyContainer>
          <LeaveDiv>
            Employee Recognition
            {userType === ROLES.EMPLOYEE || isAccount ? (
              " "
            ) : (
              <ButtonBlue onClick={() => HandleOpenAddNewAction()}>
                Add New
              </ButtonBlue>
            )}
          </LeaveDiv>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow
                  sx={{
                    background: "#FBFBFB",
                  }}
                >
                  <TableCell sx={{ ...CellStyle, maxWidth: "2.5rem" }}>
                    Sr.No
                  </TableCell>
                  <TableCell
                    sx={{ ...CellStyle, maxWidth: "12.8rem" }}
                    align="left"
                  >
                    Title
                  </TableCell>
                  <TableCell
                    sx={{ ...CellStyle, maxWidth: "10rem" }}
                    align="left"
                  >
                    Added By
                  </TableCell>
                  <TableCell
                    sx={{ ...CellStyle, maxWidth: "18.4rem" }}
                    align="left"
                  >
                    Description{" "}
                  </TableCell>
                  <TableCell
                    sx={{ ...CellStyle, maxWidth: "10rem" }}
                    align="left"
                  >
                    Remarks
                  </TableCell>

                  {userType === ROLES.MANAGER || isAccount ? (
                    " "
                  ) : (
                    <TableCell sx={{ ...CellStyle }} align="left">
                      Actions
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {!result?.recognitions?.length && (
                  <TableRow sx={{ height: "20rem" }}>
                    <TableCell
                      align="center"
                      sx={Celllstyle2}
                      colSpan={userType === ROLES.MANAGER ? 5 : 6}
                    >
                      No recognition found
                    </TableCell>
                  </TableRow>
                )}
                {result?.recognitions?.map((data, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                    style={{ background: "#fff" }}
                  >
                    <TableCell align="left" sx={Celllstyle2}>
                      {index + 1}
                    </TableCell>
                    <TableCell align="left" sx={Celllstyle2}>
                      {data?.title}
                    </TableCell>
                    <TableCell align="left" sx={Celllstyle2}>
                      {data?.addedBy?.personalInfo?.firstName +
                        data?.addedBy?.personalInfo?.lastName}
                    </TableCell>
                    <TableCell align="left" sx={Celllstyle2}>
                      {data?.description}
                    </TableCell>
                    <TableCell align="left" sx={Celllstyle2}>
                      {data?.emojiIcon}
                    </TableCell>

                    {userType === ROLES.MANAGER ? (
                      " "
                    ) : (
                      <TableCell align="center" sx={Celllstyle2}>
                        <IconContainer>
                          {userType === ROLES.EMPLOYEE ||
                          userType === ROLES.MANAGER ||
                          isAccount ? (
                            ""
                          ) : (
                            <Icons
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                HandleUpdateAction(data);
                              }}
                              src="/images/icons/Pendown.svg"
                            />
                          )}
                          {userType === ROLES.EMPLOYEE ||
                          userType === ROLES.MANAGER ||
                          isAccount ? (
                            " "
                          ) : (
                            <Icons
                              onClick={() => {
                                setId(data._id);
                                HandleOpenDelete();
                              }}
                              src="/images/icons/Trash-2.svg"
                            />
                          )}
                        </IconContainer>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </MainBodyContainer>
      )}
      {/* add new modal  */}
      <Modal
        open={open}
        // onClose={handleClose}
        sx={{
          backgroundColor: "rgb(27, 27, 27, 0.75)",
          backdropFilter: "blur(8px)",
        }}
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
              <ModalContainer>
                <ModalHeading>
                  {" "}
                  {update ? " Update Recognition" : "Add Recognition"}
                </ModalHeading>
                <ModalIcon
                  onClick={handleClose}
                  src="/images/icons/Alert-Circle.svg"
                />
              </ModalContainer>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalFormContainer>
                  <FlexContaierForm>
                    <FlexColumnForm>
                      <InputLabel>
                        Recognition Title
                        <InputSpan>*</InputSpan>
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
                      {errors.title && (
                        <Errors> {errors.title?.message}</Errors>
                      )}
                    </FlexColumnForm>
                  </FlexContaierForm>
                  <FlexContaierForm>
                    <FlexColumnForm>
                      <InputLabel>
                        Description <InputSpan>*</InputSpan>
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
                          {detailsLength > -1 ? detailsLength : 0} characters
                          left
                        </span>
                      </InputPara>
                    </FlexColumnForm>
                  </FlexContaierForm>
                  <FlexContaierForm>
                    <FlexColumnForm>
                      <InputLabel>
                        Remarks <InputSpan>*</InputSpan>
                      </InputLabel>
                      <EmojiInput
                        name="emojiIcon"
                        control={control}
                        rules={{ required: "Required" }}
                      />
                      {<Errors>{errors.emojiIcon?.message} </Errors>}
                    </FlexColumnForm>
                  </FlexContaierForm>

                  <ButtonBlue type="submit" disabled={isLoading}>
                    {update ? " Update" : "Submit"}
                  </ButtonBlue>
                </ModalFormContainer>
              </form>
            </>
          )}
        </Box>
      </Modal>
      {/*modal ends here  */}
      <DeleteModal
        openDelete={openDelete}
        message="Are you sure you want to delete this recognition?"
        HandleCloseDelete={HandleCloseDelete}
        isLoading={isDeleting}
        HandleDelete={HandleDelete}
      />
    </>
  );
};

export default EVRecognition;
