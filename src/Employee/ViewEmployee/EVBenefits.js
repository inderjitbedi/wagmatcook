import React, { useState, useEffect } from "react";
import httpClient from "../../api/httpClient";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import moment from "moment";
import ROLES from "../../constants/roles";
import Benefits from "../AddEmployee/Benefits";

import {
  MainBodyContainer,
  PersonalInfo,
  PersonalImg,
  FlexColumn,
  PersonalName,
  PersonalTitle,
  PersonalDepartment,
  BasicInfoContainer,
  FlexSpaceBetween,
  BasicHeading,
  EditButton,
  ButtonIcon,
  BasicInfoDiv,
  BasicDetailsDiv,
  TitlePara,
  ViewPara,
} from "./ViewEmployeeStyle";
import API_URLS from "../../constants/apiUrls";
import CommenHeader from "./CommenHeader";
const EVBenefits = () => {
  let API_URL = process.env.REACT_APP_API_URL;
  const [isEdit, setIsEdit] = useState(false);
  const [isAccount, setIsAccount] = useState(false);

  const Navigate = useNavigate();
  const location = useLocation();
  const [userType, setUserType] = useState("");

  const { employeeid } = useParams();
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const GetEmployeesBenefits = () => {
    setIsLoading(true);
    const trimid = employeeid.trim();
    let url = API_URLS.getEmployeeBenefits.replace(":employeeid", employeeid);
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setResult(result);
          console.log(result, "we are getting the persnal information ");
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error in fetching Personal info. Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    GetEmployeesBenefits();
    if (location.pathname.indexOf("manager") > -1) {
      setUserType(ROLES.MANAGER);
    } else if (location.pathname.indexOf("hr") > -1) {
      setUserType(ROLES.HR);
    } else if (location.pathname.indexOf("user") > -1) {
      setUserType(ROLES.EMPLOYEE);
    }
    if (location.pathname.indexOf("account") > -1) {
      setIsAccount(true);
    }
  }, [isEdit]);

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "70vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RotatingLines
            strokeColor="#279AF1"
            strokeWidth="3"
            animationDuration="0.75"
            width="52"
            visible={true}
          />
        </div>
      ) : (
        <>
          {isEdit ? (
            <Benefits isEdit={isEdit} setIsEdit={setIsEdit} />
          ) : (
            <MainBodyContainer>
              <FlexSpaceBetween style={{ alignItems: "center" }}>
                {/* <CommenHeader employeeid={employeeid} /> */}
              </FlexSpaceBetween>

              <BasicInfoContainer>
                <BasicInfoDiv>
                  <FlexSpaceBetween style={{ marginBottom: "1rem" }}>
                    <BasicHeading>Employee Benefit</BasicHeading>
                    {userType === ROLES.MANAGER ||
                    userType === ROLES.EMPLOYEE ||
                    isAccount ? (
                      " "
                    ) : userType === ROLES.HR ? (
                      <EditButton
                        style={{ marginRight: "5.4rem" }}
                        onClick={() => setIsEdit(true)}
                      >
                        <ButtonIcon src="/images/icons/Pen 2.svg" />
                        Edit
                      </EditButton>
                    ) : (
                      <EditButton
                        onClick={() => setIsEdit(true)}
                        style={{ marginRight: "5.4rem" }}
                      >
                        <ButtonIcon src="/images/icons/Pen 2.svg" />
                        Edit
                      </EditButton>
                    )}
                  </FlexSpaceBetween>
                  <BasicDetailsDiv>
                    <FlexSpaceBetween>
                      <FlexColumn>
                        <TitlePara>Benefit Name</TitlePara>
                        <ViewPara>
                          {result.benefit?.benefit.name || "-"}
                        </ViewPara>
                      </FlexColumn>
                      <FlexColumn>
                        <TitlePara>Description </TitlePara>
                        <ViewPara>
                          {result.benefit?.benefit.description || "-"}
                        </ViewPara>
                      </FlexColumn>
                    </FlexSpaceBetween>
                    <FlexSpaceBetween>
                      <FlexColumn>
                        <TitlePara>Start Date</TitlePara>
                        <ViewPara>
                          {" "}
                          {result.benefit?.startDate
                            ? moment(result.benefit?.startDate).format(
                                "DD/MM/YYYY"
                              )
                            : " - "}{" "}
                        </ViewPara>
                      </FlexColumn>
                      <FlexColumn>
                        <TitlePara>End Date </TitlePara>
                        <ViewPara>
                          {result.benefit?.endDate
                            ? moment(result.benefit?.endDate).format(
                                "DD/MM/YYYY"
                              )
                            : " - "}{" "}
                        </ViewPara>
                      </FlexColumn>
                    </FlexSpaceBetween>
                    <FlexSpaceBetween>
                      <FlexColumn>
                        <TitlePara>Cost</TitlePara>
                        <ViewPara>
                          {" "}
                          {result.benefit?.cost
                            ? "$" + result.benefit?.cost
                            : " - "}{" "}
                        </ViewPara>
                      </FlexColumn>
                      <FlexColumn>
                        <TitlePara>Employee Contribution rate (%)</TitlePara>
                        <ViewPara>
                          {result.benefit?.contributionRate
                            ? result.benefit?.contributionRate
                            : " - "}{" "}
                        </ViewPara>
                      </FlexColumn>
                    </FlexSpaceBetween>
                  </BasicDetailsDiv>
                </BasicInfoDiv>
              </BasicInfoContainer>
            </MainBodyContainer>
          )}
        </>
      )}
    </>
  );
};

export default EVBenefits;
