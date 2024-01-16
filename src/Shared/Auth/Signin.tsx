import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { TextField, InputLabel } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

import { Box } from "@mui/material";
import httpClient from "../../api/httpClient";
import { toast } from "react-toastify";
import API_URLS from "../../constants/apiUrls";
import redirectToDashboard from "./AuthUtils";

const SharedSignin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  console.log(process.env.REACT_APP_API_URL);

  useEffect(() => {
    console.log(process.env.REACT_APP_API_URL);

  }, []);

  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({
    emailError: "",
  });
  const validateEmail = (email: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: any) => {
    const { value } = e.target;
    setFormData({ ...formData, email: value });

    if (!validateEmail(value)) {
      setErrors({ ...errors, emailError: "Invalid email address" });
    } else {
      setErrors({ ...errors, emailError: "" });
    }
  };
  function handleSubmit(event: any) {
    event.preventDefault();
    setIsLoading(true);

    if (formData.email && validateEmail(formData.email)) {
      let data: any = { ...formData };
      let url = API_URLS.loginWithOtp;
      data.email = formData.email.toLowerCase();
      httpClient({
        method: "post",
        url,
        data,
      })
        .then(({ result, error }: any) => {
          if (result) {
            localStorage.setItem("user-email", formData.email);

            // localStorage.setItem("user", JSON.stringify(result?.user));
            // localStorage.setItem("token", result?.token);
            // localStorage.setItem("org", JSON.stringify(result?.organization));
            // redirectToDashboard(result?.user?.role, navigate);

            navigate("/verify-otp");
            toast.success(result.message, {
              className: "toast",
            });
          }
          setIsLoading(false);
        })
        .catch((error: any) => {
          console.error("Error:", error);
          setIsLoading(false);
        });
    } else {
      toast.warn("All fields are required");
      setIsLoading(false);
    }
  }
  return (
    <React.Fragment>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "38rem",
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
        <div className="signup-form mt-8">
          <h1>Sign in</h1>
          <p className="text">
            Welcome to Your Community Portal Employee Management.
          </p>
          <form onSubmit={handleSubmit} noValidate>
            <Box sx={{ mt: 1 }}>
              <InputLabel>
                Email Address <span className="astrick">*</span>
              </InputLabel>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                placeholder="Enter email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleEmailChange}
              />
              {errors.emailError && (
                <span className="error">{errors.emailError}</span>
              )}
              <Button type="submit" variant="contained" className="mt-1">
                Get OTP
              </Button>
            </Box>
          </form>
        </div>
      )}
    </React.Fragment>
  );
};

export default SharedSignin;
