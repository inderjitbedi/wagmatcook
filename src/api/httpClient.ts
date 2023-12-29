import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { push } from "connected-react-router";
import axiosInstance from "./axiosClient";
// import { store } from "../../app/store";

async function httpClient(payload: any) {
  const payloadData = {
    ...payload,
  };
  try {
    const response = await axiosInstance(payloadData);
    const { data: result, headers } = response;
    return {
      result,
      headers,
      error: null,
    };
  } catch (error: any) {
    if (error?.response?.status === 401) {
      toast.error("Session Expired. Please login again.", { autoClose: 5000 });
    }
    let myError = error?.response ? error?.response?.data : error;

    if (myError?.status) {
      if (myError.status === 401) {
        toast.error("Session Expired. Please login again.", {
          autoClose: 5000,
        });
      } else {
        toast.error(myError.message,{autoClose: 10000});
      }
    } else {
      toast.error(myError.message, { autoClose: 10000 });
    }
    return {
      error: myError,
      result: null,
      headers: null,
    };
  }
}

export default httpClient;
