import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { TextField, InputLabel } from "@mui/material";

import { Grid, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import httpClient from "../../api/httpClient";
import { toast } from "react-toastify";

// TODO remove, this demo shouldn't need to reset the theme.

export default function SignIn() {
  const navigate = useNavigate();

  useEffect(() => {
    // localStorage.clear()
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      navigate("/OADashBoard");
    } else {
      localStorage.clear();
    }
  }, []);

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
    // console.log(validateEmail(formData.email));

    if (formData.email && formData.password && validateEmail(formData.email)) {
      let dataCopy: any = { ...formData };
      let url = `/auth/login`;

      httpClient({
        method: "post",
        url,
        data: dataCopy,
      })
        .then(({ result, error }: any) => {
          if (result?.user) {
            localStorage.setItem("user", JSON.stringify(result?.user));
            localStorage.setItem("token", result?.token);
            localStorage.setItem("isLoggedIn", "true");
            toast.info("Welcome " + result.user.name);
            navigate("/OADashBoard");
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
              <div className="logo">Wagmatcook</div>
              <h4 className="mt-6">
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
                src="../assets/solar-bg.png"
                alt="background-img"
                width="100%"
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={9} style={{ position: "relative" }}>
          {/* <p className='upper-text'>New On Wagmatcook ? <span className='blue-text'>Create Account</span></p> */}

          <div className="signup-form mt-8">
            <h1>Sign in</h1>
            <p className="text">Welcome to Wagmatcook Employee Management. </p>
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

                <InputLabel>
                  Password <span className="astrick">*</span>
                </InputLabel>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  placeholder="Enter password"
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                {/* <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            /> */}

                <Grid container>
                  <Grid item xs></Grid>
                  <Grid item>
                    <Link to="/forgot-password" className="link">
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
                <Button type="submit" variant="contained" className="mt-1">
                  Login
                </Button>
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
