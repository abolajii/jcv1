/* eslint-disable react/prop-types */
import { FaEye } from "react-icons/fa"; // Importing the eye icon from React Icons
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 10px;
  width: 100%;
  display: flex;
  z-index: 10;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NumberText = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: #fff;
`;

const EyeIconView = ({ views }) => {
  return (
    <Container>
      <IconWrapper>
        <FaEye size={20} color="#fff" />
      </IconWrapper>
      <NumberText>{views}</NumberText>
    </Container>
  );
};

export default EyeIconView;
