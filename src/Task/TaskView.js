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
import styled, { keyframes } from "styled-components";

import {
  DisciplinaryHeading,
  ToggelButton,
  StyledLabelChecked,
  StyledLabelActive,
  ActionIcons,
  ApproveStyle,
  PendingStyle,
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
  AddNewButton,
  TextAreaComment,
  FlexContaier,
  FlexColumnNoWidth,
  BasicHeading,
  TaskTitle,
  TaskLight,
  TaskHeading,
  TaskDescription,
  Hr,
  TaskStatus,
  TaskSelect,
  TaskOption,
  ModalIcon,
  CommentDivADD,
  TextAreaContaier,
  Errors,
  IconsEmployee,
  FlexSpaceBetweenmobile,
} from "../Employee/ViewEmployee/ViewEmployeeStyle";

const TaskView = () => {
  let API_URL = process.env.REACT_APP_API_URL;
  const { taskid } = useParams();
  const [userType, setUserType] = useState("");
  const location = useLocation();
  const [userData, setUserData] = useState("");
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
  const [comment, setComment] = useState("");
  const [updateComment, setUpdateComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const [updateCommentError, setUpdateCommentError] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const HandleSearchCahnge = (data) => {
    setSearchValue(data);
  };
  // const handleEditClick = (_id) => {
  //   setEditingItemId(_id);
  // };

  const [isChecked, setIsChecked] = useState(false);

  // const handleCheckboxChange = () => {
  //   setIsChecked(!isChecked);
  //   HandleMarkComplete();
  // };
  const AddNewComment = () => {
    if (!comment.trim()) {
      setCommentError("Comment cannot be empty");
      return;
    }
    let dataCopy = { description: comment };

    setIsUploading(true);

    let url = API_URLS.createTaskComments.replace(":taskid", taskid);
    httpClient({
      method: "post",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          // GetTaskComments();
          commentsList.unshift(result.comment);
          setComment("");
          toast.success(result.message, {
            className: "toast",
          }); //Employee proformance added successfully");
        } else {
          //toast.warn("something went wrong ");
          setIsUploading(false);
        }
      })
      .catch((error) => {
        toast.error("Error Adding review . Please try again.");
        setIsUploading(false);
      })
      .finally(() => {
        setIsUploading(false);
      });
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
            setCommentsList(result.comments);
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
  const HandleMarkComplete = (data) => {
    // setIsUploading(true);
    let url = API_URLS.markCompleted.replace(":id", taskid);
    let dataCopy = { isCompleted: data };
    httpClient({
      method: "put",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          GetTaskDetails();

          toast.success(result.message, {
            className: "toast",
          });
          // setIsUploading(false);
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        //console.error("Error:", error);
        toast.error("Error Updating Benefits . Please try again.");
        // setIsUploading(false);
      })
      .finally(() => {
        // setIsUploading(false);
      });
  };
  const HandleUpdate = () => {
    if (!updateComment.trim()) {
      setUpdateCommentError("Update Comment cannot be empty");
      return;
    }
    setIsUpdating(true);
    let dataCopy = { description: updateComment };

    let url = API_URLS.updateTaskComments
      .replace(":taskid", taskid)
      .replace(":id", Id);

    httpClient({
      method: "put",
      url,
      data: dataCopy,
    })
      .then(({ result, error }) => {
        if (result) {
          const updatedItems = commentsList?.map((item) =>
            item._id === editingItemId ? (item = result.comment) : item
          );

          setCommentsList(updatedItems);
          setId("");
          HandelCloseEdit();

          toast.success(result.message, {
            className: "toast",
          });
          setIsUpdating(false);
        } else {
          //toast.warn("something went wrong ");
        }
      })
      .catch((error) => {
        //console.error("Error:", error);
        toast.error("Error Updating Benefits . Please try again.");
        setIsUpdating(false);
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };
  const HandleDelete = () => {
    setIsDeleting(true);
    let url = API_URLS.deleteTaskComments
      .replace(":taskid", taskid)
      .replace(":id", Id);
    httpClient({
      method: "put",
      url,
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
            setTaskDetails(result.task);
            setIsChecked(result.task.isCompleted);
            setSelectedValue(result.task.isCompleted);
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
    let user = localStorage.getItem("user");
    if (user) {
      let parsedUser = JSON.parse(user);
      setUserData(parsedUser);
    }
    GetTaskDetails();
    GetTaskComments();
    if (location.pathname.indexOf("manager") > -1) {
      setUserType(ROLES.MANAGER);
    } else if (location.pathname.indexOf("hr") > -1) {
      setUserType(ROLES.HR);
    } else if (location.pathname.indexOf("user") > -1) {
      setUserType(ROLES.EMPLOYEE);
    }
  }, []);
  const [selectedValue, setSelectedValue] = useState(isChecked);

  const handleSelectChange = (e) => {
    const newValue = JSON.parse(e.target.value);
    setSelectedValue(newValue);
    setIsChecked(newValue);
    HandleMarkComplete(newValue);
  };
  function formatDateDifference(inputDate) {
    const currentDate = new Date();
    const inputDateObj = new Date(inputDate);

    // Calculate the time difference in milliseconds
    const timeDifference = currentDate - inputDateObj;

    // Calculate time units
    const millisecondsInSecond = 1000;
    const millisecondsInMinute = millisecondsInSecond * 60;
    const millisecondsInHour = millisecondsInMinute * 60;
    const millisecondsInDay = millisecondsInHour * 24;
    const millisecondsInWeek = millisecondsInDay * 7;
    const millisecondsInMonth = millisecondsInDay * 30; // An approximate value
    const millisecondsInYear = millisecondsInDay * 365; // An approximate value
    if (timeDifference < millisecondsInSecond) {
      return "Just now";
    } else if (timeDifference < millisecondsInMinute) {
      const seconds = Math.floor(timeDifference / millisecondsInSecond);
      return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
    } else if (timeDifference < millisecondsInHour) {
      const minutes = Math.floor(timeDifference / millisecondsInMinute);
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (timeDifference < millisecondsInDay) {
      const hours = Math.floor(timeDifference / millisecondsInHour);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    }
    // else if (timeDifference < millisecondsInWeek) {
    //   const days = Math.floor(timeDifference / millisecondsInDay);
    //   return `${days} ${days === 1 ? "day" : "days"} ago`;
    // } else if (timeDifference < millisecondsInMonth) {
    //   const weeks = Math.floor(timeDifference / millisecondsInWeek);
    //   return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    // } else if (timeDifference < millisecondsInYear) {
    //   const months = Math.floor(timeDifference / millisecondsInMonth);
    //   return `${months} ${months === 1 ? "month" : "months"} ago`;
    // }
    else {
      const Date = moment(inputDate).format("YYYY-MM-DD hh:mm A");

      return Date;
    }
  }
  const HandleUpdateAction = (data) => {
    setUpdate(true);
    setEditingItemId(data._id);
    setId(data._id);
    setUpdateComment(data.description);
  };
  const HandelCloseEdit = () => {
    setUpdate(false);
    setId("");
    setEditingItemId(null);
    setUpdateComment("");
  };
  const HandleCommentChange = (e) => {
    setComment(e.target.value);
    setCommentError("");
  };

  const HandleUpdateCommentChange = (e) => {
    setUpdateComment(e.target.value);
    setUpdateCommentError("");
  };
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
  const BackButtonContainer = styled.div`
    display: none;
    @media only screen and (max-width: 600px) {
      display: flex;
      align-items: center;
      gap: 1.6rem;
      margin-bottom: 1.5rem;
    }
  `;
  const Navigate = useNavigate();

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
            text={"Task Details"}
          />
          <BackGroundWhite>
            <FlexSpaceBetweenmobile>
              <FlexContaier>
                <BackArrowButton onClick={() => Navigate(-1)}>
                  <IconsEmployee src="/images/icons/ArrowLeft.svg" />
                </BackArrowButton>
                <DisciplinaryHeading> Task Details </DisciplinaryHeading>
              </FlexContaier>
              {/* {userType === ROLES.EMPLOYEE ? (
                  " "
                ) : (
                  <>
                    <ToggelButton
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      type="checkbox"
                      id="toggel"
                      disabled={isChecked}
                    />

                    {isChecked ? (
                      <StyledLabelChecked htmlFor="toggel" />
                    ) : (
                      <StyledLabelActive htmlFor="toggel" />
                    )}
                  </>
                )} */}
            </FlexSpaceBetweenmobile>
            <FlexSpaceBetweenmobile>
              <FlexColumnNoWidth>
                <TaskLight>Task Title</TaskLight>
                <TaskHeading> {taskDetails?.title || " - "} </TaskHeading>
              </FlexColumnNoWidth>
              <FlexContaier style={{ gap: ".8rem" }}>
                <TaskLight>
                  {" "}
                  {userType === ROLES.EMPLOYEE
                    ? " Assigned By"
                    : " Assigned To"}
                  :
                </TaskLight>
                <UserImg
                  style={{
                    width: "3rem",
                    height: "3rem",
                  }}
                  src={
                    userType === ROLES.EMPLOYEE
                      ? taskDetails?.assigner?.personalInfo?.photo
                        ? API_URL +
                          taskDetails?.assigner?.personalInfo?.photo?.path
                        : "/images/User.jpg"
                      : taskDetails?.assignee?.personalInfo?.photo
                      ? API_URL +
                        taskDetails?.assignee?.personalInfo?.photo?.path
                      : "/images/User.jpg"
                  }
                />
                <TaskTitle>
                  {userType === ROLES.EMPLOYEE
                    ? [
                        taskDetails?.assigner?.personalInfo?.firstName,
                        taskDetails?.assigner?.personalInfo?.lastName,
                      ].join(" ") || " - "
                    : [
                        taskDetails?.assignee?.personalInfo?.firstName,
                        taskDetails?.assignee?.personalInfo?.lastName,
                      ].join(" ") || " - "}
                </TaskTitle>
              </FlexContaier>
            </FlexSpaceBetweenmobile>
            <FlexSpaceBetweenmobile>
              <FlexColumnNoWidth>
                <TaskLight>Description</TaskLight>
                <TaskDescription>
                  {" "}
                  {taskDetails?.description || " - "}{" "}
                </TaskDescription>
              </FlexColumnNoWidth>
            </FlexSpaceBetweenmobile>

            <FlexSpaceBetween
              style={{
                border: " 1px solid #eff4fa",
                borderLeft: "none",
                borderRight: "none",
                padding: "1.4rem 0rem ",
                alignItems: "center",
              }}
            >
              <FlexContaier style={{ gap: "1.3rem" }}>
                <TaskStatus>
                  <TaskTitle>Task Status:</TaskTitle>
                  <TaskSelect
                    value={selectedValue}
                    onChange={handleSelectChange}
                    // disabled={isChecked}
                  >
                    <TaskOption value={false}>In-Progress</TaskOption>
                    <TaskOption value={true}>Completed</TaskOption>
                  </TaskSelect>
                </TaskStatus>
                {/* <AddNewButton>Update</AddNewButton> */}
              </FlexContaier>
              <FlexContaier style={{ gap: ".4rem" }}>
                <ModalIcon src="/svg/Leaves.svg" />
                <TaskLight>Due Date:</TaskLight>
                <TaskTitle>
                  {" "}
                  {taskDetails?.dueDate
                    ? moment(taskDetails.dueDate).format("D MMM, YYYY")
                    : " - "}{" "}
                </TaskTitle>
              </FlexContaier>
            </FlexSpaceBetween>

            <BasicInfoDiv>
              <DisciplinaryHeading>Comments </DisciplinaryHeading>
              <CommentDivADD>
                <UserImg
                  src={
                    userData?.personalInfo?.photo
                      ? API_URL + userData?.personalInfo?.photo?.path
                      : "/images/User.jpg"
                  }
                />

                <TextAreaContaier>
                  <TextAreaComment
                    // style={{ margin: "0rem" }}
                    placeholder="Add a comment"
                    type="text"
                    name="description"
                    value={comment}
                    onChange={HandleCommentChange}
                  />
                  {<Errors> {commentError} </Errors>}
                  <AddNewButton
                    style={{ width: "8rem", alignSelf: "flex-end" }}
                    onClick={AddNewComment}
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <ThreeDots
                        height="8"
                        width="80"
                        radius="9"
                        color="#ffffff"
                        ariaLabel="three-dots-loading"
                        visible={true}
                      />
                    ) : (
                      "Send"
                    )}
                  </AddNewButton>
                </TextAreaContaier>
              </CommentDivADD>
              {commentsList?.map((data) => (
                <CommentDiv>
                  <UserImg
                    src={
                      data?.commenter?.personalInfo?.photo
                        ? API_URL + data?.commenter?.personalInfo?.photo?.path
                        : "/images/User.jpg"
                    }
                  />

                  <FlexColumnForm>
                    <FlexSpaceBetween
                      style={{ margin: "0rem", alignItems: "center" }}
                    >
                      <TitlePara>
                        {[
                          data?.commenter?.personalInfo?.firstName,
                          data?.commenter?.personalInfo?.lastName,
                        ].join(" ")}
                        &nbsp;&nbsp;
                        <span>{formatDateDifference(data?.createdAt)}</span>
                      </TitlePara>

                      <FlexContaier>
                        {userData?._id === data?.commenter?._id && (
                          <>
                            {editingItemId === data?._id ? (
                              <ActionIcons
                                style={{ width: "2rem", height: "2rem" }}
                                onClick={HandelCloseEdit}
                                src="/images/icons/Alert-Circle.svg"
                              />
                            ) : (
                              <ActionIcons
                                style={{ width: "2rem", height: "2rem" }}
                                onClick={() => {
                                  HandleUpdateAction(data);
                                }}
                                src="/images/icons/Pendown.svg"
                              />
                            )}
                            {editingItemId === data?._id ? (
                              ""
                            ) : (
                              <ActionIcons
                                style={{ width: "2rem", height: "2rem" }}
                                onClick={() => {
                                  HandleOpenDelete();
                                  setId(data?._id);
                                }}
                                src="/images/icons/Trash-2.svg"
                              />
                            )}
                          </>
                        )}
                      </FlexContaier>
                    </FlexSpaceBetween>

                    {editingItemId === data?._id ? (
                      <FlexContaier>
                        <TextAreaContaier>
                          <TextAreaComment
                            style={{ margin: "0rem" }}
                            // placeholder="Add comment"
                            type="text"
                            name="updatedescription"
                            value={updateComment}
                            onChange={HandleUpdateCommentChange}
                          />
                          {updateCommentError && (
                            <Errors> {updateCommentError} </Errors>
                          )}

                          <AddNewButton
                            style={{ alignSelf: "flex-end" }}
                            onClick={HandleUpdate}
                            disabled={isUpdating}
                          >
                            {isUpdating ? (
                              <ThreeDots
                                height="8"
                                width="80"
                                radius="9"
                                color="#ffffff"
                                ariaLabel="three-dots-loading"
                                visible={true}
                              />
                            ) : (
                              "Update"
                            )}
                          </AddNewButton>
                        </TextAreaContaier>
                      </FlexContaier>
                    ) : (
                      <ViewPara>
                        {data?.description}{" "}
                        {data?.isEdited ? (
                          <span
                            style={{
                              margin: ".8rem 0rem ",
                              fontSize: "1rem",
                              fontWeight: "300",
                              opacity: ".6",
                            }}
                          >
                            {" "}
                            (edited)
                            {/* at {formatDateDifference(data.updatedAt)} */}
                          </span>
                        ) : (
                          ""
                        )}
                      </ViewPara>
                    )}
                  </FlexColumnForm>
                </CommentDiv>
              ))}
            </BasicInfoDiv>
          </BackGroundWhite>
        </>
      )}
      <DeleteModal
        openDelete={openDelete}
        message="Are you sure you want to delete this comment?"
        HandleCloseDelete={HandleCloseDelete}
        isLoading={isDeleting}
        HandleDelete={HandleDelete}
      />
    </>
  );
};

export default TaskView;
