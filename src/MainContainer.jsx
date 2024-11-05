/* eslint-disable react/prop-types */
import MobileSidebar from "./components/MobileSidebar";
import styled from "styled-components";

const Container = styled.div`
  height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .scrollbar {
    margin-top: 90px;
  }
`;

const MainContainer = ({ children }) => {
  return (
    <Container>
      {children}
      <MobileSidebar />
    </Container>
  );
};

export default MainContainer;