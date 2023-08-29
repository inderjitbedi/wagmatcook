import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from "styled-components";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 678,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 45,
  borderRadius: "8px",
};
const ModalDiv = styled.div`
  display: flex;
  width: 100%;
  border:none;
`;
const ModalImgDiv = styled.div`
  display: flex;
  background: #bde0e6;
  width: 50%;
  padding:57px 0px;
`;
const ModalTextDiv = styled.div`
  width: 50%;
  padding: 57px 57px 40px 35px;
`;
const ModalButton = styled.button`
  border-radius: 8px;
  background-color: #279af1;
  color: #ffffff;
  font-size: 13px;
  line-height: 16px;
  font-weight: 600;
  padding: 1em 2em;
  border: none;
  cursor: pointer;
`;
const ModalHeading = styled.h1`
  color: #222b45;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px; /* 94.118% */
`;
const ModalPara = styled.p`
  color: #707070;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 150% */
`;
const ModalImg = styled.img`
display: block;
`;
const OADAashModal = ({ isOpen, closeModal }) => {

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <ModalDiv>
          <ModalImgDiv>
            <ModalImg src="images/image1.jpg" />
          </ModalImgDiv>
          <ModalTextDiv>
            <ModalHeading>Welcome to Wagmatcook </ModalHeading>
            <ModalPara>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type.
            </ModalPara>
            <ModalButton onClick={closeModal}>Continue</ModalButton>
          </ModalTextDiv>
        </ModalDiv>
      </Box>
    </Modal>
  );
};

export default OADAashModal;
