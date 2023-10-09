import React, { useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import CommenDashHeader from "../Dashboard/CommenDashHeader";
import { useForm, Controller } from "react-hook-form";
import httpClient from "../api/httpClient";
import API_URLS from "../constants/apiUrls";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  DisciplinaryDiv,
  DisciplinaryHeading,
  AddNewButton,
  MenuIcon,
  MenuIconDiv,
  ActionIconDiv,
  ActionIcons,
  ModalUpperDiv,
  ModalHeading,
  ModalIcon,
  ModalUpperMid,
  Input,
  TextArea,
  InputLabel,
  InputSpan,
  InputPara,
  Select,
  Option,
  Errors,
  LoadMore,
} from "../Disciplinary/DisciplinaryStyles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 446,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 45,
  padding: "20px 0px",
  borderRadius: "8px",
};

const Task = () => {
  const [searchValue, setSearchValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [Id, setId] = useState("");
  const [update, setUpdate] = useState(false);
  const [detailsLength, setDetailsLength] = useState(500);
  // add new modal
  const [open, setOpen] = useState(false);
  const HandleOpen = () => setOpen(true);
  const HandleClose = () => {
    setOpen(false);
    setDetailsLength(500);
    clearErrors();
    reset({});
  };

  const HandleSearchCahnge = (data) => {
    setSearchValue(data);
  };
  const {
    register,
    control,
    clearErrors,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  const onSubmit = (data) => {
    function isEmptyObject(obj) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          return false;
        }
      }
      return true;
    }
    if (isEmptyObject(errors) && !update) {
      //   HandleSubmit(data);
    } else if (update && isEmptyObject(errors)) {
      //   HandleUpdate(data);
    }
  };
  const HandleUpdateAction = (data) => {
    setUpdate(true);
    setId(data._id);
    setDetailsLength(500 - data?.description?.length);
    reset({ name: data.name, description: data.description });
    HandleOpen();
  };
  const HandleOpenAddNewAction = () => {
    setUpdate(false);
    HandleOpen();
    reset({});
    clearErrors();
    setDetailsLength(500);
  };
  const data = [
    {
      _id: 1,
      name: "option1",
    },
    {
      _id: 2,
      name: "option2",
    },
    {
      _id: 3,
      name: "option3",
    },
  ];

  return (
    <>
      <CommenDashHeader onSearch={HandleSearchCahnge} text={"Tasks"} />
      <DisciplinaryDiv>
        <DisciplinaryHeading>All Tasks</DisciplinaryHeading>
        <AddNewButton
          onClick={() => {
            HandleOpenAddNewAction();
          }}
        >
          Add New
        </AddNewButton>
        <Modal
          open={open}
          sx={{
            backgroundColor: "rgb(27, 27, 27, 0.75)",
            backdropFilter: "blur(8px)",
          }}
          // onClose={() => {
          //   HandleClose();
          //   clearErrors();
          //   reset({});
          //   setUpdate(false);
          // }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {isLoading ? (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  height: "380px",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 999,
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
                <ModalUpperDiv>
                  <ModalHeading>
                    {!update ? "Add Tasks" : "Update Task"}
                  </ModalHeading>
                  <ModalIcon
                    onClick={() => {
                      HandleClose();
                      setUpdate(false);
                      clearErrors();
                      reset({});
                    }}
                    src="/images/icons/Alert-Circle.svg"
                  />
                </ModalUpperDiv>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ModalUpperMid>
                    <InputLabel>
                      Task Title <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="text"
                      {...register("taskTitle", {
                        required: {
                          value: true,
                          message: "Required",
                        },
                      })}
                    />
                    {errors.taskTitle && (
                      <Errors>{errors.taskTitle?.message}</Errors>
                    )}
                    <InputLabel>
                      Assigned To <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Controller
                      name="assignedto"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Required",
                        },
                      }}
                      render={({ field }) => (
                        <Select {...field} disabled={update}>
                          <Option>Select</Option>
                          {data?.map((data) => (
                            <Option value={data._id}>{data.name}</Option>
                          ))}
                        </Select>
                      )}
                    />
                    {errors.assignedto && (
                      <Errors>{errors.assignedto?.message}</Errors>
                    )}
                    <InputLabel>
                      Description <InputSpan>*</InputSpan>
                    </InputLabel>
                    <TextArea
                      type="text"
                      {...register("description", {
                        required: {
                          value: true,
                          message: "Required",
                        },
                        maxLength: {
                          value: 500,
                          message: "Details exceeds 500 characters ",
                        },
                        // minLength: {
                        //   value: 10,
                        //   message: "Atleast write  10 characters ",
                        // },
                        onChange: (value) => {
                          setDetailsLength(500 - value.target.value.length);
                        },
                      })}
                    />

                    <InputPara>
                      {" "}
                      {<Errors>{errors.description?.message}</Errors>}{" "}
                      <span style={{ justifySelf: "flex-end" }}>
                        {" "}
                        {detailsLength > -1 ? detailsLength : 0} characters left
                      </span>
                    </InputPara>

                    <InputLabel>
                      Due Date <InputSpan>*</InputSpan>
                    </InputLabel>
                    <Input
                      type="date"
                      {...register("dueDate", {
                        required: {
                          value: true,
                          message: "Required",
                        },
                      })}
                    />
                    {<Errors>{errors.dueDate?.message}</Errors>}

                    {!update ? (
                      <AddNewButton
                        type="submit"
                        disabled={isLoading}
                        style={{ marginTop: "25px" }}
                      >
                        Submit
                      </AddNewButton>
                    ) : (
                      <AddNewButton
                        type="submit"
                        disabled={isLoading}
                        style={{ marginTop: "25px" }}
                      >
                        Update
                      </AddNewButton>
                    )}
                  </ModalUpperMid>
                </form>
              </>
            )}
          </Box>
        </Modal>
      </DisciplinaryDiv>
    </>
  );
};

export default Task;
