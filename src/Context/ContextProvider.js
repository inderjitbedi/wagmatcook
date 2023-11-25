import React, { createContext, useContext, useState, useEffect } from "react";
import httpClient from "../api/httpClient";
import API_URLS from "../constants/apiUrls";
import { useLoaderData } from "react-router-dom";
const HeaderInfoContext = createContext();

export const ContextProvider = ({ children }) => {
  const [headerData, setHeaderData] = useState([]);
  const [globalNotificationCount, setGlobalNotificationCount] = useState([]);
  const [user, setUser] = useState();
  const [employeeId, setEmployeeId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    let userData = localStorage.getItem("user");
    if (userData) {
      let parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    }
  }, [refresh]);

  useEffect(() => {
    if (user) {
      if (user.role === "SUPER_ADMIN") {
        return;
      }
      GetHeadersData(user._id);
      GetNotificationCount();
    }
  }, [user]);

  const clearContextData = () => {
    setHeaderData([]);
    setGlobalNotificationCount([]);
    setUser(null);
    setFilter("")
  };
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
        clearContextData,
        setRefresh,
        setUser,
        setFilter,
        filter,
      }}
    >
      {children}
    </HeaderInfoContext.Provider>
  );
};

export const useHeaderInfoContext = () => useContext(HeaderInfoContext);
