import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from "styled-components";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 374,
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
  width: 70%;
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
const DeleteModal = ({
  openDelete,
  handleCloseDelete,
  HandleDelete,
  HandleReorder,
}) => {
  return (
    <Modal
      open={openDelete}
      onClose={handleCloseDelete}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <ModalThanks>
          <ModalIconDelete
            onClick={handleCloseDelete}
            src="/icons/alert-circle.png"
          />
          <ModalThanksImg src="/images/Danger Circle.jpg" />
          <ModalThanksHeading>
            Are you sure you want to delete this leave?
          </ModalThanksHeading>
          <DeleteButton
            onClick={() => {
              handleCloseDelete();
              HandleDelete();
            //   HandleReorder();
            }}
          >
            {" "}
            Delete{" "}
          </DeleteButton>
        </ModalThanks>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
