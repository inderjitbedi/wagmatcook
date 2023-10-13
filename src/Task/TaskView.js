import React, { useState, useEffect } from "react";
import httpClient from "../api/httpClient";
import CommenDashHeader from "../Dashboard/CommenDashHeader";
import API_URLS from "../constants/apiUrls";
import ROLES from "../constants/roles";
import moment from "moment";
import { toast } from "react-toastify";
import { useNavigate, useLocation, useParams } from "react-router";
import { RotatingLines, ThreeDots } from "react-loader-spinner";
import DeleteModal from "../Modals/DeleteModal";

import {
  DisciplinaryHeading,
  ToggelButton,
  StyledLabelChecked,
  StyledLabelActive,
} from "../Disciplinary/DisciplinaryStyles";
import {
  BasicInfoDiv,
  FlexSpaceBetween,
  FlexColumn,
  TitlePara,
  ViewPara,
  BackGroundWhite,
  CommentDiv,
  UserImg,
  FlexColumnForm,
  Input,
  AddNewButton,
  TextAreaComment,
} from "../Employee/ViewEmployee/ViewEmployeeStyle";

const TaskView = () => {
  let API_URL = process.env.REACT_APP_API_URL;
  const { taskid } = useParams();
  const [userType, setUserType] = useState("");

  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const HandleOpenDelete = () => setOpenDelete(true);
  const HandleCloseDelete = () => setOpenDelete(false);
  const [update, setUpdate] = useState(false);
  const [Id, setId] = useState("");
  const [taskDetails, setTaskDetails] = useState([]);
  const [commentsList, setCommentsList] = useState([]);
  const HandleSearchCahnge = (data) => {
    setSearchValue(data);
  };
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const GetTaskComments = () => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      let url = API_URLS.getTaskComments.replace(":taskid", taskid);
      httpClient({
        method: "get",
        url,
      })
        .then(({ result, error }) => {
          if (result) {
            resolve(result);
            setCommentsList(result);
          } else {
            //toast.warn("something went wrong ");
          }
        })
        .catch((error) => {
          //console.error("Error:", error);
          toast.error("Error in Fetching . Please try again.");
          setIsLoading(false);
          reject(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  };
  const HandleUpdate = (data) => {
    //console.log("update Data:", data);
    setIsLoading(true);
    let dataCopy = data;

    //  let url = API_URLS.addEmployeePerformance
    //    .replace(":employeeid", employeeid)
    //    .replace(":id", Id);

    httpClient({
      method: "put",
      //  url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          setId("");

          toast.success(result.message, {
            className: "toast",
          }); //Entry Updated Successfully");
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        //console.error("Error:", error);
        toast.error("Error Updating Benefits . Please try again.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const HandleDelete = () => {
    setIsDeleting(true);
    //  let url = API_URLS.deleteEmployeePerformance
    //    .replace(":employeeid", employeeid)
    //    .replace(":id", Id);
    httpClient({
      method: "put",
      //  url,
    })
      .then(({ result, error }) => {
        if (result) {
          HandleCloseDelete();
          setId("");
          //  GetEmployeesProformance();

          toast.success(result.message, {
            className: "toast",
          });
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        //console.error("Error:", error);
        toast.error("Error Deleting Benefits. Please try again.");
        setIsDeleting(false);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };
  const GetTaskDetails = () => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      let url = API_URLS.getTaskDetails.replace(":id", taskid);
      httpClient({
        method: "get",
        url,
      })
        .then(({ result, error }) => {
          if (result) {
            resolve(result);
            setTaskDetails(result);
          } else {
            //toast.warn("something went wrong ");
          }
        })
        .catch((error) => {
          //console.error("Error:", error);
          toast.error("Error in Fetching . Please try again.");
          setIsLoading(false);
          reject(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  };
  useEffect(() => {
    GetTaskDetails();
    GetTaskComments();
  }, []);
  return (
    <>
      <CommenDashHeader onSearch={HandleSearchCahnge} text={"Task Details"} />
      <BackGroundWhite>
        <BasicInfoDiv>
          <FlexSpaceBetween style={{ alignItems: "center" }}>
            <DisciplinaryHeading> Details </DisciplinaryHeading>
            <ToggelButton
              checked={isChecked}
              onChange={handleCheckboxChange}
              type="checkbox"
              id="toggel"
            />

            {isChecked ? (
              <StyledLabelChecked htmlFor="toggel" />
            ) : (
              <StyledLabelActive htmlFor="toggel" />
            )}
          </FlexSpaceBetween>
          <FlexSpaceBetween>
            <FlexColumn>
              <TitlePara>Task Title</TitlePara>
              <ViewPara>Complete this </ViewPara>
            </FlexColumn>
            <FlexColumn>
              <TitlePara>Assigned to</TitlePara>
              <ViewPara>Lalit kumar </ViewPara>
            </FlexColumn>
          </FlexSpaceBetween>
          <FlexSpaceBetween>
            <FlexColumn>
              <TitlePara>Due Date</TitlePara>
              <ViewPara>10/03/2023 </ViewPara>
            </FlexColumn>
          </FlexSpaceBetween>
          <FlexSpaceBetween>
            <FlexColumn>
              <TitlePara>Description</TitlePara>
              <ViewPara>here is the Description</ViewPara>
            </FlexColumn>
          </FlexSpaceBetween>
          <DisciplinaryHeading> Add Comment </DisciplinaryHeading>

          <CommentDiv>
            <UserImg src="/images/Oval Copy.jpg" />

            <TextAreaComment
              style={{ margin: "0rem" }}
              placeholder="Add comment"
              type="text"
            />
            <AddNewButton>Send</AddNewButton>
          </CommentDiv>
          <CommentDiv>
            <UserImg src="/images/Oval Copy 2.jpg" />

            <FlexColumnForm>
              <TitlePara>Stephen</TitlePara>
              <ViewPara>Its alredy done completed it last week </ViewPara>
            </FlexColumnForm>
          </CommentDiv>
        </BasicInfoDiv>
      </BackGroundWhite>
    </>
  );
};

export default TaskView;
