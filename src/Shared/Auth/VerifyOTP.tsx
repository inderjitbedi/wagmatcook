import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { TextField, InputLabel } from "@mui/material";
import { Grid, Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import httpClient from "../../api/httpClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API_URLS from "../../constants/apiUrls";
import redirectToDashboard from "./AuthUtils";
import { RotatingLines } from "react-loader-spinner";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState({});
  useEffect(() => {
    let email = localStorage.getItem("user-email") || "";
    if (!email) {
      navigate("/");
    }
    setFormData({ ...formData, email });
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });

  const [errors, setErrors] = useState({
    otpError: "",
  });

  const resendOTP = () => {
    if (formData.email) {
      let url = API_URLS.resendOtp;

      httpClient({
        method: "post",
        url: url.replace(":email", formData.email),
      })
        .then(({ result, error }) => {
          toast.info(result.message);
        })
        .catch((error: any) => {
          console.error("Error:", error);
        });
    }
  };
  const handleSubmit = (event: any) => {
    setIsLoading(true);

    event.preventDefault();
    if (formData.email && formData.otp) {
      let data: any = { ...formData };
      let url = API_URLS.verifyOtp;

      httpClient({
        method: "post",
        url,
        data,
      })
        .then(({ result, error }: any) => {
          if (result?.user) {
            localStorage.setItem("user", JSON.stringify(result?.user));
            localStorage.setItem("token", result?.token);
            localStorage.setItem("org", JSON.stringify(result?.organization));
            redirectToDashboard(result?.user?.role, navigate);
          }
          setIsLoading(false);
        })
        .catch((error: any) => {
          console.error("Error:", error);
          setIsLoading(false);
        });
    } else {
      toast.warn("Please enter the OTP.");
    }
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "380px",
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
        <>
          <div className="signup-form mt-8  mb-250">
            <h1>Check your inbox!</h1>
            <p className="gray-text">
              We’ve just emailed you an OTP.
              <br /> Please enter it below.{" "}
            </p>
            <form onSubmit={handleSubmit} noValidate>
              <Box sx={{ mt: 1 }}>
                <InputLabel>
                  OTP <span className="astrick">*</span>
                </InputLabel>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="otp"
                  placeholder="Enter OTP"
                  type="text"
                  id="otp"
                  value={formData.otp}
                  onChange={(e) =>
                    setFormData({ ...formData, otp: e.target.value })
                  }
                />
                <Button type="submit" variant="contained" className="mt-1">
                  Login
                </Button>
              </Box>
            </form>
          </div>{" "}
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="info">
              Didn’t receive an email?
              <div className="d-flex dir-row align-center">
                <p>
                  If you can’t find the email in your inbox or spam folder,
                  please click below and we will send you a new one. Button
                </p>
                <Button type="button" variant="contained" onClick={resendOTP}>
                  Resend OTP
                </Button>
              </div>
            </Alert>
          </Stack>
        </>
      )}
    </React.Fragment>
  );
};

export default VerifyOTP;
