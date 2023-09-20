import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import httpClient from "../../api/httpClient";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import { ErrorMessage } from "@hookform/error-message";
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
} from "./AddEmployeeStyles";

const JobDetails = () => {
  const Navigate = useNavigate();
  const { employeeid, edit } = useParams();
  const [departmentData, setDepartmentData] = useState([]);
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState([]);
  const [result, setResult] = useState([]);

  const initialPosition = {
    title: "",
    department: "",
    startDate: new Date(),
    endDate: new Date(),
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
  } = useForm({
    mode: "all",
    defaultValues: {
      details: {
        department: "",
        endDate: null,
        hoursPerWeek: "",
        isActive: false,
        isBebEligible: false,
        ratePer: "",
        reportsTo: employeeid,
        salary: "",
        salaryScaleFrom: "",
        salaryScaleTo: "",
        startDate: "",
        title: "",
        employeeType: "",
      },
      positions: [initialPosition],
    },
  });

  const { fields, remove, append } = useFieldArray({
    name: "positions",
    control,
  });

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
          // console.log(result, "this what result Looks like ");
          setResult(result);
          if (result.details.startDate || result.details.endDate) {
            result.details.startDate = new Date(result.details.startDate)
              .toISOString()
              .split("T")[0];
            result.details.endDate = new Date(result.details.endDate)
              .toISOString()
              .split("T")[0];
          }
          if (result.positions) {
            result.positions.forEach((data) => {
              if (data.startDate || data.endDate) {
                data.startDate = new Date(data.startDate)
                  .toISOString()
                  .split("T")[0];
                data.endDate = new Date(data.endDate)
                  .toISOString()
                  .split("T")[0];

                data.department = data.department._id;
              }
            });
          }
          if (result.details?.department) {
            result.details.department = result.details?.department?._id;
          }
          if (result.details?.employeeType) {
            result.details.employeeType = result.details?.employeeType?._id;
          }

          // console.log(result, "updates in results");
          // Object.keys(result).forEach((key) => {
          //   console.log(key, result[key], "this is what we have now ");
          //   setValue(key, result[key]);
          // });

          // console.log(result.details.department);
          // Object.keys(result).forEach((key) => {
          //   console.log(key, result[key]);
          //   setValue(key, result[key])
          // })

          reset(result);
          setValue("department");
          // adding if no position added
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    GetDepartments();
    GetEmployeeTypes();
    // GetEmployeesJobDetails();
  }, []);

  const HandleSubmitJobDetails = (data) => {
    // e.preventDefault();
    let dataCopy = { ...data };
    let url = `/employee/job-details/${employeeid}`;

    setIsLoading(true);

    httpClient({
      method: "put",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          // console.log(result);
          if (edit) {
            // Navigate(`/organization-admin/employee/list`);
            Navigate(-1);
            toast.success(result.message);
          } else {
            Navigate(`/organization-admin/employee/benefits/${employeeid}`);
          }

          setFormData(result);
        } else {
          toast.warn("something went wrong ");
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
    //  setIsLoading(true);

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
        //  setIsLoading(false);
      })
      .finally(() => {
        //  setIsLoading(false);
      });
  };
  const GetEmployeeTypes = () => {
    setIsLoading(true);
    let url = `/employee-type/list`;
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
      HandleSubmitJobDetails(data);
    }
    // console.log("form submmited", data);
  };

  return (
    <>
      <HeaderEmployee>
        <FlexContaier>
          <BackButton onClick={() => Navigate(-1)}>
            {" "}
            <IconsEmployee src="/images/icons/ArrowLeft.svg" />
            Back
          </BackButton>
          <HeaderTitle>
            {" "}
            {edit ? "Update Employee Job Details " : "Add New Employee "}
          </HeaderTitle>
        </FlexContaier>
        <IconsEmployee src="/images/icons/Notifications.svg"></IconsEmployee>
      </HeaderEmployee>
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
          <BodyHeader>
            <BodyHeaderTitle>
              <span
                style={{ color: "#8B8B8B", cursor: "pointer" }}
                onClick={() =>
                  Navigate(
                    `/organization-admin/employee/personal-info/${employeeid}`
                  )
                }
              >
                {" "}
                Personal Information{" "}
              </span>
              &#62; Job Details
            </BodyHeaderTitle>
          </BodyHeader>
          <BodyMain>
            <BodyMainHeading style={{ marginBottom: "25px" }}>
              Job Details
            </BodyMainHeading>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormContainer>
                <FlexContaierForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Department <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Controller
                      name="details.department"
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
                    {<Errors> {errors?.details?.department?.message} </Errors>}
                  </FlexColumnForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Position Title <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="text"
                      {...register("details.title", {
                        required: {
                          value: true,
                          message: "Required",
                        },
                      })}
                    />
                    {<Errors> {errors.details?.title?.message}</Errors>}
                  </FlexColumnForm>
                </FlexContaierForm>

                <FlexContaierForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Position Start Date <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="date"
                      {...register("details.startDate", {
                        valueAsDate: true,

                        required: {
                          value: true,
                          message: " Required",
                        },
                        onChange: (e) => {
                          const endDate = new Date(
                            getValues("details.endDate")
                          );
                          const startDate = new Date(e.target.value);
                          if (endDate && startDate >= endDate) {
                            setError("details.endDate", {
                              type: "custom",
                              message:
                                "End date must not be earlier than start date",
                            });
                          } else {
                            setError("details.endDate", {
                              type: "custom",
                              message: "",
                            });
                          }
                        },
                      })}
                    />
                    {<Errors>{errors.details?.startDate?.message}</Errors>}
                  </FlexColumnForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Position End Date <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="date"
                      {...register("details.endDate", {
                        valueAsDate: true,

                        // required: {
                        //   value: true,
                        //   message: "Required",
                        // },
                        validate: (fieldValue) => {
                          const startDate = new Date(
                            getValues("details.startDate")
                          );
                          const endDate = new Date(fieldValue);
                          if (startDate <= endDate && endDate) {
                            setError("details.endDate", {
                              type: "custom",
                              message:
                                "End date must not be earlier than start date   ",
                            });
                          } else {
                            setError("details.endDate", {
                              type: "custom",
                              message: "",
                            });
                          }
                        },
                      })}
                    />
                    {<Errors>{errors.details?.endDate?.message}</Errors>}
                  </FlexColumnForm>
                </FlexContaierForm>

                <FlexContaierForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Salary Scale From <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="text"
                      {...register("details.salaryScaleFrom", {
                        required: {
                          value: true,
                          message: "Required",
                        },
                        pattern: {
                          value: /^[+]?\d+(\.\d+)?$/,
                          message: "Please enter valid salary",
                        },
                        validate: (fieldValue) => {
                          return (
                            (!isNaN(parseFloat(fieldValue)) &&
                              isFinite(fieldValue)) ||
                            " Must be a number "
                          );
                        },
                      })}
                    />
                    {
                      <Errors>
                        {errors.details?.salaryScaleFrom?.message}
                      </Errors>
                    }
                  </FlexColumnForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Salary Scale To <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="text"
                      {...register("details.salaryScaleTo", {
                        required: {
                          value: true,
                          message: "Required",
                        },
                        pattern: {
                          value: /^[+]?\d+(\.\d+)?$/,
                          message: "Please enter valid salary",
                        },
                        validate: (fieldValue) => {
                          const salaryFrom = parseFloat(
                            getValues("details.salaryScaleFrom")
                          );
                          const salaryTo = parseFloat(fieldValue);
                          if (!isNaN(salaryFrom) && !isNaN(salaryTo)) {
                            return (
                              salaryTo >= salaryFrom ||
                              "Salary to must be greater than or equal to Salary From"
                            );
                          }
                          return true;
                        },
                      })}
                    />
                    {<Errors>{errors.details?.salaryScaleTo?.message}</Errors>}
                  </FlexColumnForm>
                </FlexContaierForm>
                <FlexContaierForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Actual Salary amounts <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="text"
                      {...register("details.salary", {
                        required: {
                          value: true,
                          message: "Required",
                        },
                        pattern: {
                          value: /^[+]?\d+(\.\d+)?$/,
                          message: "Please enter valid salary",
                        },
                        // validate: (fieldValue) => {
                        //   return (
                        //     (!isNaN(parseFloat(fieldValue)) &&
                        //       isFinite(fieldValue)) ||
                        //     "Must be a number"
                        //   );
                        // },
                        validate: (fieldValue) => {
                          const salaryFrom = parseFloat(
                            getValues("details.salaryScaleFrom")
                          );
                          const salaryTo = parseFloat(
                            getValues("details.salaryScaleTo")
                          );
                          const actualSalary = parseFloat(fieldValue);

                          if (
                            !isNaN(salaryFrom) &&
                            !isNaN(salaryTo) &&
                            !isNaN(actualSalary)
                          ) {
                            return (
                              (actualSalary >= salaryFrom &&
                                actualSalary <= salaryTo) ||
                              "Actual Salary must be between Salary From and Salary To"
                            );
                          }
                          return (
                            (!isNaN(parseFloat(fieldValue)) &&
                              isFinite(fieldValue)) ||
                            "Must be a number"
                          );
                        },
                      })}
                    />
                    {<Errors>{errors.details?.salary?.message}</Errors>}
                  </FlexColumnForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Salary rate per
                      <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Controller
                      name="details.ratePer"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Required",
                        },
                      }}
                      render={({ field }) => (
                        <Select {...field}>
                          <Option disabled>Select</Option>
                          <Option value={1}>Hour</Option>
                          <Option value={2}>Day</Option>
                          <Option value={3}>Week</Option>
                          <Option value={4}>Biweekly</Option>
                          <Option value={5}>Annual</Option>
                        </Select>
                      )}
                    />
                    {<Errors>{errors?.details?.ratePer?.message} </Errors>}
                  </FlexColumnForm>
                </FlexContaierForm>
                <FlexContaierForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Hours per week <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="text"
                      {...register("details.hoursPerWeek", {
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
                    {<Errors>{errors.details?.hoursPerWeek?.message}</Errors>}
                  </FlexColumnForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Reports to <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="text"
                      value={employeeid}
                      // {...register("details.reportsTo", {
                      //   required: {
                      //     value: true,
                      //     message: "Required",
                      //   },
                      // })}
                    />
                    {<Errors>{errors.details?.reportsTo?.message}</Errors>}
                  </FlexColumnForm>
                </FlexContaierForm>
                <FlexContaierForm>
                  <FlexColumnForm style={{ width: "50%" }}>
                    <InputLabel>
                      Employee Type <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Controller
                      name="details.employeeType"
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
                    {
                      <Errors>
                        {" "}
                        {errors?.details?.employeeType?.message}{" "}
                      </Errors>
                    }
                  </FlexColumnForm>
                </FlexContaierForm>
                <FlexContaierForm
                  style={{ width: "50%", gap: "46px", marginTop: "16px" }}
                >
                  <FlexColumnForm>
                    <AlignFlex>
                      <input
                        type="checkbox"
                        {...register("details.isBebEligible", {})}
                        id="isEligible"
                      />
                      <InputLabel
                        htmlFor="isEligible"
                        style={{ marginBottom: "0px" }}
                      >
                        Is BEB Eligible? <InputSpan>*</InputSpan>
                      </InputLabel>
                    </AlignFlex>
                    {/* {errors.isBebEligible && (
                    <Errors>{errors.isBebEligible?.message}</Errors>
                  )} */}
                  </FlexColumnForm>
                  <FlexColumnForm>
                    <AlignFlex>
                      <input
                        type="checkbox"
                        {...register("details.isActive", {})}
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
                </FlexContaierForm>
              </FormContainer>

              <BodyMainHeading
                style={{ marginBottom: "25px", marginTop: "50px" }}
              >
                Position History
              </BodyMainHeading>
              {fields.map((field, index) => (
                <FormContainer key={field.id}>
                  <FlexContaierForm style={{ alignItems: "flex-start" }}>
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
                      />
                      <ErrorMessage
                        as={<Errors />}
                        errors={errors}
                        name={`positions.${index}.title`}
                      />
                    </FlexColumnForm>
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
                  </FlexContaierForm>
                  <FlexContaierForm style={{ alignItems: "flex-start" }}>
                    <FlexColumnForm>
                      <InputLabel>
                        From <InputSpan>*</InputSpan>
                      </InputLabel>
                      <Input
                        type="date"
                        {...register(`positions.${index}.startDate`, {
                          valueAsDate: true,
                          // required: {
                          //   value: true,
                          //   message: "Required",
                          // },
                          onChange: (e) => {
                            const endDate = new Date(
                              getValues(`positions.${index}.endDate`)
                            );
                            const startDate = new Date(e.target.value);
                            if (endDate && startDate >= endDate) {
                              setError(`positions.${index}.endDate`, {
                                type: "custom",
                                message:
                                  "End date must not be earlier than start date",
                              });
                            } else {
                              setError(`positions.${index}.endDate`, {
                                type: "custom",
                                message: "",
                              });
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
                      <InputLabel>
                        To <InputSpan>*</InputSpan>
                      </InputLabel>
                      <Input
                        type="date"
                        {...register(`positions.${index}.endDate`, {
                          valueAsDate: true,

                          // required: {
                          //   value: true,
                          //   message: "Required",
                          // },
                          validate: (fieldValue) => {
                            const startDate = new Date(
                              getValues(`positions.${index}.startDate`)
                            );
                            const endDate = new Date(fieldValue);
                            if (startDate <= endDate && endDate) {
                              setError(`positions.${index}.endDate`, {
                                type: "custom",
                                message:
                                  "End date must not be earlier than start date   ",
                              });
                            } else {
                              setError(`positions.${index}.endDate`, {
                                type: "custom",
                                message: "",
                              });
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
                  </FlexContaierForm>
                  {getValues("positions").length > 1 && (
                    <TrashDiv onClick={() => remove(index)}>
                      <DeleteIcon src="/images/icons/trash-empty.svg" /> Remove
                    </TrashDiv>
                  )}
                </FormContainer>
              ))}

              <FlexContaier>
                <BluePara onClick={() => append(initialPosition)}>
                  {" "}
                  Add New Position
                </BluePara>
              </FlexContaier>

              <FlexContaier>
                {!edit && (
                  <ButtonGrey onClick={() => Navigate(-1)}>Back</ButtonGrey>
                )}
                <ButtonBlue
                  type="submit"
                  onClick={() => {
                    handleSubmit(onSubmit);
                  }}
                >
                  {edit ? "Update" : "Continue"}
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
