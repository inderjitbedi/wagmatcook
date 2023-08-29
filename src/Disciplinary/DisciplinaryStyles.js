import React from "react";
import styled from "styled-components";

export const DisciplinaryDiv = styled.div`
  display: flex;
  background: #fff;
  border-radius: 8px 8px 0px 0px;
  border: 1px solid #eff4fa;
  align-items: center;
  justify-content: space-between;

  padding: 10px 20px;
`;
export const AddNewButton = styled.button`
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
export const DisciplinaryHeading = styled.p`
  color: #222b45;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
`;
export const MenuIcon = styled.img`
  display: inline-block;
  width: 22px;
  height: 23px;
  cursor: pointer;
`;
export const MenuIconDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
export const ActionIcons = styled.img`
  width: 20px;
  height: 20px;
  display: inline-block;
  cursor: pointer;
`;
export const ActionIconDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
export const ModalUpperDiv = styled.div`
  padding: 0px 16px 10px 35px;
  border-bottom: 1px solid #eff4fa;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const ModalHeading = styled.p`
  font-size: 17px;
  font-weight: 600;
  line-height: 16px;
`;
export const ModalIcon = styled.img`
  display: inline-block;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
export const ModalUpperMid = styled.div`
  /* border-bottom: 1px solid #eff4fa; */
  padding: 16px 35px 16px 35px;
  box-sizing: border-box;
`;
export const Input = styled.input`
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  width: 100%;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  padding: 1em;
  margin-bottom: 10px;
  color: #222b45;
  background: #fff;
  box-sizing: border-box;
`;
export const TextArea = styled.textarea`
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  width: 100%;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  resize: none;
  height: 105px;
  padding: 1em;
  color: #222b45;
  background: #fff;
  box-sizing: border-box;
`;
export const InputLabel = styled.label`
  color: #222b45;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 10px;
  display: block;
`;
export const InputSpan = styled.span`
  color: red;
  font-weight: 100;
`;
export const InputPara = styled.p`
  color: #737992;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 0px; /* 171.429% */
  display: flex;
  justify-content: flex-end;
`;
export const Select = styled.select`
  font-size: 13px;
  font-weight: 400;
  line-height: 24px;
  width: 100%;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  padding: 8px 11px;
  margin-bottom: 10px;
  color: #222b45;
  background: #fff;
  box-sizing: border-box;
`;
export const Option = styled.option`
  color: #222b45;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  padding: 8px 11px;
`;
