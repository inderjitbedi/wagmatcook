import React, { useState, useEffect } from "react";
import httpClient from "../api/httpClient";
import ROLES from "../constants/roles";
import CommenDashHeader from "../Dashboard/CommenDashHeader";
import API_URLS from "../constants/apiUrls";
import { useNavigate, useLocation, useParams } from "react-router";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import styled from "styled-components";
import moment from "moment";
import {
  DisciplinaryHeading,
  ActionIcons,
} from "../Disciplinary/DisciplinaryStyles";
import { Link } from "react-router-dom";
import {
  FlexSpaceBetween,
  FlexColumn,
  BackGroundWhite,
  FlexContaier,
  FlexColumnNoWidth,
  TaskTitle,
  TaskLight,
  TaskHeading,
  TaskDescription,
  IconsEmployee,
  FlexSpaceBetweenmobile,
  BasicInfoDiv,
  ViewPara,
  TitlePara,
  StepperContainer,
  FlexStep,
  StepCircle,
  StepHr,
  StepText,
} from "../Employee/ViewEmployee/ViewEmployeeStyle";

const BackArrowButton = styled.div`
  display: none;

  @media only screen and (max-width: 600px) {
    padding: 5px 4px 5px 6px;
    border-radius: 88px;
    border: 1px solid #8f9bb3;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const AnnouncementDetails = () => {
  let API_URL = process.env.REACT_APP_API_URL;
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const GetAnnouncements = () => {
    setIsLoading(true);
    let url = API_URLS.detailsAnnouncement.replace(":id", id);
    httpClient({
      method: "get",
      url,
    })
      .then(({ result, error }) => {
        if (result) {
          setResult(result);
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error creating department. Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    GetAnnouncements();
  }, []);

  const HandleSearchCahnge = (data) => {
    setSearchValue(data);
  };
  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "52rem",
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
          <CommenDashHeader
            onSearch={HandleSearchCahnge}
            text="Announcement Details"
          />
          <BackGroundWhite>
            <FlexSpaceBetween style={{ alignItems: "center" }}>
              {/* <BackArrowButton onClick={() => Navigate(-1)}>
                  <IconsEmployee src="/images/icons/ArrowLeft.svg" />
                </BackArrowButton> */}
              <DisciplinaryHeading> Basic Information </DisciplinaryHeading>
            </FlexSpaceBetween>
            <FlexSpaceBetween>
              <FlexColumn>
                <TaskLight> Announcement Title</TaskLight>
                <TaskTitle> {result?.announcement?.title || " - "} </TaskTitle>
              </FlexColumn>
              <FlexColumn>
                <TaskLight>Departments</TaskLight>
                <TaskTitle>
                  {result?.announcement?.departments
                    ? result?.announcement?.departments
                        ?.map((department) => department.name)
                        .join(" , ")
                    : " - "}
                </TaskTitle>
              </FlexColumn>
            </FlexSpaceBetween>
            <FlexSpaceBetween>
              <FlexColumnNoWidth>
                <TaskLight>Description</TaskLight>
                <TaskDescription>
                  {result?.announcement?.description || " - "}
                </TaskDescription>
              </FlexColumnNoWidth>
            </FlexSpaceBetween>
            <FlexSpaceBetween>
              <FlexColumnNoWidth>
                <TaskLight>Attachment</TaskLight>
                {result?.announcement?.attachment ? (
                  <FlexContaier>
                    <TaskDescription>
                      {result?.announcement?.attachment?.originalName}
                    </TaskDescription>
                    <Link
                      to={API_URL + result?.announcement?.attachment?.path}
                      target="_blank"
                      download
                      style={{ textDecoration: "none" }}
                    >
                      <ActionIcons src="/images/icons/Download.svg" />
                    </Link>
                  </FlexContaier>
                ) : (
                  <TaskDescription>No attachment found</TaskDescription>
                )}
              </FlexColumnNoWidth>
            </FlexSpaceBetween>
          </BackGroundWhite>
        </>
      )}
    </>
  );
};

export default AnnouncementDetails;
