import React, { useState, useEffect } from "react";
import httpClient from "../../api/httpClient";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
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

  const Navigate = useNavigate();
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
  }, []);
 
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
        <MainBodyContainer>
          <FlexSpaceBetween style={{ alignItems: "center" }}>
           <CommenHeader employeeid={employeeid}/>

            <EditButton
              onClick={() =>
                Navigate(
                  `/organization-admin/employee/benefits/${employeeid}/${true}?`
                )
              }
              style={{ marginRight: "54px" }}
            >
              <ButtonIcon src="/images/icons/Pen 2.svg" />
              Edit
            </EditButton>
          </FlexSpaceBetween>

          <BasicInfoContainer>
            <BasicInfoDiv>
              <FlexSpaceBetween style={{ marginBottom: "10px" }}>
                <BasicHeading>Employee Benefits</BasicHeading>
              </FlexSpaceBetween>
              <BasicDetailsDiv>
                <FlexSpaceBetween>
                  <FlexColumn>
                    <TitlePara>Benefit Name</TitlePara>
                    <ViewPara>{result.benefit?.benefit.name || "-"}</ViewPara>
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
                        ? moment(result.benefit?.startDate).format("DD/MM/YYYY")
                        : " - "}{" "}
                    </ViewPara>
                  </FlexColumn>
                  <FlexColumn>
                    <TitlePara>End Date </TitlePara>
                    <ViewPara>
                      {result.benefit?.endDate
                        ? moment(result.benefit?.endDate).format("DD/MM/YYYY")
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
                    <TitlePara>Employee Contribution rate (%)*</TitlePara>
                    <ViewPara>
                      {result.benefit?.contributionRate
                        ? "$" + result.benefit?.contributionRate
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
  );
};

export default EVBenefits;
