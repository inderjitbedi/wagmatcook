import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
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

const ButtonBlue = styled.button`
  border-radius: 6px;
  background: #279af1;
  display: inline-flex;
  padding: 1.1rem 1.4rem 1.2rem 1.4rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  color: #fff;
  text-align: center;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border: none;
  cursor: pointer;
`;

const SuccessfullModal = ({ HandleCloseThanks, openThanks }) => {
  const Navigate = useNavigate();
  return (
    <Modal
      sx={{
        backgroundColor: "rgb(27, 27, 27, 0.75)",
        backdropFilter: "blur(8px)",
      }}
      open={openThanks}
      // onClose={HandleCloseThanks}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <ModalThanks>
          <ModalIconDelete
            onClick={HandleCloseThanks}
            src="/images/icons/Alert-Circle.svg"
          />
          <ModalThanksImg src="/images/success.jpg" />
          <ModalThanksHeading>Employee Added Successfully</ModalThanksHeading>
          <ButtonBlue
            onClick={() => Navigate(`/organization-admin/employee/list`)}
          >
            Close
          </ButtonBlue>
        </ModalThanks>
      </Box>
    </Modal>
  );
};

export default SuccessfullModal;
