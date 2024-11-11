/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 10px;
  padding: 8px;
  border-radius: 5px;

  border: 1px solid rgba(54, 187, 186, 0.2);
`;

const Input = ({ onChange }) => {
  return (
    <Container>
      <input type="text" placeholder="Search by name" onChange={onChange} />
    </Container>
  );
};

export default Input;
