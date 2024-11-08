/* eslint-disable react/prop-types */
import MobileSidebar from "./components/MobileSidebar";
import styled from "styled-components";

const Container = styled.div`
  height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: rgba(232, 239, 239, 0.95);

  .scrollbar {
    margin-top: 90px;
  }
`;

const MainContainer = ({ children, noSidebar }) => {
  return (
    <Container>
      {children}
      {!noSidebar && <MobileSidebar />}
    </Container>
  );
};

export default MainContainer;
