import React from 'react';
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
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

 const ButtonBlue = styled.button`
   border-radius: 6px;
   background: #279af1;
   display: inline-flex;
   padding: 11px 14px 12px 14px;
   justify-content: center;
   align-items: center;
   gap: 10px;
   color: #fff;
   text-align: center;
   font-size: 14px;
   font-style: normal;
   font-weight: 600;
   line-height: normal;
   border: none;
   cursor: pointer;
 `;

const SuccessfullModal = ({ HandleCloseThanks, openThanks }) => {
  const Navigate = useNavigate()
  return (
    <Modal
      open={openThanks}
      onClose={HandleCloseThanks}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <ModalThanks>
          <ModalIconDelete
            // onClick={HandleCloseDelete}
            src="/images/icons/Alert-Circle.svg"
          />
          <ModalThanksImg src="/images/success.jpg" />
          <ModalThanksHeading>Employee Added Successfully</ModalThanksHeading>
          <ButtonBlue onClick={() =>  Navigate(`/organization-admin/employee/list`)}>Close</ButtonBlue>
        </ModalThanks>
      </Box>
    </Modal>
  );
};

export default SuccessfullModal