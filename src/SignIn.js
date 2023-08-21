import * as React from 'react';
import Button from '@mui/material/Button';
import { TextField, InputLabel } from '@mui/material';
import Link from '@mui/material/Link';
import { Grid, Box } from '@mui/material';

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
                            Sign in
                        </h1>
                        <p className='text'>Welcome to Wagmatcook Employee Management. </p>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <InputLabel>Email Address</InputLabel>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                name="email"
                                placeholder='name@mail.com'
                                autoComplete="email"
                                autoFocus
                            />

                            <InputLabel>Password</InputLabel>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                placeholder='Enter Password'
                                type="password"
                                id="password"
                            />
                            {/* <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            /> */}

                            <Grid container>
                                <Grid item xs>

                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2" className='link'>
                                        Forgot password?
                                    </Link>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                variant="contained"
                                className='mt-1'
                            >
                                Login
                            </Button>
                        </Box>
                    </div>
                </Grid>

            </Grid>

        </React.Fragment>

    );
}