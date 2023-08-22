import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { TextField, InputLabel } from "@mui/material";
import { Grid, Box } from "@mui/material";
import httpClient from "../../../../api/httpClient";
import { call } from "redux-saga/effects";
import { useNavigate } from "react-router-dom";

export default function Signup() {
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
  const validatePassword = (password: any) => {
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,128}$/;
    return passwordRegex.test(password);
  };

  const validatePasswordMatch = (value: any) => {
    if (formData.password !== value) {
      return "Passwords do not match";
    }
    return "";
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
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  const handlePasswordChange = (e: any) => {
    const { value } = e.target;
    setFormData({ ...formData, password: value });

    if (!validatePassword(value)) {
      setErrors({
        ...errors,
        passwordError:
          "Password should be min of 8 characters and must include atleast one uppercase, lowercase, number, and a special character. ",
      });
    } else {
      setErrors({ ...errors, passwordError: "" });
    }
  };

  const handleConfirmPasswordChange = (e: any) => {
    const { value } = e.target;
    setFormData({ ...formData, confirmPassword: value });
    const confirmPasswordError = validatePasswordMatch(value);
    setErrors({ ...errors, confirmPasswordError });
  };

  function handleSubmit(event: any) {
    event.preventDefault();
    if (formData.email && validateEmail(formData.email)) {
      let dataCopy: any = { ...formData };
      delete dataCopy.confirmPassword;
      let url = `/auth/register`;

      httpClient({
        method: "post",
        url,
        data: dataCopy,
      })
        .then(({ result }) => {
          if (result?.user) {
            localStorage.setItem("user", JSON.stringify(result?.user));
            navigate("/verifyuser");
          }
        })
        .catch((error: any) => {
          console.error("Error:", error);
        });
    }
  }

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <div className="sidebar">
            <div className="content-box">
              <div className="logo">Wagmatcook</div>
              <h4 className="mt-3">
                Communicate to Employees via Feeds, SMS, Email
              </h4>
              <p>
                Welcome to our website! We hope it provides you with a good
                perspective about our community. Better yet, come visit us and
                the experiences we are willing to share with you.
              </p>
            </div>
            <div className="">
              <img
                src="../assets/login-image.svg"
                alt="background-img"
                width="100%"
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={9}>
          <div className="signup-form mt-8">
            <h1>Sign up as an organization</h1>
            <p className="text">
              Please provide your Organization information{" "}
            </p>
            <form onSubmit={handleSubmit}>
              <Box sx={{ mt: 1 }}>
                <InputLabel>
                  Full Name <span className="astrick">*</span>
                </InputLabel>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  name="name"
                  placeholder=""
                  autoFocus
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />

                <InputLabel>
                  Email Address <span className="astrick">*</span>
                </InputLabel>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  placeholder="name@mail.com"
                  value={formData.email}
                  onChange={handleEmailChange}
                />
                {errors.emailError && (
                  <span className="error">{errors.emailError}</span>
                )}

                <InputLabel>
                  Password <span className="astrick">*</span>
                </InputLabel>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  placeholder="Enter Password"
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handlePasswordChange}
                />
                {errors.passwordError && (
                  <span className="error">{errors.passwordError}</span>
                )}

                <InputLabel>
                  Confirm Password <span className="astrick">*</span>
                </InputLabel>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmpassword"
                  placeholder="Re-Enter Password"
                  type="password"
                  id="confirmpassword"
                  value={formData.confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                {errors.confirmPasswordError && (
                  <span className="error">{errors.confirmPasswordError}</span>
                )}

                <p className="gray-text ">
                  By clicking, you agree to our
                  <a className="App-link">Terms of Services</a>
                  and that you have read and understood our
                  <a className="App-link">Privacy Policy</a> .
                </p>

                <Button type="submit" variant="contained" className="mt-1">
                  Create Your Account
                </Button>
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
