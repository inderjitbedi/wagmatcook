import React, { createContext, useContext, useState, useEffect } from "react";
import httpClient from "../api/httpClient";
import API_URLS from "../constants/apiUrls";
const HeaderInfoContext = createContext();

export const ContextProvider = ({ children }) => {
  const [headerData, setHeaderData] = useState([]);
  const [globalNotificationCount, setGlobalNotificationCount] = useState([]);
  const [user, setUser] = useState();
  const [employeeId, setEmployeeId] = useState(null);
  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      let parsedUser = JSON.parse(user);
      setUser(parsedUser);
      GetHeadersData(parsedUser._id);
    }
    GetNotificationCount();
  }, []);

  const GetHeadersData = (id) => {
    // setIsLoading(true);

    let url = `/employee/header-info/${id}`;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setHeaderData(result);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const GetNotificationCount = () => {
    let url = API_URLS.getNotificationCount;
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setGlobalNotificationCount(result);
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        //  toast.error("Error creating department. Please try again.");
      });
  };

  return (
    <HeaderInfoContext.Provider
      value={{
        headerData,
        user,
        globalNotificationCount,
        setGlobalNotificationCount,
        setEmployeeId,
      }}
    >
      {children}
    </HeaderInfoContext.Provider>
  );
};

export const useHeaderInfoContext = () => useContext(HeaderInfoContext);
