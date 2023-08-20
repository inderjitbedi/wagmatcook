import * as React from 'react';
import Button from '@mui/material/Button';
import { TextField, InputLabel } from '@mui/material';
import Link from '@mui/material/Link';
import { Grid, Box } from '@mui/material';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
// TODO remove, this demo shouldn't need to reset the theme.



export default function SignIn() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

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
                        <h1>
                            Check your inbox!
                        </h1>
                        <p className='gray-text'>We’ve just emailed you a temporary password.
                            <br /> Please enter it below. </p>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <InputLabel>Temporary password</InputLabel>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                placeholder='Enter Password'
                                type="password"
                                id="password"
                            />

                            <Button
                                type="submit"
                                variant="contained"
                            >
                                Continue
                            </Button>
                        </Box>


                        <Stack sx={{ width: '100%' }} spacing={2}>

                            <Alert severity="info">Didn’t receive an email?
                                <div className='d-flex dir-row align-center'>
                                    <p>
                                        If you can’t find the email in your inbox or spam folder, please click below and we will send you a new one.
                                        Button
                                    </p>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                    >
                                        Resend Email
                                    </Button>
                                </div>
                            </Alert>
                        </Stack>
                    </div>
                </Grid>

            </Grid>

        </React.Fragment>

    );
}