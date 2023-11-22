import React, { useState } from "react";
import Button from "@mui/material/Button";
import { TextField, InputLabel } from "@mui/material";

import { Grid, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import httpClient from "../../api/httpClient";
import { toast } from "react-toastify";

// TODO remove, this demo shouldn't need to reset the theme.

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
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
    //console.log(validateEmail(formData.email));

    if (formData.email && validateEmail(formData.email)) {
      let dataCopy: any = { ...formData };
      let url = `/auth/forgot-password`;

      httpClient({
        method: "post",
        url,
        data: dataCopy,
      })
        .then(({ result, error }) => {
          if (result?.user) {
            toast.info("Reset Password link successfully sent.");
            navigate("/");
          }
        })
        .catch((error: any) => {
          console.error("Error:", error);
        });
    } else {
      toast.warn("All fields are required");
    }
  }

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <div className="sidebar">
            <div className="content-box">
              <div className="logo">Your Community Portal</div>
              <h4 className="mt-6">
                Access your employee and organizational information in one
                location!
              </h4>
              <p>
                Welcome to your employee portal. Here you will be access all
                your employment related information and organization documents
                for greater information sharing.
              </p>
            </div>
            <div className="">
              {/* <img
                src="../assets/login-image.svg"
                alt="background-img"
                width="100%"
              /> */}
            </div>
          </div>
        </Grid>
        <Grid item xs={9}>
          <div className="signup-form mt-8">
            <h1>Forgot password</h1>
            <p className="text">
              No, worries, we’ll send you reset instructions.
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
                  Reset Password
                </Button>
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
