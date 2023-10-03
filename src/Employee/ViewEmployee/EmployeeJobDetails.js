import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import httpClient from "../../api/httpClient";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import NoDocumentfound from "../NoDocumentfound";
import ROLES from "../../constants/roles";
import JobDetails from "../AddEmployee/JobDetails";
import { useNavigate, useParams, useLocation } from "react-router-dom";
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
  CertificateContainer,
  AlignFlex,
} from "./ViewEmployeeStyle";
import API_URLS from "../../constants/apiUrls";
import CommenHeader from "./CommenHeader";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 45,
  padding: "20px 0px",
  borderRadius: "8px",
  height: "500px",
  overflowY: "scroll",
};

const EmployeeJobDetails = () => {
  let API_URL = process.env.REACT_APP_API_URL;
  const [isEdit, setIsEdit] = useState(false);

  const Navigate = useNavigate();
  const location = useLocation();
  const [userType, setUserType] = useState("");
  const [isAccount, setIsAccount] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formData, setFormData] = useState([]);
  const { employeeid } = useParams();
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [departmentData, setDepartmentData] = useState([]);
  const [reportsToList, setReportsToList] = useState([]);
  const [employeeTypes, setEmployeeTypes] = useState([]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    clearErrors,
    reset,
    setError,
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
    let url = API_URLS.getEmployeeJobDetails.replace(":employeeid", employeeid);
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

    let url = API_URLS.getDepartmentsList;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setDepartmentData(result.departments);
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
  const GetEmployeeTypes = () => {
    setIsLoading(true);
    let url = API_URLS.getEmployeeTypeList;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setEmployeeTypes(result);
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
  const GetReportsToList = () => {
    let url = API_URLS.getReporttoList;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          const filteredArray = result.users.filter(
            (obj) => obj.userData._id !== employeeid
          );
          setReportsToList(filteredArray);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error Fetching Job Details. Please try again.");
      });
  };
  const AddNewPosition = (data) => {
    setIsLoading(true);
    let dataCopy = data;

    let url = API_URLS.addSinglePsoitionDetail.replace(
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
          GetEmployeesJobDetails();
          reset();
          toast.success(result.message);
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
  useEffect(() => {
    GetEmployeesJobDetails();
    GetDepartments();
    GetReportsToList();
    GetEmployeeTypes();
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
  }, [isEdit]);

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
        <>
          {isEdit ? (
            <JobDetails isEdit={isEdit} setIsEdit={setIsEdit} />
          ) : (
            <MainBodyContainer>
              <FlexSpaceBetween style={{ alignItems: "center" }}>
                <CommenHeader employeeid={employeeid} />

                {userType === ROLES.MANAGER ||
                userType === ROLES.EMPLOYEE ||
                isAccount ? (
                  " "
                ) : userType === ROLES.HR ? (
                  <EditButton
                    style={{ marginRight: "54px" }}
                    onClick={() => setIsEdit(true)}
                  >
                    <ButtonIcon src="/images/icons/Pen 2.svg" />
                    Edit
                  </EditButton>
                ) : (
                  <EditButton
                    style={{ marginRight: "54px" }}
                    onClick={() => setIsEdit(true)}
                  >
                    <ButtonIcon src="/images/icons/Pen 2.svg" />
                    Edit
                  </EditButton>
                )}
              </FlexSpaceBetween>

              <BasicInfoContainer>
                <BasicInfoDiv>
                  <FlexSpaceBetween style={{ marginBottom: "10px" }}>
                    <BasicHeading>Employment Details</BasicHeading>
                    {userType === ROLES.MANAGER ||
                    userType === ROLES.EMPLOYEE ||
                    isAccount ? (
                      " "
                    ) : userType === ROLES.HR ? (
                      <AddNewButton onClick={handleOpen}>Add New</AddNewButton>
                    ) : (
                      <AddNewButton onClick={handleOpen}>Add New</AddNewButton>
                    )}
                  </FlexSpaceBetween>

                  <BasicDetailsDiv>
                    {result?.positions?.length === 0 ? (
                      <NoDocumentfound message="No job details to show" />
                    ) : (
                      <>
                        {result?.positions?.map((data) => (
                          <CertificateContainer>
                            <FlexSpaceBetween>
                              <FlexColumn>
                                <TitlePara>Employee Type</TitlePara>
                                <ViewPara>
                                  {data?.employeeType.name || " - "}
                                </ViewPara>
                              </FlexColumn>
                              <FlexColumn>
                                <TitlePara>Role </TitlePara>
                                <ViewPara>{data?.role || " - "}</ViewPara>
                              </FlexColumn>
                            </FlexSpaceBetween>
                            <FlexSpaceBetween>
                              <FlexColumn>
                                <TitlePara>Department</TitlePara>
                                <ViewPara>
                                  {data?.department?.name || " - "}
                                </ViewPara>
                              </FlexColumn>
                              <FlexColumn>
                                <TitlePara>Position </TitlePara>
                                <ViewPara>{data?.title || " - "}</ViewPara>
                              </FlexColumn>
                            </FlexSpaceBetween>
                            <FlexSpaceBetween>
                              <FlexColumn>
                                <TitlePara>Position Start Date</TitlePara>
                                <ViewPara>
                                  {data?.startDate
                                    ? moment(data?.startDate).format(
                                        "DD/MM/YYYY"
                                      )
                                    : "-"}
                                </ViewPara>
                              </FlexColumn>
                              <FlexColumn>
                                <TitlePara>Position End Date</TitlePara>
                                <ViewPara>
                                  {data?.endDate
                                    ? moment(data?.endDate).format("DD/MM/YYYY")
                                    : "Present"}
                                </ViewPara>
                              </FlexColumn>
                            </FlexSpaceBetween>
                            <FlexSpaceBetween>
                              <FlexColumn>
                                <TitlePara>Salary Scale From</TitlePara>
                                <ViewPara>
                                  {" "}
                                  {data?.salaryScaleFrom
                                    ? "$" + data?.salaryScaleFrom
                                    : " - "}
                                </ViewPara>
                              </FlexColumn>
                              <FlexColumn>
                                <TitlePara>Salary Scale To</TitlePara>
                                <ViewPara>
                                  {" "}
                                  {data?.salaryScaleTo
                                    ? "$" + data?.salaryScaleTo
                                    : " - "}
                                </ViewPara>
                              </FlexColumn>
                            </FlexSpaceBetween>
                            <FlexSpaceBetween>
                              <FlexColumn>
                                <TitlePara>Actual Salary amounts</TitlePara>
                                <ViewPara>
                                  {" "}
                                  {data?.salary ? "$" + data?.salary : " - "}
                                </ViewPara>
                              </FlexColumn>
                              <FlexColumn>
                                <TitlePara>Salary rate per</TitlePara>
                                <ViewPara>
                                  {data?.ratePer === 1
                                    ? "Hour"
                                    : data?.ratePer === 2
                                    ? "Day"
                                    : data?.ratePer === 3
                                    ? "Week"
                                    : data?.ratePer === 4
                                    ? "Biweekly "
                                    : data?.ratePer === 5
                                    ? "Annual "
                                    : " - "}
                                </ViewPara>
                              </FlexColumn>
                            </FlexSpaceBetween>
                            <FlexSpaceBetween>
                              <FlexColumn>
                                <TitlePara>Hours per week</TitlePara>
                                <ViewPara>
                                  {data?.hoursPerWeek || " - "}
                                </ViewPara>
                              </FlexColumn>
                              <FlexColumn>
                                <TitlePara>Reports to</TitlePara>
                                <ViewPara>
                                  {" "}
                                  {data?.reportsTo.name || " - "}{" "}
                                </ViewPara>
                              </FlexColumn>
                            </FlexSpaceBetween>

                            <FlexSpaceBetween>
                              <FlexColumn>
                                <TitlePara>Is BEB Eligible?</TitlePara>
                                <ViewPara>
                                  {data?.isBebEligible ? "Yes" : "No"}
                                </ViewPara>
                              </FlexColumn>
                              <FlexColumn>
                                <TitlePara>Is Primary</TitlePara>
                                <ViewPara>
                                  {data?.isPrimary ? "Yes" : "No"}
                                </ViewPara>
                              </FlexColumn>
                              {/* <FlexColumn>
                            <TitlePara>Status</TitlePara>
                            {result.isActive ? (
                              <ViewPara style={{ color: "#34A853" }}>
                                Active
                              </ViewPara>
                            ) : (
                              <ViewPara style={{ color: "red" }}>
                                Inactive
                              </ViewPara>
                            )}
                          </FlexColumn> */}
                            </FlexSpaceBetween>
                            {/* <FlexSpaceBetween>
                  <FlexColumn>
                    <TitlePara>Duration of Employment</TitlePara>
                    <ViewPara>2 Years 3 months</ViewPara>
                  </FlexColumn>
                </FlexSpaceBetween> */}
                            {/* <FlexSpaceBetween>
                          <FlexColumn>
                            <TitlePara>Employee Type</TitlePara>
                            <ViewPara>
                              {" "}
                              {data?.employeeType?.name || " - "}{" "}
                            </ViewPara>
                          </FlexColumn>
                        </FlexSpaceBetween> */}
                            <FlexSpaceBetween>
                              <FlexColumn>
                                <TitlePara>Jurisdiction</TitlePara>
                                <ViewPara>
                                  {data?.jurisdiction || " - "}
                                </ViewPara>
                              </FlexColumn>
                            </FlexSpaceBetween>
                          </CertificateContainer>
                        ))}
                      </>
                    )}

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
                        {isLoading ? (
                          <div
                            style={{
                              display: "flex",
                              width: "100%",
                              height: "500px",
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
                                    Employee Type <InputSpan>*</InputSpan>
                                  </InputLabel>
                                  <Controller
                                    name={`employeeType`}
                                    control={control}
                                    rules={{
                                      required: {
                                        value: true,
                                        message: "Required",
                                      },
                                    }}
                                    render={({ field }) => (
                                      <Select {...field}>
                                        <Option value="">Select</Option>
                                        {employeeTypes?.employeeTypes?.map(
                                          (data) => (
                                            <Option value={data._id}>
                                              {data.name}
                                            </Option>
                                          )
                                        )}
                                      </Select>
                                    )}
                                  />
                                  {
                                    <Errors>
                                      {" "}
                                      {errors.employeeType?.message}
                                    </Errors>
                                  }
                                </FlexColumnForm>
                                <FlexColumnForm>
                                  <InputLabel>
                                    Role <InputSpan>*</InputSpan>
                                  </InputLabel>
                                  <Controller
                                    name={`role`}
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
                                        <Option value="EMPLOYEE"> User </Option>
                                        <Option value="MANAGER">
                                          {" "}
                                          Manager{" "}
                                        </Option>
                                        <Option value="HR"> HR</Option>
                                      </Select>
                                    )}
                                  />
                                  {<Errors> {errors.role?.message}</Errors>}
                                </FlexColumnForm>
                              </FlexContaierForm>
                              <FlexContaierForm>
                                <FlexColumnForm>
                                  <InputLabel>
                                    Department <InputSpan>*</InputSpan>
                                  </InputLabel>
                                  <Controller
                                    name="department"
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
                                        {departmentData?.map((data) => (
                                          <Option value={data._id}>
                                            {data.name}
                                          </Option>
                                        ))}
                                      </Select>
                                    )}
                                  />
                                  {
                                    <Errors>
                                      {" "}
                                      {errors.department?.message}
                                    </Errors>
                                  }
                                </FlexColumnForm>
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
                                  {<Errors> {errors.title?.message}</Errors>}
                                </FlexColumnForm>
                              </FlexContaierForm>

                              <FlexContaierForm
                                style={{ alignItems: "flex-start" }}
                              >
                                <FlexColumnForm style={{ width: "50%" }}>
                                  <InputLabel>
                                    Reports to <InputSpan>*</InputSpan>
                                  </InputLabel>
                                  <Controller
                                    name={`reportsTo`}
                                    control={control}
                                    rules={{
                                      required: {
                                        value: true,
                                        message: "Required",
                                      },
                                    }}
                                    render={({ field }) => (
                                      <Select {...field}>
                                        <Option value="">Select</Option>
                                        {reportsToList?.map((user) => (
                                          <Option value={user?.userData?._id}>
                                            {user.personalInfo?.length
                                              ? user.personalInfo[0].firstName +
                                                " " +
                                                (user?.personalInfo[0]?.lastName
                                                  ? user?.personalInfo[0]
                                                      ?.lastName
                                                  : " ")
                                              : user.userData.name}
                                          </Option>
                                        ))}
                                      </Select>
                                    )}
                                  />
                                  {<Errors>{errors.reportTo?.message}</Errors>}
                                </FlexColumnForm>
                                <FlexContaierForm
                                  style={{ alignItems: "flex-start" }}
                                >
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
                                          const endDate = getValues("endDate");
                                          const startDate = new Date(
                                            e.target.value
                                          );
                                          if (
                                            startDate >= new Date(endDate) &&
                                            endDate
                                          ) {
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
                                    {
                                      <Errors>
                                        {errors.startDate?.message}
                                      </Errors>
                                    }
                                  </FlexColumnForm>
                                  <FlexColumnForm>
                                    <InputLabel>End Date</InputLabel>
                                    <Input
                                      type="date"
                                      {...register("endDate", {
                                        // required: {
                                        //   value: true,
                                        //   message: "Required",
                                        // },
                                        onChange: (fieldValue) => {
                                          const startDateValue =
                                            getValues("startDate");

                                          const endDateValue =
                                            getValues("endDate");

                                          if (endDateValue && startDateValue) {
                                            const endDate = new Date(
                                              endDateValue
                                            );
                                            const startDate = new Date(
                                              startDateValue
                                            );
                                            if (startDate > endDate) {
                                              return setError("endDate", {
                                                type: "custom",
                                                message:
                                                  "End date must not be earlier than start date",
                                              });
                                            } else {
                                              return clearErrors("endDate");
                                            }
                                          }
                                        },
                                      })}
                                    />
                                    {<Errors>{errors.endDate?.message}</Errors>}
                                  </FlexColumnForm>
                                </FlexContaierForm>
                              </FlexContaierForm>
                              <FlexContaierForm>
                                <FlexColumnForm>
                                  <InputLabel>Salary Scale From</InputLabel>
                                  <Input
                                    type="text"
                                    {...register(`salaryScaleFrom`, {
                                      pattern: {
                                        value: /^[+]?\d+(\.\d+)?$/,
                                        message: "Please enter valid salary",
                                      },
                                    })}
                                  />
                                  {
                                    <Errors>
                                      {errors.salaryScaleFrom?.message}
                                    </Errors>
                                  }
                                </FlexColumnForm>
                                <FlexColumnForm
                                  style={{ alignItems: "flex-start" }}
                                >
                                  <InputLabel>Salary Scale To</InputLabel>
                                  <Input
                                    type="text"
                                    {...register(`salaryScaleTo`, {
                                      pattern: {
                                        value: /^[+]?\d+(\.\d+)?$/,
                                        message: "Please enter valid salary",
                                      },
                                      validate: (fieldValue) => {
                                        const salaryFrom = parseFloat(
                                          getValues(`salaryScaleFrom`)
                                        );
                                        const salaryTo = parseFloat(fieldValue);
                                        if (salaryFrom && salaryTo) {
                                          if (
                                            !isNaN(salaryFrom) &&
                                            !isNaN(salaryTo)
                                          ) {
                                            return (
                                              salaryTo >= salaryFrom ||
                                              "Salary to must be greater than or equal to Salary From"
                                            );
                                          }
                                        }

                                        return true;
                                      },
                                    })}
                                  />
                                  {
                                    <Errors>
                                      {errors.salaryScaleTo?.message}
                                    </Errors>
                                  }
                                </FlexColumnForm>
                              </FlexContaierForm>

                              <FlexContaierForm>
                                <FlexColumnForm>
                                  <InputLabel>
                                    Actual Salary amounts{" "}
                                    <InputSpan>*</InputSpan>
                                  </InputLabel>
                                  <Input
                                    type="text"
                                    {...register(`salary`, {
                                      required: {
                                        value: true,
                                        message: "Required",
                                      },

                                      pattern: {
                                        value: /^[+]?\d+(\.\d+)?$/,
                                        message: "Please enter valid salary",
                                      },

                                      onChange: () => {
                                        const salaryFrom = parseFloat(
                                          getValues(`salaryScaleFrom`)
                                        );
                                        const salaryTo = parseFloat(
                                          getValues(`salaryScaleTo`)
                                        );
                                        const actualSalary = parseFloat(
                                          getValues(`salary`)
                                        );

                                        if (
                                          isNaN(salaryFrom) &&
                                          isNaN(salaryTo)
                                        ) {
                                          // No salary range specified, clear any errors
                                          clearErrors(`salary`);
                                        } else if (
                                          !isNaN(salaryFrom) &&
                                          isNaN(salaryTo)
                                        ) {
                                          // Only Salary From is specified
                                          if (actualSalary < salaryFrom) {
                                            setError(`salary`, {
                                              type: "custom",
                                              message:
                                                "Actual salary must be greater than or equal to Salary From",
                                            });
                                          } else {
                                            clearErrors(`salary`);
                                          }
                                        } else if (
                                          isNaN(salaryFrom) &&
                                          !isNaN(salaryTo)
                                        ) {
                                          // Only Salary To is specified
                                          if (actualSalary > salaryTo) {
                                            setError(`salary`, {
                                              type: "custom",
                                              message:
                                                "Actual salary must be smaller than or equal to Salary To",
                                            });
                                          } else {
                                            clearErrors(`salary`);
                                          }
                                        } else {
                                          // Both Salary From and Salary To are specified
                                          if (
                                            actualSalary < salaryFrom ||
                                            actualSalary > salaryTo
                                          ) {
                                            setError(`salary`, {
                                              type: "custom",
                                              message:
                                                "Actual Salary must be between Salary From and Salary To",
                                            });
                                          } else {
                                            clearErrors(`salary`);
                                          }
                                        }
                                      },
                                    })}
                                  />
                                  {<Errors>{errors.salary?.message}</Errors>}
                                </FlexColumnForm>
                                <FlexColumnForm>
                                  <InputLabel>
                                    Salary rate per
                                    <InputSpan>*</InputSpan>
                                  </InputLabel>
                                  <Controller
                                    name={`ratePer`}
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
                                        <Option value={1}>Hour</Option>
                                        <Option value={2}>Day</Option>
                                        <Option value={3}>Week</Option>
                                        <Option value={4}>Biweekly</Option>
                                        <Option value={5}>Annual</Option>
                                      </Select>
                                    )}
                                  />
                                  {<Errors>{errors.ratePer?.message}</Errors>}
                                </FlexColumnForm>
                              </FlexContaierForm>
                              <FlexContaierForm
                                style={{ alignItems: "flex-start" }}
                              >
                                <FlexColumnForm style={{ width: "50%" }}>
                                  <InputLabel>
                                    Hours per week <InputSpan>*</InputSpan>
                                  </InputLabel>
                                  <Input
                                    type="text"
                                    {...register(`hoursPerWeek`, {
                                      required: {
                                        value: true,
                                        message: "Required",
                                      },
                                      validate: (fieldValue) => {
                                        return (
                                          (!isNaN(parseFloat(fieldValue)) &&
                                            isFinite(fieldValue)) ||
                                          "Must be a number "
                                        );
                                      },
                                      pattern: {
                                        value: /^[+]?\d+(\.\d+)?$/,
                                        message: "Please enter valid hours",
                                      },
                                    })}
                                  />
                                  {
                                    <Errors>
                                      {errors.hoursPerWeek?.message}
                                    </Errors>
                                  }
                                </FlexColumnForm>
                                <FlexColumnForm>
                                  <InputLabel>
                                    Jurisdiction
                                    <InputSpan>*</InputSpan>
                                  </InputLabel>
                                  <Controller
                                    name={`jurisdiction`}
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
                                        <Option value="Federal">Federal</Option>
                                        <Option value="Provincial">
                                          Provincial
                                        </Option>
                                      </Select>
                                    )}
                                  />
                                  <Errors>
                                    {errors.jurisdiction?.message}
                                  </Errors>
                                </FlexColumnForm>
                              </FlexContaierForm>
                              <FlexContaierForm
                                style={{
                                  width: "50%",
                                  gap: "46px",
                                  marginTop: "16px",
                                  alignItems: "flex-start",
                                }}
                              >
                                <FlexColumnForm>
                                  <AlignFlex>
                                    <input
                                      type="checkbox"
                                      {...register(`isBebEligible`, {})}
                                      id={`isBebEligible`}
                                    />
                                    <InputLabel
                                      htmlFor={`isBebEligible`}
                                      style={{
                                        marginBottom: "0px",
                                        cursor: "pointer",
                                      }}
                                    >
                                      Is BEB Eligible? <InputSpan>*</InputSpan>
                                    </InputLabel>
                                  </AlignFlex>
                                </FlexColumnForm>
                                <FlexColumnForm>
                                  <AlignFlex>
                                    <input
                                      type="checkbox"
                                      {...register(`isPrimary`, {})}
                                      id={`isPrimary`}
                                    />
                                    <InputLabel
                                      htmlFor={`isPrimary`}
                                      style={{
                                        marginBottom: "0px",
                                        cursor: "pointer",
                                      }}
                                    >
                                      Is Primary <InputSpan>*</InputSpan>
                                    </InputLabel>
                                  </AlignFlex>
                                </FlexColumnForm>
                              </FlexContaierForm>
                              {/* <FlexContaierForm style={{ marginTop: "25px" }}>
                          <FlexColumnForm>
                            <AlignFlex>
                              <input
                                type="checkbox"
                                {...register("isActive", {})}
                                id="isActive"
                              />
                              <InputLabel
                                htmlFor="isActive"
                                style={{ marginBottom: "0px" }}
                              >
                                Is Active <InputSpan>*</InputSpan>
                              </InputLabel>
                            </AlignFlex>
                          </FlexColumnForm>
                        </FlexContaierForm> */}
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
                        )}
                      </Box>
                    </Modal>
                  </BasicDetailsDiv>
                </BasicInfoDiv>
              </BasicInfoContainer>
            </MainBodyContainer>
          )}
        </>
      )}
    </>
  );
};

export default EmployeeJobDetails;
