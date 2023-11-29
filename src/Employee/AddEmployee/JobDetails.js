import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import httpClient from "../../api/httpClient";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import { ErrorMessage } from "@hookform/error-message";
import CommenDashHeader from "../../Dashboard/CommenDashHeader";
import ROLES from "../../constants/roles";
import {
  HeaderEmployee,
  BackButton,
  FlexContaier,
  HeaderTitle,
  IconsEmployee,
  EmployeeBody,
  BodyHeader,
  BodyHeaderTitle,
  BodyMain,
  BodyMainHeading,
  FormContainer,
  FlexContaierForm,
  FlexColumnForm,
  InputLabel,
  InputSpan,
  Input,
  Errors,
  ButtonBlue,
  Select,
  Option,
  ButtonGrey,
  BluePara,
  AlignFlex,
  DeleteIcon,
  TrashDiv,
  FlexColumnForm50,
  FlexContaierForm50,
} from "./AddEmployeeStyles";
import API_URLS from "../../constants/apiUrls";
import { FlexColContainer } from "../../Dashboard/ManagerDashboard/ManagerStyles";
import { FlexSpaceBetween } from "../ViewEmployee/ViewEmployeeStyle";

const JobDetails = ({ isEdit, setIsEdit, setRefresh, refresh }) => {
  const Navigate = useNavigate();
  const { employeeid, edit } = useParams();
  const location = useLocation();
  const [userType, setUserType] = useState("");

  const [departmentData, setDepartmentData] = useState([]);
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState([]);
  const [reportsToList, setReportsToList] = useState([]);
  const [result, setResult] = useState([]);

  const initialPosition = {
    department: "",
    endDate: "",
    hoursPerWeek: "",
    isBebEligible: false,
    ratePer: "",
    reportsTo: "",
    salary: "",
    salaryScaleFrom: "",
    salaryScaleTo: "",
    startDate: "",
    title: "",
    employeeType: "",
  };
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    setValue,
    setError,
    clearErrors,
  } = useForm({
    mode: "all",
    defaultValues: {
      positions: [initialPosition],
    },
  });

  const { fields, remove, append } = useFieldArray({
    name: "positions",
    control,
  });

  const GetReportsToList = () => {
    return new Promise((resolve, reject) => {
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
            resolve(result);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Error Fetching Job Details. Please try again.");
          reject(error);
        });
    });
  };
  const GetEmployeesJobDetails = () => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      const trimid = employeeid.trim();

      let url = API_URLS.getEmployeeJobDetails.replace(
        ":employeeid",
        employeeid
      );
      httpClient({
        method: "get",
        url,
      })
        .then(({ result, error }) => {
          if (result) {
            // //console.log(result, "this what result Looks like ");
            setResult(result);
            resolve(result);
            if (result.positions) {
              result.positions.forEach((data) => {
                if (data.startDate) {
                  data.startDate = new Date(data.startDate)
                    .toISOString()
                    .split("T")[0];
                }
                if (data.endDate) {
                  data.endDate = new Date(data.endDate)
                    .toISOString()
                    .split("T")[0];
                }
                data.department = data.department._id;
                data.employeeType = data.employeeType._id;
                data.reportsTo = data.reportsTo._id;
              });
            }

            reset(result);
            setValue("isActive", result.isActive);

            if (!result.positions?.length) {
              append(initialPosition);
            }
          } else {
            //toast.warn("something went wrong ");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // toast.error("Error Fetching Job Details. Please try again.");
          setIsLoading(false);
          reject(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  };

  useEffect(() => {
    Promise.all([
      GetDepartments(),
      GetEmployeeTypes(),

      GetReportsToList(),
      GetEmployeesJobDetails(),
    ]);
    if (!isEdit) {
      GetHeadersData();
    }

    if (location.pathname.indexOf("manager") > -1) {
      setUserType(ROLES.MANAGER);
    } else if (location.pathname.indexOf("hr") > -1) {
      setUserType(ROLES.HR);
    } else if (location.pathname.indexOf("user") > -1) {
      setUserType(ROLES.EMPLOYEE);
    } else if (location.pathname.indexOf("organization-admin") > -1) {
      setUserType(ROLES.ORG_ADMIN);
    }
  }, []);

  const HandleSubmitJobDetails = (data) => {
    // e.preventDefault();
    let dataCopy = { ...data };
    let url = API_URLS.submitEmployeeJobDetails.replace(
      ":employeeid",
      employeeid
    );

    setIsLoading(true);

    httpClient({
      method: "put",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          // //console.log(result);
          if (isEdit) {
            // Navigate(`/organization-admin/employee/list`);
            // Navigate(-1);
            setIsEdit(false);
            setRefresh(refresh + 1);
            window.location.reload();

            toast.success(result.message, {
              className: "toast",
            });
          } else {
            if (userType === ROLES.HR) {
              Navigate(`/hr-management/benefits/${employeeid}`);
            } else {
              Navigate(`/organization-admin/employee/benefits/${employeeid}`);
            }
          }

          setFormData(result);
        } else {
          ////toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error Submiting Job Details. Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const GetDepartments = () => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      let url = API_URLS.getDepartmentsList;

      httpClient({
        method: "get",
        url,
      })
        .then(({ result, error }) => {
          if (result) {
            setDepartmentData(result.departments);
            resolve(result.departments);
          } else {
            //toast.warn("something went wrong ");
            setIsLoading(false);

            reject("No data received from GetDepartments API");
          }
        })
        .catch((error) => {
          toast.error("Error getting department. Please try again.");
          setIsLoading(false);
          reject(error);
        });
    });
  };
  const GetEmployeeTypes = () => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      let url = API_URLS.getEmployeeTypeList;
      httpClient({
        method: "get",
        url,
      })
        .then(({ result, error }) => {
          if (result) {
            setEmployeeTypes(result);
            resolve(result);
          } else {
            //toast.warn("something went wrong ");
            reject("No data received from GetEmployeeTypes API");
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Error Adding Benefits. Please try again.");
          setIsLoading(false);
          reject(error);
        });
    });
  };
  const onSubmit = (data) => {
    function isEmptyObject(obj) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          return false;
        }
      }
      return true;
    }
    const atLeastOnePrimary = data.positions.some(
      (position) => position.isPrimary
    );
    if (!atLeastOnePrimary) {
      data.positions.forEach((position, index) => {
        setError(`positions.${index}.isPrimary`, {
          type: "custom",
          message: "At least one Primary Required",
        });
      });
    } else {
      data.positions.forEach((position, index) => {
        clearErrors(`positions.${index}.isPrimary`);
      }); // Clear any previous error
    }
    if (isEmptyObject(errors)) {
      HandleSubmitJobDetails(data);
    }
  };
  const [headerData, setHeaderData] = useState([]);

  const GetHeadersData = () => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      const trimid = employeeid.trim();
      let url = `/employee/header-info/${trimid}`;
      httpClient({
        method: "get",
        url,
      })
        .then(({ result, error }) => {
          if (result) {
            setHeaderData(result);
            resolve(result);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Error in fetching Personal info. Please try again.");
          reject(error);
          setIsLoading(false);
        });
    });
  };
  const [searchValue, setSearchValue] = useState("");

  const HandleSearchCahnge = (data) => {
    setSearchValue(data);
  };
  return (
    <>
      {!isEdit && (
        <CommenDashHeader
          onSearch={HandleSearchCahnge}
          text={"Add New Employee"}
        />
      )}
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
        <EmployeeBody>
          {!isEdit && (
            <BodyHeader>
              <BodyHeaderTitle>
                {[
                  headerData.personalInfo?.firstName,
                  headerData.personalInfo?.lastName
                    ? headerData.personalInfo?.lastName
                    : "",
                ].join(" ")}
                &nbsp;&#62;&nbsp;
                <span
                  style={{ color: "#8B8B8B", cursor: "pointer" }}
                  onClick={() => {
                    if (userType === ROLES.ORG_ADMIN) {
                      Navigate(
                        `/organization-admin/employee/personal-info/${employeeid}`
                      );
                    } else if (userType === ROLES.HR) {
                      Navigate(`/hr-management/personal-info/${employeeid}`);
                    } else if (userType === ROLES.MANAGER) {
                      Navigate(`/manager-management/personal-info/${employeeid}`);
                    }
                  }}
                >
                  {" "}
                  Personal Information{" "}
                </span>
                &#62; Job Details
              </BodyHeaderTitle>
            </BodyHeader>
          )}

          <BodyMain>
            <FlexSpaceBetween>
              <BodyMainHeading style={{ marginBottom: "2.5rem" }}>
                Job Details
              </BodyMainHeading>

              {isEdit && (
                <IconsEmployee
                  src="/images/icons/Alert-Circle.svg"
                  onClick={() => setIsEdit(false)}
                  style={{ cursor: "pointer" }}
                />
              )}
            </FlexSpaceBetween>

            <form onSubmit={handleSubmit(onSubmit)}>
              {fields.map((field, index) => (
                <FormContainer key={field.id}>
                  <FlexContaierForm style={{ alignItems: "flex-start" }}>
                    <FlexColumnForm>
                      <InputLabel>
                        Employee Type <InputSpan>*</InputSpan>
                      </InputLabel>
                      <Controller
                        name={`positions.${index}.employeeType`}
                        control={control}
                        rules={{
                          required: {
                            value: true,
                            message: "Required",
                          },
                        }}
                        render={({ field }) => (
                          <Select {...field}>
                            <Option value="" disabled>
                              Select
                            </Option>
                            {employeeTypes?.employeeTypes?.map((data) => (
                              <Option value={data._id}>{data.name}</Option>
                            ))}
                          </Select>
                        )}
                      />
                      <ErrorMessage
                        as={<Errors />}
                        errors={errors}
                        name={`positions.${index}.employeeType`}
                      />
                    </FlexColumnForm>
                    <FlexColumnForm>
                      <InputLabel>
                        Role <InputSpan>*</InputSpan>
                      </InputLabel>
                      <Controller
                        name={`positions.${index}.role`}
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
                            <Option value="MANAGER"> Manager</Option>
                            <Option value="HUMAN_RESOURCE">HR </Option>
                          </Select>
                        )}
                      />
                      <ErrorMessage
                        as={<Errors />}
                        errors={errors}
                        name={`positions.${index}.role`}
                      />
                    </FlexColumnForm>
                  </FlexContaierForm>
                  <FlexContaierForm style={{ alignItems: "flex-start" }}>
                    <FlexColumnForm>
                      <InputLabel>
                        Department <InputSpan>*</InputSpan>
                      </InputLabel>
                      <Controller
                        name={`positions.${index}.department`}
                        control={control}
                        rules={{
                          required: {
                            value: true,
                            message: "Required",
                          },
                        }}
                        render={({ field }) => (
                          <Select {...field}>
                            <Option value="" disabled>
                              Select
                            </Option>
                            {departmentData?.map((data) => (
                              <Option value={data._id}>{data.name}</Option>
                            ))}
                          </Select>
                        )}
                      />
                      <ErrorMessage
                        as={<Errors />}
                        errors={errors}
                        name={`positions.${index}.department`}
                      />
                    </FlexColumnForm>
                    <FlexColumnForm>
                      <InputLabel>
                        Position Title <InputSpan>*</InputSpan>
                      </InputLabel>
                      <Input
                        type="text"
                        {...register(`positions.${index}.title`, {
                          required: {
                            value: true,
                            message: "Required",
                          },
                        })}
                        autoFocus={false}
                      />
                      <ErrorMessage
                        as={<Errors />}
                        errors={errors}
                        name={`positions.${index}.title`}
                      />
                    </FlexColumnForm>
                  </FlexContaierForm>
                  <FlexContaierForm style={{ alignItems: "flex-start" }}>
                    <FlexColumnForm50>
                      <InputLabel>
                        Reports to <InputSpan>*</InputSpan>
                      </InputLabel>
                      <Controller
                        name={`positions.${index}.reportsTo`}
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
                              <Option value={user?.userData._id}>
                                {user.personalInfo?.length
                                  ? user.personalInfo[0].firstName +
                                    " " +
                                    (user?.personalInfo[0]?.lastName
                                      ? user?.personalInfo[0]?.lastName
                                      : " ")
                                  : user.userData.name}
                              </Option>
                            ))}
                          </Select>
                        )}
                      />
                      <ErrorMessage
                        as={<Errors />}
                        errors={errors}
                        name={`positions.${index}.reportsTo`}
                      />
                    </FlexColumnForm50>
                    <FlexContaierForm50 style={{ alignItems: "flex-start" }}>
                      <FlexColumnForm>
                        <InputLabel>
                          Position Start Date <InputSpan>*</InputSpan>
                        </InputLabel>
                        <Input
                          type="date"
                          {...register(`positions.${index}.startDate`, {
                            valueAsDate: true,

                            required: {
                              value: true,
                              message: " Required",
                            },
                            onChange: (e) => {
                              const endDateValue = getValues(
                                `positions.${index}.endDate`
                              );
                              const startDateValue = getValues(
                                `positions.${index}.startDate`
                              );

                              // const startDate = e.target.value;

                              if (endDateValue && startDateValue) {
                                const endDate = new Date(endDateValue);
                                const startDate = new Date(startDateValue);

                                if (startDate > endDate) {
                                  setError(`positions.${index}.endDate`, {
                                    type: "custom",
                                    message:
                                      "End date must not be earlier than start date",
                                  });
                                } else {
                                  clearErrors(`positions.${index}.endDate`);
                                }
                              }
                            },
                          })}
                        />
                        <ErrorMessage
                          as={<Errors />}
                          errors={errors}
                          name={`positions.${index}.startDate`}
                        />
                      </FlexColumnForm>
                      <FlexColumnForm>
                        <InputLabel>Position End Date</InputLabel>
                        <Input
                          type="date"
                          {...register(`positions.${index}.endDate`, {
                            valueAsDate: true,

                            validate: (fieldValue) => {
                              const startDateValue = getValues(
                                `positions.${index}.startDate`
                              );

                              const endDateValue = getValues(
                                `positions.${index}.endDate`
                              );
                              if (endDateValue && startDateValue) {
                                const endDate = new Date(endDateValue);
                                const startDate = new Date(startDateValue);

                                if (startDate > endDate) {
                                  return "End date must not be earlier than start date";
                                  // setError(
                                  //   `positions.${index}.endDate`,
                                  //   {
                                  //     type: "custom",
                                  //     message:
                                  //       "End date must not be earlier than start date",
                                  //   }
                                  // );
                                } else {
                                  return clearErrors(
                                    `positions.${index}.endDate`
                                  );
                                }
                              }
                            },
                          })}
                        />
                        <ErrorMessage
                          as={<Errors />}
                          errors={errors}
                          name={`positions.${index}.endDate`}
                        />
                      </FlexColumnForm>
                    </FlexContaierForm50>
                  </FlexContaierForm>
                  <FlexContaierForm>
                    <FlexContaierForm style={{ alignItems: "flex-start" }}>
                      <FlexColumnForm>
                        <InputLabel>Salary Scale From</InputLabel>
                        <Input
                          type="text"
                          {...register(`positions.${index}.salaryScaleFrom`, {
                            pattern: {
                              value: /^[+]?\d+(\.\d+)?$/,
                              message: "Please enter valid salary",
                            },
                            onChange: (e) => {
                              const salaryFrom = parseFloat(
                                getValues(`positions.${index}.salaryScaleFrom`)
                              );
                              const salaryTo = parseFloat(
                                getValues(`positions.${index}.salaryScaleTo`)
                              );
                              const actualSalary = parseFloat(
                                getValues(`positions.${index}.salary`)
                              );
                              if (salaryFrom && salaryTo) {
                                if (salaryFrom > salaryTo) {
                                  setError(`positions.${index}.salaryScaleTo`, {
                                    type: "custom",
                                    message:
                                      "Salary to must be greater than  Salary From",
                                  });
                                } else {
                                  clearErrors(
                                    `positions.${index}.salaryScaleTo`
                                  );
                                }
                              }
                              if (salaryFrom && actualSalary) {
                                if (salaryFrom > actualSalary) {
                                  setError(`positions.${index}.salary`, {
                                    type: "custom",
                                    message:
                                      "Salary must be greater than or equal to Salary From",
                                  });
                                } else {
                                  clearErrors(`positions.${index}.salary`);
                                }
                              }
                            },
                          })}
                        />
                        <ErrorMessage
                          as={<Errors />}
                          errors={errors}
                          name={`positions.${index}.salaryScaleFrom`}
                        />
                      </FlexColumnForm>
                      <FlexColumnForm style={{ alignItems: "flex-start" }}>
                        <InputLabel>Salary Scale To</InputLabel>
                        <Input
                          type="text"
                          {...register(`positions.${index}.salaryScaleTo`, {
                            pattern: {
                              value: /^[+]?\d+(\.\d+)?$/,
                              message: "Please enter valid salary",
                            },
                            validate: (fieldValue) => {
                              const salaryFrom = parseFloat(
                                getValues(`positions.${index}.salaryScaleFrom`)
                              );
                              const salaryTo = parseFloat(fieldValue);
                              if (salaryFrom && salaryTo) {
                                if (!isNaN(salaryFrom) && !isNaN(salaryTo)) {
                                  return (
                                    salaryTo >= salaryFrom ||
                                    "Salary to must be greater than or equal to Salary From"
                                  );
                                }
                              }

                              return true;
                            },
                            onChange: (e) => {
                              const salaryFrom = parseFloat(
                                getValues(`positions.${index}.salaryScaleFrom`)
                              );
                              const salaryTo = parseFloat(
                                getValues(`positions.${index}.salaryScaleTo`)
                              );
                              const actualSalary = parseFloat(
                                getValues(`positions.${index}.salary`)
                              );
                              if (salaryFrom && salaryTo) {
                                if (salaryFrom > salaryTo) {
                                  setError(
                                    `positions.${index}.salaryScaleFrom`,
                                    {
                                      type: "custom",
                                      message:
                                        "Salary From must be smaller than  Salary To",
                                    }
                                  );
                                } else {
                                  clearErrors(
                                    `positions.${index}.salaryScaleFrom`
                                  );
                                }
                              }
                              if (salaryTo && actualSalary) {
                                if (salaryTo < actualSalary) {
                                  setError(`positions.${index}.salary`, {
                                    type: "custom",
                                    message:
                                      "Salary must be smaller than or equal to Salary To",
                                  });
                                } else {
                                  clearErrors(`positions.${index}.salary`);
                                }
                              }
                            },
                          })}
                        />
                        <ErrorMessage
                          as={<Errors />}
                          errors={errors}
                          name={`positions.${index}.salaryScaleTo`}
                        />
                      </FlexColumnForm>
                    </FlexContaierForm>
                    <FlexColumnForm>
                      <InputLabel>
                        Actual Salary amounts <InputSpan>*</InputSpan>{" "}
                      </InputLabel>
                      <Input
                        type="text"
                        {...register(`positions.${index}.salary`, {
                          required: {
                            value: true,
                            message: "Required",
                          },
                          pattern: {
                            value: /^[+]?\d+(\.\d+)?$/,
                            message: "Please enter valid salary",
                          },

                          validate: () => {
                            const salaryFrom = parseFloat(
                              getValues(`positions.${index}.salaryScaleFrom`)
                            );
                            const salaryTo = parseFloat(
                              getValues(`positions.${index}.salaryScaleTo`)
                            );
                            const actualSalary = parseFloat(
                              getValues(`positions.${index}.salary`)
                            );

                            if (isNaN(salaryFrom) && isNaN(salaryTo)) {
                              clearErrors(`positions.${index}.salary`);
                            } else if (!isNaN(salaryFrom) && isNaN(salaryTo)) {
                              if (actualSalary < salaryFrom) {
                                // setError(`positions.${index}.salary`, {
                                //   type: "custom",
                                //   message:
                                //     "Actual salary must be greater than or equal to Salary From",
                                // });
                                return "Actual salary must be greater than or equal to Salary From";
                              } else {
                                clearErrors(`positions.${index}.salary`);
                              }
                            } else if (isNaN(salaryFrom) && !isNaN(salaryTo)) {
                              // Only Salary To is specified
                              if (actualSalary > salaryTo) {
                                // setError(`positions.${index}.salary`, {
                                //   type: "custom",
                                //   message:
                                //     "Actual salary must be smaller than or equal to Salary To",
                                // });
                                return "Actual salary must be smaller than or equal to Salary To";
                              } else {
                                clearErrors(`positions.${index}.salary`);
                              }
                            } else {
                              // Both Salary From and Salary To are specified
                              if (
                                actualSalary < salaryFrom ||
                                actualSalary > salaryTo
                              ) {
                                // setError(`positions.${index}.salary`, {
                                //   type: "custom",
                                //   message:
                                //     "Actual Salary must be between Salary From and Salary To",
                                // });
                                return "Actual Salary must be between Salary From and Salary To";
                              } else {
                                clearErrors(`positions.${index}.salary`);
                              }
                            }
                          },
                        })}
                      />
                      <ErrorMessage
                        as={<Errors />}
                        errors={errors}
                        name={`positions.${index}.salary`}
                      />
                    </FlexColumnForm>
                  </FlexContaierForm>

                  <FlexContaierForm style={{ alignItems: "flex-start" }}>
                    <FlexColumnForm>
                      <InputLabel>
                        Salary rate per <InputSpan>*</InputSpan>
                      </InputLabel>
                      <Controller
                        name={`positions.${index}.ratePer`}
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
                      <ErrorMessage
                        as={<Errors />}
                        errors={errors}
                        name={`positions.${index}.ratePer`}
                      />
                    </FlexColumnForm>
                    <FlexColumnForm>
                      <InputLabel>
                        Hours per week <InputSpan>*</InputSpan>
                      </InputLabel>
                      <Input
                        type="text"
                        {...register(`positions.${index}.hoursPerWeek`, {
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
                      <ErrorMessage
                        as={<Errors />}
                        errors={errors}
                        name={`positions.${index}.hoursPerWeek`}
                      />
                    </FlexColumnForm>
                  </FlexContaierForm>
                  <FlexContaierForm style={{ alignItems: "center" }}>
                    <FlexColumnForm>
                      <InputLabel>
                        Jurisdiction &nbsp;<InputSpan>*</InputSpan>
                      </InputLabel>
                      <Controller
                        name={`positions.${index}.jurisdiction`}
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
                            <Option value="Provincial">Provincial</Option>
                          </Select>
                        )}
                      />
                      <ErrorMessage
                        as={<Errors />}
                        errors={errors}
                        name={`positions.${index}.jurisdiction`}
                      />
                    </FlexColumnForm>

                    <FlexContaierForm style={{ marginTop: "2.5rem" }}>
                      <FlexColumnForm>
                        <AlignFlex>
                          <input
                            type="checkbox"
                            {...register(
                              `positions.${index}.isBebEligible`,
                              {}
                            )}
                            id={`positions.${index}.isBebEligible`}
                          />
                          <InputLabel
                            htmlFor={`positions.${index}.isBebEligible`}
                            style={{ marginBottom: "0rem", cursor: "pointer" }}
                          >
                            Is BEB Eligible?
                          </InputLabel>
                        </AlignFlex>
                      </FlexColumnForm>
                      <FlexColumnForm>
                        <AlignFlex>
                          <input
                            type="checkbox"
                            {...register(`positions.${index}.isPrimary`, {})}
                            id={`positions.${index}.isPrimary`}
                          />
                          <InputLabel
                            htmlFor={`positions.${index}.isPrimary`}
                            style={{ marginBottom: "0rem", cursor: "pointer" }}
                          >
                            Is Primary
                          </InputLabel>
                        </AlignFlex>
                        <ErrorMessage
                          as={<Errors />}
                          errors={errors}
                          name={`positions.${index}.isPrimary`}
                        />
                      </FlexColumnForm>
                    </FlexContaierForm>
                  </FlexContaierForm>

                  {getValues("positions").length > 1 && (
                    <TrashDiv onClick={() => remove(index)}>
                      <DeleteIcon src="/images/icons/trash-empty.svg" /> Remove
                    </TrashDiv>
                  )}
                </FormContainer>
              ))}
              <FlexContaier style={{ marginTop: "1.6rem" }}>
                <BluePara onClick={() => append(initialPosition)}>
                  {" "}
                  Add New
                </BluePara>
              </FlexContaier>

              {/* <FlexContaierForm>
                <FlexColumnForm>
                  <AlignFlex>
                    <input
                      type="checkbox"
                      {...register("isActive", {})}
                      id="isActive"
                    />
                    <InputLabel
                      htmlFor="isActive"
                      style={{ marginBottom: "0rem" }}
                    >
                      Is Active <InputSpan>*</InputSpan>
                    </InputLabel>
                  </AlignFlex>
                </FlexColumnForm>
              </FlexContaierForm> */}

              <FlexContaier style={{ marginTop: "2.5rem" }}>
                {!isEdit && (
                  <ButtonGrey onClick={() => Navigate(-1)}>Back</ButtonGrey>
                )}
                <ButtonBlue type="submit">
                  {isEdit ? "Update" : "Continue"}
                </ButtonBlue>
              </FlexContaier>
            </form>
          </BodyMain>
        </EmployeeBody>
      )}
      {/* <DevTool control={control} /> */}
    </>
  );
};

export default JobDetails;
