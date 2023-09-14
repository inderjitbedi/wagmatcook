import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller, useFieldArray, set } from "react-hook-form";
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
  DeleteIcon,
  TrashDiv,
  UploadLabel,
  UploadIcon,
  RemoveContainer,
} from "./AddEmployeeStyles";

const CertificatesInfo = () => {
  const Navigate = useNavigate();
  const { employeeid, edit } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [file, setFile] = useState(null);

  const initialPosition = {
    title: "",
    provider: "",
    completionDate: "",
    expiryDate: "",
    file: "",
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
      certificates: [initialPosition],
    },
  });
  const { fields, remove, append, insert } = useFieldArray({
    name: "certificates",
    control,
  });

  const HandleSubmitcertificates = (data) => {
    // e.preventDefault();
    let dataCopy = data;
    let url = `/employee/certificates/${employeeid}`;

    setIsLoading(true);

    httpClient({
      method: "put",
      url,
      data: dataCopy,
    })
      .then(({ result }) => {
        if (result) {
          // console.log(result);
          if (edit) {
            // Navigate(`/organization-admin/employee/list`);
            Navigate(-1);
          } else {
            Navigate(`/organization-admin/employee/list`);
          }
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

  const onSubmit = (data) => {
    console.log("data and working data:", data);
    function isEmptyObject(obj) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          return false;
        }
      }
      return true;
    }

    if (isEmptyObject(errors)) {
      HandleSubmitcertificates(data);
    }
    // console.log("form submmited", data);
  };

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
            // insert(index, (file = data?.result?.file?._id));
            // const certificatevalue = getValues("certificates")
            // const newval = certificatevalue[index].file;
            // console.log(
            //   "this is certificates value file :",
            //   certificatevalue[index].file,
            //   "file id :",
            //   data?.result?.file?._id
            // );
         
            setValue(getValues("certificates")[index].file, data?.result?.file?._id);
            
            
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
  const GetEmployeesCertificates = () => {
    setIsLoading(true);
    const trimid = employeeid.trim();
    let url = `/employee/job-details/${trimid}`;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result }) => {
        if (result) {
          console.log(result, "this what result Looks like ");
          setResult(result);

          if (result.certificates) {
            result.certificates.forEach((data) => {
              if (data.completionDate || data.expiryDate) {
                data.completionDate = new Date(data.completionDate)
                  .toISOString()
                  .split("T")[0];
                data.expiryDate = new Date(data.expiryDate)
                  .toISOString()
                  .split("T")[0];

                data.file = data.file._id;
              }
            });
          }

          reset(result.certificates);

          // adding if no position added
          // if (!result.certificates?.length) {
          //   append(initialPosition);
          // }
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
    GetEmployeesCertificates();
  }, [reset, edit]);
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
            {edit ? "Update Certificates " : "Add New Employee"}
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
        <EmployeeBody style={{ height: "max-content" }}>
          <BodyHeader>
            <BodyHeaderTitle>
              <span
                style={{ color: "#8B8B8B", cursor: "pointer" }}
                onClick={() => Navigate("/add-new-employee/personal-info")}
              >
                {" "}
                Personal Information &#62;{" "}
              </span>{" "}
              <span
                style={{ color: "#8B8B8B", cursor: "pointer" }}
                onClick={() => Navigate("/add-new-employee/job-details")}
              >
                Job Details &#62;
              </span>
              <span
                style={{ color: "#8B8B8B", cursor: "pointer" }}
                onClick={() => Navigate("/add-new-employee/benefits")}
              >
                {" "}
                Benefits &#62;{" "}
              </span>{" "}
              Certificates
            </BodyHeaderTitle>
          </BodyHeader>
          <BodyMain>
            <BodyMainHeading style={{ marginBottom: "25px" }}>
              Certificates Info
            </BodyMainHeading>
            <form onSubmit={handleSubmit(onSubmit)}>
              {fields.map((field, index) => (
                <FormContainer key={field.id}>
                  <FlexContaierForm>
                    <FlexColumnForm>
                      <InputLabel>
                        Certificates Title <InputSpan>*</InputSpan>
                      </InputLabel>
                      <Input
                        type="text"
                        {...register(`certificates.${index}.title`, {
                          required: {
                            value: true,
                            message: "Required",
                          },
                        })}
                      />
                      <ErrorMessage
                        as={<Errors />}
                        errors={errors}
                        name={`certificates.${index}.title`}
                      />
                    </FlexColumnForm>
                    <FlexColumnForm>
                      <InputLabel>
                        Provider <InputSpan>*</InputSpan>
                      </InputLabel>
                      <Input
                        type="text"
                        {...register(`certificates.${index}.provider`, {
                          required: {
                            value: true,
                            message: "Required",
                          },
                        })}
                      />
                      <ErrorMessage
                        as={<Errors />}
                        errors={errors}
                        name={`certificates.${index}.provider`}
                      />
                    </FlexColumnForm>
                  </FlexContaierForm>

                  <FlexContaierForm>
                    <FlexColumnForm>
                      <InputLabel>
                        Completion Date<InputSpan>*</InputSpan>
                      </InputLabel>
                      <Input
                        type="date"
                        {...register(`certificates.${index}.completionDate`, {
                          required: {
                            value: true,
                            message: "Required",
                          },
                        })}
                      />
                      <ErrorMessage
                        as={<Errors />}
                        errors={errors}
                        name={`certificates.${index}.copletionDate`}
                      />
                    </FlexColumnForm>
                    <FlexColumnForm>
                      <InputLabel>
                        Expiry <InputSpan>*</InputSpan>
                      </InputLabel>
                      <Input
                        type="date"
                        {...register(`certificates.${index}.expiryDate`, {
                          required: {
                            value: true,
                            message: "Required",
                          },
                          // validate: (fieldValue) => {
                          // console.log(
                          //   getValues(`certificates[0].completionDate`),"is it working"
                          // );
                          //   const startDate = new Date(
                          //     getValues(`certificates.${index}.completionDate`)
                          //   );
                          //   const endDate = new Date(fieldValue);
                          //   return (
                          //     startDate <= endDate ||
                          //     "Must not be earlier than completion date"
                          //   );
                          // },
                        })}
                      />
                      <ErrorMessage
                        as={<Errors />}
                        errors={errors}
                        name={`certificates.${index}.expiryDate`}
                      />{" "}
                    </FlexColumnForm>
                  </FlexContaierForm>

                  <TrashDiv style={{ justifyContent: "space-between" }}>
                    <FlexColumnForm>
                      <input
                        type="file"
                        accept="image/*,capture=camera"
                        {...register(`certificates.${index}.file`, {
                          required: {
                            value: true,
                            message: "Required",
                          },
                          onChange: (e) => {
                            handleFileChange(e, index);
                          },
                        })}
                        id="file"
                        className="custom"
                      />
                      <UploadLabel
                        style={{ marginBottom: "10px" }}
                        htmlFor="file"
                      >
                        Upload Document{" "}
                        <UploadIcon src="/images/icons/BlueUpload.svg" />{" "}
                      </UploadLabel>
                      <ErrorMessage
                        as={<Errors />}
                        errors={errors}
                        name={`certificates.${index}.file`}
                      />
                    </FlexColumnForm>{" "}
                    {getValues("certificates").length > 1 && (
                      <RemoveContainer onClick={() => remove(index)}>
                        <DeleteIcon src="/images/icons/trash-empty.svg" />{" "}
                        <span>Remove</span>
                      </RemoveContainer>
                    )}
                  </TrashDiv>
                </FormContainer>
              ))}

              <BluePara onClick={() => append(initialPosition)}>
                {" "}
                Add New
              </BluePara>
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
    </>
  );
};

export default CertificatesInfo;
