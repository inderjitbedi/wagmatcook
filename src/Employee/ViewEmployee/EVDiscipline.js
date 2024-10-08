import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useForm, Controller } from "react-hook-form";
import httpClient from "../../api/httpClient";
import { toast } from "react-toastify";
import { RotatingLines, ThreeDots } from "react-loader-spinner";
import { ErrorMessage } from "@hookform/error-message";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import NoDocumentfound from "../NoDocumentfound";
import DeleteModal from "../../Modals/DeleteModal";
import ROLES from "../../constants/roles";

import moment from "moment";
import {
  MainBodyContainer,
  PersonalInfo,
  PersonalImg,
  FlexColumn,
  PersonalName,
  PersonalTitle,
  PersonalDepartment,
  BasicInfoContainer,
  FlexSpaceBetween,
  BasicHeading,
  EditButton,
  ButtonIcon,
  BasicInfoDiv,
  BasicDetailsDiv,
  TitlePara,
  ViewPara,
  TimelineDiv,
  TimelinePara,
  ReviewsDiv,
  AddNewButton,
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
  TextArea,
  InputPara,
  Select,
  Option,
  LightPara,
  IconsEmployee,
  File,
  IconContainer,
  Icons,
} from "./ViewEmployeeStyle";
import API_URLS from "../../constants/apiUrls";
import CommenHeader from "./CommenHeader";
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
  height: "52rem",
  overflowY: "scroll",
};
const EVDiscipline = () => {
  let API_URL = process.env.REACT_APP_API_URL;

  const { employeeid } = useParams();
  const Navigate = useNavigate();
  const location = useLocation();
  const [userType, setUserType] = useState("");
  const [isAccount, setIsAccount] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [isUploading, setIsUploading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const HandleOpenDelete = () => setOpenDelete(true);
  const HandleCloseDelete = () => setOpenDelete(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClose = () => {
    setOpen(false);
    reset({});
    clearErrors();
    setFile(null);
    setDetailsLength(500);
  };
  const [result, setResult] = useState([]);

  const [detailsLength, setDetailsLength] = useState(500);
  const [formData, setFormData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [disciplinaryData, setDisciplinaryData] = useState([]);
  const [file, setFile] = useState(null);
  const [Id, setId] = useState("");
  const [update, setUpdate] = useState(false);
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
    // defaultValues: {
    //   file: null,
    //   bcr: "",
    //   disciplinary: "",
    //   details:""
    // }
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
      if (file) {
        data.file = file._id;
      } else {
        data.file = null;
      }
      AddNewDisciplinary(data);
    } else if (update) {
      if (file) {
        data.file = file._id;
      } else {
        data.file = null;
      }
      HandleUpdate(data);
    }
  };
  const GetDisciplinary = () => {
    setIsLoading(true);
    let url = API_URLS.getDisciplinaryList;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setDisciplinaryData(result.disciplinaries);
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
  const GetEmployeesDisciplinary = () => {
    setIsLoading(true);
    const trimid = employeeid.trim();
    let url = API_URLS.EmployeeDisciplinary.replace(":employeeid", employeeid);
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
  const AddNewDisciplinary = (data) => {
    setIsLoading(true);
    let dataCopy = data;

    let url = API_URLS.submitEmployeeDisciplinary.replace(
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
          GetEmployeesDisciplinary();
          toast.success(result.message, {
            className: "toast",
          }); //Employee disciplinary added successfully");
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        toast.error("Error Adding New Disciplinary . Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    // const inputString = e.target.files[0].type;
    // const parts = inputString?.split("/");
    // const type = parts[parts?.length - 1];

    let type = await getFileType(e.target.files[0]);
    if (type != "unknown") {
      handleUpload(file, type);
    } else {
      toast.error("Unsuported file type.");
    }
  };
  const handleUpload = (file, type) => {
    setIsUploading(true);

    if (file) {
      const binary = new FormData();
      binary.append("file", file);

      httpClient({
        method: "post",
        url: API_URLS.uploadDocuments.replace(":type", type),
        data: binary,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((data) => {
          if (data?.result) {
            setFile(data?.result?.file);
            //  insert(index, { file: data?.result?.file?._id });
            // setFormData({ ...formData, file: data?.result.file._id });
            setIsUploading(false);
          } else {
            //console.log(data.error);
            toast.error(data.error.error);
            // setErrors({ ...errors, fileError: data?.error?.error });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setIsUploading(false);
        })
        .finally(() => {
          setIsUploading(false);
        });
    }
  };
  const getFileType = (file) => {
    if (file) {
      const fileExtension = file?.name?.split(".").pop().toLowerCase();

      if (["jpg", "jpeg", "png", "gif", "tiff"].includes(fileExtension)) {
        return "image";
      } else if (["mp4", "ogg", "webm"].includes(fileExtension)) {
        return "video";
      } else if (fileExtension === "pdf") {
        return "pdf";
      } else if (fileExtension === "xlsx" || fileExtension === "xls") {
        return "xlsx";
      } else if (fileExtension === "doc" || fileExtension === "docx") {
        return "doc";
      } else {
        return "unknown";
      }
    }
  };

  const removeFile = (e) => {
    setFile(null);
    setValue("file", null);
  };
  useEffect(() => {
    setIsLoading(true);

    GetDisciplinary();
    GetEmployeesDisciplinary();
    if (location.pathname.indexOf("manager") > -1) {
      setUserType(ROLES.MANAGER);
    } else if (location.pathname.indexOf("hr") > -1) {
      setUserType(ROLES.HR);
    } else if (location.pathname.indexOf("payroll") > -1) {
      setUserType(ROLES.PAYROLL);
    } else if (location.pathname.indexOf("user") > -1) {
      setUserType(ROLES.EMPLOYEE);
    }
    if (location.pathname.indexOf("account") > -1) {
      setIsAccount(true);
    }
  }, []);
  const HandleUpdateAction = (data) => {
    setUpdate(true);
    setId(data._id);
    setDetailsLength(500 - data.details?.length);
    reset({
      details: data?.details,
      disciplinary: data.disciplinary?._id,
      file: data?.file ? data?.file?._id : null,
      issueDate: new Date(data?.issueDate).toISOString().split("T")[0],
      expiryDate: data.expiryDate
        ? new Date(data.expiryDate).toISOString().split("T")[0]
        : null,
    });
    handleOpen();
    if (data.file) {
      setFile(data.file);
    }
  };
  const HandleOpenAddNewAction = () => {
    setUpdate(false);
    reset({});
    clearErrors();
    setDetailsLength(500);
    setFile(null);
    handleOpen();

  };
  const HandleUpdate = (data) => {
    setIsLoading(true);
    let dataCopy = data;

    let url = API_URLS.getEmployeeDisciplinary
      .replace(":id", Id)
      .replace(":employeeid", employeeid);

    httpClient({
      method: "put",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          setId("");
          GetEmployeesDisciplinary();
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
        console.error("Error:", error);
        toast.error("Error Updating Benefits . Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const HandleDelete = () => {
    setIsDeleting(true);
    let url = API_URLS.deleteEmployeeDisciplinary
      .replace(":id", Id)
      .replace(":employeeid", employeeid);
    httpClient({
      method: "put",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          HandleCloseDelete();
          setId("");
          GetEmployeesDisciplinary();

          toast.success(result.message, {
            className: "toast",
          });
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error Deleting Benefits. Please try again.");
        setIsDeleting(false);
      })
      .finally(() => {
        setIsDeleting(false);
      });
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
            {/* <CommenHeader employeeid={employeeid} /> */}

            {/* <EditButton style={{ marginRight: "5.4rem" }}>
              <ButtonIcon src="/images/icons/Pen 2.svg" />
              Edit
            </EditButton> */}
          </FlexSpaceBetween>

          <BasicInfoContainer>
            <BasicInfoDiv>
              <FlexSpaceBetween style={{ marginBottom: "1rem" }}>
                <BasicHeading>Disciplinary Details</BasicHeading>
                {userType === ROLES.EMPLOYEE || isAccount ? (
                  ""
                ) : (
                  <AddNewButton onClick={HandleOpenAddNewAction}>
                    Add New{" "}
                  </AddNewButton>
                )}
              </FlexSpaceBetween>
              {/* modal add disciplinary */}
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
                        height: "52rem",
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
                          {!update
                            ? " Add Disciplinary"
                            : "Update Disciplinary"}{" "}
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
                                Disciplinary Type <InputSpan>*</InputSpan>
                              </InputLabel>
                              <Controller
                                name={`disciplinary`}
                                control={control}
                                rules={{
                                  required: {
                                    value: true,
                                    message: "Required",
                                  },
                                }}
                                render={({ field }) => (
                                  <Select {...field}>
                                    <Option>Select</Option>
                                    {disciplinaryData?.map((data) => (
                                      <Option value={data._id}>
                                        {data.name}
                                      </Option>
                                    ))}
                                  </Select>
                                )}
                              />
                              <ErrorMessage
                                as={<Errors />}
                                errors={errors}
                                name={`disciplinary`}
                              />
                            </FlexColumnForm>
                          </FlexContaierForm>
                          <FlexContaierForm>
                            <FlexColumnForm>
                              <InputLabel>
                                Date <InputSpan>*</InputSpan>
                              </InputLabel>
                              <Input
                                type="date"
                                {...register("issueDate", {
                                  required: {
                                    value: true,
                                    message: "Required",
                                  },
                                  onChange: (e) => {
                                    const endDate = getValues("expiryDate");

                                    const startDate = new Date(e.target.value);

                                    if (
                                      startDate >= new Date(endDate) &&
                                      endDate
                                    ) {
                                      setError("expiryDate", {
                                        type: "custom",
                                        message:
                                          " Must not be earlier than  date",
                                      });
                                    } else {
                                      setError("expiryDate", {
                                        type: "custom",
                                        message: "",
                                      });
                                    }
                                  },
                                })}
                              />
                              {errors.issueDate && (
                                <Errors>{errors.issueDate?.message}</Errors>
                              )}
                            </FlexColumnForm>
                          </FlexContaierForm>
                          <FlexContaierForm>
                            {/* <FlexColumnForm>
                          <InputLabel>
                            BCR <InputSpan>*</InputSpan>
                          </InputLabel>
                          <Input type="text" {...register("bcr", {})} />
                          {errors.bcr && (
                            <Errors> {errors.bcr?.message}</Errors>
                          )}
                        </FlexColumnForm> */}
                          </FlexContaierForm>
                          <FlexContaierForm>
                            <FlexColumnForm>
                              <InputLabel>Exipiry Date</InputLabel>
                              <Input
                                type="date"
                                {...register("expiryDate", {
                                  // required: {
                                  //   value: true,
                                  //   message: " Required",
                                  // },

                                  validate: (fieldValue) => {
                                    const startDateValue =
                                      getValues("issueDate");

                                    const endDateValue =
                                      getValues("expiryDate");

                                    if (endDateValue && startDateValue) {
                                      const endDate = new Date(endDateValue);
                                      const startDate = new Date(
                                        startDateValue
                                      );
                                      if (startDate > endDate) {
                                        return "End date must not be earlier than start date";
                                        // return setError("expiryDate", {
                                        //   type: "custom",
                                        //   message:
                                        //     "End date must not be earlier than start date",
                                        // });
                                      } else {
                                        return clearErrors("expiryDate");
                                      }
                                    }
                                  },
                                })}
                              />
                              {errors.expiryDate && (
                                <Errors>{errors.expiryDate?.message}</Errors>
                              )}
                            </FlexColumnForm>
                          </FlexContaierForm>
                          <FlexContaierForm>
                            <FlexColumnForm>
                              <InputLabel>
                                Details <InputSpan>*</InputSpan>
                              </InputLabel>
                              <TextArea
                                type="text"
                                {...register("details", {
                                  required: {
                                    value: true,
                                    message: "Required",
                                  },
                                  maxLength: {
                                    value: 500,
                                    message: "Details exceeds  500 characters ",
                                  },
                                  // minLength: {
                                  //   value: 10,
                                  //   message: "Atleast write  10 characters ",
                                  // },
                                  onChange: (value) => {
                                    setDetailsLength(
                                      500 - value.target.value.length
                                    );
                                  },
                                })}
                              />
                              <InputPara>
                                {<Errors>{errors.details?.message}</Errors>}
                                <span style={{ justifySelf: "flex-end" }}>
                                  {" "}
                                  {detailsLength > -1 ? detailsLength : 0}{" "}
                                  characters left
                                </span>
                              </InputPara>
                            </FlexColumnForm>
                          </FlexContaierForm>
                          <input
                            style={{ width: "50%" }}
                            type="file"
                            // accept="image/*,capture=camera"
                            {...register(`file`, {
                              // required: {
                              //   value: update ? false : true,
                              //   message: "Required",
                              // },
                              onChange: (e) => {
                                handleFileChange(e);
                              },
                            })}
                            id="upload"
                            className="custom"
                          />
                          <div
                            style={{
                              display: "flex",
                              gap: "1.6rem",
                              alignItems: "center",
                              marginBottom: "2rem",
                            }}
                          >
                            <EditButton
                              htmlFor="upload"
                              style={{ width: "max-content" }}
                            >
                              {" "}
                              <ButtonIcon src="/images/icons/BlueUpload.svg" />{" "}
                              {isUploading ? (
                                <ThreeDots
                                  height="8"
                                  width="80"
                                  radius="9"
                                  color="#279AF1"
                                  ariaLabel="three-dots-loading"
                                  visible={true}
                                />
                              ) : !file ? (
                                "Upload Document "
                              ) : file?.originalName.length <= 32 ? (
                                file?.originalName
                              ) : (
                                file?.originalName.substring(0, 30) + "..."
                              )}
                            </EditButton>
                            {file && (
                              <LightPara onClick={removeFile}>Remove</LightPara>
                            )}
                          </div>
                          {errors.file && (
                            <Errors> {errors.file?.message} </Errors>
                          )}

                          <ButtonBlue type="submit" disabled={isUploading}>
                            {!update ? " Submit " : "Update"}
                          </ButtonBlue>
                        </ModalFormContainer>
                      </form>
                    </>
                  )}
                </Box>
              </Modal>
              {/*modal ends here  */}

              <BasicDetailsDiv style={{ width: "80%" }}>
                {!result?.disciplinaries?.length ? (
                  <NoDocumentfound message="No disciplinary to show" />
                ) : (
                  <>
                    {result?.disciplinaries?.map((data) => (
                      <TimelineDiv
                        style={{ padding: "1.6rem", marginBottom: "8px" }}
                      >
                        <FlexColumn style={{ width: "100%" }}>
                          <FlexSpaceBetween style={{ marginBottom: "0rem" }}>
                            <TitlePara>Disciplinary Type</TitlePara>
                            {/* <TitlePara>BCR OPtional</TitlePara> */}
                            <TitlePara>
                              issued On:{" "}
                              {data.issueDate
                                ? moment
                                    .utc(data.issueDate)
                                    .format("D MMM, YYYY")
                                : " - "}
                            </TitlePara>
                          </FlexSpaceBetween>
                          <FlexSpaceBetween style={{ marginBottom: "0rem" }}>
                            <ViewPara
                              style={{
                                fontWeight: 700,
                                width: "37%",
                              }}
                            >
                              {data.disciplinary?.name || " - "}
                            </ViewPara>{" "}
                            {/* <ViewPara
                              style={{
                                fontWeight: 700,
                                width: "60%",
                              }}
                            >
                              {data.bcr || "-"}
                            </ViewPara> */}
                          </FlexSpaceBetween>

                          <TimelinePara>{data.details}</TimelinePara>
                          <FlexSpaceBetween>
                            <Link
                              to={
                                API_URL +
                                data.file?.destination +
                                "/" +
                                data.file?.name
                              }
                              target="_blank"
                              download
                              style={{ textDecoration: "none" }}
                            >
                              {data.file && (
                                <File>
                                  {" "}
                                  <IconsEmployee src="/images/icons/File Text.svg" />{" "}
                                  {data.file?.originalName?.length <= 38
                                    ? data.file?.originalName
                                    : data.file?.originalName.substring(0, 38) +
                                        "..." || " - "}
                                </File>
                              )}
                            </Link>
                          </FlexSpaceBetween>

                          <FlexSpaceBetween style={{ alignItems: "center" }}>
                            {data.expiryDate && (
                              <ReviewsDiv>
                                Expiry Date:{" "}
                                {data.expiryDate
                                  ? moment
                                      .utc(data.expiryDate)
                                      .format("D MMM, YYYY")
                                  : " - "}
                              </ReviewsDiv>
                            )}
                            <div></div>
                            <IconContainer>
                              {userType === ROLES.EMPLOYEE || isAccount ? (
                                ""
                              ) : (
                                <Icons
                                  onClick={() => {
                                    HandleUpdateAction(data);
                                    // setId(data._id)
                                  }}
                                  src="/images/icons/Pendown.svg"
                                />
                              )}

                              {userType === ROLES.EMPLOYEE ||
                              userType === ROLES.MANAGER ||
                              isAccount ? (
                                ""
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
                          </FlexSpaceBetween>
                        </FlexColumn>
                      </TimelineDiv>
                    ))}
                  </>
                )}
              </BasicDetailsDiv>
            </BasicInfoDiv>
          </BasicInfoContainer>
        </MainBodyContainer>
      )}
      <DeleteModal
        openDelete={openDelete}
        message="Are you sure you want to delete this discipline?"
        HandleCloseDelete={HandleCloseDelete}
        isLoading={isDeleting}
        HandleDelete={HandleDelete}
      />
    </>
  );
};

export default EVDiscipline;
