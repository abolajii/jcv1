import React from "react";
import SidebarMenu from "./SidebarMenu";
import styled from "styled-components";

const Container = styled.div`
  flex: 0.9;
  height: 100%;
  /* background-color: red; */

  @media (max-width: 768px) {
    display: none;
  }
`;

const Logo = styled.div`
  height: 50px;
  width: 50px;
  margin: 20px;
  margin-bottom: 30px;
`;

const Top = styled.div`
  flex: 1;
  /* padding: 10px; */
  width: 100%;
`;

const Bottom = styled.div`
  padding: 10px;
  width: calc(100% - 20px);
`;

const Sidebar = () => {
  return (
    <Container>
      <Top>
        <Logo />
        <SidebarMenu />
      </Top>
    </Container>
  );
};

export default Sidebar;
