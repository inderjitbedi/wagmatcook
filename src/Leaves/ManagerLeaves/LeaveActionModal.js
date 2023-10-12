import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import { RotatingLines } from "react-loader-spinner";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import ROLES from "../../constants/roles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "42rem",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 45,
  padding: "2rem 0rem",
  borderRadius: "0.8rem",
};
const ModalThanks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0rem;
  position: relative;
`;
const ModalThanksImg = styled.img`
  display: block;
  width: 10.6rem;
  height: 10.6rem;
`;
const ModalIconDelete = styled.img`
  display: inline-block;
  width: 2.4rem;
  height: 2.4rem;
  cursor: pointer;
  position: absolute;
  right: 1rem;
  top: 0rem;
`;
const ModalThanksHeading = styled.p`
  color: #222b45;
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.2rem;
  width: 80%;
  text-align: center;
`;
const DeleteButton = styled.button`
  border-radius: 0.8rem;
  background: #ea4335;
  color: #ffffff;
  font-size: 1.3rem;
  line-height: 1.6rem;
  font-weight: 600;
  padding: 1em 2em;
  border: none;
  cursor: pointer;
`;
const AddNewButton = styled.button`
  border-radius: 0.8rem;
  background-color: #279af1;
  color: #ffffff;
  font-size: 1.3rem;
  line-height: 1.6rem;
  font-weight: 600;

  border: none;
  width: 11.3rem;
  padding: 1.1rem 1.4rem 1.2rem 1.4rem;
  cursor: pointer;
  text-transform: capitalize;
`;
const LeaveActionModal = ({
  openDelete,
  HandleCloseDelete,
  HandleSubmitLeave,
  isLoading,
  message,
  src,
  buttonValue,
}) => {
  const Navigate = useNavigate();
  const location = useLocation();
  const [userType, setUserType] = useState("");
  useEffect(() => {
    if (location.pathname.indexOf("manager") > -1) {
      setUserType(ROLES.MANAGER);
    } else if (location.pathname.indexOf("hr") > -1) {
      setUserType(ROLES.HR);
    } else if (location.pathname.indexOf("user") > -1) {
      setUserType(ROLES.EMPLOYEE);
    }
  }, []);
  return (
    <Modal
      open={openDelete}
      // onClose={HandleCloseDelete}
      sx={{
        backgroundColor: "rgb(27, 27, 27, 0.75)",
        backdropFilter: "blur(0.8rem)",
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "38rem",
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
          <ModalThanks>
            <ModalIconDelete
              onClick={HandleCloseDelete}
              src="/images/icons/Alert-Circle.svg"
            />
            <ModalThanksImg src={src} />
            <ModalThanksHeading>{message}</ModalThanksHeading>
            <AddNewButton
              onClick={() => {
                if (userType === ROLES.MANAGER) {
                  Navigate(`/manager-management/leaves`);
                } else if (userType === ROLES.HR) {
                  Navigate(`/hr-management/leaves`);
                }
                HandleCloseDelete();
              }}
              // disabled={isLoading}
            >
              {buttonValue}
            </AddNewButton>
          </ModalThanks>
        )}
      </Box>
    </Modal>
  );
};

export default LeaveActionModal;
