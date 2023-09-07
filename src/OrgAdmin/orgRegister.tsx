import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { TextField, InputLabel } from '@mui/material';
import { Grid, Box } from '@mui/material';
import httpClient from '../api/httpClient';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

// TODO remove, this demo shouldn't need to reset the theme.



export default function RegisterOrganization() {
    const navigate = useNavigate();


    useEffect(() => {

        let orgStr = localStorage.getItem('organization')
        if (orgStr) {
            let org = JSON.parse(orgStr);
            setFormData({ ...formData, name: org.name })
        console.log(org.name);

        }
    }, []);
    const [formData, setFormData] = useState<any>({
        name: "",
        size: "",
        file: ""
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [file, setFile] = useState<any>(null);

    const [errors, setErrors] = useState({
        nameError: "",
        sizeError: "",
        fileError: "",
    });

    const handleFileChange = (e: any) => {
        setErrors({ ...errors, fileError: "" });
        const file = e.target.files[0];
        handleUpload(file);
    };


    const removeFile = (e: any) => {
        setErrors({ ...errors, fileError: "" });
        setFile(null)
        setFormData({ ...formData, file: null })
    };


    const handleUpload = (file: any) => {
        if (file) {
            const binary = new FormData();
            binary.append('file', file);

            httpClient({
                method: "post",
                url: "/organization/file/upload/image",
                data: binary, // Use 'data' to send the FormData
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the Content-Type header to 'multipart/form-data'
                },
            })
                .then((data: any) => {
                    console.log(data);

                    if (data?.result) {
                        console.log(data?.result);
                        setFile(data?.result?.file)
                        setFormData({ ...formData, file: data?.result.file._id })
                    } else {
                        setErrors({ ...errors, fileError: data?.error?.error });
                    }


                })
                .catch((error: any) => {
                    console.error("Error:", error);
                });
        }
    }
    const handleSizeChange = (e: any) => {
        const newSize = parseInt(e.target.value, 10); // Parse the input value as an integer

        if (!isNaN(newSize) && newSize > 0) {
            setFormData({ ...formData, size: newSize });

            setErrors({ ...errors, sizeError: "" });
        } else {

            setErrors({ ...errors, sizeError: "Organization size should be more than zero." });
        }
    }

    const handleSubmit = (event: any) => {
        console.log(formData);
        event.preventDefault();

        if (formData.file && formData.name && formData.size && parseInt(formData.size) > 0) {
            httpClient({
                method: "post",
                url: "/organization/register",
                data: formData,
            }).then(({ result }) => {
                if (result) {
                    toast.success("Account successfully created.")
                    navigate('/organization-admin/dashboard');
                }
            }).catch((error: any) => {
                console.error("Error:", error);
            });
        } else {
            toast.warn("All fields are required")
        }
    }

    return (
        <React.Fragment>

            <div className='signup-form mt-8'>
                <h1>
                    Organisation Profile
                </h1>
                <p className='text'>Please provide your Organization information</p>
                <form onSubmit={handleSubmit} noValidate>
                    <Box sx={{ mt: 1 }}>
                        <div>
                            <div className="file-input flex items-center ">

                                <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                    {!file && <div className='image-container '  >
                                        <img src="../assets/user.png" alt='user' />
                                    </div>}
                                    {file && file?.path && <div className="h-12 rounded-full overflow-hidden image-container">
                                        <img className="mw-100p" src={"http://hrapi.chantsit.com/" + file?.destination + "/" + file?.name} alt="" />
                                    </div>}
                                </div>

                                <div className="flex items-center">
                                    <div className="ml-5 rounded-md">
                                        <input
                                            type="file"
                                            accept="image/*,capture=camera"
                                            name="photo" id="photo"
                                            className="custom" onChange={handleFileChange} />
                                        <label className='org-logo'>Organization Logo <span className="astrick">*</span></label>
                                        <label className="upload-photo" htmlFor="photo">

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
                                        className="mx-1 mt-2 remove-button"
                                        onClick={removeFile}
                                    >
                                        Remove
                                    </button>
                                    {/* <span className='gray-text'>'png', 'jpg', 'jpeg', 'gif', 'tiff'*png *jpeg up to 10MB at least 400px by 400px</span> */}
                                </div>


                            </div>
                            {!errors.fileError && <span className='upload-info'>*png *jpg *jpeg *gif *tiff up to 10MB at least 400px by 400px</span>}
                            {errors.fileError && (
                                <span className="upload-info error">{errors.fileError}</span>
                            )}

                        </div>
                        <InputLabel>Organization name </InputLabel>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            name="name"
                            placeholder='Enter Name'
                            disabled InputProps={{
                                readOnly: true,
                            }}
                            value={formData.name}
                        // onChange={(e) =>
                        //     setFormData({ ...formData, name: e.target.value })
                        // }
                        />
                        {/* {errors.nameError && (
                            <span className="error">{errors.nameError}</span>
                        )} */}

                        <InputLabel>Organization size <span className="astrick">*</span></InputLabel>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="text"
                            placeholder='Enter Here'
                            type="number"
                            id="text"
                            onChange={handleSizeChange}
                        />
                        {errors.sizeError && (
                            <span className="error">{errors.sizeError}</span>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            className='mt-1'
                        >
                            Submit
                        </Button>
                    </Box>
                </form>
            </div>


        </React.Fragment >

    );
}