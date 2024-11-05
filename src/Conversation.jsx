import MainContainer from "./MainContainer";
import React from "react";
import progress from "./progress.png";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    height: 300px;
    width: 300px;
    margin-top: 40px;
  }
`;
const Conversation = () => {
  return (
    <MainContainer>
      <Container className="pl-2 pr-2 pt-2 text-sm">
        <img src={progress} />
        <div className="italic">Please check back...</div>
      </Container>
    </MainContainer>
  );
};

export default Conversation;
