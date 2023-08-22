import { call, put } from "redux-saga/effects";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { push } from "connected-react-router";
import axiosInstance from "./axiosClient";
// import { store } from "../../app/store";


async function httpClient(payload:any) {
    console.log(payload);
    
    const payloadData = {
        ...payload
    };

    try {
        const response = await axiosInstance(payloadData);
        const { data: result, headers } = response;
        return {
            result,
            headers,
            error: null,
        };
    } catch (error:any) {
        let myError = error?.response ? error?.response?.data : error;

        if (myError?.status) {
            if (myError.status === 401) {
                toast.error("Session Expired. Please login again.");
            } else {
                toast.error(myError.message);
            }
        }  else {
            toast.error(myError.message);
        }
        return {
            error: myError, 
            result: null,
            headers: null,
        };
    }
}




export default httpClient;
