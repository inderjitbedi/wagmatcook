import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import httpClient from "../../api/httpClient";
import { toast } from "react-toastify";

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
  const { employeeid } = useParams();
  const [departmentData, setDepartmentData] = useState([]);

  const [formData, setFormData] = useState([]);
  const [result, setResult] = useState([]);

  const initialPosition = {
    title: "",
    department: null,
    startDate: "",
    endDate: "",
  };
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    mode: "all",
    defaultValues: {
      details: {
        department: null,
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
    // setIsLoading(true); api serach - &searchKey=search_keyword
    const trimid = employeeid.trim();
    let url = `/employee/job-details/${trimid}`;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result }) => {
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
        //  setIsLoading(false);
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };
  useEffect(() => {
    GetEmployeesJobDetails();
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
           Navigate(`/organization-admin/employee/`);
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
  console.log(departmentData, "select option data ")
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
          <HeaderTitle>Add New Employee</HeaderTitle>
        </FlexContaier>
        <IconsEmployee src="/images/icons/Notifications.svg"></IconsEmployee>
      </HeaderEmployee>
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
                    {...register("details.positionTitle", {
                      required: {
                        value: true,
                        message: "Required",
                      },
                    })}
                  />
                  {errors.details?.positionTitle && (
                    <Errors> {errors.details?.positionTitle?.message}</Errors>
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
                    <Errors>{errors.details?.salaryScaleFrom?.message}</Errors>
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
                        // required: {
                        //   value: true,
                        //   message: "Required",
                        // },
                      })}
                    />
                  </FlexColumnForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Department <InputSpan>*</InputSpan>
                    </InputLabel>
                  
                    <Controller
                      name= {`positions.${index}.department`}
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
                        // required: {
                        //   value: true,
                        //   message: "Required",
                        // },
                      })}
                    />
                    <Errors></Errors>
                  </FlexColumnForm>
                  <FlexColumnForm>
                    <InputLabel>
                      To<InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="date"
                      {...register(`positions.${index}.endDate`, {
                        // required: {
                        //   value: true,
                        //   message: "Required",
                        // },
                      })}
                    />
                    <Errors></Errors>
                  </FlexColumnForm>
                </FlexContaierForm>
                {index > 0 && (
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
              <ButtonGrey onClick={() => Navigate(-1)}>Back</ButtonGrey>
              <ButtonBlue
                type="submit"
                onClick={() => {
                  handleSubmit(onSubmit);
                }}
              >
                Continue
              </ButtonBlue>
            </FlexContaier>
          </form>
        </BodyMain>
      </EmployeeBody>
      <DevTool control={control} />
    </>
  );
};

export default JobDetails;
