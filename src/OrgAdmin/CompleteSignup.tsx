import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { TextField, InputLabel, Stack, Alert } from "@mui/material";
import { Grid, Box } from "@mui/material";
import httpClient from "../api/httpClient";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API_URLS from "../constants/apiUrls";

export default function CompleteSignup() {
  const navigate = useNavigate();
  const { token, email } = useParams();
  // useEffect(() => {
  //   // localStorage.clear()
  //   let isLoggedIn = localStorage.getItem('isLoggedIn');
  //   if (isLoggedIn) {
  //     navigate("/OADashBoard");
  //   } else {
  //     localStorage.clear()
  //   }
  // }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: email,
    token: token
  });

  const [errors, setErrors] = useState({
    emailError: "",
  });
  // const validateEmail = (email: any) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };
  // const validatePassword = (password: any) => {
  //   const passwordRegex =
  //     /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,128}$/;
  //   return passwordRegex.test(password);
  // };

  // const validatePasswordMatch = (value: any) => {
  //   if (formData.password !== value) {
  //     return "Passwords do not match";
  //   }
  //   return "";
  // };

  // const handleEmailChange = (e: any) => {
  //   const { value } = e.target;
  //   setFormData({ ...formData, email: value });

  //   if (!validateEmail(value)) {
  //     setErrors({ ...errors, emailError: "Invalid email address" });
  //   } else {
  //     setErrors({ ...errors, emailError: "" });
  //   }
  // };
  useEffect(() => {
    // console.log(formData);
  }, [formData]);
  // const handlePasswordChange = (e: any) => {
  //   const { value } = e.target;
  //   setFormData({ ...formData, password: value });

  //   if (!validatePassword(value)) {
  //     setErrors({
  //       ...errors,
  //       passwordError:
  //         "Password should be min of 8 characters and must include atleast one uppercase, lowercase, number, and a special character. ",
  //     });
  //   } else {
  //     setErrors({ ...errors, passwordError: "" });
  //   }
  // };

  // const handleConfirmPasswordChange = (e: any) => {
  //   const { value } = e.target;
  //   setFormData({ ...formData, confirmPassword: value });
  //   const confirmPasswordError = validatePasswordMatch(value);
  //   setErrors({ ...errors, confirmPasswordError });
  // };

  function handleSubmit(event: any) {
    event.preventDefault();

    if (formData.name && formData.email) {
      let data: any = { ...formData };

      let url = API_URLS.orgAdminCompleteSignup.replace(":token", data.token);
      delete data.token;
      httpClient({
        method: "put",
        url,
        data,
      })
        .then(({ result }: any) => {
          if (result?.user) {
            localStorage.setItem("user", JSON.stringify(result?.user));
            localStorage.setItem("organization", JSON.stringify(result?.organization));
            localStorage.setItem("token", result?.token);
            navigate("/organization-admin/organization-profile");
          }
        })
        .catch((error: any) => {
          console.error("Error:", error);
        });
    } else {
      toast.warn("All fields are required")
    }
  }

  return (
    <React.Fragment>


      <div className="signup-form mt-8 mb-50" >
        <Link to="/"><p className='upper-text'>Already have an account? <span className='cursor-pointer blue-text'>Login</span></p></Link>
        <h1>Sign up as an Organization Admin</h1>
        <p className="text">
          Please provide your information
        </p>
        <form onSubmit={handleSubmit} noValidate>
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
              placeholder="Enter name"
              autoFocus
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <InputLabel>
              Email Address
              {/* <span className="astrick">*</span> */}
            </InputLabel>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email" disabled InputProps={{
                readOnly: true,
              }}
              placeholder="Enter email"
              value={formData.email}
            />
            {errors.emailError && (
              <span className="error">{errors.emailError}</span>
            )}

            {/* <InputLabel>
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
            )} */}

            <p className="gray-text ">
              By clicking, you agree to our
              <a className="app-link"> Terms of Services </a>
              and that you have read and understood our
              <a className="app-link"> Privacy Policy</a>.
            </p>

            <Button type="submit" variant="contained" className="mt-1">
              Create Your Account
            </Button>
          </Box>
        </form>

      </div>
      {/* <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="info">
              Already have an account?
              <div className="d-flex dir-row align-center">
                <p>
                  If you already have an account, please visit our login page and sign in.
                </p>
               
                <Link to="/signin">
                  <Button type="button" variant="contained">Login</Button>
                </Link>
              </div>
            </Alert>
          </Stack> */}
    </React.Fragment>
  );
}
