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
  width: 420,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 45,
  padding: "20px 0px",
  borderRadius: "8px",
};
const ModalThanks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0px;
  position: relative;
`;
const ModalThanksImg = styled.img`
  display: block;
  width: 106px;
  height: 106px;
`;
const ModalIconDelete = styled.img`
  display: inline-block;
  width: 24px;
  height: 24px;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 0px;
`;
const ModalThanksHeading = styled.p`
  color: #222b45;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
  width: 80%;
  text-align: center;
`;
const DeleteButton = styled.button`
  border-radius: 8px;
  background: #ea4335;
  color: #ffffff;
  font-size: 13px;
  line-height: 16px;
  font-weight: 600;
  padding: 1em 2em;
  border: none;
  cursor: pointer;
`;
const AddNewButton = styled.button`
  border-radius: 8px;
  background-color: #279af1;
  color: #ffffff;
  font-size: 13px;
  line-height: 16px;
  font-weight: 600;

  border: none;
  width: 113px;
  padding: 11px 14px 12px 14px;
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
        backdropFilter: "blur(8px)",
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
