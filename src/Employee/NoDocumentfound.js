import React from 'react'
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  background-color: #fff;
  gap: 1.6rem;
  color: #c2c2c2;
  font-family: Inter;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.6rem;
`;
const Img = styled.img`
  width: 14rem;
  height: 14rem;

`;

const NoDocumentfound = (props) => {
  return (
    <Container>
      <Img src="/images/Nodocument.svg" />
      {props.message || 'No documents to show'}
    </Container>
  );
}

export default NoDocumentfound