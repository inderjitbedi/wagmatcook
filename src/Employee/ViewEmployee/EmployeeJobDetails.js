import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import httpClient from "../../api/httpClient";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useNavigate, useParams } from "react-router-dom";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";
import "./Employee.css";
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
  border: "none",
  boxShadow: 45,
  padding: "20px 0px",
  borderRadius: "8px",
};

const EmployeeJobDetails = () => {
  let API_URL = process.env.REACT_APP_API_URL;

  const Navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formData, setFormData] = useState([]);
  const { employeeid } = useParams();
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [departmentData, setDepartmentData] = useState([]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    clearErrors,
    reset,
    setError
  } = useForm({ mode: "all" });

  const onSubmit = (data) => {
    console.log(data);
    function isEmptyObject(obj) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          return false;
        }
      }
      return true;
    }
    if (isEmptyObject(errors)) {
      console.log(data);
      AddNewPosition(data);
    }
    console.log("form submmited", data);
  };
  const GetEmployeesJobDetails = () => {
    setIsLoading(true);
    const trimid = employeeid.trim();
    let url = `/employee/job-details/${trimid}`;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setResult(result);
          console.log(result, "we are getting the persnal information ");
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
  const GetDepartments = () => {
    setIsLoading(true);

    let url = `/department/list`;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setDepartmentData(result.departments);
          GetEmployeesJobDetails();
          // console.log(result.departments, "result.departments ");
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error getting department. Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const AddNewPosition = (data) => {
    setIsLoading(true);
    let dataCopy = data;

    let url = `/employee/job-details/position/${employeeid}`;
    httpClient({
      method: "post",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          handleClose();
          GetEmployeesJobDetails();
          reset();
          toast.success(result.message);
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
  useEffect(() => {
    GetEmployeesJobDetails();
    GetDepartments();
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
              <FlexColumn>
                <PersonalName>
                  {[
                    result.personalInfo?.firstName,
                    result.personalInfo?.lastName,
                  ].join(" ")}
                </PersonalName>
                <PersonalTitle>{result.details?.title || "-"}</PersonalTitle>
                <PersonalDepartment>
                  {result.details?.department?.name || "-"}
                </PersonalDepartment>
              </FlexColumn>
            </PersonalInfo>

            <EditButton
              style={{ marginRight: "54px" }}
              onClick={() =>
                Navigate(
                  `/organization-admin/employee/job-details/${employeeid}/${true}?`
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
                <BasicHeading>Employment Details</BasicHeading>
              </FlexSpaceBetween>
              <BasicDetailsDiv>
                <FlexSpaceBetween>
                  <FlexColumn>
                    <TitlePara>Department</TitlePara>
                    <ViewPara>
                      {result.details?.department?.name || " - "}
                    </ViewPara>
                  </FlexColumn>
                  <FlexColumn>
                    <TitlePara>Position </TitlePara>
                    <ViewPara>{result.details?.title || " - "}</ViewPara>
                  </FlexColumn>
                </FlexSpaceBetween>
                <FlexSpaceBetween>
                  <FlexColumn>
                    <TitlePara>Position Start Date</TitlePara>
                    <ViewPara>
                      {moment(result.details?.startDate).format("DD/MM/YYYY") ||
                        "-"}
                    </ViewPara>
                  </FlexColumn>
                  <FlexColumn>
                    <TitlePara>Position End Date</TitlePara>
                    <ViewPara>
                      {result.details?.endDate
                        ? moment(result.details?.endDate).format("DD/MM/YYYY")
                        : "Present"}
                    </ViewPara>
                  </FlexColumn>
                </FlexSpaceBetween>
                <FlexSpaceBetween>
                  <FlexColumn>
                    <TitlePara>Salary Scale From</TitlePara>
                    <ViewPara>
                      {" "}
                      $ {result.details?.salaryScaleFrom || " - "}
                    </ViewPara>
                  </FlexColumn>
                  <FlexColumn>
                    <TitlePara>Salary Scale To</TitlePara>
                    <ViewPara>
                      {" "}
                      $ {result.details?.salaryScaleTo || " - "}
                    </ViewPara>
                  </FlexColumn>
                </FlexSpaceBetween>
                <FlexSpaceBetween>
                  <FlexColumn>
                    <TitlePara>Actual Salary amounts</TitlePara>
                    <ViewPara> $ {result.details?.salary || " - "}</ViewPara>
                  </FlexColumn>
                  <FlexColumn>
                    <TitlePara>Salary rate per</TitlePara>
                    <ViewPara>
                      {result.details?.ratePer === 1
                        ? "Hour"
                        : result.details?.ratePer === 2
                        ? "Day"
                        : result.details?.ratePer === 3
                        ? "Week"
                        : result.details?.ratePer === 4
                        ? "Biweekly "
                        : result.details?.ratePer === 5
                        ? "Annual "
                        : " - "}
                    </ViewPara>
                  </FlexColumn>
                </FlexSpaceBetween>
                <FlexSpaceBetween>
                  <FlexColumn>
                    <TitlePara>Hours per week</TitlePara>
                    <ViewPara>{result.details?.hoursPerWeek || " - "}</ViewPara>
                  </FlexColumn>
                  <FlexColumn>
                    <TitlePara>Reports to</TitlePara>
                    <ViewPara> {result.details?.reportTo || " - "} </ViewPara>
                  </FlexColumn>
                </FlexSpaceBetween>
                <FlexSpaceBetween>
                  <FlexColumn>
                    <TitlePara>Is BEB Eligible?</TitlePara>
                    <ViewPara>
                      {result.details?.isBebEligible ? "Yes" : "No"}
                    </ViewPara>
                  </FlexColumn>
                  <FlexColumn>
                    <TitlePara>Status</TitlePara>
                    {result.details?.isActive ? (
                      <ViewPara style={{ color: "#34A853" }}>Active</ViewPara>
                    ) : (
                      <ViewPara style={{ color: "red" }}>Inactive</ViewPara>
                    )}
                  </FlexColumn>
                </FlexSpaceBetween>
                {/* <FlexSpaceBetween>
                  <FlexColumn>
                    <TitlePara>Duration of Employment</TitlePara>
                    <ViewPara>2 Years 3 months</ViewPara>
                  </FlexColumn>
                </FlexSpaceBetween> */}
                <FlexSpaceBetween>
                  <FlexColumn>
                    <TitlePara>Employee Type</TitlePara>
                    <ViewPara>
                      {" "}
                      {result.details?.employeeType?.name || " - "}{" "}
                    </ViewPara>
                  </FlexColumn>
                </FlexSpaceBetween>
                <FlexSpaceBetween>
                  <BasicHeading
                    style={{ marginTop: "53px", marginBottom: "24px" }}
                  >
                    Position History
                  </BasicHeading>
                  <AddNewButton onClick={handleOpen}> Add New</AddNewButton>
                </FlexSpaceBetween>
                {/* add new modal  */}

                <Modal
                  open={open}
                  onClose={() => {
                    handleClose();
                    reset();
                    clearErrors();
                  }}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <ModalContainer>
                        <ModalHeading>Add Position</ModalHeading>
                        <ModalIcon
                          onClick={() => {
                            handleClose();
                            reset();
                            clearErrors();
                          }}
                          src="/images/icons/Alert-Circle.svg"
                        />
                      </ModalContainer>
                      <ModalFormContainer>
                        <FlexContaierForm>
                          <FlexColumnForm>
                            <InputLabel>
                              Department <InputSpan>*</InputSpan>
                            </InputLabel>
                            <Controller
                              name="department"
                              control={control}
                              rules={{ required: true }}
                              render={({ field }) => (
                                <Select {...field}>
                                  <Option>Select</Option>
                                  {departmentData?.map((data) => (
                                    <Option value={data._id}>
                                      {data.name}
                                    </Option>
                                  ))}
                                </Select>
                              )}
                            />
                            {errors.department && <Errors> Required </Errors>}
                          </FlexColumnForm>
                        </FlexContaierForm>
                        <FlexContaierForm>
                          <FlexColumnForm>
                            <InputLabel>
                              Position Title <InputSpan>*</InputSpan>
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
                              Start Date <InputSpan>*</InputSpan>
                            </InputLabel>
                            <Input
                              type="date"
                              {...register("startDate", {
                                required: {
                                  value: true,
                                  message: "Required",
                                },
                                onChange: (e) => {
                                  const endDate = new Date(
                                    getValues("endDate")
                                  );
                                  const startDate = new Date(e.target.value);
                                  if (startDate >= endDate && endDate) {
                                    setError("endDate", {
                                      type: "custom",
                                      message:
                                        "End date must not be earlier than start date",
                                    });
                                  } else {
                                    setError("endDate", {
                                      type: "custom",
                                      message: "",
                                    });
                                  }
                                },
                              })}
                            />
                            {errors.startDate && (
                              <Errors>{errors.startDate?.message}</Errors>
                            )}
                          </FlexColumnForm>
                        </FlexContaierForm>
                        <FlexContaierForm>
                          <FlexColumnForm>
                            <InputLabel>
                              End Date <InputSpan>*</InputSpan>
                            </InputLabel>
                            <Input
                              type="date"
                              {...register("endDate", {
                                // required: {
                                //   value: true,
                                //   message: "Required",
                                // },
                                validate: (fieldValue) => {
                                  const startDate = new Date(
                                    getValues("startDate")
                                  );
                                  const endDate = new Date(fieldValue);
                                    if (startDate <= endDate && endDate) {
                                      setError("endDate", {
                                        type: "custom",
                                        message:
                                          "End date must not be earlier than start date   ",
                                      });
                                    } else {
                                      setError("endDate", {
                                        type: "custom",
                                        message: "",
                                      });
                                    }
                                },
                              })}
                            />
                            {errors.endDate && (
                              <Errors>{errors.endDate?.message}</Errors>
                            )}
                          </FlexColumnForm>
                        </FlexContaierForm>

                        <ButtonBlue
                          type="submit"
                          style={{ marginTop: "25px" }}
                          // disabled={!isDirty}
                          // onClick={() => {
                          //   handleSubmit(onSubmit);
                          // }}
                        >
                          Submit
                        </ButtonBlue>
                      </ModalFormContainer>
                    </form>
                  </Box>
                </Modal>

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
                  {result?.positions?.map((data) => (
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
                      <TimelineDiv>
                        <FlexColumn style={{ gap: "4px" }}>
                          <ViewPara> {data.title || " - "} </ViewPara>

                          <TitlePara>
                            {" "}
                            {data.department?.name || " - "}
                          </TitlePara>
                        </FlexColumn>
                        <TitlePara>
                          From:{" "}
                          {moment(data.startDate).format("DD/MM/YYYY") || " - "}
                          <span style={{ marginLeft: "14px" }}>
                            {" "}
                            To:
                            {data.endDate
                              ? moment(data.endDate).format("DD/MM/YYYY")
                              : " - "}
                          </span>{" "}
                        </TitlePara>
                      </TimelineDiv>
                    </VerticalTimelineElement>
                  ))}
                </VerticalTimeline>
              </BasicDetailsDiv>
            </BasicInfoDiv>
          </BasicInfoContainer>
        </MainBodyContainer>
      )}
    </>
  );
};

export default EmployeeJobDetails;
