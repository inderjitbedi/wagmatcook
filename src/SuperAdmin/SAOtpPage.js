import React from 'react'
import Button from "@mui/material/Button";
import { TextField, InputLabel } from "@mui/material";
import { Grid, Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const SAOtpPage = () => {
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
          <div className="signup-form mt-8  mb-250">
            <h1>Check your inbox!</h1>
            <p className="gray-text">
              We’ve just emailed you a OTP.
              <br /> Please enter it below.{" "}
            </p>
            <form
              // onSubmit={handleSubmit}
              noValidate>
              <Box sx={{ mt: 1 }}>
                <InputLabel>
                  OTP { " "}<span className="astrick">*</span>
                </InputLabel>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  placeholder="Enter Password"
                  type="password"
                  id="password"
                  // value={formData.tempPassword}
                  // onChange={(e) =>
                  //   setFormData({ ...formData, tempPassword: e.target.value })
                  // }
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
                <Button
                  type="button"
                  variant="contained"
                  // onClick={resendTempPassword}
                >
                  Resend Email
                </Button>
              </div>
            </Alert>
          </Stack>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default SAOtpPage