import axios, { AxiosResponse } from "axios";

const axiosClient = axios.create({
  // baseURL: 'http://localhost:4041/api',//`${process.env.REACT_APP_USER_API_URL}`,
  baseURL: 'https://hrapi.chantsit.com/',//`${process.env.REACT_APP_USER_API_URL}`,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
});

// Interceptors
axiosClient.interceptors.request.use((config) => {
  // Do something before request is sent
  let token = localStorage.getItem('token')
  if (token)
    config.headers.Authorization = `Bearer ${token}`;
  return config;
}, function (error: any) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use((response: any) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error: any) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default axiosClient;