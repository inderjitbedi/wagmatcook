import React from "react";
import Button from "@mui/material/Button";
import { TextField, InputLabel } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { Grid, Box } from "@mui/material";
const SALogin = () => {
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
                src="../assets/login-image.svg"
                alt="background-img"
                width="100%"
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={9}>
          <div className="signup-form mt-8">
            <h1>Login in</h1>
            <p className="text">Welcome to Wagmatcook Employee Management. </p>
            <form
              // onSubmit={handleSubmit}
              noValidate
            >
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
                  // value={formData.email}
                  // onChange={handleEmailChange}
                />
                {/* {errors.emailError && (
                  <span className="error">{errors.emailError}</span>
                )} */}

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
};

export default SALogin;
