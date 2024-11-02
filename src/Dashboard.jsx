import MainContainer from "./MainContainer";
import React from "react";
import styled from "styled-components";

const Header = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  /* background-color: #f2f2f2; */
  /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3); */
`;

const Scrollable = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
  /* background-color: #f5f5f5; */
  /* padding: 10px; */
  box-sizing: border-box;
  margin-top: 70px; /* Height of Header */
  margin-bottom: 70px; /* Height of MobileSidebar */
`;

const Dashboard = () => {
  return (
    <MainContainer>
      <Header>Header</Header>
      <Scrollable>Scrollable</Scrollable>
    </MainContainer>
  );
};

export default Dashboard;
