import styled, { createGlobalStyle } from "styled-components";

import React from "react";

// Global style to hide overflow on the body for mobile screens
const GlobalStyle = createGlobalStyle`
  @media (max-width: 768px) {
    body {
      overflow: hidden;
    }
  }
`;

const Container = styled.div`
  height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  // Hide on desktop
  @media (min-width: 769px) {
    display: none;
  }
`;

const Scrollable = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
  background-color: #f5f5f5;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 70px; /* Height of Header */
  margin-bottom: 70px; /* Height of MobileSidebar */
`;

const MobileSidebar = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 70px;
  background-color: #f2f2f2;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.3);

  // Hide on desktop
  @media (min-width: 769px) {
    display: none;
  }
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  background-color: #f2f2f2;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
`;

const DeskTop = styled.div`
  display: none; /* Hidden by default */

  // Show only on desktop
  @media (min-width: 769px) {
    display: block;
    background-color: green;
    color: white;
    padding: 20px;
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Header />
        <Scrollable>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit sit
          eligendi, iure quaerat, voluptates magnam excepturi natus quod, sed
          saepe consequuntur neque deserunt explicabo ullam reprehenderit. ...
        </Scrollable>
        <MobileSidebar>Mobile Sidebar</MobileSidebar>
      </Container>
      <DeskTop>
        <div>Desktop Content</div>
      </DeskTop>
    </>
  );
};

export default App;
