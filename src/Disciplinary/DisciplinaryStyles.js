import React from "react";
import styled from "styled-components";

export const DisciplinaryDiv = styled.div`
  display: flex;
  background: #fff;
  border-radius: 0.8rem 0.8rem 0rem 0rem;
  border: 1px solid #eff4fa;
  align-items: center;
  justify-content: space-between;

  padding: 1rem 2rem;
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
export const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.8rem 0.8rem 0rem 0rem;
  border-bottom: 1px solid #eff4fa;
  background: #fff;
  padding: 1rem 2rem;
`;
export const HeaderTitle = styled.h1`
  color: #222b45;
  font-size: 1.7rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.6rem;
  text-transform: capitalize;
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
export const DisciplinaryHeading = styled.p`
  color: #222b45;
  font-size: 1.7rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.6rem;
`;
export const MenuIcon = styled.img`
  display: inline-block;
  width: 2.2rem;
  height: 2.2rem;
  cursor: pointer;
`;
export const MenuIconDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;
export const ActionIcons = styled.img`
  width: 2rem;
  height: 2rem;
  display: inline-block;
  cursor: pointer;
`;
export const ActionIconDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;
export const ModalUpperDiv = styled.div`
  padding: 2rem 1.6rem 1rem 3.5rem;
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
export const ModalUpperMid = styled.div`
  /* border-bottom: 1px solid #eff4fa; */
  padding: 1.6rem 3.5rem 1.6rem 3.5rem;
  box-sizing: border-box;
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
export const RadioLabel = styled.label`
  color: #222b45;
  cursor: pointer;
  font-family: Inter;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.6rem;
  margin-right: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap:8px;
`;
export const FlexContaier = styled.div`
  display: flex;
  gap: 0.8rem;
  /* width: 50%; */
  position: relative;
`;
export const RadioButtonContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;
export const RadioButton = styled.input`
  visibility: hidden;
  display: none;
  &:checked + span {
    border: 2px solid #279af1;
  }
  &:checked + span::after {
    opacity: 1;
  }
`;
export const RadioSpan = styled.span`
  /* left: -8px;
  top: 6px; */
  cursor: pointer;
  width: 17px;
  height: 17px;
  border: 2px solid #9a9a9a;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  &::after {
    content: "";
    width: 12px;
    height: 12px;

    background: #279af1;
    position: absolute;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.2s;
  }
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
export const InputLabel = styled.label`
  color: #222b45;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 0.5rem;
  display: block;
  line-height: 2rem;
`;
export const InputSpan = styled.span`
  color: red;
  font-weight: 100;
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
export const Select = styled.select`
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 2.4rem;
  width: 100%;

  border: 1px solid #dcdcdc;
  border-radius: 0.8rem;
  /* padding: 0.8rem 1.1rem; */
  padding: 0.72em;
  margin-bottom: 1rem;
  color: #222b45;
  background: #fff;
  box-sizing: border-box;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: url("/images/icons/arrowdown.svg") no-repeat right center;
  background-size: 1.2rem 1rem;
  background-position: calc(100% - 15px) center;
`;
export const Option = styled.option`
  color: #222b45;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2.4rem; /* 150% */
  padding: 0.8rem 1.1rem;
`;
export const Errors = styled.p`
  display: block;
  color: red;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.2rem;
  margin: -6px 0px 5px 0px;
`;
export const TabelDarkPara = styled.p`
  color: #222b45;
  /* font-family: Inter; */
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.8rem;
  text-transform: capitalize;
  margin: 0;
`;
export const TabelLightPara = styled.p`
  color: #8f9bb3;
  /* font-family: Open Sans; */
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 0rem;
  text-transform: capitalize;
`;
export const TabelDiv = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
`;
export const TabelImg = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
`;
export const PaginationDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin: 1.6rem 0rem;
`;
export const PaginationDivExpand = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: space-between;
  margin: 1.6rem 0rem;
  padding: 0px 10px;

`;
export const PendingStyle = styled.p`
  border-radius: 10rem;
  background: #fff1dd;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 1.4rem;
  margin: 0;
  color: #e88b00;
  width: max-content;
  font-family: Inter;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.4rem;
`;
export const ApproveStyle = styled.p`
  border-radius: 10rem;
  background: #c8ffc7;
  color: #0d7d0b;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 1.4rem;
  margin: 0;
  width: max-content;
  font-family: Inter;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.4rem;
`;
export const RejectStyle = styled.p`
  border-radius: 10rem;
  background: #ffe7e7;
  color: #ea4335;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 1.4rem;
  margin: 0;
  width: max-content;
  font-family: Inter;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.4rem;
`;
export const ToggelButton = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
`;
export const ToggelLabel = styled.label`
  cursor: pointer;
  text-indent: -9999px;
  width: 5rem;
  height: 2.5rem;
  background: grey;
  display: block;
  border-radius: 10rem;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: 5px;
    left: 5px;
    width: 1.5rem;
    height: 1.5rem;
    background: #fff;
    border-radius: 9rem;
    transition: 0.3s;
  }
`;
export const StyledLabelChecked = styled(ToggelLabel)`
  background: #c8ffc7;
  &::after {
    left: calc(100% - 5px);
    transform: translateX(-100%);
  }
`;

export const StyledLabelActive = styled(ToggelLabel)`
  &::after {
    width: 1.5rem;
  }
`;
export const PaginationPara = styled.p`
  margin: 0;
  color: #8f9bb3;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.8rem;
`;
export const PaginationSelect = styled.select`
  color: black;
  border: 1px solid black;
  padding: 2px;
  background: transparent;
  outline: none;
  font-family: Inter;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 500;
  line-height: 2rem;
`;
export const PaginationOption = styled.option`
  color: #9ea0aa;
  font-family: Inter;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 500;
  line-height: 2rem;
`;
