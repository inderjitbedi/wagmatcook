import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useForm, Controller } from "react-hook-form";
import httpClient from "../../api/httpClient";
import { toast } from "react-toastify";
import { RotatingLines, ThreeDots } from "react-loader-spinner";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import NoDocumentfound from "../NoDocumentfound";
import moment from "moment";
import ROLES from "../../constants/roles";
import DeleteModal from "../../Modals/DeleteModal";
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
  CertificateContainer,
  CertificateTitle,
  LightPara,
  File,
  IconsEmployee,
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
  width: 446,
  bgcolor: "background.paper",
  border: "1px solid #EFF4FA",
  boxShadow: 45,
  padding: "20px 0px",
  borderRadius: "8px",
};

const EVCertificates = () => {
  let API_URL = process.env.REACT_APP_API_URL;

  const { employeeid } = useParams();
  const Navigate = useNavigate();
  const location = useLocation();
  const [userType, setUserType] = useState("");
  const [isAccount, setIsAccount] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [isUploading, setIsUploading] = useState(false);

  const handleClose = () => {
    reset({});
    clearErrors();
    setOpen(false);
    setFile(null);
  };
  const [Id, setId] = useState("");

  const [update, setUpdate] = useState(false);
  const HandleUpdateAction = (data) => {
    setUpdate(true);
    setId(data._id);
    reset({
      title: data.title,
      provider: data.provider,
      file: data.file?._id ? data.file?._id : null,
      completionDate: new Date(data.completionDate).toISOString().split("T")[0],
      expiryDate: data.expiryDate
        ? new Date(data.expiryDate).toISOString().split("T")[0]
        : null,
    });
    handleOpen();
    setFile(data.file);
  };
  const HandleOpenAddNewAction = () => {
    setUpdate(false);
    handleOpen();
    reset({});
    clearErrors();
    setFile(null);
  };
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const HandleOpenDelete = () => setOpenDelete(true);
  const HandleCloseDelete = () => setOpenDelete(false);
  const [formData, setFormData] = useState([]);
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
    //   file: "64e43a953484c7953bd5b621",
    // },
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
      console.log(file);

      if (file) {
        data.file = file._id;
      } else {
        data.file = null;
      }
      AddNewCertificates(data);
    } else if (update) {
      if (file) {
        data.file = file._id;
      } else {
        data.file = null;
      }
      HandleUpdate(data);
    }
    console.log("form submmited :", data);
  };

  const GetEmployeesCertificates = () => {
    setIsLoading(true);
    const trimid = employeeid.trim();
    let url = API_URLS.getEmployeeCertificates.replace(
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

  const AddNewCertificates = (data) => {
    setIsLoading(true);
    let dataCopy = data;

    let url = API_URLS.addSingleEmployeeCertificate.replace(
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
          GetEmployeesCertificates();
          reset();
          toast.success(result.message); //Employee certificate added successfully");
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
    //console.log("update Data:", data);
    setIsLoading(true);
    let dataCopy = data;

    let url = API_URLS.updateEmployeeCertificate
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
          GetEmployeesCertificates();
          setUpdate(false);
          handleClose();
          reset();
          toast.success(result.message); //Entry Updated Successfully");
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
    let url = API_URLS.deleteEmployeeCertificates
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
          GetEmployeesCertificates();

          toast.success(result.message);
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
  const getFileType = (file) => {
    const fileExtension = file.name.split(".").pop().toLowerCase();

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
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    let type = await getFileType(e.target.files[0]);
    console.log("this file type:", type);
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
        data: binary, // Use 'data' to send the FormData
        headers: {
          "Content-Type": "multipart/form-data", // Set the Content-Type header to 'multipart/form-data'
        },
      })
        .then((data) => {
          console.log(data);

          if (data?.result) {
            console.log(data?.result);
            setFile(data?.result?.file);
            //  insert(index, { file: data?.result?.file?._id });
            // setFormData({ ...formData, file: data?.result.file._id });
            setIsUploading(false);
          } else {
            // setErrors({ ...errors, fileError: data?.error?.error });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setIsUploading(false);
        });
    }
  };
  const removeFile = (e) => {
    setFile(null);
    setValue("file", null);
  };
  console.log(result);
  useEffect(() => {
    GetEmployeesCertificates();
    if (location.pathname.indexOf("manager") > -1) {
      setUserType(ROLES.MANAGER);
    } else if (location.pathname.indexOf("hr") > -1) {
      setUserType(ROLES.HR);
    } else if (location.pathname.indexOf("user") > -1) {
      setUserType(ROLES.EMPLOYEE);
    }
    if (location.pathname.indexOf("account") > -1) {
      setIsAccount(true);
    }
  }, []);

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
            <CommenHeader employeeid={employeeid} />

            {/* {userType === ROLES.EMPLOYEE || isAccount ? (
              ""
            ) : userType === ROLES.MANAGER ? (
              <EditButton
                style={{ marginRight: "54px" }}
                onClick={() =>
                  Navigate(
                    `/manager-management/certificates-info/${employeeid}/${true}?`
                  )
                }
              >
                <ButtonIcon src="/images/icons/Pen 2.svg" />
                Edit
              </EditButton>
            ) : userType === ROLES.HR ? (
              <EditButton
                style={{ marginRight: "54px" }}
                onClick={() =>
                  Navigate(
                    `/hr-management/certificates-info/${employeeid}/${true}?`
                  )
                }
              >
                <ButtonIcon src="/images/icons/Pen 2.svg" />
                Edit
              </EditButton>
            ) : (
              <EditButton
                style={{ marginRight: "54px" }}
                onClick={() =>
                  Navigate(
                    `/organization-admin/employee/certificates-info/${employeeid}/${true}?`
                  )
                }
              >
                <ButtonIcon src="/images/icons/Pen 2.svg" />
                Edit
              </EditButton>
            )} */}
          </FlexSpaceBetween>

          <BasicInfoContainer>
            <BasicInfoDiv>
              <FlexSpaceBetween style={{ marginBottom: "10px" }}>
                <BasicHeading>Employee Certifications</BasicHeading>
                {userType === ROLES.EMPLOYEE || isAccount ? (
                  ""
                ) : userType === ROLES.MANAGER ? (
                  <AddNewButton onClick={HandleOpenAddNewAction}>
                    Add New
                  </AddNewButton>
                ) : userType === ROLES.HR ? (
                  <AddNewButton onClick={HandleOpenAddNewAction}>
                    Add New
                  </AddNewButton>
                ) : (
                  <AddNewButton onClick={HandleOpenAddNewAction}>
                    Add New
                  </AddNewButton>
                )}
              </FlexSpaceBetween>
              {/* add new modal  */}
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  {isLoading ? (
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        height: "380px",
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
                          {update ? " Update Certificate" : "New Certificate"}
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
                                Certificate Title
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
                                Provider <InputSpan>*</InputSpan>
                              </InputLabel>
                              <Input
                                type="text"
                                {...register("provider", {
                                  required: {
                                    value: true,
                                    message: "Required",
                                  },
                                })}
                              />
                              {errors.provider && (
                                <Errors> {errors.provider?.message}</Errors>
                              )}
                            </FlexColumnForm>
                          </FlexContaierForm>
                          <FlexContaierForm>
                            <FlexColumnForm>
                              <InputLabel>
                                Completion Date <InputSpan>*</InputSpan>
                              </InputLabel>
                              <Input
                                type="date"
                                {...register("completionDate", {
                                  required: {
                                    value: true,
                                    message: "Required",
                                  },
                                  validate: (fieldValue) => {
                                    const selectedDate = Date.parse(fieldValue);
                                    const currentDate = new Date().setHours(
                                      0,
                                      0,
                                      0,
                                      0
                                    );
                                    if (selectedDate > currentDate) {
                                      return "Completion Date must not be greater than today's date";
                                    }
                                    return true;
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
                                          "Expiry  date must not be earlier than completion date",
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
                              {errors.completionDate && (
                                <Errors>
                                  {errors.completionDate?.message}
                                </Errors>
                              )}
                            </FlexColumnForm>
                          </FlexContaierForm>
                          <FlexContaierForm>
                            <FlexColumnForm>
                              <InputLabel>Exipiry</InputLabel>
                              <Input
                                type="date"
                                {...register("expiryDate", {
                                  // required: {
                                  //   value: true,
                                  //   message: " Required",
                                  // },
                                  onChange: (fieldValue) => {
                                    const startDateValue =
                                      getValues("completionDate");

                                    const endDateValue =
                                      getValues("expiryDate");

                                    if (endDateValue && startDateValue) {
                                      const endDate = new Date(endDateValue);
                                      const startDate = new Date(
                                        startDateValue
                                      );
                                      if (startDate > endDate) {
                                        return setError("expiryDate", {
                                          type: "custom",
                                          message:
                                            "End date must not be earlier than start date",
                                        });
                                      } else {
                                        return clearErrors("expiryDate");
                                      }
                                    }
                                  },
                                })}
                              />
                              {<Errors>{errors.expiryDate?.message}</Errors>}
                            </FlexColumnForm>
                          </FlexContaierForm>
                          <input
                            style={{ width: "50%" }}
                            type="file"
                            {...register(`file`, {
                              // required: {
                              //   value: true,
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
                              gap: "16px",
                              alignItems: "center",
                              marginBottom: "20px",
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
                              ) : file?.originalName?.length <= 32 ? (
                                file?.originalName
                              ) : (
                                file.name?.substring(0, 30) + "..."
                              )}
                            </EditButton>
                            {file && (
                              <LightPara onClick={removeFile}>Remove</LightPara>
                            )}
                          </div>
                          {errors.file && (
                            <Errors> {errors.file?.message} </Errors>
                          )}
                          <ButtonBlue type="submit">
                            {update ? " Update" : "Submit"}
                          </ButtonBlue>
                        </ModalFormContainer>
                      </form>
                    </>
                  )}
                </Box>
              </Modal>
              {/*modal ends here  */}

              <BasicDetailsDiv>
                {!result?.certificates?.length ? (
                  <NoDocumentfound message="No certificates to show" />
                ) : (
                  <>
                    {result?.certificates?.map((data) => (
                      <CertificateContainer>
                        <CertificateTitle style={{ marginBottom: "16px" }}>
                          {data.title || " - "}
                        </CertificateTitle>
                        <FlexSpaceBetween style={{ marginBottom: "10px" }}>
                          <FlexColumn style={{ gap: "0px" }}>
                            <TitlePara>Provider</TitlePara>
                            <ViewPara>{data.provider || " - "}</ViewPara>
                          </FlexColumn>
                          <FlexColumn style={{ gap: "0px" }}>
                            <TitlePara>Completion Date</TitlePara>
                            <ViewPara>
                              {data.completionDate
                                ? moment(data.completionDate).format(
                                    "DD/MM/YYYY"
                                  )
                                : " - "}
                            </ViewPara>
                          </FlexColumn>
                          <FlexColumn style={{ gap: "0px" }}>
                            <TitlePara>Expriry </TitlePara>
                            <ViewPara>
                              {data.expiryDate
                                ? moment(data.expiryDate).format("DD/MM/YYYY")
                                : " - "}{" "}
                            </ViewPara>
                          </FlexColumn>
                        </FlexSpaceBetween>
                        <FlexSpaceBetween>
                          {data.file && (
                            <Link
                              to={API_URL + data.file?.path}
                              target="_blank"
                              download
                              style={{ textDecoration: "none" }}
                            >
                              <File>
                                {" "}
                                <IconsEmployee src="/images/icons/File Text.svg" />{" "}
                                {data.file?.originalName?.length <= 38
                                  ? data.file?.originalName
                                  : data.file?.originalName.substring(0, 38) +
                                      "..." || " - "}
                              </File>
                            </Link>
                          )}
                          <div></div>
                          <IconContainer style={{ alignSelf: "flex-end" }}>
                            {userType === ROLES.EMPLOYEE || isAccount ? (
                              ""
                            ) : (
                              <Icons
                                onClick={() => HandleUpdateAction(data)}
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
                      </CertificateContainer>
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
        message="Are you sure you want to delete this certificate?"
        HandleCloseDelete={HandleCloseDelete}
        isLoading={isDeleting}
        HandleDelete={HandleDelete}
      />
    </>
  );
};

export default EVCertificates;
