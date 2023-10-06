import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller, useFieldArray, set } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import httpClient from "../../api/httpClient";
import { toast } from "react-toastify";
import { RotatingLines, ThreeDots } from "react-loader-spinner";
import { ErrorMessage } from "@hookform/error-message";
import SuccessfullModal from "./SuccessfullModal";
import CommenDashHeader from "../../Dashboard/CommenDashHeader";
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
  LightPara,
  RemoveContainer,
} from "./AddEmployeeStyles";
import API_URLS from "../../constants/apiUrls";

const CertificatesInfo = () => {
  const Navigate = useNavigate();
  const { employeeid, edit } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState({});
  const [result, setResult] = useState([]);
  const [file, setFiles] = useState([]);
  const [openThanks, setOpenThanks] = useState(false);
  const HandleOpenThanks = () => setOpenThanks(true);
  const HandleCloseThanks = () => {
    Navigate(`/organization-admin/employee/list`);
    setOpenThanks(false);
  };

  const initialPosition = {
    title: "",
    provider: "",
    completionDate: "",
    expiryDate: "",
    file: null,
  };
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    setValue,
    clearErrors,
    setError,
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
    let dataCopy = {
      certificates: data.certificates.map((certificate, index) => {
        const selectedFile = file[index];
        certificate.file = null;
        if (selectedFile && selectedFile._id) {
          certificate.file = selectedFile._id;
        }
        return certificate;
      }),
    };

    let url = API_URLS.submitEmployeeCertificates.replace(
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
          } else {
            // Navigate(`/organization-admin/employee/list`);
            HandleOpenThanks();
          }
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
      HandleSubmitcertificates(data);
    }
  };
  const getFileType = (file) => {
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png", "gif", "tiff"].includes(fileExtension)) {
      return "image";
    } else if (["mp4", "ogg", "webm"].includes(fileExtension)) {
      return "video";
    } else if (fileExtension === "pdf") {
      return "pdf";
    } else if (fileExtension === "xlsx" || fileExtension === "xls") {
      return "xlsx";
    } else if (fileExtension === "doc" || fileExtension === "docx") {
      return "doc";
    } else {
      return "unknown";
    }
  };
  const handleFileChange = async (e, index) => {
    // e.preventDefault();

    const file = e.target.files[0];
    let type = await getFileType(e.target.files[0]);
    if (type != "unknown") {
      handleUpload(file, type);
    } else {
      toast.error("Unsuported file type.");
    }
    handleUpload(file, index, type);
  };
  const handleUpload = (file, index, type) => {
    setIsUploading({ [index]: true });
    if (file) {
      const binary = new FormData();
      binary.append("file", file);

      httpClient({
        method: "post",
        url: API_URLS.uploadDocuments.replace(":type", type),
        data: binary, // Use 'data' to send the FormData
        headers: {
          "Content-Type": "multipart/form-data", // Set the Content-Type header to 'multipart/form-data'
        },
      })
        .then((data) => {
          if (data?.result) {
            setFiles((prevFiles) => {
              const updatedFiles = [...prevFiles];
              updatedFiles[index] = data?.result?.file;
              return updatedFiles;
            });
            setIsUploading({ [index]: false });

            // setValue(`certificates[${index}].file`, data?.result?.file);
          } else {
            // setErrors({ ...errors, fileError: data?.error?.error });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setIsUploading({ [index]: false });
        });
    }
  };
  const removeFile = (index) => {
    // e.preventDefault();
    setFiles((prevFiles) => {
      let updatedFiles = [...prevFiles];
      updatedFiles[index] = null;
      return updatedFiles;
    });
  };
  console.log(file, "values in files array ");
  const GetEmployeesCertificates = () => {
    setIsLoading(true);
    const trimid = employeeid.trim();
    let url = API_URLS.getEmployeeCertificates.replace(
      ":employeeid",
      employeeid
    );
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          // console.log(result, "this what result Looks like ");
          setResult(result);
          const resetfile = result.certificates.map((data) => data.file);
          setFiles(resetfile);
          if (result.certificates) {
            // console.log("certificates is working");
            result.certificates.forEach((data) => {
              if (data.completionDate || data.expiryDate) {
                data.completionDate = new Date(data.completionDate)
                  .toISOString()
                  .split("T")[0];
                data.expiryDate = new Date(data.expiryDate)
                  .toISOString()
                  .split("T")[0];
                data.file = data.file?._id;
              }
            });
          }

          const resetData = { certificates: result.certificates };
          console.log("result of get :", result.certificates);
          if (result.certificates?.length) {
            reset(resetData);
          }
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
    GetHeadersData();
    GetEmployeesCertificates();
    if (!getValues("certificates").length) {
      append(initialPosition);
    }
  }, []);
  const [headerData, setHeaderData] = useState([]);

  const GetHeadersData = () => {
    // setIsLoading(true);
    const trimid = employeeid.trim();
    let url = `/employee/header-info/${trimid}`;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setHeaderData(result);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error in fetching Personal info. Please try again.");
      });
  };
  const [searchValue, setSearchValue] = useState("");

  const HandleSearchCahnge = (data) => {
    setSearchValue(data);
  };
  return (
    <>
      <CommenDashHeader
        onSearch={HandleSearchCahnge}
        text={"Add New Employee"}
      />

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
          {!edit && (
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
                </span>
                <span
                  style={{ color: "#8B8B8B", cursor: "pointer" }}
                  onClick={() =>
                    Navigate(
                      `/organization-admin/employee/benefits/${employeeid}`
                    )
                  }
                >
                  {" "}
                  Benefits &#62;{" "}
                </span>{" "}
                Certificates
              </BodyHeaderTitle>
            </BodyHeader>
          )}

          <BodyMain>
            <BodyMainHeading style={{ marginBottom: "25px" }}>
              Certificates Info
            </BodyMainHeading>
            <form onSubmit={handleSubmit(onSubmit)}>
              {fields.map((field, index) => (
                <FormContainer key={field.id}>
                  <FlexContaierForm style={{ alignItems: "flex-start" }}>
                    <FlexColumnForm>
                      <InputLabel>
                        Certificate Title <InputSpan>*</InputSpan>
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

                  <FlexContaierForm style={{ alignItems: "flex-start" }}>
                    <FlexColumnForm>
                      <InputLabel>
                        Completion Date <InputSpan>*</InputSpan>
                      </InputLabel>
                      <Input
                        type="date"
                        {...register(`certificates.${index}.completionDate`, {
                          valueAsDate: true,
                          required: {
                            value: true,
                            message: "Required",
                          },
                          validate: (fieldValue) => {
                            const selectedDate = Date.parse(fieldValue);
                            const currentDate = new Date().setHours(0, 0, 0, 0);
                            if (selectedDate >= currentDate) {
                              return "Completion Date must not be greater than today's date";
                            }
                            return true;
                          },
                          onChange: (e) => {
                            const endDateValue = getValues(
                              `certificates.${index}.expiryDate`
                            );
                            const startDateValue = getValues(
                              `certificates.${index}.completionDate`
                            );
                            if (endDateValue && startDateValue) {
                              const endDate = new Date(endDateValue);
                              const startDate = new Date(startDateValue);

                              if (startDate > endDate) {
                                setError(`certificates.${index}.expiryDate`, {
                                  type: "custom",
                                  message:
                                    "End date must not be earlier than start date",
                                });
                              } else {
                                clearErrors(`certificates.${index}.expiryDate`);
                              }
                            }
                          },
                        })}
                      />
                      <ErrorMessage
                        as={<Errors />}
                        errors={errors}
                        name={`certificates.${index}.completionDate`}
                      />
                    </FlexColumnForm>
                    <FlexColumnForm>
                      <InputLabel>Expiry</InputLabel>
                      <Input
                        type="date"
                        {...register(`certificates.${index}.expiryDate`, {
                          valueAsDate: true,
                          // required: {
                          //   value: true,
                          //   message: "Required",
                          // },
                          validate: (fieldValue) => {
                            const startDateValue = getValues(
                              `certificates.${index}.completionDate`
                            );

                            const endDateValue = getValues(
                              `certificates.${index}.expiryDate`
                            );

                            if (endDateValue && startDateValue) {
                              const endDate = new Date(endDateValue);
                              const startDate = new Date(startDateValue);
                              if (startDate > endDate) {
                                return setError(
                                  `certificates.${index}.expiryDate`,
                                  {
                                    type: "custom",
                                    message:
                                      "End date must not be earlier than start date   ",
                                  }
                                );
                              }
                            } else {
                              return clearErrors(
                                `certificates.${index}.expiryDate`
                              );
                            }
                          },
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
                        {...register(`certificates.${index}.file`, {
                          // required: {
                          //   value: edit ? false : true,
                          //   message: "Required",
                          // },

                          onChange: (e) => {
                            handleFileChange(e, index);
                          },
                        })}
                        // onChange={(e) => handleFileChange(e,index)}
                        name={`certificates.${index}.file`}
                        id={`file${index}`}
                        className="custom"
                      />
                      <div
                        style={{
                          display: "flex",
                          gap: "16px",
                          alignItems: "center",
                          marginBottom: "20px",
                        }}
                      >
                        <UploadLabel
                          style={{ marginBottom: "10px", width: "max-content" }}
                          htmlFor={`file${index}`}
                        >
                          {isUploading[index] ? (
                            <ThreeDots
                              height="8"
                              width="80"
                              radius="9"
                              color="#279AF1"
                              ariaLabel="three-dots-loading"
                              visible={true}
                            />
                          ) : !file[index] ? (
                            "Upload Document "
                          ) : file[index]?.originalName?.length <= 32 ? (
                            file[index]?.originalName
                          ) : (
                            file[index]?.originalName?.substring(0, 30) + "..."
                          )}
                          <UploadIcon src="/images/icons/BlueUpload.svg" />{" "}
                        </UploadLabel>
                        {file[index] && (
                          <LightPara onClick={() => removeFile(index)}>
                            Remove
                          </LightPara>
                        )}
                      </div>
                      <ErrorMessage
                        as={<Errors />}
                        errors={errors}
                        name={`certificates.${index}.file`}
                      />
                    </FlexColumnForm>{" "}
                    {getValues("certificates")?.length > 1 && (
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
                  <ButtonGrey
                    onClick={() =>
                      Navigate(
                        `/organization-admin/employee/benefits/${employeeid}`
                      )
                    }
                  >
                    Back
                  </ButtonGrey>
                )}
                <ButtonBlue type="submit">
                  {edit ? "Update" : "Continue"}
                </ButtonBlue>
              </FlexContaier>
            </form>
          </BodyMain>
        </EmployeeBody>
      )}
      <SuccessfullModal
        openThanks={openThanks}
        HandleCloseThanks={HandleCloseThanks}
      />
      {/* <DevTool control={control} /> */}
    </>
  );
};

export default CertificatesInfo;
