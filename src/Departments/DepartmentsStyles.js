import React from "react";
import styled from "styled-components";

export const DashHeaderDepartment = styled.div`
  display: flex;
  gap: 21px;
`;
export const DepartmentIconContainer = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`;
export const DepartmentIconImg = styled.img`
  display: inline-block;
  height: 24px;
  width: 24px;
`;
export const DepartmentFilterContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;
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
export const DepartmentFilterdiv = styled.div`
display: flex;
gap:24px;
height: fit-content;
`;
export const DepartmentFilterButton = styled.div`
  border: none;
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  color: #8f9bb3;
  cursor: pointer;
`;
export const DepartmentCardContainer = styled.div`
display: flex;
gap:16px;
margin-top: 17px;
flex-wrap: wrap;
margin-bottom: 10px;

`;
export const DepartmentCardDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
  flex: 1 1 274px;
  border-radius: 8px;
  background-color: #ffffff;
  padding: 16px 0px 29px 0px;
  max-width: 290px;
`;
export const DepartmentCardImg = styled.img`
  display: block;
  border-radius: 50%;
  background-color: grey;
  width: 74px;
  height: 74px;
  margin-bottom: 15px;
`;
export const DepartmentCardPara = styled.p`
  color: #222b45;
  font-size: 13px;
  font-weight: 600;
  line-height: 0px;

`;
export const DepartmentCardParaLit = styled.p`
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: #8f9bb3;
  width: 70%;
  display: flex;
  justify-content: center;
  

`;
export const DepartmentCardButtoncolor = styled.button`
  border: none;
  background-color: #0095ff;
  border-radius:8px;
  width: 26px;
  height: 26px;
  padding: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

`;
export const DepartmentCardButtongrey = styled.button`
  border: none;
  background-color: #eff4fa;
  border-radius: 8px;
  width: 26px;
  height: 26px;
  padding: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const DepartmentButtonContainer = styled.div`
display: flex;
align-items: center;
gap: 15px;
justify-self: flex-end;
`;

export const ModalUpperDiv = styled.div`
  padding: 0px 16px 10px 35px;
  border-bottom: 1px solid #eff4fa;
  display: flex;
  align-items: center;
  justify-content:space-between;
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
export const ModalIconDelete = styled.img`
  display: inline-block;
  width: 24px;
  height: 24px;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top:0px;
`;
export const ModalUpperMid = styled.div`
  border-bottom: 1px solid #eff4fa;
  padding: 16px 35px 26px 35px;
  box-sizing: border-box;
`;
export const ModalBottom = styled.div`
  gap: 25px ;
  padding: 16px 16px 0px 35px;
  display:flex;
  align-items: center;
`;
export const CancelButton = styled.button`
  border: none;
  color: #8f9bb3;
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  padding: 1em 2em;
  background-color: transparent;
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

export const ModalThanks = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 40px 0px;
position: relative;
`;
export const ModalThanksImg = styled.img`
  display: block;
  width: 106px;
  height: 106px;
`;
export const ModalThanksHeading = styled.p`
  color: #222b45;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
  width: 70%;
  text-align: center;
`;
export const DeleteButton = styled.button`
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

export const Errors = styled.p`
  display: block;
  color: red;
  font-size: 10px;
  font-weight: 300;
  line-height: 0px;
  margin-top: 2px;
`;






 
