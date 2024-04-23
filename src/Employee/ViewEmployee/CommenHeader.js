import React, { useState, useEffect } from "react";
import httpClient from "../../api/httpClient";
import { toast } from "react-toastify";
import {
  PersonalInfo,
  PersonalImg,
  FlexColumn,
  PersonalName,
  PersonalTitle,
  PersonalDepartment,
} from "./ViewEmployeeStyle";

const CommenHeader = ({ employeeid }) => {
  let API_URL = process.env.REACT_APP_API_URL;

  const [headerData, setHeaderData] = useState([]);

  const GetHeadersData = () => {
    // setIsLoading(true);
    const trimid = employeeid.trim();
    let url = `/employee/header-info/${trimid}`;
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
        toast.error("Error in fetching Personal info. Please try again.");
      });
  };
  useEffect(() => {
    GetHeadersData();
  }, [employeeid]);
  return (
    <PersonalInfo>
      <PersonalImg
        src={
          headerData.personalInfo?.photo
            ? API_URL + headerData.personalInfo.photo?.path
            : "/images/User.jpg"
        }
      />
      <FlexColumn>
        <PersonalName>
          {[
            headerData.personalInfo?.firstName,
            headerData.personalInfo?.lastName
              ? headerData.personalInfo?.lastName
              : "",
          ].join(" ")}
        </PersonalName>
        <PersonalTitle>{headerData?.position?.title || "-"}</PersonalTitle>
        <PersonalDepartment>
          {headerData.position?.department?.name || "-"}
        </PersonalDepartment>
      </FlexColumn>
    </PersonalInfo>
  );
};

export default CommenHeader;
