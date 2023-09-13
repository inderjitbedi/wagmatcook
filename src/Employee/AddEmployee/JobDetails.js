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
} from "./AddEmployeeStyles";

const JobDetails = () => {
  const Navigate = useNavigate();
  const { employeeid, edit } = useParams();
  const [departmentData, setDepartmentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState([]);
  const [result, setResult] = useState([]);

  const initialPosition = {
    title: "",
    department: '',
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
  } = useForm({
    mode: "all",
    defaultValues: {
      details: {
        department: '',
        endDate: null,
        hoursPerWeek: "",
        isActive: false,
        isBebEligible: false,
        ratePer: "",
        reportsTo: "",
        salary: "",
        salaryScaleFrom: "",
        salaryScaleTo: "",
        startDate: "",
        title: "",
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
      .then(({ result }) => {
        if (result) {
          setResult(result);


          if (result.details?.department)
            result.details.department = result.details?.department?._id

          console.log(result.details.department);
          Object.keys(result).forEach((key) => {
            console.log(key, result[key]);
            setValue(key, result[key])
          })


          // reset(result);
          // adding if no position added
          if (!result.positions?.length) {
            append(initialPosition)
          }
          // setValue("details.startDate", "result.details.startDate");
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
  useEffect(() => {
    GetDepartments();
  }, []);

  const HandleSubmitJobDetails = (data) => {
    // e.preventDefault();
    let dataCopy = { ...data };
    let url = `/employee/job-details/${employeeid}`;

    // setIsLoading(true);

    httpClient({
      method: "put",
      url,
      data: dataCopy,
    })
      .then(({ result }) => {
        if (result) {
          console.log(result);
          if (edit) {
            // Navigate(`/organization-admin/employee/list`);
            Navigate(-1);
          } else {
            Navigate(`/organization-admin/employee/list`);
          }

          setFormData(result);
        } else {
          toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error creating department. Please try again.");
        // setIsLoading(false);
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };
  const GetDepartments = () => {
    //  setIsLoading(true);

    let url = `/department/list`;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result }) => {
        if (result) {
          setDepartmentData(result.departments);
          GetEmployeesJobDetails();
          console.log(result.departments, "result.departments ");

        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error creating department. Please try again.");
        //  setIsLoading(false);
      })
      .finally(() => {
        //  setIsLoading(false);
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
            {edit ? "Update JobDetails " : "Add New Employee "}
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
                onClick={() => Navigate("/add-new-employee/personal-info")}
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
                      Department<InputSpan>*</InputSpan>
                    </InputLabel>
                    <Controller
                      name="details.department"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select {...field}>
                          <Option>Select</Option>
                          {departmentData?.map((data) => (
                            <Option value={data._id}>{data.name}</Option>
                          ))}
                        </Select>
                      )}
                    />
                    {errors.details?.department && <Errors> required </Errors>}
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
                    {errors.details?.title && (
                      <Errors> {errors.details?.title?.message}</Errors>
                    )}
                  </FlexColumnForm>
                </FlexContaierForm>

                <FlexContaierForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Position Start Date<InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="date"
                      {...register("details.startDate", {
                        valueAsDate: true,

                        required: {
                          value: true,
                          message: " Required",
                        },
                      })}
                    />
                    {errors.details?.startDate && (
                      <Errors>{errors.details?.startDate?.message}</Errors>
                    )}
                  </FlexColumnForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Position End Date <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="date"
                      {...register("details.endDate", {
                        valueAsDate: true,

                        required: {
                          value: true,
                          message: "Required",
                        },
                        validate: (fieldValue) => {
                          const startDate = new Date(
                            getValues("details.startDate")
                          );
                          const endDate = new Date(fieldValue);
                          return (
                            startDate <= endDate ||
                            "End Date must not be earlier than Start Date"
                          );
                        },
                      })}
                    />
                    {errors.details?.endDate && (
                      <Errors>{errors.details?.endDate?.message}</Errors>
                    )}
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
                      })}
                    />
                    {errors.details?.salaryScaleFrom && (
                      <Errors>
                        {errors.details?.salaryScaleFrom?.message}
                      </Errors>
                    )}
                  </FlexColumnForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Salary Scale To<InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="text"
                      {...register("details.salaryScaleTo", {
                        required: {
                          value: true,
                          message: "Required",
                        },
                      })}
                    />
                    {errors.details?.salaryScaleTo && (
                      <Errors>{errors.details?.salaryScaleTo?.message}</Errors>
                    )}
                  </FlexColumnForm>
                </FlexContaierForm>
                <FlexContaierForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Actual Salary amounts<InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="text"
                      {...register("details.salary", {
                        required: {
                          value: true,
                          message: "Required",
                        },
                      })}
                    />
                    {errors.details?.salary && (
                      <Errors>{errors.details?.salary?.message}</Errors>
                    )}
                  </FlexColumnForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Salary rate per
                      <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="text"
                      {...register("details.ratePer", {
                        required: {
                          value: true,
                          message: " Required",
                        },
                      })}
                    />
                    {errors.details?.ratePer && (
                      <Errors>{errors.details?.ratePer?.message}</Errors>
                    )}
                  </FlexColumnForm>
                </FlexContaierForm>
                <FlexContaierForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Hours per week<InputSpan>*</InputSpan>
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
                            "Invalid Home-Phone number "
                          );
                        },
                      })}
                    />
                    {errors.details?.hoursPerWeek && (
                      <Errors>{errors.details?.hoursPerWeek?.message}</Errors>
                    )}
                  </FlexColumnForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Reports to <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="text"
                      {...register("details.reportsTo", {
                        required: {
                          value: true,
                          message: "Required",
                        },
                      })}
                    />
                    {errors.details?.reportsTo && (
                      <Errors>{errors.details?.reportsTo?.message}</Errors>
                    )}
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
                      />
                      <InputLabel style={{ marginBottom: "0px" }}>
                        Is BEB Eligible?<InputSpan>*</InputSpan>
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
                      />
                      <InputLabel style={{ marginBottom: "0px" }}>
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
                  <FlexContaierForm>
                    <FlexColumnForm>
                      <InputLabel>
                        Position Title<InputSpan>*</InputSpan>
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
                        render={({ field }) => (
                          <Select {...field}>
                            <Option>Select</Option>
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
                  <FlexContaierForm>
                    <FlexColumnForm>
                      <InputLabel>
                        From<InputSpan>*</InputSpan>
                      </InputLabel>
                      <Input
                        type="date"
                        {...register(`positions.${index}.startDate`, {
                          valueAsDate: true,
                          required: {
                            value: true,
                            message: "Required",
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
                        To<InputSpan>*</InputSpan>
                      </InputLabel>
                      <Input
                        type="date"
                        {...register(`positions.${index}.endDate`, {
                          valueAsDate: true,

                          required: {
                            value: true,
                            message: "Required",
                          },
                          validate: (fieldValue) => {
                            const startDate = new Date(
                              getValues(`positions.${index}.startDate`)
                            );
                            const endDate = new Date(fieldValue);
                            return (
                              startDate <= endDate ||
                              "Must not be earlier than Start Date"
                            );
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
                    <DeleteIcon
                      onClick={() => remove(index)}
                      src="/images/icons/Alert-Circle.svg"
                    />
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
