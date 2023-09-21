import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ButtonBlue } from "../AddEmployee/AddEmployeeStyles";
import { useForm, Controller } from "react-hook-form";
import { RotatingLines, ThreeDots } from "react-loader-spinner";
import { useNavigate, useParams, Link } from "react-router-dom";
import DeleteModal from "../../Modals/DeleteModal";
import httpClient from "../../api/httpClient";
import { toast } from "react-toastify";
import {
  MainBodyContainer,
  PersonalInfo,
  PersonalImg,
  FlexColumn,
  PersonalName,
  PersonalTitle,
  PersonalDepartment,
  FlexSpaceBetween,
  LeaveDiv,
  TabelDiv,
  TabelImg,
  TabelDarkPara,
  TabelParaContainer,
  Icons,
  Input,
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
  Select,
  Option,
} from "./ViewEmployeeStyle";

const CellStyle = {
  color: "#8F9BB3",
  padding: "16px 8px",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "16px",
};
const Celllstyle2 = {
  color: "#222B45",
  padding: "16px 8px",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "15px",
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 446,
  bgcolor: "background.paper",
  border: "1px solid #EFF4FA",
  boxShadow: 45,
  padding: "20px 0px",
  borderRadius: "8px",
};
const EvLeaveAlloacation = () => {
  let API_URL = process.env.REACT_APP_API_URL;

  const [open, setOpen] = useState(false);
  const { employeeid } = useParams();
  const Navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [Id, setId] = useState("");
  const [update, setUpdate] = useState(false);
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [leaveType, setLeaveType] = useState([]);
  const rows = [1, 2, 3, 4];
  const [openDelete, setOpenDelete] = useState(false);
  const HandleOpenDelete = () => setOpenDelete(true);
  const HandleCloseDelete = () => setOpenDelete(false);
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
    if (isEmptyObject(errors)) {
      //  AddNewCertificates(data);
    }
    console.log("form submmited :", data);
  };
  const GetLeavesType = () => {
    setIsLoading(true);
    let url = `/leave-type/list`;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setLeaveType(result.leaveTypes);
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
      GetLeavesType();
  }, []);
  const HandleUpdateAction = (data) => {
    setUpdate(true);
    setId(data._id);
    // reset(data);
    handleOpen();
  };
  const HandleOpenAddNewAction = () => {
    handleOpen();
    reset({});
    clearErrors();
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
          <FlexSpaceBetween style={{ alignItems: "center" }}>
            <PersonalInfo>
              <PersonalImg
                src={
                  result.personalInfo?.photo
                    ? API_URL + result.personalInfo.photo?.path
                    : "/images/User.jpg"
                }
              />
              <FlexColumn style={{ gap: "5px" }}>
                <PersonalName>
                  {" "}
                  {[
                    result.personalInfo?.firstName,
                    result.personalInfo?.lastName,
                  ].join(" ")}
                </PersonalName>
                <PersonalTitle>{result.jobDetails?.title || "-"}</PersonalTitle>

                <PersonalDepartment>
                  {" "}
                  {result.jobDetails?.department?.name || "-"}
                </PersonalDepartment>
              </FlexColumn>
            </PersonalInfo>
          </FlexSpaceBetween>
          <LeaveDiv>
            Leaves Alloaction
            <ButtonBlue onClick={() => HandleOpenAddNewAction()}>
              New Alloaction
            </ButtonBlue>
          </LeaveDiv>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow
                  sx={{
                    background: "#FBFBFB",
                  }}
                >
                  <TableCell sx={{ ...CellStyle, maxWidth: "25px" }}>
                    Sr.No
                  </TableCell>
                  <TableCell
                    sx={{ ...CellStyle, maxWidth: "128" }}
                    align="left"
                  >
                    Leave&nbsp;Type
                  </TableCell>
                  <TableCell
                    sx={{ ...CellStyle, maxWidth: "184px" }}
                    align="left"
                  >
                    Total&nbsp;Allocation
                  </TableCell>

                  <TableCell sx={{ ...CellStyle }} align="left">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((data, index) => (
                  <TableRow
                    key={data.name}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                    style={{ background: "#fff" }}
                  >
                    <TableCell align="left" sx={Celllstyle2}>
                      {index + 1}
                    </TableCell>
                    <TableCell align="left" sx={Celllstyle2}>
                      Vacation
                    </TableCell>
                    <TableCell align="left" sx={Celllstyle2}>
                      10
                    </TableCell>

                    <TableCell align="center" sx={Celllstyle2}>
                      <IconContainer>
                        <Icons
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            HandleUpdateAction(data);
                          }}
                          src="/images/icons/Pendown.svg"
                        />
                        <Icons
                          onClick={() => {
                            setId(data._id);
                            HandleOpenDelete();
                          }}
                          src="/images/icons/Trash-2.svg"
                        />
                      </IconContainer>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* modal applying leaves  */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <ModalContainer>
                <ModalHeading>
                  {!update ? "Leave Alloaction" : "Update Leaves Alloaction"}
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
                        Leave Type <InputSpan>*</InputSpan>{" "}
                      </InputLabel>
                      <Controller
                        name="leaveType"
                        control={control}
                        rules={{
                          required: {
                            value: true,
                            message: "Required",
                          },
                        }}
                        render={({ field }) => (
                          <Select {...field}>
                            <Option value="" disabled>
                              Select
                            </Option>
                            {leaveType?.map((data) => (
                              <Option value={data._id}>{data.name}</Option>
                            ))}
                          </Select>
                        )}
                      />
                      {<Errors>{errors.leaveType?.message}</Errors>}
                    </FlexColumnForm>
                  </FlexContaierForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Total Alloaction <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="text"
                      {...register("totalAlloaction", {
                        required: {
                          value: true,
                          message: "Required",
                        },
                        pattern: {
                          value: /^[+]?\d+(\.\d+)?$/,
                          message: "Please enter valid alloaction",
                        },
                        validate: (fieldValue) => {
                          return (
                            (!isNaN(parseFloat(fieldValue)) &&
                              isFinite(fieldValue)) ||
                            " Must be a number "
                          );
                        },
                      })}
                    />
                    {<Errors>{errors.totalAlloaction?.message}</Errors>}
                  </FlexColumnForm>
                  <ButtonBlue type="submit">
                    {!update ? "Submit" : "Update"}
                  </ButtonBlue>
                </ModalFormContainer>
              </form>
            </Box>
          </Modal>
        </MainBodyContainer>
      )}
      <DeleteModal
        openDelete={openDelete}
        message="Are you sure you want to delete this Leave Alloaction"
        HandleCloseDelete={HandleCloseDelete}
        isLoading={isLoading}
        // HandleDelete={HandleDelete}
      />
    </>
  );
};

export default EvLeaveAlloacation;
