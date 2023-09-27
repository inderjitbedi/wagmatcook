import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useNavigate, useParams } from "react-router-dom";
import httpClient from "../../api/httpClient";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import InputMask from "react-input-mask";

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
  ImgUpload,
  PersonImg,
  LightPara,
  UploadImgButton,
  FlexColumn,
  UploadPara,
  FlexContaierForm,
  FlexColumnForm,
  InputLabel,
  InputSpan,
  Input,
  Errors,
  ButtonBlue,
  Select,
  Option,
  AlignFlex,
} from "./AddEmployeeStyles";
import API_URLS from "../../constants/apiUrls";

const PersonalInfo = () => {
  let API_URL = process.env.REACT_APP_API_URL;

  const Navigate = useNavigate();
  const [getWorkEmail, setWorkEmail] = useState("");
  const { employeeid, edit } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    file: "",
  });
  const [error, setErrors] = useState({
    fileError: "",
  });
  const handleFileChange = (e) => {
    setErrors({ ...error, fileError: "" });
    const file = e.target.files[0];
    handleUpload(file);
  };

  const removeFile = (e) => {
    setErrors({ ...error, fileError: "" });
    setFile(null);
    setFormData({ ...formData, file: null });
  };
  const handleUpload = (file) => {
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
          if (data?.result) {
            setFile(data?.result?.file);
            // setFormData({ ...formData, file: data?.result.file._id });
          } else {
            setErrors({ ...errors, fileError: data?.error?.error });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  const [result, setResult] = useState(null);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    mode: "all",
    defaultValues: {
      firstName: result?.firstName,
      lastName: result?.lastName,
      workEmail: getWorkEmail,
    },
  });
  const GetEmployeesPersonalInfo = () => {
    setIsLoading(true);
    const trimid = employeeid.trim();
    let url = API_URLS.getEmployeePersonalInfo.replace(
      ":employeeid",
      employeeid
    );
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setResult(result.personalInfo);
          setWorkEmail(result.personalInfo.employee.email);
          if (result.personalInfo?.dob)
            result.personalInfo.dob = new Date(result.personalInfo.dob)
              .toISOString()
              .split("T")[0];
          Object.keys(result.personalInfo).forEach((key) => {
            setValue(key, result.personalInfo[key]);
          });
          setValue("workEmail", result.personalInfo.employee.email);
          setValue("isActive", result.personalInfo.employee.isActive);

          console.log("workemail", result.personalInfo.employee.email);
          if (result.personalInfo?.photo) setFile(result.personalInfo?.photo);
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error fetchi personal info. Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    GetEmployeesPersonalInfo();
  }, []);

  //get Employee Personal Info

  const HandleSubmitPersonalInfo = (data) => {
    // e.preventDefault();
    let dataCopy = data;
    let url = API_URLS.submitEmployeePersonalInfo.replace(
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
          if (edit) {
            // Navigate(`/organization-admin/employee/list`);
            Navigate(-1);
            toast.success(result.message);
          } else {
            Navigate(`/organization-admin/employee/job-details/${employeeid}`);
          }
          setFormData(result);
        } else {
          // toast.warn("something went wrong");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error adding personal info. Please try again.");
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
      console.log(file);
      if (file) {
        data.photo = file._id;
      }

      HandleSubmitPersonalInfo(data);
    }
    console.log("form submmited", data);
  };
  const inputStyles = {
    fontSize: "13px",
    fontWeight: 400,
    lineHeight: "16px",
    width: "100%",
    border: "1px solid #dcdcdc",
    borderRadius: "8px",
    padding: "1em",
    marginBottom: "10px",
    color: "#222b45",
    background: "#fff",
    boxSizing: "border-box",
    outline: "none", // Removed outline color
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
            {edit ? "Update  Employee  Personal Info " : "Add New Employee "}
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
          {!edit && (
            <BodyHeader>
              <BodyHeaderTitle>Personal Information</BodyHeaderTitle>
            </BodyHeader>
          )}

          <BodyMain>
            <BodyMainHeading>Basic Information</BodyMainHeading>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormContainer>
                <ImgUpload>
                  {file ? (
                    <PersonImg
                      src={API_URL + file?.destination + "/" + file?.name}
                      alt=""
                    />
                  ) : (
                    <PersonImg src="/images/User.jpg" alt="" />
                  )}
                  <FlexColumn>
                    <FlexContaier>
                      <FlexContaier>
                        <input
                          type="file"
                          accept="image/*,capture=camera"
                          name="photo"
                          id="photo"
                          className="custom"
                          onChange={handleFileChange}
                        />
                        <UploadImgButton htmlFor="photo">
                          {" "}
                          <IconsEmployee src="/images/icons/UploadIcon.svg" />{" "}
                          Upload image
                        </UploadImgButton>
                      </FlexContaier>
                      <LightPara onClick={removeFile}>Remove</LightPara>
                    </FlexContaier>

                    <UploadPara>
                      *png *jpeg up to 10MB at least 400px by 400px
                    </UploadPara>
                  </FlexColumn>
                </ImgUpload>
                <Errors>{error?.fileError}</Errors>
                {/* first name and last name  */}

                <FlexContaierForm>
                  <FlexColumnForm>
                    <InputLabel>
                      First Name <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="text"
                      {...register("firstName", {
                        required: {
                          value: true,
                          message: "Required",
                        },
                      })}
                    />
                    {<Errors>{errors.firstName?.message}</Errors>}
                  </FlexColumnForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Last Name <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="text"
                      {...register("lastName", {
                        required: {
                          value: true,
                          message: "Required",
                        },
                      })}
                    />
                    {<Errors>{errors.lastName?.message}</Errors>}
                  </FlexColumnForm>
                </FlexContaierForm>

                <FlexContaierForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Address <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="text"
                      {...register("address", {
                        required: {
                          value: true,
                          message: "Required",
                        },
                      })}
                    />
                    {<Errors>{errors.address?.message}</Errors>}
                  </FlexColumnForm>
                  <FlexColumnForm>
                    <InputLabel>
                      City <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="text"
                      {...register("city", {
                        required: {
                          value: true,
                          message: "Required",
                        },
                      })}
                    />
                    {<Errors> {errors.city?.message} </Errors>}
                  </FlexColumnForm>
                </FlexContaierForm>

                <FlexContaierForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Province <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="text"
                      {...register("province", {
                        required: {
                          value: true,
                          message: "Required",
                        },
                      })}
                    />
                    {<Errors> {errors.province?.message} </Errors>}
                  </FlexColumnForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Postal Code <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="text"
                      {...register("postalCode", {
                        required: {
                          value: true,
                          message: "Required",
                        },
                        pattern: {
                          value: /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/,
                          message: "Please enter valid postal code",
                        },
                      })}
                    />
                    {<Errors>{errors.postalCode?.message}</Errors>}
                  </FlexColumnForm>
                </FlexContaierForm>
                <FlexContaierForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Home Phone <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Controller
                      name="homePhone"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Required",
                        },
                      }}
                      render={({ field }) => (
                        <InputMask
                          {...field}
                          style={{ ...inputStyles }}
                          mask="(999) 999-9999"
                          type="text"
                          name="homePhone"
                          onChange={(e) => {
                            const value = e.target.value;
                            const numericPhoneNumber = value.replace(/\D/g, "");
                            const numericValue = parseInt(
                              numericPhoneNumber,
                              10
                            );
                            setValue("homePhone", numericValue);
                          }}
                        />
                      )}
                    />
                    {<Errors> {errors.homePhone?.message} </Errors>}
                  </FlexColumnForm>
                  <FlexColumnForm>
                    <InputLabel>Personal (mobile)</InputLabel>
                    <Controller
                      name="mobile"
                      control={control}
                      render={({ field }) => (
                        <InputMask
                          {...field}
                          type="text"
                          name="mobile"
                          style={{ ...inputStyles }}
                          mask="(999) 999-9999"
                          onChange={(e) => {
                            const value = e.target.value;
                            const numericPhoneNumber = value.replace(/\D/g, "");
                            const numericValue = parseInt(
                              numericPhoneNumber,
                              10
                            );
                            setValue("mobile", numericValue);
                          }}
                        />
                      )}
                    />

                    {<Errors> {errors.mobile?.message} </Errors>}
                  </FlexColumnForm>
                </FlexContaierForm>
                <FlexContaierForm>
                  <FlexColumnForm>
                    <InputLabel>Email-Personal</InputLabel>
                    <Input
                      type="text"
                      {...register("personalEmail", {
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Please enter a valid email",
                        },
                      })}
                    />
                    {<Errors> {errors.personalEmail?.message} </Errors>}
                  </FlexColumnForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Email-Work <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="text"
                      {...register("workEmail", {
                        required: {
                          value: true,
                          message: "Required",
                        },
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Please enter a valid email",
                        },
                      })}
                    />
                    {<Errors> {errors.workEmail?.message} </Errors>}
                  </FlexColumnForm>
                </FlexContaierForm>
                <FlexContaierForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Emergency Contact <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="text"
                      {...register("emergencyContact", {
                        required: {
                          value: true,
                          message: "Required",
                        },
                      })}
                    />
                    {<Errors> {errors.emergencyContact?.message} </Errors>}
                  </FlexColumnForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Emergency Contact number <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Controller
                      name="emergencyContactNumber"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Required",
                        },
                      }}
                      render={({ field }) => (
                        <InputMask
                          {...field}
                          style={{ ...inputStyles }}
                          mask="(999) 999-9999"
                          onChange={(e) => {
                            const value = e.target.value;
                            const numericPhoneNumber = value.replace(/\D/g, "");
                            const numericValue = parseInt(
                              numericPhoneNumber,
                              10
                            );
                            setValue("emergencyContactNumber", numericValue);
                          }}
                          id="phone"
                          type="text"
                          name="emergencyContactNumber"
                        />
                      )}
                    />

                    {
                      <Errors>
                        {" "}
                        {errors.emergencyContactNumber?.message}{" "}
                      </Errors>
                    }
                  </FlexColumnForm>
                </FlexContaierForm>
                <FlexContaierForm>
                  <FlexColumnForm>
                    <AlignFlex>
                      <input
                        type="checkbox"
                        {...register(`isActive`, {})}
                        id={`isBebEligible`}
                      />
                      <InputLabel
                        htmlFor={`isBebEligible`}
                        style={{
                          marginBottom: "0px",
                          cursor: "pointer",
                        }}
                      >
                        Is Active <InputSpan>*</InputSpan>
                      </InputLabel>
                    </AlignFlex>
                  </FlexColumnForm>
                </FlexContaierForm>
              </FormContainer>
              <BodyMainHeading style={{ marginBottom: "25px" }}>
                Personal Information
              </BodyMainHeading>
              <FormContainer>
                <FlexContaierForm>
                  <FlexColumnForm>
                    <InputLabel>Employee ID</InputLabel>
                    <Input
                      type="text"
                      {...register("employeeId", {
                        // required: {
                        //   value: true,
                        //   message: "Required",
                        // },
                      })}
                    />
                    {<Errors> {errors.employeeId?.message} </Errors>}
                  </FlexColumnForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Date of Birth <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="date"
                      {...register("dob", {
                        required: {
                          value: true,
                          message: "Required",
                        },
                        validate: (fieldValue) => {
                          const selectedDate = Date.parse(fieldValue);
                          const currentDate = new Date().setHours(0, 0, 0, 0);
                          if (selectedDate > currentDate) {
                            return "Date of Birth must not be greater than today's date";
                          }
                          return true;
                        },
                      })}
                    />
                    {<Errors> {errors.dob?.message} </Errors>}
                  </FlexColumnForm>
                </FlexContaierForm>
                <FlexContaierForm>
                  <FlexColumnForm>
                    <InputLabel>
                      SIN <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Controller
                      name="sin"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Required",
                        },
                      }}
                      defaultValue=""
                      render={({ field }) => (
                        <InputMask
                          {...field}
                          type="text"
                          name="sin"
                          defaultValue={null}
                          style={{ ...inputStyles }}
                          mask="999-999-999"
                          onChange={(e) => {
                            field.onChange(e);
                            const numericValue = parseInt(
                              e.target.value.replace(/\D/g, ""),
                              10
                            );

                            setValue("sin", numericValue);
                          }}
                        />
                      )}
                    />
                    {<Errors> {errors.sin?.message} </Errors>}
                  </FlexColumnForm>
                  <FlexColumnForm>
                    <InputLabel>
                      Gender <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Controller
                      name="gender"
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
                          <Option value={1}>Male</Option>
                          <Option value={2}>Female</Option>
                          <Option value={3}>Non-Binary</Option>
                        </Select>
                      )}
                    />
                    {<Errors>{errors.gender?.message} </Errors>}
                  </FlexColumnForm>
                </FlexContaierForm>
                <FlexContaierForm>
                  <FlexColumnForm style={{ width: "50%" }}>
                    <InputLabel>Pronouns</InputLabel>
                    <Input type="text" {...register("pronouns", {})} />
                    {<Errors> {errors.pronouns?.message} </Errors>}
                  </FlexColumnForm>
                </FlexContaierForm>
              </FormContainer>
              <ButtonBlue
                type="submit"
                onClick={() => {
                  handleSubmit(onSubmit);
                }}
              >
                {edit ? "Update" : "Continue"}
              </ButtonBlue>
            </form>
          </BodyMain>
        </EmployeeBody>
      )}
      {/* <DevTool control={control} /> */}
    </>
  );
};

export default PersonalInfo;
