import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";
import "./Employee.css";
import { useForm } from "react-hook-form";
import httpClient from "../../api/httpClient";
import { toast } from "react-toastify";
import { RotatingLines, ThreeDots } from "react-loader-spinner";
import { useNavigate, useParams, Link } from "react-router-dom";
import moment from "moment";
import NoDocumentfound from "../NoDocumentfound";
import { WithContext as ReactTags } from "react-tag-input";
import DeleteModal from "../../Modals/DeleteModal";

import {
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
  BasicDetailsDiv,
  TitlePara,
  ViewPara,
  TimelineDiv,
  TimelinePara,
  File,
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
  LightPara,
  IconContainer,
  Icons,
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
  height: "597px",
  overflowY: "scroll",
};
const EVPerformance = () => {
  let API_URL = process.env.REACT_APP_API_URL;

  const { employeeid } = useParams();
  const Navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    clearErrors();
    reset({});
    setFile(null);
    setDetailsLength(500);
    setTags([]);
  };
  const [openFollow, setOpenFollow] = useState(false);
  const handleOpenFollow = () => setOpenFollow(true);
  const handleCloseFollow = () => setOpenFollow(false);
  const [formData, setFormData] = useState([]);
  const [detailsLength, setDetailsLength] = useState(500);
  const [followLength, setFollowLength] = useState(500);
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [suggestionsData, setSuggestionsData] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    setValue,
    clearErrors,
    setError,
  } = useForm({ mode: "all" });

  const [byError, setByError] = useState([]);
  const onSubmit = (data) => {
    console.log("form submmited", data);
    function isEmptyObject(obj) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          return false;
        }
      }
      return true;
    }

    if (isEmptyObject(errors) && !update) {
      console.log(file, ":this is file ");
      if (file) {
        data.file = file._id;
      }
      if (tags) {
        const ids = tags.map((data) => data.id);
        data.completedBy = ids;
      } else {
        setByError("Required");
      }
      AddNewProformance(data);
    } else if (update) {
      HandleUpdate(data);
    }
  };
  // const onSubmitFollow = (data) => {
  //   if (!errors) {
  //     setFormData(data); // chnage the sate when you use it
  //   }
  //   console.log("form submmited", data);
  // };
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
  const AddNewProformance = (data) => {
    setIsLoading(true);
    let dataCopy = data;

    let url = `/employee/review/${employeeid}`;
    httpClient({
      method: "post",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          handleClose();
          setFile(null);
          GetEmployeesProformance();
          reset();
          setByError(null);

          toast.success(result.message); //Employee proformance added successfully");
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        toast.error("Error Adding review . Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const GetEmployeesProformance = () => {
    setIsLoading(true);
    const trimid = employeeid.trim();
    let url = `/employee/reviews/${trimid}`;
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
  useEffect(() => {
    GetHeadersData();

    GetEmployeesProformance();
    GetSuggestionsList();
  }, []);

  const [tags, setTags] = useState([]);

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    const isTagInSuggestions = suggestions.some(
      (suggestion) => suggestion.text === tag.text
    );

    console.log("tag :", tag, "issuggestioin:", isTagInSuggestions);

    if (isTagInSuggestions) {
      setTags([...tags, tag]);
    }
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const [openDelete, setOpenDelete] = useState(false);
  const HandleOpenDelete = () => setOpenDelete(true);
  const HandleCloseDelete = () => setOpenDelete(false);
  const [Id, setId] = useState("");
  const [update, setUpdate] = useState(false);
  const HandleUpdateAction = (data) => {
    setUpdate(true);
    setId(data._id);
    setDetailsLength(500 - data.details?.length);
    reset({
      details: data.details,
      // completedBy: data.completedBy,
      file: data.file._id,
      reviewDate: new Date(data.reviewDate).toISOString().split("T")[0],
      nextReviewDate: data.expiryDate
        ? new Date(data.nextReviewDate).toISOString().split("T")[0]
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
    setDetailsLength(500);
    setFile(null);
  };
  const HandleUpdate = (data) => {
    console.log("update Data:", data);
    setIsLoading(true);
    let dataCopy = data;

    let url = `/employee/review/${employeeid}/${Id}`;

    httpClient({
      method: "put",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          setId("");
          GetEmployeesProformance();
          setUpdate(false);
          handleClose();
          reset();
          setByError(null);
          toast.success(result.message); //Entry Updated Successfully");
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
    let url = `/employee/review/${employeeid}/delete/${Id}`;
    httpClient({
      method: "put",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          HandleCloseDelete();
          setId("");
          GetEmployeesProformance();

          toast.success(result.message);
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
  const [suggestions, setSuggestions] = useState([]);
  const GetSuggestionsList = () => {
    setIsLoading(true);
    let url = `/employee/completed-by-list`;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setSuggestionsData(result);
          console.log("suggestions are:", result);

          const suggestions = result?.users?.map((data) => ({
            id: data?.userData._id,
            text: data?.personalInfo?.length
              ? data?.personalInfo[0].firstName +
                " " +
                data?.personalInfo[0].lastName
              : data?.userData.name,
          }));

          setSuggestions(suggestions);
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error in Fetching . Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  console.log(suggestions, "this is map  data for suggestions");

  const [headerData, setHeaderData] = useState([]);

  const GetHeadersData = () => {
    // setIsLoading(true);
    const trimid = employeeid.trim();
    let url = `/employee/header-info/${trimid}`;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setHeaderData(result);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error in fetching Personal info. Please try again.");
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
            <PersonalInfo>
              <PersonalImg
                src={
                  headerData.personalInfo?.photo
                    ? API_URL + headerData.personalInfo.photo?.path
                    : "/images/User.jpg"
                }
              />
              <FlexColumn>
                <PersonalName>
                  {[
                    headerData.personalInfo?.firstName,
                    headerData.personalInfo?.lastName,
                  ].join(" ")}
                </PersonalName>
                <PersonalTitle>
                  {headerData?.position?.title || "-"}
                </PersonalTitle>
                <PersonalDepartment>
                  {headerData.position?.department?.name || "-"}
                </PersonalDepartment>
              </FlexColumn>
            </PersonalInfo>

            {/* <EditButton style={{ marginRight: "54px" }}>
              <ButtonIcon src="/images/icons/Pen 2.svg" />
              Edit
            </EditButton> */}
          </FlexSpaceBetween>

          <BasicInfoContainer>
            <BasicInfoDiv>
              <FlexSpaceBetween style={{ marginBottom: "10px" }}>
                <BasicHeading>Reviews</BasicHeading>
                <AddNewButton onClick={HandleOpenAddNewAction}>
                  Add New Review
                </AddNewButton>
              </FlexSpaceBetween>
              {/* modal t add new review  */}
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
                        height: "520px",
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
                      <ModalContainer style={{ paddingTop: "8px" }}>
                        <ModalHeading>
                          {" "}
                          {!update ? "Add Review" : "Update Review"}{" "}
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
                                Date of Review <InputSpan>*</InputSpan>
                              </InputLabel>
                              <Input
                                type="date"
                                {...register("reviewDate", {
                                  required: {
                                    value: true,
                                    message: "Required",
                                  },
                                  onChange: (e) => {
                                    const endDate = getValues("nextReviewDate");
                                    const startDate = new Date(e.target.value);
                                    if (
                                      startDate >= new Date(endDate) &&
                                      endDate
                                    ) {
                                      setError("nextReviewDate", {
                                        type: "custom",
                                        message:
                                          "Next Review must not be earlier than  Date",
                                      });
                                    } else {
                                      setError("nextReviewDate", {
                                        type: "custom",
                                        message: "",
                                      });
                                    }
                                  },
                                })}
                              />
                              {errors.reviewDate && (
                                <Errors>{errors.reviewDate?.message}</Errors>
                              )}
                            </FlexColumnForm>
                          </FlexContaierForm>
                          <FlexContaierForm>
                            <FlexColumnForm>
                              <InputLabel>
                                Completed By <InputSpan>*</InputSpan>
                              </InputLabel>
                              <ReactTags
                                name="completedBy"
                                tags={tags}
                                suggestions={suggestions}
                                delimiters={delimiters}
                                handleDelete={handleDelete}
                                handleAddition={handleAddition}
                                handleDrag={handleDrag}
                                handleTagClick={handleTagClick}
                                inputFieldPosition="bottom"
                                autocomplete
                                placeholder="Add More"
                                // editable
                              />
                              <Errors>{byError}</Errors>
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
                                    message: " Required",
                                  },
                                  maxLength: {
                                    value: 500,
                                    message: "Details exceeds  500 characters ",
                                  },

                                  onChange: (value) => {
                                    setDetailsLength(
                                      500 - value.target.value.length
                                    );
                                  },
                                })}
                              />
                              <InputPara>
                                {" "}
                                {
                                  <Errors>{errors.details?.message}</Errors>
                                }{" "}
                                <span style={{ justifySelf: "flex-end" }}>
                                  {" "}
                                  {detailsLength > -1 ? detailsLength : 0}{" "}
                                  Characters left
                                </span>
                              </InputPara>
                            </FlexColumnForm>
                          </FlexContaierForm>
                          <FlexContaierForm>
                            <FlexColumnForm>
                              <InputLabel>Date of Next Review</InputLabel>
                              <Input
                                type="date"
                                {...register("nextReviewDate", {
                                  // required: {
                                  //   value: true,
                                  //   message: "Required",
                                  // },

                                  validate: (fieldValue) => {
                                    const startDate = new Date(
                                      getValues("reviewDate")
                                    );
                                    const endDate = fieldValue;
                                    if (
                                      startDate <= new Date(endDate) &&
                                      endDate
                                    ) {
                                      setError("nextReviewDate", {
                                        type: "custom",
                                        message:
                                          "End date must not be earlier than start date   ",
                                      });
                                    } else {
                                      setError("nextReviewDate", {
                                        type: "custom",
                                        message: "",
                                      });
                                    }
                                  },
                                })}
                              />
                              {errors.nextReviewDate && (
                                <Errors>
                                  {errors.nextReviewDate?.message}
                                </Errors>
                              )}
                            </FlexColumnForm>
                          </FlexContaierForm>
                          <input
                            style={{ width: "50%" }}
                            type="file"
                            {...register(`file`, {
                              required: {
                                value: update ? false : true,
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
                            {" "}
                            {!update ? "Submit" : "Update"}
                          </ButtonBlue>
                        </ModalFormContainer>
                      </form>
                    </>
                  )}
                </Box>
              </Modal>
              {/*modal ends here  */}

              <BasicDetailsDiv>
                {/* dot and circle  */}
                {!result?.reviews?.length ? (
                  <NoDocumentfound message="No reviews to show" />
                ) : (
                  <VerticalTimeline
                    layout={"1-column-left"}
                    lineColor={"#EFF4FA"}
                    style={{
                      padding: "0px",
                      margin: "0px",
                      maxWidth: "100%",
                    }}
                  >
                    {result?.reviews?.map((data) => (
                      <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{
                          outine: "none",
                          boxShadow: "none",
                          border: "none",
                        }}
                        iconStyle={{
                          width: "18px",
                          height: "18px",
                          background: "#fff",
                          border: "1.5px solid #8F9BB3",
                          borderRadius: "50%",
                          boxShadow: "none",
                          outine: "none",
                          marginLeft: "10px",
                        }}
                        intersectionObserverProps={{
                          margin: "0px 0px 0px 0px",
                        }}
                        style={{ margin: "0px" }}
                      >
                        <TimelineDiv style={{ padding: "16px" }}>
                          <FlexColumn style={{ width: "100%", gap: "0px" }}>
                            <FlexSpaceBetween style={{ marginBottom: "0px" }}>
                              <TitlePara>Completed By</TitlePara>
                              <TitlePara>
                                Date of Review:{" "}
                                {moment(data.reviewDate).format("DD/MM/YYYY") ||
                                  " - "}
                              </TitlePara>
                            </FlexSpaceBetween>
                            <ViewPara
                              style={{
                                color: "#222B45",
                                fontFamily: "Inter",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: 700,
                                lineHeight: "1px",
                              }}
                            >
                              Tom Holland
                            </ViewPara>
                            <TimelinePara
                              style={{
                                width: "90%",
                                overflowX: "hidden",
                                marginBottom: "16px",
                              }}
                            >
                              {data.details || " - "}
                            </TimelinePara>
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
                                <File>
                                  {" "}
                                  <IconsEmployee src="/images/icons/File Text.svg" />{" "}
                                  {data.file.originalName?.length <= 38
                                    ? data.file?.originalName
                                    : data.file?.originalName.substring(0, 38) +
                                        "..." || " - "}
                                </File>
                              </Link>
                              {/* <AddNewButton onClick={handleOpenFollow}>
                              Add Follow-up
                            </AddNewButton> */}
                            </FlexSpaceBetween>
                            <FlexSpaceBetween>
                              <ReviewsDiv>
                                Next Review on:{" "}
                                {data.nextReviewDate
                                  ? moment(data.nextReviewDate).format(
                                      "DD/MM/YYYY"
                                    )
                                  : " - "}
                              </ReviewsDiv>
                              <IconContainer>
                                <Icons
                                  onClick={() => HandleUpdateAction(data)}
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
                            </FlexSpaceBetween>
                          </FlexColumn>
                        </TimelineDiv>
                      </VerticalTimelineElement>
                    ))}
                  </VerticalTimeline>
                )}
              </BasicDetailsDiv>
            </BasicInfoDiv>
          </BasicInfoContainer>
        </MainBodyContainer>
      )}
      {/* add follow uo modal is here */}
      <Modal
        open={openFollow}
        onClose={handleCloseFollow}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ModalContainer>
            <ModalHeading>Add Follow-up </ModalHeading>
            <ModalIcon
              onClick={handleCloseFollow}
              src="/images/icons/Alert-Circle.svg"
            />
          </ModalContainer>
          {/* <form
                          // onSubmit={handleSubmit(onSubmitFollow)
                          // }
                          >
                        <ModalFormContainer>
                          <FlexContaierForm>
                            <FlexColumnForm>
                              <InputLabel>
                                Follow-up Date  <InputSpan>*</InputSpan>
                              </InputLabel>
                              <Input
                                type="date"
                                {...register("followdate", {
                                  required: {
                                    value: true,
                                    message: "  Date is Required",
                                  },
                                })}
                              />
                              {errors.followdate && (
                                <Errors>{errors.followdate?.message}</Errors>
                              )}{" "}
                            </FlexColumnForm>
                          </FlexContaierForm>

                          <FlexContaierForm>
                            <FlexColumnForm>
                              <InputLabel>
                                Details <InputSpan>*</InputSpan>
                              </InputLabel>
                              <TextArea
                                type="text"
                                {...register("detailsfollow", {
                                  required: {
                                    value: true,
                                    message: " Details is Required",
                                  },
                                  maxLength: {
                                    value: 500,
                                    message:
                                      "Details exceeds the maximum length of 500 characters ",
                                  },
                                  minLength: {
                                    value: 10,
                                    message: "Atleast write  10 characters ",
                                  },
                                  onChange: (value) => {
                                    setFollowLength(
                                      500 - value.target.value.length
                                    );
                                  },
                                })}
                              />

                              <InputPara>
                                {" "}
                                {
                                  <Errors>
                                    {errors.detailsfollow?.message}
                                  </Errors>
                                }{" "}
                                <span style={{ justifySelf: "flex-end" }}>
                                  {" "}
                                   {followLength} characters left
                                </span>
                              </InputPara>
                            </FlexColumnForm>
                          </FlexContaierForm>

                          <ButtonBlue type="submit">Submit</ButtonBlue>
                        </ModalFormContainer>
                      </form> */}
        </Box>
      </Modal>
      <DeleteModal
        openDelete={openDelete}
        message="Are you sure you want to delete this Review"
        HandleCloseDelete={HandleCloseDelete}
        isLoading={isDeleting}
        HandleDelete={HandleDelete}
      />
    </>
  );
};

export default EVPerformance;
