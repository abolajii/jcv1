import MobileSidebar from "./components/MobileSidebar";
/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100svh;

  @media (min-width: 769px) {
    display: none;
  }
`;
const Sidebar = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 70px;
  /* background-color: #f2f2f2; */
  /* box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.3); */

  // Hide on desktop
  @media (min-width: 769px) {
    display: none;
  }
`;

const MainContainer = ({ children }) => {
  return (
    <Container>
      {children}
      <Sidebar>
        <MobileSidebar />
      </Sidebar>
    </Container>
  );
};

export default MainContainer;
