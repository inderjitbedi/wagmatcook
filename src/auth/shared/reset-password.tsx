import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { TextField, InputLabel } from '@mui/material';

import { Grid, Box } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import httpClient from '../../api/httpClient';
import { toast } from 'react-toastify';

// TODO remove, this demo shouldn't need to reset the theme.



export default function ResetPassword() {
    const navigate = useNavigate();
    const { token } = useParams();

    const [formData, setFormData] = useState({
        token: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        token: "",
        passwordError: "",
        confirmPasswordError: "",
    });
    const validatePassword = (password: any) => {
        const passwordRegex =
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,128}$/;
        return passwordRegex.test(password);
    };

    const validatePasswordMatch = (value: any) => {
        if (formData.newPassword !== value) {
            return "Passwords do not match";
        }
        return "";
    };

    const handlePasswordChange = (e: any) => {
        const { value } = e.target;
        setFormData({ ...formData, newPassword: value });

        if (!validatePassword(value)) {
            setErrors({
                ...errors,
                passwordError:
                    "Invalid password",
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
        console.log(token);

        if (token && formData.confirmPassword && formData.newPassword
            && validatePassword(formData.newPassword)
            && !validatePasswordMatch(formData.confirmPassword)) {
            let dataCopy: any = { ...formData };
            let url = `/auth/reset-password/:token`;

            httpClient({
                method: "post",
                url: url.replace(":token", token),
                data: dataCopy,
            })
                .then(({ result }) => {
                    if (result?.user) {
                        toast.info("Password successfully updated.")
                        navigate("/signin");
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
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <div className='sidebar'>
                        <div className='content-box'>
                            <div className='logo'>Wagmatcook</div>
                            <h4 className="mt-6">Communicate to Employees via Feeds, SMS, Email</h4>
                            <p>Welcome to our website! We hope it provides you with a good perspective about our community. Better yet, come visit us and the experiences we are willing to share with you.</p>
                        </div>
                        <div className=''>
                            <img src="../assets/login-image.svg" alt="background-img" width="100%" />
                        </div>
                    </div>
                </Grid>
                <Grid item xs={9}>
                    <div className='signup-form mt-8'>
                        <h1>Set new password</h1>
                        <p className='text'>Must be at least 8 characters and must include atleast one uppercase, lowercase, number, and a special character. </p>
                        <form onSubmit={handleSubmit} noValidate>
                            <Box sx={{ mt: 1 }}>
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
                                    value={formData.newPassword}
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


                                <Button
                                    type="submit"
                                    variant="contained"
                                    className='mt-1'
                                >
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