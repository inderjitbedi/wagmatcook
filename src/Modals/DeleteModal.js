import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import { RotatingLines } from "react-loader-spinner";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "37.4rem",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 45,
  padding: "2rem 0rem",
  borderRadius: "8px",
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
  width: 70%;
  text-align: center;
`;
const DeleteButton = styled.button`
  border-radius: 8px;
  background: #ea4335;
  color: #ffffff;
  font-size: 1.3rem;
  line-height: 1.6rem;
  font-weight: 600;
  padding: 1em 2em;
  border: none;
  cursor: pointer;
`;
const DeleteModal = ({
  openDelete,
  HandleCloseDelete,
  HandleDelete,
  isLoading,
  message,
  Option,
  selectedName,
  transferTo,
}) => {
  return (
    <Modal
      open={openDelete}
      sx={{
        backgroundColor: "rgb(27, 27, 27, 0.75)",
        backdropFilter: "blur(8px)",
      }}
      onClose={HandleCloseDelete}
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
            <ModalThanksImg src="/images/Danger Circle.jpg" />
            <ModalThanksHeading>
              {Option
                ? "Are you sure you want to transfer the responsibilities of " +
                  selectedName + " to " + transferTo
                : message}
            </ModalThanksHeading>
            <DeleteButton
              onClick={() => {
                // HandleCloseDelete();
                HandleDelete();
                //   HandleReorder();
              }}
              disabled={isLoading}
            >
              {Option ? "YES " : "Delete"}
            </DeleteButton>
          </ModalThanks>
        )}
      </Box>
    </Modal>
  );
};

export default DeleteModal;
