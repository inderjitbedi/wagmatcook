import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useForm, Controller } from "react-hook-form";
import httpClient from "../../api/httpClient";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import { ErrorMessage } from "@hookform/error-message";
import { useNavigate, useParams } from "react-router-dom";

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
  padding: "0px 0px",
  borderRadius: "8px",
};
const EVDiscipline = () => {
  const { employeeid } = useParams();
  const Navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset({});
    clearErrors();
    setDetailsLength(500);
  };
  const [result, setResult] = useState([]);

  const [detailsLength, setDetailsLength] = useState(500);
  const [formData, setFormData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [disciplinaryData, setDisciplinaryData] = useState([]);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    clearErrors,
    setValue,
  } = useForm({
    mode: "all",
    defaultValues: {
      // file: "6503e8b8e91bbf6de89122c1",
      disciplinary: "",
      issueDate: "",
      expiryDate: "",
      details: "",
      bcr: "",
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
    if (isEmptyObject(errors)) {
      AddNewDisciplinary();
    }
    console.log("form submmited", data);
  };
  const GetDisciplinary = () => {
    setIsLoading(true);
    let url = `/disciplinary/list`;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result }) => {
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
    let url = `/employee/disciplinaries/${trimid}`;
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
  const AddNewDisciplinary = (data) => {
    setIsLoading(true);
    let dataCopy = data;

    let url = `/employee/disciplinary/${employeeid}`;
    httpClient({
      method: "post",
      url,
      data: dataCopy,
    })
      .then(({ result }) => {
        if (result) {
          handleClose();
          GetEmployeesDisciplinary();
        } else {
          toast.warn("something went wrong ");
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
  useEffect(() => {
    setIsLoading(true);
    GetDisciplinary();
    GetEmployeesDisciplinary();
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
                <BasicHeading>Disciplinary Details</BasicHeading>
                <AddNewButton onClick={handleOpen}>Add New Review</AddNewButton>
              </FlexSpaceBetween>
              {/* modal add disciplinary */}
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <ModalContainer style={{ padding: "10px 29px 10px 29px " }}>
                    <ModalHeading>Add Disciplinary </ModalHeading>
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
                            render={({ field }) => (
                              <Select {...field}>
                                <Option>Select</Option>
                                {disciplinaryData?.map((data) => (
                                  <Option value={data._id}>{data.name}</Option>
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
                            })}
                          />
                          {errors.issueDate && (
                            <Errors>{errors.issueDate?.message}</Errors>
                          )}
                        </FlexColumnForm>
                      </FlexContaierForm>
                      <FlexContaierForm>
                        <FlexColumnForm>
                          <InputLabel>
                            BCR<InputSpan>*</InputSpan>
                          </InputLabel>
                          <Input type="text" {...register("bcr", {})} />
                          {errors.bcr && (
                            <Errors> {errors.bcr?.message}</Errors>
                          )}
                        </FlexColumnForm>
                      </FlexContaierForm>
                      <FlexContaierForm>
                        <FlexColumnForm>
                          <InputLabel>
                            Exipiry Date<InputSpan>*</InputSpan>
                          </InputLabel>
                          <Input
                            type="date"
                            {...register("expiryDate", {
                              required: {
                                value: true,
                                message: " Required",
                              },

                              validate: (fieldValue) => {
                                const startDate = new Date(
                                  getValues("issueDate")
                                );
                                const endDate = new Date(fieldValue);
                                return (
                                  startDate <= endDate ||
                                  "Must not be earlier than Date"
                                );
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
                            Details<InputSpan>*</InputSpan>
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
                            {" "}
                            {<Errors>{errors.details?.message}</Errors>}{" "}
                            <span style={{ justifySelf: "flex-end" }}>
                              {" "}
                              Max {detailsLength} characters
                            </span>
                          </InputPara>
                        </FlexColumnForm>
                      </FlexContaierForm>
                      <ButtonBlue type="submit">Submit</ButtonBlue>
                    </ModalFormContainer>
                  </form>
                </Box>
              </Modal>
              {/*modal ends here  */}

              <BasicDetailsDiv style={{ width: "80%" }}>
                <TimelineDiv style={{ padding: "16px", marginBottom: "8px" }}>
                  <FlexColumn style={{ width: "100%" }}>
                    <FlexSpaceBetween style={{ marginBottom: "0px" }}>
                      <TitlePara>Disciplinary Type</TitlePara>
                      <TitlePara>BCR OPtional</TitlePara>
                      <TitlePara>issues On: 15-04-2023</TitlePara>
                    </FlexSpaceBetween>
                    <FlexSpaceBetween style={{ marginBottom: "0px" }}>
                      <ViewPara
                        style={{
                          fontWeight: 700,
                          width: "35%",
                        }}
                      >
                        Verbal Warning
                      </ViewPara>{" "}
                      <ViewPara
                        style={{
                          fontWeight: 700,
                          width: "61%",
                        }}
                      >
                        Somethings
                      </ViewPara>
                    </FlexSpaceBetween>

                    <TimelinePara>
                      From a set of data, Hattie is able to establish a
                      principle, or work out a rule, or suggest a reason for
                      failure or success. Her analysis is always accurate and
                      sometimes original. No absences without valid reason in 6
                      months. Late on fewer than 3 occasions in 6 months. Always
                      assured and confident in demeanour and presentation of
                      ideas without being aggressively over-confident.
                    </TimelinePara>

                    <ReviewsDiv>Expiry Date: 15-07-2023</ReviewsDiv>
                  </FlexColumn>
                </TimelineDiv>
                <TimelineDiv style={{ padding: "16px" }}>
                  <FlexColumn style={{ width: "100%" }}>
                    <FlexSpaceBetween style={{ marginBottom: "0px" }}>
                      <TitlePara>Completed By</TitlePara>
                      <TitlePara>Completed By</TitlePara>
                      <TitlePara>issues On: 15-04-2023</TitlePara>
                    </FlexSpaceBetween>
                    <FlexSpaceBetween style={{ marginBottom: "0px" }}>
                      <ViewPara
                        style={{
                          fontWeight: 700,
                          width: "35%",
                        }}
                      >
                        Verbal Warning
                      </ViewPara>{" "}
                      <ViewPara
                        style={{
                          fontWeight: 700,
                          width: "61%",
                        }}
                      >
                        Somethings
                      </ViewPara>
                    </FlexSpaceBetween>

                    <TimelinePara>
                      From a set of data, Hattie is able to establish a
                      principle, or work out a rule, or suggest a reason for
                      failure or success. Her analysis is always accurate and
                      sometimes original. No absences without valid reason in 6
                      months. Late on fewer than 3 occasions in 6 months. Always
                      assured and confident in demeanour and presentation of
                      ideas without being aggressively over-confident.
                    </TimelinePara>

                    <ReviewsDiv>Next Review on: 15-07-2023</ReviewsDiv>
                  </FlexColumn>
                </TimelineDiv>
              </BasicDetailsDiv>
            </BasicInfoDiv>
          </BasicInfoContainer>
        </MainBodyContainer>
      )}
    </>
  );
};

export default EVDiscipline;
