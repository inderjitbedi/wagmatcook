import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import httpClient from "../../api/httpClient";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import moment from "moment";
import ROLES from "../../constants/roles";
import PersonalInfo from "../AddEmployee/PersonalInfo";

import {
  MainBodyContainer,
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

const EmployeePersonal = () => {
  let API_URL = process.env.REACT_APP_API_URL;

  const Navigate = useNavigate();
  const location = useLocation();
  const [userType, setUserType] = useState("");
  const [isAccount, setIsAccount] = useState(false);

  const { employeeid } = useParams();
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const GetEmployeesPersonalInfo = () => {
    setIsLoading(true);
    const trimid = employeeid.trim();
    let url = API_URLS.getEmployeePersonalInfo.replace(
      ":employeeid",
      employeeid
    );
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
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    GetEmployeesPersonalInfo();
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
  console.log(result);
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
            <PersonalInfo isEdit={isEdit} setIsEdit={setIsEdit} />
          ) : (
            <MainBodyContainer>
              <CommenHeader employeeid={employeeid} />

              <BasicInfoContainer>
                <BasicInfoDiv>
                  <FlexSpaceBetween style={{ marginBottom: "10px" }}>
                    <BasicHeading>Basic Information</BasicHeading>
                    {isAccount || userType === ROLES.EMPLOYEE ? (
                      ""
                    ) : userType === ROLES.MANAGER ? (
                      <EditButton onClick={() => setIsEdit(true)}>
                        <ButtonIcon src="/images/icons/Pen 2.svg" />
                        Edit
                      </EditButton>
                    ) : userType === ROLES.HR ? (
                      <EditButton onClick={() => setIsEdit(true)}>
                        <ButtonIcon src="/images/icons/Pen 2.svg" />
                        Edit
                      </EditButton>
                    ) : (
                      <EditButton onClick={() => setIsEdit(true)}>
                        <ButtonIcon src="/images/icons/Pen 2.svg" />
                        Edit
                      </EditButton>
                    )}
                  </FlexSpaceBetween>
                  <BasicDetailsDiv>
                    <FlexSpaceBetween>
                      <FlexColumn>
                        <TitlePara>First Name</TitlePara>
                        <ViewPara>
                          {result?.personalInfo?.firstName || " - "}
                        </ViewPara>
                      </FlexColumn>
                      <FlexColumn>
                        <TitlePara>Last Name</TitlePara>
                        <ViewPara>
                          {result?.personalInfo?.lastName || " - "}
                        </ViewPara>
                      </FlexColumn>
                    </FlexSpaceBetween>
                    <FlexSpaceBetween>
                      <FlexColumn>
                        <TitlePara>Address</TitlePara>
                        <ViewPara>
                          {result?.personalInfo?.address || " - "}
                        </ViewPara>
                      </FlexColumn>
                      <FlexColumn>
                        <TitlePara>Province</TitlePara>
                        <ViewPara>
                          {result?.personalInfo?.province || " - "}
                        </ViewPara>
                      </FlexColumn>
                    </FlexSpaceBetween>
                    <FlexSpaceBetween>
                      <FlexColumn>
                        <TitlePara>City</TitlePara>
                        <ViewPara>
                          {result?.personalInfo?.city || " - "}
                        </ViewPara>
                      </FlexColumn>
                      <FlexColumn>
                        <TitlePara>Postal Code</TitlePara>
                        <ViewPara style={{ textTransform: "uppercase" }}>
                          {result?.personalInfo?.postalCode || " - "}
                        </ViewPara>
                      </FlexColumn>
                    </FlexSpaceBetween>
                    <FlexSpaceBetween>
                      <FlexColumn>
                        <TitlePara>Home Phone</TitlePara>
                        <ViewPara>
                          {result?.personalInfo?.homePhone || " - "}
                        </ViewPara>
                      </FlexColumn>
                      <FlexColumn>
                        <TitlePara>Personal (mobile)</TitlePara>
                        <ViewPara>
                          {result?.personalInfo?.mobile || " - "}
                        </ViewPara>
                      </FlexColumn>
                    </FlexSpaceBetween>
                    <FlexSpaceBetween>
                      <FlexColumn>
                        <TitlePara>Email - Personal</TitlePara>
                        <ViewPara style={{ textTransform: "none" }}>
                          {result?.personalInfo?.personalEmail || " - "}
                        </ViewPara>
                      </FlexColumn>
                      <FlexColumn>
                        <TitlePara>Email - Work</TitlePara>
                        <ViewPara style={{ textTransform: "none" }}>
                          {result?.personalInfo?.employee.email || " - "}
                        </ViewPara>
                      </FlexColumn>
                    </FlexSpaceBetween>
                    <FlexSpaceBetween>
                      <FlexColumn>
                        <TitlePara>Emergency Contact Name</TitlePara>
                        <ViewPara>
                          {result?.personalInfo?.emergencyContact || " - "}
                        </ViewPara>
                      </FlexColumn>
                      <FlexColumn>
                        <TitlePara>Emergency Contact Number</TitlePara>
                        <ViewPara>
                          {result?.personalInfo?.emergencyContactNumber ||
                            " - "}
                        </ViewPara>
                      </FlexColumn>
                    </FlexSpaceBetween>
                    <FlexSpaceBetween>
                      <FlexColumn style={{ width: "50%" }}>
                        <TitlePara>Jurisdiction</TitlePara>
                        <ViewPara>
                          {result?.personalInfo?.jurisdiction || " - "}
                        </ViewPara>
                      </FlexColumn>
                    </FlexSpaceBetween>
                    <FlexSpaceBetween>
                      <FlexColumn>
                        <TitlePara>Is Active </TitlePara>
                        {result.personalInfo?.employee?.isActive ? (
                          <ViewPara style={{ color: "#34A853" }}>
                            Active
                          </ViewPara>
                        ) : (
                          <ViewPara style={{ color: "red" }}>Inactive</ViewPara>
                        )}
                      </FlexColumn>
                    </FlexSpaceBetween>
                    <BasicHeading style={{ marginTop: "53px" }}>
                      Basic Information
                    </BasicHeading>
                    <FlexSpaceBetween>
                      <FlexColumn>
                        <TitlePara>Employee ID </TitlePara>
                        <ViewPara>
                          {result.personalInfo?.employeeId || " - "}
                        </ViewPara>
                      </FlexColumn>
                      <FlexColumn>
                        <TitlePara>Date of Birth</TitlePara>
                        <ViewPara>
                          {result.personalInfo?.dob
                            ? moment(result.personalInfo?.dob).format(
                                "DD/MM/YYYY"
                              )
                            : " - "}
                        </ViewPara>
                      </FlexColumn>
                    </FlexSpaceBetween>
                    <FlexSpaceBetween>
                      <FlexColumn>
                        <TitlePara>SIN</TitlePara>
                        <ViewPara>{result.personalInfo?.sin || " - "}</ViewPara>
                      </FlexColumn>
                      <FlexColumn>
                        <TitlePara>Gender</TitlePara>
                        {result.personalInfo?.gender === 1 ? (
                          <ViewPara> Male</ViewPara>
                        ) : result.personalInfo?.gender === 2 ? (
                          <ViewPara> Female</ViewPara>
                        ) : result.personalInfo?.gender === 3 ? (
                          <ViewPara> Non-Binary</ViewPara>
                        ) : (
                          <ViewPara> - </ViewPara>
                        )}
                      </FlexColumn>
                    </FlexSpaceBetween>

                    {/* band number and is status */}
                    <FlexSpaceBetween>
                      <FlexColumn>
                        <TitlePara>Pronouns </TitlePara>
                        <ViewPara>
                          {result.personalInfo?.pronouns || " - "}
                        </ViewPara>
                      </FlexColumn>
                      {/* <FlexColumn>
                    <TitlePara>Band Number</TitlePara>
                    <ViewPara>JHGTRYSG4542DES</ViewPara>
                  </FlexColumn> */}
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

export default EmployeePersonal;
