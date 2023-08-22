import * as React from 'react';
import Button from '@mui/material/Button';
import { TextField, InputLabel } from '@mui/material';
import { Grid, Box } from '@mui/material';

// TODO remove, this demo shouldn't need to reset the theme.



export default function RegisterOrganization() {
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
                            <h4 className="mt-3">Communicate to Employees via Feeds, SMS, Email</h4>
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
                            Sign up as an organization
                        </h1>
                        <p className='text'>Please provide your Organization information</p>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <div>
                                <div class="file-input flex items-center ">

                                    <div class="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                        <div className='image-container '  >
                                            <img src="../assets/user.png" alt='user' />
                                        </div>
                                        {/* <div class="h-12 w-12 rounded-full overflow-hidden image-container">
                                        <img src="../assets/user.png" alt="" class="" />
                                    </div> */}
                                    </div>

                                    <div class="flex items-center">
                                        <div class="ml-5 rounded-md">
                                            <input
                                                type="file"
                                                accept="image/*,capture=camera"
                                                name="photo" id="photo"
                                                className="custom" />
                                            <label className='org-logo'>Organization Logo</label>
                                            <label for="photo"
                                                class="upload-photo">

                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2 10C2 11.8856 2 12.8284 2.58579 13.4142C3.17157 14 4.11438 14 6 14H10C11.8856 14 12.8284 14 13.4142 13.4142C14 12.8284 14 11.8856 14 10" stroke="#595959" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M7.99967 10.6667V2M7.99967 2L10.6663 4.91667M7.99967 2L5.33301 4.91667" stroke="#595959" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg> &nbsp;

                                                Upload Photo
                                            </label>
                                        </div>

                                        <button
                                            type="button"
                                            aria-label="Remove button"
                                            class="mx-1 mt-2 remove-button">
                                            Remove
                                        </button>
                                        {/* <span className='gray-text'>*png *jpeg up to 10MB at least 400px by 400px</span> */}
                                    </div>


                                </div>
                                <span className='upload-info'>*png *jpeg up to 10MB at least 400px by 400px</span>
                            </div>
                            <InputLabel>Organization name</InputLabel>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                name="name"
                                placeholder='Enter Name'
                                autoFocus
                            />

                            <InputLabel>Organization size</InputLabel>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="text"
                                placeholder='Enter Here'
                                type="text"
                                id="text"
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                className='mt-1'
                            >
                                Submit
                            </Button>
                        </Box>
                    </div>
                </Grid >

            </Grid >

        </React.Fragment >

    );
}