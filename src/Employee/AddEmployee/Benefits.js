import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import httpClient from "../../api/httpClient";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
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
  ButtonGrey,
  Select,
  Option,
} from "./AddEmployeeStyles";
const Benefits = () => {
  const Navigate = useNavigate();
  const { employeeid, edit } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [Id, setId] = useState("");
  const [formData, setFormData] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    reset,
    watch,
    setError,
    clearErrors,
  } = useForm({
    mode: "all",
    defaultValues: {
      benefit: "",
      contributionRate: "",
      endDate: "",
      cost: "",
      startDate: "",
      description: "",
    },
  });
  const watchStartDate = watch("startDate", "");
  const HandleSubmitBenefits = (data) => {
    // e.preventDefault();
    let dataCopy = data;
    let url = `/employee/benefit/${employeeid}`;

    setIsLoading(true);

    httpClient({
      method: "put",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          if (edit) {
            // Navigate(`/organization-admin/employee/list`);
            Navigate(-1);
            toast.success(result.message);
          } else {
            Navigate(
              `/organization-admin/employee/certificates-info/${employeeid}`
            );
          }

          setFormData(result);
        } else {
          //toast.warn("something went wrong ");
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
      HandleSubmitBenefits(data);
    }
  };
  // get Benefits
  const GetBenefits = () => {
    setIsLoading(true);
    let url = `/benefit/list`;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setBenefits(result.benefits);
          GetEmployeesBenefits(result.benefits);
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error in fetching benefits. Please try again.");
        // setIsLoading(false);
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

  const GetEmployeesBenefits = (data) => {
    setIsLoading(true);
    const trimid = employeeid.trim();
    let url = `/employee/benefit/${trimid}`;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setResult(result);
          if (result.benefit.startDate || result.benefit.endDate) {
            result.benefit.startDate = new Date(result.benefit.startDate)
              .toISOString()
              .split("T")[0];
            result.benefit.endDate = new Date(result.benefit.endDate)
              .toISOString()
              .split("T")[0];
          }

          const findBenefit = data.find(
            (benefit) => benefit._id === result.benefit.benefit._id
          );
          const description = findBenefit?.description;


          reset(result.benefit);
          setValue("benefit", result.benefit.benefit);
          setValue("description", description);
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
    GetBenefits();
    // GetEmployeesBenefits();
  }, []);
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
            {edit ? "Update  Employee  Benefits " : "Add New Employee"}
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
        <EmployeeBody style={{ height: "75%" }}>
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
                Personal Information &#62;{" "}
              </span>{" "}
              <span
                style={{ color: "#8B8B8B", cursor: "pointer" }}
                onClick={() =>
                  Navigate(
                    `/organization-admin/employee/job-details/${employeeid}`
                  )
                }
              >
                Job Details &#62;
              </span>{" "}
              Benefits
            </BodyHeaderTitle>
          </BodyHeader>
          <BodyMain>
            <BodyMainHeading style={{ marginBottom: "25px" }}>
              Benefits
            </BodyMainHeading>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormContainer>
                {/* first name and last name  */}
                <FlexContaierForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Benefit Name <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Controller
                      name="benefit"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Required",
                        },
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Select
                          value={value}
                          onChange={(e) => {
                            const targetId = e.target.value;
                            setValue("benefit", e.target.value);
                            const findBenefit = benefits.find(
                              (benefit) => benefit._id === targetId
                            );
                            if (findBenefit) {
                              const description = findBenefit.description;
                              setValue("description", description);
                            } else {
                              // setValue("description", "");
                            }
                          }}
                        >
                          <Option value="" disabled>
                            Select
                          </Option>
                          {benefits?.map((data) => (
                            <Option value={data._id}>{data.name}</Option>
                          ))}
                        </Select>
                      )}
                    />

                    {<Errors>{errors.benefit?.message}</Errors>}
                  </FlexColumnForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Description <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="text"
                      readOnly
                      {...register("description", {})}
                    />
                    {<Errors>{errors.description?.message}</Errors>}
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
                          message: " Required",
                        },
                        onChange: (e) => {
                          const endDate = getValues("endDate");
                          const startDate = new Date(e.target.value);
                          if (startDate >= new Date(endDate) && endDate) {
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
                    {<Errors>{errors.startDate?.message}</Errors>}
                  </FlexColumnForm>
                  <FlexColumnForm>
                    <InputLabel>End Date</InputLabel>
                    <Input
                      type="date"
                      {...register("endDate", {
                        onChange: (fieldValue) => {
                          const startDateValue = getValues("startDate");

                          const endDateValue = getValues("endDate");

                          if (endDateValue && startDateValue) {
                            const endDate = new Date(endDateValue);
                            const startDate = new Date(startDateValue);
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

                <FlexContaierForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Cost <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="text"
                      {...register("cost", {
                        required: {
                          value: true,
                          message: "Required",
                        },
                        validate: (fieldValue) => {
                          return (
                            (!isNaN(parseFloat(fieldValue)) &&
                              isFinite(fieldValue)) ||
                            "Must be a number"
                          );
                        },
                        pattern: {
                          value: /^[+]?\d+(\.\d+)?$/,
                          message: "Please enter valid cost",
                        },
                      })}
                    />
                    {<Errors>{errors.cost?.message}</Errors>}
                  </FlexColumnForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Employee Contribution rate (%) <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="text"
                      {...register("contributionRate", {
                        required: {
                          value: true,
                          message: "Required",
                        },
                        validate: (fieldValue) => {
                          return (
                            (!isNaN(parseFloat(fieldValue)) &&
                              isFinite(fieldValue)) ||
                            "Must be a number"
                          );
                        },
                        pattern: {
                          value: /^[+]?\d+(\.\d+)?$/,
                          message:
                            "Please enter valid employee contribution rate",
                        },
                      })}
                    />
                    {<Errors>{errors.contributionRate?.message}</Errors>}
                  </FlexColumnForm>
                </FlexContaierForm>
              </FormContainer>

              <FlexContaier style={{ marginTop: "25px" }}>
                {!edit && (
                  <ButtonGrey
                    onClick={() => {
                      Navigate(
                        `/organization-admin/employee/job-details/${employeeid}`
                      );
                    }}
                  >
                    Back
                  </ButtonGrey>
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
    </>
  );
};

export default Benefits;
