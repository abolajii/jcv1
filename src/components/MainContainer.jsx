import React from "react";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const MainContainer = () => {
  return (
    <Container>
      <One>
        <Sidebar />
      </One>
      <Two>B</Two>
      <Three>C</Three>
    </Container>
  );
};

export default MainContainer;

export const Container = styled.div`
  height: 100vh;
  display: flex;
  /* background-color: #f4f4f4; */
  background-color: rgba(232, 239, 239, 0.95);

  /* background: linear-gradient(135deg, #1c1c1c, #0d0d0d); */
`;

export const One = styled.div`
  flex: 1.2;
  border-right: 1px solid #d4d3d3;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const Two = styled.div`
  flex: 1.8;

  border-right: 1px solid #d4d3d3;
  height: 100%;
  overflow-y: scroll;
  /* Hide scrollbar */
  scrollbar-width: none; /* For Firefox */
  -ms-overflow-style: none; /* For Internet Explorer and Edge */
  &::-webkit-scrollbar {
    display: none; /* For Chrome, Safari, and Opera */
  }
`;

export const Three = styled.div`
  /* background-color: green; */
  height: 100%;
  flex: 1.2;

  overflow-y: scroll;
  /* Hide scrollbar */
  scrollbar-width: none; /* For Firefox */
  -ms-overflow-style: none; /* For Internet Explorer and Edge */
  &::-webkit-scrollbar {
    display: none; /* For Chrome, Safari, and Opera */
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
