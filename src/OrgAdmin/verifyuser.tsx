import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { TextField, InputLabel } from "@mui/material";
import { Grid, Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import httpClient from "../api/httpClient";
import { toast } from "react-toastify";

export default function VerifyUser() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  useEffect(() => {
    let userStr = localStorage.getItem("user");
    if (userStr) {
      let parsedUser = JSON.parse(userStr);
      setUser(parsedUser);
      setFormData({ ...formData, email: parsedUser.email });
    }
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    tempPassword: "",
  });

  const [errors, setErrors] = useState({
    tempPasswordError: "",
  });

  const resendTempPassword = () => {
    if (formData.email) {
      let url = `/auth/resend-temp-password/:email`;

      httpClient({
        method: "post",
        url: url.replace(":email", formData.email),
        // data: dataCopy
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
    event.preventDefault();
    if (formData.email && formData.tempPassword) {
      let dataCopy: any = { ...formData };
      delete dataCopy.confirmPassword;
      let url = `/auth/verify-user/:email/:password`;

      httpClient({
        method: "post",
        url: url
          .replace(":email", formData.email)
          .replace(":password", formData.tempPassword),
        // data: dataCopy
      })
        .then(({ result, error }) => {
          if (result?.user) {
            localStorage.setItem("user", JSON.stringify(result?.user));
            localStorage.setItem("token", result?.token);
            toast.info("Verified successfully.")
            setTimeout(() => {
              navigate("/register-organization");
            }, 500);
          }
        })
        .catch((error: any) => {
          console.error("Error:", error);
        });
    } else {
      toast.warn("Please enter the temporary password.")
    }
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <div className="sidebar">
            <div className="content-box">
              <div className="logo">Your Community Portal</div>
              <h4 className="mt-3">
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
          <div className="signup-form mt-8  mb-250">
            <h1>Check your inbox!</h1>
            <p className="gray-text">
              We’ve just emailed you a temporary password.
              <br /> Please enter it below.{" "}
            </p>
            <form onSubmit={handleSubmit} noValidate>
              <Box sx={{ mt: 1 }}>
                <InputLabel>
                  Temporary password <span className="astrick">*</span>
                </InputLabel>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  placeholder="Enter Password"
                  type="password"
                  id="password"
                  value={formData.tempPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, tempPassword: e.target.value })
                  }
                />

                <Button type="submit" variant="contained" className="mt-1">
                  Continue
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
                  onClick={resendTempPassword}
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
