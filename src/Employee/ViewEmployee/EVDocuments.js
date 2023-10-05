import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { RotatingLines, ThreeDots } from "react-loader-spinner";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import DeleteModal from "../../Modals/DeleteModal";
import httpClient from "../../api/httpClient";
import { toast } from "react-toastify";
import NoDocumentfound from "../NoDocumentfound";
import ROLES from "../../constants/roles";

import {
  FlexContaier,
  IconsEmployee,
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
  TitlePara,
  ViewPara,
  ButtonBlue,
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
  Icons,
  UploadImageContainer,
  UploadImageName,
  UploadImagePara,
  UploadImageLight,
  IconContainer,
} from "./ViewEmployeeStyle";
import API_URLS from "../../constants/apiUrls";
import CommenHeader from "./CommenHeader";

const EVDocuments = () => {
  let API_URL = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const [userType, setUserType] = useState("");
  const [isAccount, setIsAccount] = useState(false);

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
  const [openDelete, setOpenDelete] = useState(false);
  const HandleOpenDelete = () => setOpenDelete(true);
  const HandleCloseDelete = () => setOpenDelete(false);
  const [open, setOpen] = useState(false);
  const { employeeid } = useParams();
  const Navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const [Id, setId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const GetDocuments = () => {
    setIsLoading(true);
    const trimid = employeeid.trim();
    let url = API_URLS.getEmployeeDocuments.replace(":employeeid", employeeid);
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
        toast.error("Error Adding Benefits. Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const HandleSubmit = (e, data) => {
    e.preventDefault();

    let url = API_URLS.getEmployeeDocuments.replace(":employeeid", employeeid);
    if (!data) {
      setErrors({ fileError: "Required" });
      return;
    } else {
      setIsLoading(true);

      let dataCopy = { file: data._id };
      httpClient({
        method: "post",
        url,
        data: dataCopy,
      })
        .then(({ result, error }) => {
          if (result) {
            handleClose();
            setFile("");
            toast.success(result.message);
            GetDocuments();
          } else {
            //toast.warn("something went wrong ");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Error feteching benefits. Please try again.");
          handleClose();
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  const HandleDelete = () => {
    setIsDeleting(true);
    let url = API_URLS.deleteEmployeeDocument
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
          GetDocuments();
          toast.success(result.message); //Benefit deleted successfully.");
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
  const drop = useRef(null);
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;

    handleFileChange({ target: { files } });
  };

  useEffect(() => {
    GetDocuments();

    const el = document.getElementById("filedrop");
    if (el) {
      drop.current.addEventListener("dragover", handleDragOver);
      drop.current.addEventListener("drop", handleDrop);

      return () => {
        drop.current.removeEventListener("dragover", handleDragOver);
        drop.current.removeEventListener("drop", handleDrop);
      };
    }
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
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    file: "",
  });

  const [errors, setErrors] = useState({
    fileError: "",
  });
  const [isUploading, setIsUploading] = useState(false);
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
  const removeFile = (e) => {
    setFile(null);
    // setValue("file", null);
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

  //drag anad drop react functions
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setErrors({ fileError: "Required" });
      return;
    }
    let type = await getFileType(e.target.files[0]);
    console.log("this file type:", type);
    if (type != "unknown") {
      handleUpload(file, type);
      setFile(file);
      setErrors({ fileError: "" });
    } else {
      toast.error("Unsuported file type.");
    }
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
            <CommenHeader employeeid={employeeid} />

            {/* <EditButton style={{ marginRight: "54px" }}>
          <ButtonIcon src="/images/icons/Pen 2.svg" />
          Edit
        </EditButton> */}
          </FlexSpaceBetween>

          <BasicInfoContainer>
            <BasicInfoDiv>
              <FlexSpaceBetween style={{ marginBottom: "10px", width: "84%" }}>
                <BasicHeading>Documents</BasicHeading>

                {/* <TitlePara>Last Updated On: 15-04-2023</TitlePara> */}
                {isAccount || userType === ROLES.EMPLOYEE ? (
                  " "
                ) : (
                  <ButtonBlue onClick={() => handleOpen()}>
                    New Document
                  </ButtonBlue>
                )}
              </FlexSpaceBetween>
              {result?.documents?.length === 0 ? (
                <NoDocumentfound message="No documents to show" />
              ) : (
                <>
                  {result.documents?.map((data) => (
                    <FlexSpaceBetween
                      style={{
                        marginBottom: "10px",
                        width: "80%",
                        borderRadius: "8px",
                        border: "1.5px solid #EFF4FA",
                        padding: "16px",
                      }}
                    >
                      <FlexContaier>
                        <IconsEmployee
                          src={
                            getFileType(data?.file) === "pdf"
                              ? "/images/icons/FilePdf.svg"
                              : getFileType(data?.file) === "doc"
                              ? "/images/icons/FileText.svg"
                              : "/images/icons/File3.svg"
                          }
                        />
                        <ViewPara>{data.file?.originalName}</ViewPara>
                      </FlexContaier>
                      <IconContainer>
                        <Link
                          to={API_URL + data.file?.path}
                          target="_blank"
                          download
                          style={{ textDecoration: "none" }}
                        >
                          <IconsEmployee src="/images/icons/Download.svg" />
                        </Link>

                        {userType === ROLES.MANAGER ||
                        userType === ROLES.EMPLOYEE ||
                        isAccount ? (
                          " "
                        ) : (
                          <IconsEmployee
                            onClick={() => {
                              setId(data._id);
                              HandleOpenDelete();
                            }}
                            src="/images/icons/Trash-2.svg"
                          />
                        )}
                      </IconContainer>
                    </FlexSpaceBetween>
                  ))}
                </>
              )}

              {/* <FlexSpaceBetween
                style={{
                  marginBottom: "10px",
                  width: "80%",
                  borderRadius: "8px",
                  border: "1.5px solid #EFF4FA",
                  padding: "16px",
                }}
              >
                <FlexContaier>
                  <IconsEmployee src="/images/icons/FileText.svg" />
                  <ViewPara>Welcome_to_team_offer_letter.doc</ViewPara>
                </FlexContaier>
                <IconsEmployee src="/images/icons/Download.svg" />
              </FlexSpaceBetween>
              <FlexSpaceBetween
                style={{
                  marginBottom: "10px",
                  width: "80%",
                  borderRadius: "8px",
                  border: "1.5px solid #EFF4FA",
                  padding: "16px",
                }}
              >
                <FlexContaier>
                  <IconsEmployee src="/images/icons/FilePDF.svg" />
                  <ViewPara>Welcome_to_team_offer_letter.pdf</ViewPara>
                </FlexContaier>
                <IconsEmployee src="/images/icons/Download.svg" />
              </FlexSpaceBetween> */}
            </BasicInfoDiv>
          </BasicInfoContainer>
        </MainBodyContainer>
      )}
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
                <ModalHeading>Upload a file</ModalHeading>
                <ModalIcon
                  onClick={handleClose}
                  src="/images/icons/Alert-Circle.svg"
                />
              </ModalContainer>
              <form
              // onSubmit={handleSubmit()}
              >
                <ModalFormContainer>
                  <FlexContaierForm>
                    <FlexColumnForm>
                      <InputLabel
                        style={{
                          color: "#8F9BB3",
                        }}
                      >
                        File upload description
                      </InputLabel>
                      <input
                        style={{ width: "50%" }}
                        type="file"
                        onChange={handleFileChange}
                        id="upload"
                        className="custom"
                      />

                      <UploadImageContainer
                        id="filedrop"
                        htmlFor="upload"
                        ref={drop}
                      >
                        {isUploading ? (
                          <ThreeDots
                            height="8"
                            width="80"
                            radius="9"
                            color="#279AF1"
                            ariaLabel="three-dots-loading"
                            visible={true}
                          />
                        ) : (
                          <>
                            {file ? (
                              <UploadImagePara>
                                File uploaded successfully
                              </UploadImagePara>
                            ) : (
                              <>
                                <img src="/svg/plus-circle.svg" />
                                <UploadImagePara>
                                  Drop your files here
                                </UploadImagePara>
                                <UploadImageLight>
                                  <span style={{ color: "#279AF1" }}>
                                    Browse file
                                  </span>
                                  from your computer
                                </UploadImageLight>
                              </>
                            )}
                          </>
                        )}
                      </UploadImageContainer>
                      {file && (
                        <UploadImageName>
                          <FlexContaier>
                            <img src="/svg/file.svg" />

                            {isUploading ? (
                              <ThreeDots
                                height="8"
                                width="80"
                                radius="9"
                                color="#279AF1"
                                ariaLabel="three-dots-loading"
                                visible={true}
                              />
                            ) : (
                              file?.originalName
                            )}
                          </FlexContaier>
                          <Icons
                            onClick={removeFile}
                            src="/images/icons/Trash-2.svg"
                          />
                        </UploadImageName>
                      )}
                      <Errors>{errors?.fileError}</Errors>
                    </FlexColumnForm>
                  </FlexContaierForm>

                  <ButtonBlue
                    style={{ marginTop: "25px" }}
                    onClick={(e) => HandleSubmit(e, file)}
                    disabled={isUploading}
                  >
                    Submit
                  </ButtonBlue>
                </ModalFormContainer>
              </form>
            </>
          )}
        </Box>
      </Modal>
      <DeleteModal
        openDelete={openDelete}
        message="Are you sure you want to delete this document?"
        HandleCloseDelete={HandleCloseDelete}
        isLoading={isDeleting}
        HandleDelete={HandleDelete}
      />
    </>
  );
};

export default EVDocuments;
