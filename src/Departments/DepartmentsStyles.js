import React from "react";
import styled from "styled-components";

export const DashHeaderDepartment = styled.div`
  display: flex;
  gap: 2.1rem;
`;
export const DepartmentIconContainer = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
`;
export const DepartmentIconImg = styled.img`
  display: inline-block;
  height: 2.4rem;
  width: 2.4rem;
`;
export const DepartmentFilterContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;
`;
export const AddNewButton = styled.button`
  border-radius: 0.8rem;
  background-color: #279af1;
  color: #ffffff;
  font-size: 1.3rem;
  line-height: 1.6rem;
  font-weight: 600;
  padding: 1em 2em;
  border: none;
  cursor: pointer;
`;
export const LoadMore = styled.button`
  background: none;
  border: none;
  margin-top: 3.5rem;
  color: #222b45;
  font-size: 1.7rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.6rem;
  &:hover {
    color: #279af1;
    text-decoration: underline #279af1;
  }
  transition: all 0.5 ease-in-out;
  cursor: pointer;
`;
export const DepartmentFilterdiv = styled.div`
  display: flex;
  gap: 2.4rem;
  height: fit-content;
`;
export const DepartmentFilterButton = styled.div`
  border: none;
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 1.6rem;
  color: #8f9bb3;
  cursor: pointer;
`;
export const DepartmentCardContainer = styled.div`
  display: flex;
  gap: 1.6rem;
  margin-top: 1.7rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;
export const DepartmentCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 1 27.4rem;
  border-radius: 0.8rem;
  background-color: #ffffff;
  padding: 1.6rem 0rem 2.9rem 0rem;
  max-width: 29rem;
`;
export const DepartmentCardImg = styled.img`
  display: block;
  border-radius: 50%;
  width: 7.4rem;
  height: 7.4rem;
  margin-bottom: 1.5rem;
`;
export const DepartmentCardPara = styled.p`
  color: #222b45;
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 0rem;
`;
export const DepartmentCardParaLit = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.6rem;
  color: #8f9bb3;
  width: 70%;
  display: flex;
  justify-content: center;
`;
export const DepartmentCardButtoncolor = styled.button`
  border: none;
  background-color: #0095ff;
  border-radius: 0.8rem;
  width: 2.6rem;
  height: 2.6rem;
  padding: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const DepartmentCardButtongrey = styled.button`
  border: none;
  background-color: #eff4fa;
  border-radius: 0.8rem;
  width: 2.6rem;
  height: 2.6rem;
  padding: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const DepartmentButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  justify-self: flex-end;
`;

export const ModalUpperDiv = styled.div`
  padding: 0rem 1.6rem 1rem 3.5rem;
  border-bottom: 1px solid #eff4fa;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const ModalHeading = styled.p`
  font-size: 1.7rem;
  font-weight: 600;
  line-height: 1.6rem;
`;
export const ModalIcon = styled.img`
  display: inline-block;
  width: 2.4rem;
  height: 2.4rem;
  cursor: pointer;
`;
export const ModalIconDelete = styled.img`
  display: inline-block;
  width: 2.4rem;
  height: 2.4rem;
  cursor: pointer;
  position: absolute;
  right: 1rem;
  top: 0rem;
`;
export const ModalUpperMid = styled.div`
  border-bottom: 1px solid #eff4fa;
  padding: 1.6rem 3.5rem 2.6rem 3.5rem;
  box-sizing: border-box;
`;
export const ModalBottom = styled.div`
  gap: 2.5rem;
  padding: 1.6rem 1.6rem 0rem 3.5rem;
  display: flex;
  align-items: center;
`;
export const CancelButton = styled.button`
  border: none;
  color: #8f9bb3;
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 1.6rem;
  padding: 1em 2em;
  background-color: transparent;
`;
export const Input = styled.input`
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 1.6rem;
  width: 100%;
  border: 1px solid #dcdcdc;
  border-radius: 0.8rem;
  padding: 1em;
  margin-bottom: 1rem;
  color: #222b45;
  background: #fff;
  box-sizing: border-box;
`;
export const TextArea = styled.textarea`
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 1.6rem;
  width: 100%;
  border: 1px solid #dcdcdc;
  border-radius: 0.8rem;
  resize: none;
  height: 10.5rem;
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
  padding: 4rem 0rem;
  position: relative;
`;
export const ModalThanksImg = styled.img`
  display: block;
  width: 10.6rem;
  height: 10.6rem;
`;
export const ModalThanksHeading = styled.p`
  color: #222b45;
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 600;
  line-height: em;
  width: 70%;
  text-align: center;
`;
export const DeleteButton = styled.button`
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

export const Errors = styled.p`
  display: block;
  color: red;
  font-size: 1rem;
  font-weight: 300;
  line-height: 0rem;
  margin-top: 2px;
`;

export const InputPara = styled.p`
  color: #737992;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 0rem; /* 171.429% */
  display: flex;
  justify-content: space-between;
`;
