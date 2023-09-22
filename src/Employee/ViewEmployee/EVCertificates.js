import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useForm, Controller } from "react-hook-form";
import httpClient from "../../api/httpClient";
import { toast } from "react-toastify";
import { RotatingLines, ThreeDots } from "react-loader-spinner";
import { useNavigate, useParams, Link } from "react-router-dom";
import NoDocumentfound from "../NoDocumentfound";
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
} from "./ViewEmployeeStyle";

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

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [isUploading, setIsUploading] = useState(false);

  const handleClose = () => {
    reset({});
    clearErrors();
    setOpen(false);
    setFile(null);
  };
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);

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
    if (isEmptyObject(errors)) {
      console.log(file);
      if (file) {
        data.file = file._id;
      }

      AddNewCertificates(data);
    }
    console.log("form submmited :", data);
  };
  const GetEmployeesCertificates = () => {
    setIsLoading(true);
    const trimid = employeeid.trim();
    let url = `/employee/Certificates/${trimid}`;
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

    let url = `/employee/certificate/${employeeid}`;
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
          toast.warn("something went wrong ");
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
        url: `/employee/file/upload/${type}`,
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
          </FlexSpaceBetween>

          <BasicInfoContainer>
            <BasicInfoDiv>
              <FlexSpaceBetween style={{ marginBottom: "10px" }}>
                <BasicHeading>Employee Certifications</BasicHeading>
                <AddNewButton onClick={handleOpen}>Add New</AddNewButton>
              </FlexSpaceBetween>
              {/* add new modal  */}
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <ModalContainer>
                    <ModalHeading>New Certificate</ModalHeading>
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
                            Certificate Title <InputSpan>*</InputSpan>
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
                                if (startDate >= new Date(endDate) && endDate) {
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
                            <Errors>{errors.completionDate?.message}</Errors>
                          )}
                        </FlexColumnForm>
                      </FlexContaierForm>
                      <FlexContaierForm>
                        <FlexColumnForm>
                          <InputLabel>
                            Exipiry <InputSpan>*</InputSpan>
                          </InputLabel>
                          <Input
                            type="date"
                            {...register("expiryDate", {
                              // required: {
                              //   value: true,
                              //   message: " Required",
                              // },
                              validate: (fieldValue) => {
                                const startDate = new Date(
                                  getValues("completionDate")
                                );
                                const endDate = fieldValue;
                                if (startDate <= new Date(endDate) && endDate) {
                                  setError("expiryDate", {
                                    type: "custom",
                                    message:
                                      "Expiry date must not be earlier than completion date   ",
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
                          {errors.expiryDate && (
                            <Errors>{errors.expiryDate?.message}</Errors>
                          )}
                        </FlexColumnForm>
                      </FlexContaierForm>
                      <input
                        style={{ width: "50%" }}
                        type="file"
                        {...register(`file`, {
                          required: {
                            value: true,
                            message: "Required",
                          },
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
                      {errors.file && <Errors> {errors.file?.message} </Errors>}
                      <ButtonBlue type="submit">Submit</ButtonBlue>
                    </ModalFormContainer>
                  </form>
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
                              {moment(data.completionDate).format(
                                "DD/MM/YYYY"
                              ) || " - "}
                            </ViewPara>
                          </FlexColumn>
                          <FlexColumn style={{ gap: "0px" }}>
                            <TitlePara>Expriry </TitlePara>
                            <ViewPara>
                              {moment(data.expiryDate).format("DD/MM/YYYY") ||
                                " - "}{" "}
                            </ViewPara>
                          </FlexColumn>
                        </FlexSpaceBetween>
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
                      </CertificateContainer>
                    ))}
                  </>
                )}
              </BasicDetailsDiv>
            </BasicInfoDiv>
          </BasicInfoContainer>
        </MainBodyContainer>
      )}
    </>
  );
};

export default EVCertificates;
