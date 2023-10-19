import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import { RotatingLines, ThreeDots } from "react-loader-spinner";
import { useForm } from "react-hook-form";
import httpClient from "../api/httpClient";
import { toast } from "react-toastify";
import API_URLS from "../constants/apiUrls";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "37.4rem",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 45,
  padding: "2rem 0rem",
  borderRadius: "0.8rem",
};
const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center;
  justify-content: center; */
  padding: 4px 2rem;
  position: relative;
  width: 100%;
  box-sizing: border-box;
`;
const ModalIconDelete = styled.img`
  display: inline-block;
  width: 2.4rem;
  height: 2.4rem;
  cursor: pointer;
  position: absolute;
  right: 1rem;
  top: 0rem;
`;
const ModalHeading = styled.h1`
  color: #222b45;
  /* Body/Body/Bold/M\ */
  font-family: Inter;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.1.6rem;
`;
const UploadDiv = styled.div`
  width: 100%;
  padding: 3rem 0rem 1rem 0rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const UploadLabel = styled.label`
  position: relative;
  width: 15.2rem;
  height: 15.2rem;
  border-radius: 50%;
  border: 2px dashed #d2d3d3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
`;
const UploadImg = styled.img`
  width: 4rem;
  height: 4rem;
`;
const UploadText = styled.p`
  margin: 0rem;
  /* color: #8f9bb3;
   */
  color: black;
  font-family: Inter;
  font-size: 0.8rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;
const FlexColumnForm = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 5px; */
  width: 100%;
`;
export const InputLabel = styled.label`
  color: #222b45;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  /* margin-bottom: 1rem; */
  display: block;
  line-height: 2rem;
  /* text-transform: capitalize; */
`;
export const Input = styled.input`
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 1.6rem;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #dcdcdc;
  border-radius: 0.8rem;
  padding: 1em;
  margin-bottom: 1rem;
  color: #222b45;
  background: #fff;
  box-sizing: border-box;
  outline: #dcdcdc;
  /* text-transform: capitalize; */
`;
const Errors = styled.p`
  display: block;
  color: red;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.2rem;
  margin-top: 2px;
`;
export const InputSpan = styled.span`
  color: red;
  font-weight: 100;
`;
const ButtonBlue = styled.button`
  border-radius: 6px;
  background: #279af1;
  display: inline-flex;
  padding: 1.1rem 1.4rem 1.2rem 1.4rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  color: #fff;
  text-align: center;
  cursor: pointer;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border: none;
  margin-top: 2.5rem;
`;
const ProfileImage = styled.img`
  width: 15.2rem;
  height: 15.2rem;
  border-radius: 50%;
  position: absolute;
  opacity: 0.5;
  object-fit: cover;
`;

const SettingsModal = ({
  openSettings,
  HandleCloseSettings,
  isProfile,
  orgProfile,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFile, setIsFile] = useState(false);
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
    defaultValues: {},
  });
  const [orgFile, setOrgFile] = useState(null);
  const [file, setFile] = useState(null);
  const [orgData, setOrgData] = useState([]);
  const onSubmit = (data) => {
    //console.log("form submmited", data);
    function isEmptyObject(obj) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          return false;
        }
      }
      return true;
    }

    if (isEmptyObject(errors)) {
      //console.log(file, ":this is file ");
      if (file) {
        data.file = file._id;
      } else {
        data.file = null;
      }

      HandleUpdateOrgProfile(data);
    }
  };

  const handleUpload = (file) => {
    if (file) {
      setIsFile(true);
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
            setOrgFile(data?.result?.file);
          }
          setIsFile(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setIsFile(false);
        });
    }
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    // setFile(file);
    if (file) {
      handleUpload(file);
    }
  };
  const HandleUpdateOrgProfile = (data) => {
    // e.preventDefault();
    let dataCopy = data;

    let url = API_URLS.updateOrgProfile;

    setIsLoading(true);

    httpClient({
      method: "put",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          // orgData.name = data.name;
          // orgData.size = data.size;
          // orgData.logo = orgFile;
          
          localStorage.setItem("org", JSON.stringify(result.org));
          HandleCloseSettings();
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
  useEffect(() => {
    setValue("name", orgProfile?.name);
    setValue("size", orgProfile?.size);
    setFile("file", orgProfile?.logo?._id);
    const orgDataString = localStorage.getItem("org");
    const orgData = JSON.parse(orgDataString);
    setOrgData(orgData);

  }, [orgProfile]);
  console.log("this our file ", file);
  let API_URL = process.env.REACT_APP_API_URL;

  return (
    <Modal
      open={openSettings}
      sx={{
        backgroundColor: "rgb(27, 27, 27, 0.75)",
        backdropFilter: "blur(0.8rem)",
      }}
      // onClose={() => {
      //   HandleCloseSettings();
      //   reset({});
      //   clearErrors();
      // }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <>
          {" "}
          {isProfile || isLoading ? (
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "30rem",
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
            <ModalContainer>
              <ModalIconDelete
                onClick={() => {
                  HandleCloseSettings();
                  reset({});
                  clearErrors();
                }}
                src="/images/icons/Alert-Circle.svg"
              />
              <ModalHeading>Organization details</ModalHeading>
              <form onSubmit={handleSubmit(onSubmit)}>
                <UploadDiv>
                  <input
                    style={{ width: "50%" }}
                    type="file"
                    id="upload"
                    onChange={handleFileChange}
                    className="custom"
                  />

                  <UploadLabel htmlFor="upload">
                    {isFile ? (
                      <ThreeDots
                        height="8"
                        width="80"
                        radius="9"
                        color="#279AF1"
                        ariaLabel="three-dots-loading"
                        visible={true}
                      />
                    ) : (
                      <>
                        <ProfileImage
                          src={
                            orgFile
                              ? API_URL + orgFile.path
                              : orgProfile?.logo
                              ? API_URL + orgProfile.logo.path
                              : "/images/User.jpg"
                          }
                        />
                        <UploadImg src="/svg/Camera.svg" />
                        <UploadText>Upload Photo</UploadText>
                      </>
                    )}
                  </UploadLabel>
                </UploadDiv>
                <FlexColumnForm>
                  <InputLabel>
                    Name <InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input
                    type="text"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Required",
                      },
                    })}
                  />
                  {errors.name && <Errors>{errors.name?.message}</Errors>}
                </FlexColumnForm>
                <FlexColumnForm>
                  <InputLabel>
                    Size <InputSpan>*</InputSpan>
                  </InputLabel>
                  <Input
                    type="text"
                    {...register("size", {
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
                    })}
                  />
                  {errors.size && <Errors>{errors.size?.message}</Errors>}
                </FlexColumnForm>

                <ButtonBlue type="submit" disabled={isFile}>
                  Submit
                </ButtonBlue>
              </form>
            </ModalContainer>
          )}
        </>
      </Box>
    </Modal>
  );
};

export default SettingsModal;
