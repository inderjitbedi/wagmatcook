import React, { useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import Modal from "@mui/material/Modal";
import DeleteModal from "../Modals/DeleteModal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import Pagination from "@mui/material/Pagination";
import ROLES from "../constants/roles";
import API_URLS from "../constants/apiUrls";
import CommenDashHeader from "../Dashboard/CommenDashHeader";
import { useForm, Controller } from "react-hook-form";
import httpClient from "../api/httpClient";
import Box from "@mui/material/Box";
import { useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import { AiOutlineUserSwitch } from "react-icons/ai";

import {
  DisciplinaryDiv,
  DisciplinaryHeading,
  AddNewButton,
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
  PendingStyle,
  ApproveStyle,
  PaginationDiv,
} from "../Disciplinary/DisciplinaryStyles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: " 44.6rem",
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
};
const CellStyle2 = {
  color: "#222B45",
  fontSize: "1.4rem",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "1.5rem",
};

const Offboarding = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [Id, setId] = useState("");
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);
  const [userType, setUserType] = useState("");
  const [update, setUpdate] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [formData, setFormData] = useState([]);
  const [transferTo, setTransferTo] = useState("");
  const HandleChangePage = (event, value) => {
    setPage(value);
  };
  const [OffboardList, setOffboardList] = useState([]);
  const [open, setOpen] = useState(false);
  const HandleOpen = (data) => {
    const Name = [
      data.fromPersonalInfo?.firstName,
      data.fromPersonalInfo?.lastName,
    ].join(" ");
    setSelectedName(Name);
    setId(data._id);
    setOpen(true);
    GetEmployeesList(data._id);
  };
  const HandleUpdateAction = (data) => {
    setUpdate(true);
    reset({
      to: data.offboardingData.to._id,
      notes: data.offboardingData.notes,
    });
    HandleOpen(data);
  };
  const HandleClose = () => {
    setOpen(false);
    clearErrors();
    reset({});
    setId("");
  };
  const HandleSearchCahnge = (data) => {
    setSearchValue(data);
  };
  const {
    register,
    control,
    clearErrors,
    handleSubmit,
    reset,
    formState: { errors },
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
      data.from = Id;
      // HandleUpdate(data);
      HandleClose();
      setIsConfirmationModalOpen(true);
      setFormData(data);
      console.log("modal open", isConfirmationModalOpen);
    }
  };
  const handleUpdateConfirmed = () => {
    HandleUpdate(formData);

    setIsConfirmationModalOpen(false);
  };
  const handleCancelUpdate = () => {
    setIsConfirmationModalOpen(false);
    setSelectedName("");
  };
  const GetOffboardList = () => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      let url = API_URLS.getOffboardingList;

      httpClient({
        method: "get",
        url,
      })
        .then(({ result, error }) => {
          if (result) {
            setOffboardList(result.employees);
            resolve(result.employees);

            setIsLoading(false);
          } else {
            //toast.warn("something went wrong ");
            setIsLoading(false);

            reject("No data received from GetDepartments API");
          }
        })
        .catch((error) => {
          // toast.error("Error getting department. Please try again.");
          setIsLoading(false);
          reject(error);
        });
    });
  };
  const GetEmployeesList = (userid) => {
    setIsLoading(true);

    let url = API_URLS.getReporttoList;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setResult(result);
          const filteredEmployees = result.users.filter((employee) => {
            return employee.user !== userid;
          });

          setEmployeeList(filteredEmployees);
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        // console.error("Error:", error);
        toast.error("Error creating Employee. Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const HandleUpdate = (data) => {
    console.log("update Data:", data);
    setIsLoading(true);
    let dataCopy = data;

    let url = API_URLS.updateOffboarding;

    httpClient({
      method: "put",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          setId("");
          setSelectedName("");
          GetOffboardList();
          setUpdate(false);
          HandleClose();
          reset();
          toast.success(result.message, {
            className: "toast",
          }); //Entry Updated Successfully");
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
  console.log("the selected user transfer name:", transferTo);

  useEffect(() => {
    GetOffboardList();
  }, []);
  return (
    <>
      <CommenDashHeader onSearch={HandleSearchCahnge} text={"Offboarding"} />
      <DisciplinaryDiv>
        <DisciplinaryHeading>All Employees</DisciplinaryHeading>
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
                <ModalUpperDiv>
                  <ModalHeading>
                    {!update ? "Offboarding" : "View offboarding"}
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
                      Assign the responsibilities of {selectedName} to
                      {update ? " " : <InputSpan>*</InputSpan>}
                    </InputLabel>
                    <Controller
                      name={`to`}
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Required",
                        },
                        onChange: (e) => {
                          const userId = e.target.value;
                          const userName = employeeList.find(
                            (user) => user._id === userId
                          );
                          const fullName = [
                            userName?.personalInfo[0]?.firstName,
                            userName?.personalInfo[0]?.lastName,
                          ].join(" ");
                          setTransferTo(fullName);
                        },
                      }}
                      render={({ field }) => (
                        <Select {...field} disabled={update}>
                          <Option value="">Select</Option>
                          {employeeList?.map((data) => (
                            <Option value={data._id}>
                              {" "}
                              {[
                                data.personalInfo[0]?.firstName,
                                data.personalInfo[0]?.lastName,
                              ].join(" ") || " - "}
                            </Option>
                          ))}
                        </Select>
                      )}
                    />
                    {errors.to && <Errors>{errors.to?.message}</Errors>}
                    <InputLabel>
                      Notes {update ? " " : <InputSpan>*</InputSpan>}
                    </InputLabel>
                    <TextArea
                      type="text"
                      {...register("notes", {
                        required: {
                          value: true,
                          message: "Required",
                        },
                      })}
                      disabled={update}
                    />
                    {errors.notes && <Errors>{errors.notes?.message}</Errors>}
                    {!update ? (
                      <AddNewButton
                        type="submit"
                        disabled={isLoading}
                        style={{ marginTop: "2.5rem" }}
                      >
                        Submit
                      </AddNewButton>
                    ) : (
                      ""
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
                    style={{ width: "1rem" }}
                  >
                    Sr.&nbsp;No.
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "12rem" }}
                    align="left"
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "15rem" }}
                    align="left"
                  >
                    Email
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "9rem" }}
                    align="left"
                  >
                    Role
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "9rem" }}
                    align="left"
                  >
                    Assigned To
                  </TableCell>

                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "12rem" }}
                    align="left"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {!OffboardList?.length && (
                  <TableRow sx={{ height: "20rem" }}>
                    <TableCell align="center" sx={CellStyle2} colSpan={7}>
                      No employee found
                    </TableCell>
                  </TableRow>
                )}
                {OffboardList?.map((data, index) => (
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
                      <MenuIconDiv>{index + 1}</MenuIconDiv>
                    </TableCell>
                    <TableCell sx={CellStyle} align="left">
                      {[
                        data?.fromPersonalInfo.firstName,
                        data?.fromPersonalInfo?.lastName,
                      ].join(" ") || " - "}
                    </TableCell>
                    <TableCell sx={CellStyle2} align="left">
                      {data.email || " - "}
                    </TableCell>
                    <TableCell sx={CellStyle} align="left">
                      {(data.role === ROLES.EMPLOYEE
                        ? "USER"
                        : data.role === ROLES.HR
                        ? " HR"
                        : data.role) || " - "}
                    </TableCell>
                    <TableCell sx={CellStyle} align="left">
                      {data?.toPersonalInfo?.firstName
                        ? [
                            data?.toPersonalInfo?.firstName,
                            data?.toPersonalInfo?.lastName,
                          ].join(" ")
                        : " - "}
                    </TableCell>

                    <TableCell sx={CellStyle2} align="left">
                      {" "}
                      {data?.toPersonalInfo ? (
                        <ActionIconDiv>
                          <ActionIcons
                            src="/images/icons/eye.svg"
                            onClick={() => HandleUpdateAction(data)}
                          />
                        </ActionIconDiv>
                      ) : (
                        <ActionIconDiv>
                          {userType === ROLES.EMPLOYEE ? (
                            " "
                          ) : (
                            <AiOutlineUserSwitch
                              style={{
                                width: "2rem",
                                height: "2rem",
                                color: "#279AF1",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                HandleOpen(data);
                              }}
                            />
                          )}
                        </ActionIconDiv>
                      )}
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
        openDelete={isConfirmationModalOpen}
        message={`Are you sure you want to transfer the responsibilities?`}
        HandleCloseDelete={handleCancelUpdate}
        isLoading={isLoading}
        HandleDelete={handleUpdateConfirmed}
        Option={true}
        selectedName={selectedName}
        transferTo={transferTo}
      />
    </>
  );
};

export default Offboarding;
