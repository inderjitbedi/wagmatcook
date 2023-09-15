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
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

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
  padding: "8px 0px",
  borderRadius: "8px",
};
const EVPerformance = () => {
  const { employeeid } = useParams();
  const Navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    clearErrors();
    reset({});
    setFile(null);
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
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    setValue,
    clearErrors,
  } = useForm({ mode: "all" });

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
    if (isEmptyObject(errors)) {
      console.log(file,":this is file ");
      if (file) {
        data.file = file._id;
      }
      AddNewProformance(data);
    }
   
  };
  // const onSubmitFollow = (data) => {
  //   if (!errors) {
  //     setFormData(data); // chnage the sate when you use it
  //   }
  //   console.log("form submmited", data);
  // };
  const handleFileChange = (e, index) => {
    console.log(index, "file index");
    const file = e.target.files[0];
    handleUpload(file, index);
  };
  const handleUpload = (file, index) => {
    if (file) {
      const binary = new FormData();
      binary.append("file", file);

      httpClient({
        method: "post",
        url: "/organization/file/upload/image",
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
          } else {
            // setErrors({ ...errors, fileError: data?.error?.error });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
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
      .then(({ result }) => {
        if (result) {
          handleClose();
          setFile(null);
          GetEmployeesProformance();
          reset();
        } else {
          toast.warn("something went wrong ");
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
      .then(({ result }) => {
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
    GetEmployeesProformance();
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
                    ? "http://hrapi.chantsit.com/" +
                      result.personalInfo.photo?.path
                    : "/images/User.jpg"
                }
              />
              <FlexColumn>
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

            <EditButton style={{ marginRight: "54px" }}>
              <ButtonIcon src="/images/icons/Pen 2.svg" />
              Edit
            </EditButton>
          </FlexSpaceBetween>

          <BasicInfoContainer>
            <BasicInfoDiv>
              <FlexSpaceBetween style={{ marginBottom: "10px" }}>
                <BasicHeading>Reviews</BasicHeading>
                <AddNewButton onClick={handleOpen}>Add New Review</AddNewButton>
              </FlexSpaceBetween>
              {/* modal t add new review  */}
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <ModalContainer style={{ paddingTop: "8px" }}>
                    <ModalHeading>Add Review </ModalHeading>
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
                          <Input
                            type="date"
                            {...register("byDate", {
                              required: {
                                value: true,
                                message: "Required",
                              },

                              validate: (fieldValue) => {
                                const startDate = new Date(
                                  getValues("reviewDate")
                                );
                                const endDate = new Date(fieldValue);
                                return (
                                  startDate <= endDate ||
                                  "Date must not be earlier than Review Date"
                                );
                              },
                            })}
                          />
                          {errors.byDate && (
                            <Errors>{errors.byDate?.message}</Errors>
                          )}
                        </FlexColumnForm>
                      </FlexContaierForm>
                      <FlexContaierForm>
                        <FlexColumnForm>
                          <InputLabel>
                            Details<InputSpan>*</InputSpan>
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
                            {<Errors>{errors.details?.message}</Errors>}{" "}
                            <span style={{ justifySelf: "flex-end" }}>
                              {" "}
                              Max {detailsLength} characters
                            </span>
                          </InputPara>
                        </FlexColumnForm>
                      </FlexContaierForm>
                      <FlexContaierForm>
                        <FlexColumnForm>
                          <InputLabel>
                            Date of Next Review<InputSpan>*</InputSpan>
                          </InputLabel>
                          <Input
                            type="date"
                            {...register("nextReviewDate", {
                              required: {
                                value: true,
                                message: "Required",
                              },

                              validate: (fieldValue) => {
                                const startDate = new Date(
                                  getValues("reviewDate")
                                );
                                const endDate = new Date(fieldValue);
                                return (
                                  startDate <= endDate ||
                                  "Next Review must not be earlier than  Date"
                                );
                              },
                            })}
                          />
                          {errors.nextReviewDate && (
                            <Errors>{errors.nextReviewDate?.message}</Errors>
                          )}
                        </FlexColumnForm>
                      </FlexContaierForm>
                      <input
                        style={{ width: "50%" }}
                        type="file"
                        accept="image/*,capture=camera"
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
                          {!file
                            ? "Upload Documents "
                            : file?.name.length <= 32
                            ? file?.name
                            : file.name.substring(0, 30) + "..."}
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
                {/* dot and circle  */}
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
                        <FlexColumn style={{ width: "100%",gap:"0px" }}>
                          <FlexSpaceBetween style={{ marginBottom: "0px" }}>
                            <TitlePara>Completed By</TitlePara>
                            <TitlePara>Date of Review: { moment(data.reviewDate).format("DD/MM/YYYY")}</TitlePara>
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
                          <TimelinePara style={{ width: "90%", overflowX: "hidden", marginBottom: "16px"}}>
                       {data.details}
                          </TimelinePara>
                          <FlexSpaceBetween>
                            <File>
                              {" "}
                              <IconsEmployee src="/images/icons/File Text.svg" />{" "}
                             {data.file.name?.length <=38 ? data.file.name : data.file.name.substring(0,38) +"..." }
                            </File>
                            {/* <AddNewButton onClick={handleOpenFollow}>
                              Add Follow-up
                            </AddNewButton> */}
                          </FlexSpaceBetween>
                          <ReviewsDiv>Next Review on: { moment(data.nextReviewDate).format("DD/MM/YYYY")}</ReviewsDiv>
                        </FlexColumn>
                      </TimelineDiv>
                    </VerticalTimelineElement>
                  ))}
                </VerticalTimeline>
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
                                Follow-up Date <InputSpan>*</InputSpan>
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
                                Details<InputSpan>*</InputSpan>
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
                                  Max {followLength} characters
                                </span>
                              </InputPara>
                            </FlexColumnForm>
                          </FlexContaierForm>

                          <ButtonBlue type="submit">Submit</ButtonBlue>
                        </ModalFormContainer>
                      </form> */}
        </Box>
      </Modal>
    </>
  );
};

export default EVPerformance;
